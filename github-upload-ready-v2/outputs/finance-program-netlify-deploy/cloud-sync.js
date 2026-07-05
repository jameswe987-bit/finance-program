(function () {
  const SESSION_KEY = "bataan_finance_cloud_session_v1";
  const config = window.FINANCE_CLOUD_CONFIG || {};
  const state = {
    initialized: false,
    session: loadSession(),
    organizationId: "",
    profileId: "",
    lastSyncAt: "",
    lastError: "",
  };

  function cleanUrl() {
    return String(config.supabaseUrl || "").replace(/\/+$/, "");
  }

  function isConfigured() {
    return Boolean(config.enabled && cleanUrl() && config.supabaseAnonKey);
  }

  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    state.session = session || null;
    if (state.session) localStorage.setItem(SESSION_KEY, JSON.stringify(state.session));
    else localStorage.removeItem(SESSION_KEY);
  }

  function authToken() {
    return state.session?.access_token || "";
  }

  function headers(extra = {}) {
    const token = authToken() || config.supabaseAnonKey;
    return {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...extra,
    };
  }

  async function request(path, options = {}) {
    if (!isConfigured()) throw new Error("云端同步未配置。");
    const res = await fetch(`${cleanUrl()}${path}`, {
      ...options,
      headers: headers(options.headers || {}),
    });
    const text = await res.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }
    if (!res.ok) {
      const message = payload?.msg || payload?.message || payload?.error_description || payload?.error || `请求失败 ${res.status}`;
      throw new Error(message);
    }
    return payload;
  }

  async function signIn(email, password) {
    if (!isConfigured()) throw new Error("请先填写 Supabase URL 和 anon key，并开启云端同步。");
    const payload = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveSession(payload);
    await ensureContext();
    return payload;
  }

  function signOut() {
    saveSession(null);
    state.organizationId = "";
    state.profileId = "";
    state.lastSyncAt = "";
  }

  async function ensureContext() {
    if (!isConfigured()) throw new Error("云端同步未配置。");
    if (!authToken()) throw new Error("请先登录云端账号。");
    if (state.organizationId && state.profileId) return state;

    const organizationName = config.organizationName || "项目财务系统";
    let orgs = await request(`/rest/v1/finance_organizations?name=eq.${encodeURIComponent(organizationName)}&select=id,name&limit=1`);
    if (!Array.isArray(orgs) || !orgs.length) {
      orgs = await request("/rest/v1/finance_organizations?select=id,name", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ name: organizationName }),
      });
    }
    state.organizationId = orgs[0].id;

    const user = state.session?.user || {};
    const username = user.email || "cloud-user";
    let profiles = await request(`/rest/v1/finance_profiles?organization_id=eq.${state.organizationId}&username=eq.${encodeURIComponent(username)}&select=id,username,role,status&limit=1`);
    if (!Array.isArray(profiles) || !profiles.length) {
      profiles = await request("/rest/v1/finance_profiles?select=id,username,role,status", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          organization_id: state.organizationId,
          auth_user_id: user.id || null,
          username,
          display_name: username,
          role: "管理员",
          status: "启用",
        }),
      });
    }
    state.profileId = profiles[0].id;
    return state;
  }

  async function pullState() {
    await ensureContext();
    const key = config.documentKey || "main";
    const rows = await request(`/rest/v1/finance_state_documents?organization_id=eq.${state.organizationId}&document_key=eq.${encodeURIComponent(key)}&select=payload,version,updated_at&limit=1`);
    if (!Array.isArray(rows) || !rows.length) return null;
    state.lastSyncAt = rows[0].updated_at || new Date().toISOString();
    return rows[0].payload || null;
  }

  async function pushState(payload) {
    await ensureContext();
    const key = config.documentKey || "main";
    const rows = await request("/rest/v1/finance_state_documents?on_conflict=organization_id,document_key&select=id,version,updated_at", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        organization_id: state.organizationId,
        document_key: key,
        payload,
        updated_by: state.profileId,
        updated_at: new Date().toISOString(),
      }),
    });
    state.lastSyncAt = rows?.[0]?.updated_at || new Date().toISOString();
    return rows?.[0] || null;
  }

  async function backupState(payload, reason = "manual") {
    await ensureContext();
    return request("/rest/v1/finance_state_backups", {
      method: "POST",
      body: JSON.stringify({
        organization_id: state.organizationId,
        document_key: config.documentKey || "main",
        payload,
        version: Date.now(),
        backup_reason: reason,
        created_by: state.profileId,
      }),
    });
  }

  function status() {
    return {
      configured: isConfigured(),
      enabled: Boolean(config.enabled),
      signedIn: Boolean(authToken()),
      email: state.session?.user?.email || "",
      lastSyncAt: state.lastSyncAt,
      lastError: state.lastError,
    };
  }

  window.FinanceCloud = {
    config,
    status,
    signIn,
    signOut,
    pullState,
    pushState,
    backupState,
    isConfigured,
  };
})();
