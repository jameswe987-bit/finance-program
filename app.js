const originalData = window.FINANCE_DATA;
const STORAGE_KEY = "bataan_finance_multi_project_v2";
const UI_STORAGE_KEY = "bataan_finance_ui_v1";
const AUTH_SESSION_KEY = "bataan_finance_auth_v1";
const AI_SETTINGS_KEY = "bataan_finance_ai_settings_v1";
const REFRESH_BACKUP_KEY = "bataan_finance_refresh_backup_v1";
const LAST_GOOD_BACKUP_KEY = "bataan_finance_last_good_backup_v1";
const AUTH_ENABLED = false;
const AUTH_TIMEOUT_MS = 60 * 60 * 1000;

const currencyLocales = {
  PHP: "en-PH",
  CNY: "zh-CN",
  USD: "en-US",
  HKD: "zh-HK",
  EUR: "de-DE",
  JPY: "ja-JP",
  SGD: "en-SG",
  AED: "ar-AE",
};

const defaultCategories = ["工程款收入", "工资", "材料", "混凝土", "图纸设计", "设备机械", "运输", "借款还款", "生活教育", "招待会议", "税费许可", "钢结构支出", "其它项目"];
const defaultUsages = ["钢结构", "其它项目"];
const defaultSubUsages = ["工程款", "材料", "人工", "机械", "其它"];
const defaultReceivableUnits = ["应收单位"];
const defaultPayableUnits = ["应付单位"];
const defaultTranslations = [
  { zh: "工程款收入", en: "Progress Payment Income", group: "分类" },
  { zh: "工资", en: "Labor Wages", group: "分类" },
  { zh: "材料", en: "Materials", group: "分类" },
  { zh: "混凝土", en: "Concrete", group: "分类" },
  { zh: "图纸设计", en: "Drawing Design", group: "分类" },
  { zh: "设备机械", en: "Equipment & Machinery", group: "分类" },
  { zh: "运输", en: "Transportation", group: "分类" },
  { zh: "借款还款", en: "Loan Repayment", group: "分类" },
  { zh: "税费许可", en: "Tax & Permits", group: "分类" },
  { zh: "钢结构支出", en: "Steel Structure Expense", group: "分类" },
  { zh: "其它项目", en: "Other Items", group: "分类" },
  { zh: "钢结构", en: "Steel Structure", group: "用途" },
  { zh: "工程款", en: "Project Payment", group: "分包用途" },
  { zh: "人工", en: "Labor", group: "分包用途" },
  { zh: "机械", en: "Machinery", group: "分包用途" },
  { zh: "建筑材料", en: "Construction Materials", group: "材料" },
  { zh: "钢筋", en: "Rebar", group: "材料" },
  { zh: "水泥", en: "Cement", group: "材料" },
  { zh: "砂石", en: "Sand & Gravel", group: "材料" },
  { zh: "应收单位", en: "Receivable Unit", group: "单位" },
  { zh: "应付单位", en: "Payable Unit", group: "单位" },
  { zh: "收入", en: "Income", group: "收支" },
  { zh: "支出", en: "Expense", group: "收支" },
  { zh: "地基基础", en: "Foundation", group: "施工阶段" },
  { zh: "主体结构", en: "Main Structure", group: "施工阶段" },
  { zh: "砌筑抹灰", en: "Masonry & Plastering", group: "施工阶段" },
  { zh: "水电安装", en: "MEP Installation", group: "施工阶段" },
  { zh: "门窗", en: "Doors & Windows", group: "施工阶段" },
  { zh: "防水", en: "Waterproofing", group: "施工阶段" },
  { zh: "地砖墙砖", en: "Floor & Wall Tiles", group: "施工阶段" },
  { zh: "油漆涂料", en: "Painting", group: "施工阶段" },
  { zh: "装修收尾", en: "Finishing Works", group: "施工阶段" },
  { zh: "交付整改", en: "Handover Rectification", group: "施工阶段" },
  { zh: "个", en: "pcs", group: "单位" },
  { zh: "吨", en: "ton", group: "单位" },
  { zh: "米", en: "m", group: "单位" },
  { zh: "平方米", en: "sqm", group: "单位" },
  { zh: "立方米", en: "cu.m", group: "单位" },
];
const entryTypes = ["支出", "收入"];
const subcontractStatuses = ["进行中", "完成", "计划开始"];
const accountStatuses = ["启用", "关闭"];
const warehouseStatuses = ["待采购", "已下单", "运输中", "已入库", "已取消"];
const warehouseCarriers = ["未选择", "DHL", "FedEx", "UPS", "顺丰", "中通", "圆通", "申通", "韵达", "极兔", "LBC", "J&T", "其它"];
const constructionStages = ["地基基础", "主体结构", "钢结构", "砌筑抹灰", "水电安装", "门窗", "防水", "地砖墙砖", "油漆涂料", "装修收尾", "交付整改", "其它"];
const laborCostModes = ["计入成本", "仅记录"];
const debtStatuses = ["未收款", "部分收款", "已收清", "逾期", "暂停"];
const payableStatuses = ["未付款", "部分付款", "已付清", "逾期", "暂停"];
const checkStatuses = ["已开出", "未兑现", "已兑现", "作废"];
const changeOrderStatuses = ["待确认", "已确认", "已取消"];
const changeOrderTypes = ["增加", "减少"];
const userRoles = ["管理员", "财务", "录入员", "查看员"];
const userStatuses = ["启用", "停用"];
const permissionModules = [
  { id: "overview", name: "系统概况" },
  { id: "dailyOps", name: "日常操作" },
  { id: "helpGuide", name: "帮助中心" },
  { id: "taskCenter", name: "待办中心" },
  { id: "projects", name: "项目" },
  { id: "changeOrders", name: "工程变更签证" },
  { id: "accounts", name: "资金账户" },
  { id: "cashflow", name: "资金流水核对" },
  { id: "checks", name: "银行支票" },
  { id: "dividends", name: "股份分红" },
  { id: "debts", name: "应收款" },
  { id: "payables", name: "应付款" },
  { id: "users", name: "账号" },
  { id: "translations", name: "中英文对照" },
  { id: "progress", name: "进度款" },
  { id: "ledger", name: "项目收支流水" },
  { id: "warehouse", name: "材料库存" },
  { id: "costControl", name: "工程成本" },
  { id: "aiTools", name: "豆包AI" },
  { id: "drawingAnalysis", name: "图纸分析" },
  { id: "analysis", name: "统计" },
  { id: "subcontracts", name: "分包" },
  { id: "history", name: "记录" },
];
const progressOverrideFields = new Set([
  "advanceDeducted",
  "margin",
  "ewtMaterial",
  "ewtLabor",
  "philippinesTotal",
  "philippinesDeducted",
  "philippinesPayable",
  "ourRemaining",
]);
const pageTitles = {
  overview: "项目总览",
  dailyOps: "日常操作",
  helpGuide: "帮助中心",
  taskCenter: "待办中心",
  projects: "项目总表",
  accounts: "资金账户",
  cashflow: "资金流水核对",
  checks: "银行支票记录",
  dividends: "盈利股份分红",
  debts: "应收款台账",
  payables: "应付款台账",
  users: "账号管理",
  translations: "中英文对照",
  subcontracts: "分包项目管理",
  changeOrders: "工程变更签证",
  ledger: "项目收支流水",
  warehouse: "材料采购与库存",
  costControl: "工程成本核算",
  aiTools: "豆包AI采购清单识别",
  drawingAnalysis: "建筑图纸分析",
  analysis: "查询统计",
  history: "修改记录",
};
const pageTitle = document.querySelector("#pageTitle");
const pageTabs = document.querySelector("#pageTabs");
const appShell = document.querySelector(".app-shell");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginCaptcha = document.querySelector("#loginCaptcha");
const captchaCodeButton = document.querySelector("#captchaCode");
const loginError = document.querySelector("#loginError");
const currentUserBadge = document.querySelector("#currentUserBadge");
const currentUserAvatar = document.querySelector("#currentUserAvatar");
const avatarButton = document.querySelector("#avatarButton");
const avatarInput = document.querySelector("#avatarInput");
const brandTitle = document.querySelector("#brandTitle");
const loginBrandTitle = document.querySelector("#loginBrandTitle");
const brandLogoButton = document.querySelector("#brandLogoButton");
const brandLogoInput = document.querySelector("#brandLogoInput");
const brandLogoMark = document.querySelector("#brandLogoMark");
const loginBrandMark = document.querySelector("#loginBrandMark");
const logoutButton = document.querySelector("#logoutButton");
const changePasswordButton = document.querySelector("#changePasswordButton");
const manualRefreshButton = document.querySelector("#manualRefreshButton");
const autoRefreshToggle = document.querySelector("#autoRefreshToggle");
const autoRefreshStatus = document.querySelector("#autoRefreshStatus");
const sidebarToggle = document.querySelector("#sidebarToggle");
const nav = document.querySelector(".nav");
const views = [...document.querySelectorAll(".view")];
const searchInput = document.querySelector("#searchInput");
const projectFilter = document.querySelector("#projectFilter");
const accountFilter = document.querySelector("#accountFilter");
const usageFilter = document.querySelector("#usageFilter");
const currencySelect = document.querySelector("#currencySelect");
const languageSelect = document.querySelector("#languageSelect");
const zoomOutButton = document.querySelector("#zoomOut");
const zoomInButton = document.querySelector("#zoomIn");
const zoomResetButton = document.querySelector("#zoomReset");
const toggleProjectFormulaButton = document.querySelector("#toggleProjectFormula");
const toggleProgressFormulaButton = document.querySelector("#toggleProgressFormula");
const accountControls = document.querySelector("#accountControls");
const toggleAccountControlsButton = document.querySelector("#toggleAccountControls");
const cashflowSearch = document.querySelector("#cashflowSearch");
const cashflowSourceFilter = document.querySelector("#cashflowSourceFilter");
const cashflowDateFrom = document.querySelector("#cashflowDateFrom");
const cashflowDateTo = document.querySelector("#cashflowDateTo");
const cashflowControls = document.querySelector("#cashflowControls");
const toggleCashflowControlsButton = document.querySelector("#toggleCashflowControls");
const clearCashflowSearchButton = document.querySelector("#clearCashflowSearch");
const checkCashflowErrorsButton = document.querySelector("#checkCashflowErrors");
const exportCashflowButton = document.querySelector("#exportCashflow");
const checkSearch = document.querySelector("#checkSearch");
const checkStatusFilter = document.querySelector("#checkStatusFilter");
const checkDateFrom = document.querySelector("#checkDateFrom");
const checkDateTo = document.querySelector("#checkDateTo");
const checkControls = document.querySelector("#checkControls");
const toggleCheckControlsButton = document.querySelector("#toggleCheckControls");
const clearCheckSearchButton = document.querySelector("#clearCheckSearch");
const addCheckButton = document.querySelector("#addCheck");
const deleteSelectedChecksButton = document.querySelector("#deleteSelectedChecks");
const debtSearch = document.querySelector("#debtSearch");
const debtStatusFilter = document.querySelector("#debtStatusFilter");
const debtDateFrom = document.querySelector("#debtDateFrom");
const debtDateTo = document.querySelector("#debtDateTo");
const debtControls = document.querySelector("#debtControls");
const toggleDebtControlsButton = document.querySelector("#toggleDebtControls");
const clearDebtSearchButton = document.querySelector("#clearDebtSearch");
const addDebtButton = document.querySelector("#addDebt");
const deleteSelectedDebtsButton = document.querySelector("#deleteSelectedDebts");
const receivableUnitSelect = document.querySelector("#receivableUnitSelect");
const addReceivableUnitButton = document.querySelector("#addReceivableUnit");
const renameReceivableUnitButton = document.querySelector("#renameReceivableUnit");
const deleteReceivableUnitButton = document.querySelector("#deleteReceivableUnit");
const payableSearch = document.querySelector("#payableSearch");
const payableStatusFilter = document.querySelector("#payableStatusFilter");
const payableDateFrom = document.querySelector("#payableDateFrom");
const payableDateTo = document.querySelector("#payableDateTo");
const payableControls = document.querySelector("#payableControls");
const togglePayableControlsButton = document.querySelector("#togglePayableControls");
const clearPayableSearchButton = document.querySelector("#clearPayableSearch");
const addPayableButton = document.querySelector("#addPayable");
const deleteSelectedPayablesButton = document.querySelector("#deleteSelectedPayables");
const payableUnitSelect = document.querySelector("#payableUnitSelect");
const addPayableUnitButton = document.querySelector("#addPayableUnit");
const renamePayableUnitButton = document.querySelector("#renamePayableUnit");
const deletePayableUnitButton = document.querySelector("#deletePayableUnit");
const changeOrderCount = document.querySelector("#changeOrderCount");
const changeOrderSearch = document.querySelector("#changeOrderSearch");
const changeOrderStatusFilter = document.querySelector("#changeOrderStatusFilter");
const changeOrderDateFrom = document.querySelector("#changeOrderDateFrom");
const changeOrderDateTo = document.querySelector("#changeOrderDateTo");
const changeOrderSummary = document.querySelector("#changeOrderSummary");
const addChangeOrderButton = document.querySelector("#addChangeOrder");
const deleteSelectedChangeOrdersButton = document.querySelector("#deleteSelectedChangeOrders");
const clearChangeOrderSearchButton = document.querySelector("#clearChangeOrderSearch");
const userSearch = document.querySelector("#userSearch");
const ledgerSearch = document.querySelector("#ledgerSearch");
const ledgerProjectSelect = document.querySelector("#ledgerProjectSelect");
const dateFromFilter = document.querySelector("#dateFromFilter");
const dateToFilter = document.querySelector("#dateToFilter");
const noteFilter = document.querySelector("#noteFilter");
const warehouseSearch = document.querySelector("#warehouseSearch");
const warehouseStatusFilter = document.querySelector("#warehouseStatusFilter");
const warehouseDateFrom = document.querySelector("#warehouseDateFrom");
const warehouseDateTo = document.querySelector("#warehouseDateTo");
const warehouseControls = document.querySelector("#warehouseControls");
const toggleWarehouseControlsButton = document.querySelector("#toggleWarehouseControls");
const clearWarehouseSearchButton = document.querySelector("#clearWarehouseSearch");
const addWarehouseItemButton = document.querySelector("#addWarehouseItem");
const addWarehouseOutboundButton = document.querySelector("#addWarehouseOutbound");
const deleteSelectedWarehouseButton = document.querySelector("#deleteSelectedWarehouse");
const deleteSelectedWarehouseOutboundButton = document.querySelector("#deleteSelectedWarehouseOutbound");
const costControlCount = document.querySelector("#costControlCount");
const costControls = document.querySelector("#costControls");
const toggleCostControlsButton = document.querySelector("#toggleCostControls");
const costSearch = document.querySelector("#costSearch");
const costDateFrom = document.querySelector("#costDateFrom");
const costDateTo = document.querySelector("#costDateTo");
const clearCostSearchButton = document.querySelector("#clearCostSearch");
const addMaterialPlanButton = document.querySelector("#addMaterialPlan");
const addLaborRecordButton = document.querySelector("#addLaborRecord");
const deleteSelectedMaterialPlansButton = document.querySelector("#deleteSelectedMaterialPlans");
const deleteSelectedLaborRecordsButton = document.querySelector("#deleteSelectedLaborRecords");
const dividendCount = document.querySelector("#dividendCount");
const dividendSummary = document.querySelector("#dividendSummary");
const dividendList = document.querySelector("#dividendList");
const aiReportCount = document.querySelector("#aiReportCount");
const aiProvider = document.querySelector("#aiProvider");
const aiApiKey = document.querySelector("#aiApiKey");
const aiModel = document.querySelector("#aiModel");
const aiProjectSelect = document.querySelector("#aiProjectSelect");
const aiReportTitle = document.querySelector("#aiReportTitle");
const aiImageInput = document.querySelector("#aiImageInput");
const aiImagePreview = document.querySelector("#aiImagePreview");
const aiStatus = document.querySelector("#aiStatus");
const aiReportList = document.querySelector("#aiReportList");
const analyzeAiImageButton = document.querySelector("#analyzeAiImage");
const saveAiSettingsButton = document.querySelector("#saveAiSettings");
const deleteSelectedAiReportsButton = document.querySelector("#deleteSelectedAiReports");
const drawingReportCount = document.querySelector("#drawingReportCount");
const drawingApiKey = document.querySelector("#drawingApiKey");
const drawingModel = document.querySelector("#drawingModel");
const drawingProjectSelect = document.querySelector("#drawingProjectSelect");
const drawingReportTitle = document.querySelector("#drawingReportTitle");
const drawingImageInput = document.querySelector("#drawingImageInput");
const drawingImagePreview = document.querySelector("#drawingImagePreview");
const drawingStatus = document.querySelector("#drawingStatus");
const drawingReportList = document.querySelector("#drawingReportList");
const analyzeDrawingImageButton = document.querySelector("#analyzeDrawingImage");
const analyzeDrawingLocalButton = document.querySelector("#analyzeDrawingLocal");
const saveDrawingSettingsButton = document.querySelector("#saveDrawingSettings");
const deleteSelectedDrawingReportsButton = document.querySelector("#deleteSelectedDrawingReports");
const saveButton = document.querySelector("#saveButton");
const resetButton = document.querySelector("#resetButton");
const clearAllDataButton = document.querySelector("#clearAllDataButton");
const cloudSyncStatus = document.querySelector("#cloudSyncStatus");
const cloudEmail = document.querySelector("#cloudEmail");
const cloudPassword = document.querySelector("#cloudPassword");
const cloudLoginButton = document.querySelector("#cloudLoginButton");
const cloudUploadButton = document.querySelector("#cloudUploadButton");
const cloudDownloadButton = document.querySelector("#cloudDownloadButton");
const cloudBackupButton = document.querySelector("#cloudBackupButton");
const rememberCloudLogin = document.querySelector("#rememberCloudLogin");
const exportLocalBackupButton = document.querySelector("#exportLocalBackupButton");
const restoreLocalBackupButton = document.querySelector("#restoreLocalBackupButton");
const restoreLocalBackupInput = document.querySelector("#restoreLocalBackupInput");
const localDiskStatus = document.querySelector("#localDiskStatus");
const localDiskSaveButton = document.querySelector("#localDiskSaveButton");
const localDiskLoadButton = document.querySelector("#localDiskLoadButton");
const clearSearchButton = document.querySelector("#clearSearch");
const clearUserSearchButton = document.querySelector("#clearUserSearch");
const clearLedgerSearchButton = document.querySelector("#clearLedgerSearch");
const applyLedgerProjectButton = document.querySelector("#applyLedgerProject");
const ledgerControls = document.querySelector("#ledgerControls");
const toggleLedgerControlsButton = document.querySelector("#toggleLedgerControls");
const exportLedgerButton = document.querySelector("#exportLedger");
const addUsageButton = document.querySelector("#addUsage");
const addCategoryButton = document.querySelector("#addCategory");
const addProjectButton = document.querySelector("#addProject");
const addAccountButton = document.querySelector("#addAccount");
const addAccountAdjustmentButton = document.querySelector("#addAccountAdjustment");
const addUserAccountButton = document.querySelector("#addUserAccount");
const addProgressButton = document.querySelector("#addProgress");
const addEntryButton = document.querySelector("#addEntry");
const deleteSelectedProjectsButton = document.querySelector("#deleteSelectedProjects");
const deleteSelectedAccountsButton = document.querySelector("#deleteSelectedAccounts");
const deleteSelectedUsersButton = document.querySelector("#deleteSelectedUsers");
const deleteSelectedProgressButton = document.querySelector("#deleteSelectedProgress");
const deleteSelectedEntriesButton = document.querySelector("#deleteSelectedEntries");
const addSubprojectButton = document.querySelector("#addSubproject");
const addSubLedgerButton = document.querySelector("#addSubLedger");
const addSubUsageButton = document.querySelector("#addSubUsage");
const subUsageManagerSelect = document.querySelector("#subUsageManagerSelect");
const renameSubUsageButton = document.querySelector("#renameSubUsage");
const deleteSubUsageButton = document.querySelector("#deleteSubUsage");
const subprojectPanel = document.querySelector("#subprojectPanel");
const toggleSubprojectPanelButton = document.querySelector("#toggleSubprojectPanel");
const subLedgerPanel = document.querySelector("#subLedgerPanel");
const toggleSubLedgerPanelButton = document.querySelector("#toggleSubLedgerPanel");
const subcontractSearch = document.querySelector("#subcontractSearch");
const subprojectProjectFilter = document.querySelector("#subprojectProjectFilter");
const subprojectLedgerFilter = document.querySelector("#subprojectLedgerFilter");
const subcontractDateFrom = document.querySelector("#subcontractDateFrom");
const subcontractDateTo = document.querySelector("#subcontractDateTo");
const clearSubcontractSearchButton = document.querySelector("#clearSubcontractSearch");
const applySubprojectProjectButton = document.querySelector("#applySubprojectProject");
const deleteSelectedSubprojectsButton = document.querySelector("#deleteSelectedSubprojects");
const deleteSelectedSubLedgersButton = document.querySelector("#deleteSelectedSubLedgers");
const historyFromFilter = document.querySelector("#historyFromFilter");
const historyToFilter = document.querySelector("#historyToFilter");
const historySearch = document.querySelector("#historySearch");
const analysisSearch = document.querySelector("#analysisSearch");
const analysisDateFrom = document.querySelector("#analysisDateFrom");
const analysisDateTo = document.querySelector("#analysisDateTo");
const analysisControls = document.querySelector("#analysisControls");
const toggleAnalysisControlsButton = document.querySelector("#toggleAnalysisControls");
const clearAnalysisSearchButton = document.querySelector("#clearAnalysisSearch");
const exportAnalysisButton = document.querySelector("#exportAnalysis");
const translationSearch = document.querySelector("#translationSearch");
const addTranslationButton = document.querySelector("#addTranslation");
const deleteSelectedTranslationsButton = document.querySelector("#deleteSelectedTranslations");
const clearTranslationSearchButton = document.querySelector("#clearTranslationSearch");
const clearHistorySearchButton = document.querySelector("#clearHistorySearch");
const clearHistoryButton = document.querySelector("#clearHistory");
const deleteSelectedHistoryButton = document.querySelector("#deleteSelectedHistory");
const historyControls = document.querySelector("#historyControls");
const toggleHistoryControlsButton = document.querySelector("#toggleHistoryControls");
const imageModal = document.querySelector("#imageModal");
const imageModalImg = document.querySelector("#imageModalImg");
const imageModalName = document.querySelector("#imageModalName");
const taskCenterCount = document.querySelector("#taskCenterCount");
const taskSummary = document.querySelector("#taskSummary");
const taskCenterTable = document.querySelector("#taskCenterTable");

let state = ensureStateShape(loadState());
let lastDataSnapshot = JSON.stringify(dataOnlyState(state));
let captchaText = "";
let currentUserId = loadAuthSession().userId;
let currentView = document.querySelector(".view.active")?.id || "overview";
let openViews = new Set([currentView]);
let activeWarehouseSection = "";
let activeCostSection = "";
let aiImageDataUrl = "";
let drawingImageDataUrl = "";
let drawingUploadData = null;
let authTimer = null;
let storageWarningShown = false;
let pendingDeletedRecords = [];
let autoRefreshTimer = null;
let autoRefreshCountdownTimer = null;
let autoRefreshRemaining = 20;
document.querySelector("#sourceTime").textContent = "多项目可编辑版";
const initialUiState = loadUiState();
const initialAiSettings = loadAiSettings();
let autoRefreshEnabled = Boolean(initialUiState.autoRefreshEnabled);
let collapsedProgressProjects = new Set(initialUiState.collapsedProgressProjects || []);
languageSelect.value = initialUiState.language || "zh";
applyBrandSettings(initialUiState);
applySidebarState(initialUiState.sidebarHidden);
applyAccountControlsState(initialUiState.accountControlsHidden);
applyCashflowControlsState(initialUiState.cashflowControlsHidden);
applyCheckControlsState(initialUiState.checkControlsHidden);
applyDebtControlsState(initialUiState.debtControlsHidden);
applyPayableControlsState(initialUiState.payableControlsHidden);
applySubprojectPanelState(initialUiState.subprojectPanelHidden);
applySubLedgerPanelState(initialUiState.subLedgerPanelHidden);
applyLedgerControlsState(initialUiState.ledgerControlsHidden);
applyWarehouseControlsState(initialUiState.warehouseControlsHidden);
applyCostControlsState(initialUiState.costControlsHidden);
applyHistoryControlsState(initialUiState.historyControlsHidden);
applyAnalysisControlsState(initialUiState.analysisControlsHidden);
applyPageZoom(initialUiState.pageZoom || 1);
aiApiKey.value = initialAiSettings.apiKey || "";
aiModel.value = initialAiSettings.model || aiModel.value || "";
aiProvider.value = ["doubao", "openai"].includes(initialAiSettings.provider) ? initialAiSettings.provider : "doubao";
if (drawingApiKey) drawingApiKey.value = initialAiSettings.apiKey || "";
if (drawingModel) drawingModel.value = initialAiSettings.model || "";
if (cloudEmail) cloudEmail.value = initialUiState.cloudEmail || "";
if (cloudPassword) cloudPassword.value = initialUiState.rememberCloudLogin ? (initialUiState.cloudPassword || "") : "";
if (rememberCloudLogin) rememberCloudLogin.checked = Boolean(initialUiState.rememberCloudLogin);

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeWarehouseStatus(status, trackingNo = "") {
  if (status === "已到仓" || status === "已出库") return "已入库";
  if (warehouseStatuses.includes(status)) return status;
  return trackingNo ? "运输中" : "待采购";
}

function isWarehouseInboundStatus(status) {
  return status === "已入库" || status === "已到仓" || status === "已出库";
}

function fmtMoney(value) {
  const currency = state?.currency || "PHP";
  return new Intl.NumberFormat(currencyLocales[currency] || "en-US", {
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(number(value));
}

function pct(value) {
  return `${(number(value) * 100).toFixed(2)}%`;
}

function percentInputValue(value) {
  const percent = number(value);
  if (!percent) return "";
  return Number((percent * 100).toFixed(4));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function selectOptions(items, selected) {
  return items.map((item) => {
    const value = typeof item === "string" ? item : item.id;
    const label = typeof item === "string" ? item : item.name;
    return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(bilingualName(label))}</option>`;
  }).join("");
}

function bilingualName(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.includes(" / ")) return text;
  const row = (state?.translations || []).find((item) => item.zh === text || item.en === text);
  if (row?.en && row.en !== text) return `${text} / ${row.en}`;
  const matched = (state?.translations || [])
    .filter((item) => item.zh && item.en && text.includes(item.zh))
    .sort((a, b) => b.zh.length - a.zh.length)
    .slice(0, 3);
  if (!matched.length) return text;
  return `${text} / ${matched.map((item) => item.en).join(", ")}`;
}

function bilingualText(value) {
  return escapeHtml(bilingualName(value));
}

function accountSelectOptions(selected) {
  return state.accounts
    .filter((account) => account.status !== "关闭" || account.id === selected)
    .map((account) => `<option value="${escapeHtml(account.id)}" ${account.id === selected ? "selected" : ""}>${bilingualText(account.name)}${account.status === "关闭" ? "（关闭）" : ""}</option>`)
    .join("");
}

function firstEnabledAccountId() {
  return state.accounts.find((account) => account.status !== "关闭")?.id || state.accounts[0]?.id || "";
}

function newRecordAccountId() {
  const selected = state.accounts.find((account) => account.id === accountFilter.value);
  return selected && selected.status !== "关闭" ? selected.id : firstEnabledAccountId();
}

function subprojectName(id) {
  return state.subprojects.find((item) => item.id === id)?.name || "未选择分包";
}

function normalizeImages(images) {
  return Array.isArray(images)
    ? images.filter((item) => item?.src).map((item) => ({
      id: item.id || makeId(),
      name: item.name || "图片",
      src: item.src,
      addedAt: item.addedAt || new Date().toLocaleString("zh-CN", { hour12: false }),
    }))
    : [];
}

function normalizeDrawingImages(report) {
  const images = normalizeImages(report.images);
  if (!images.length && report.image) return [{ id: makeId(), name: report.fileName || report.title || "图纸", src: report.image }];
  return images;
}

function normalizeProfitShares(shares) {
  return Array.isArray(shares)
    ? shares.map((item) => ({
      id: item.id || makeId(),
      name: item.name || "分红人",
      percent: number(item.percent),
      note: item.note || "",
    }))
    : [];
}

function manualOrBlank(value) {
  return value === "" || value === null || value === undefined ? "" : number(value);
}

function imagesCell(scope, index, images = [], locked = false, field = "images") {
  const list = normalizeImages(images);
  return `
    <div class="image-cell">
      <div class="thumb-list">
        ${list.map((image, imageIndex) => `
          <span class="thumb-item">
            <button class="thumb-button" type="button" data-image-preview="${scope}" data-image-index="${index}" data-image-field="${field}" data-image-photo="${imageIndex}" title="${escapeHtml(image.name)}">
              <img src="${image.src}" alt="${escapeHtml(image.name)}" />
            </button>
            ${locked ? "" : `<button class="thumb-remove" type="button" data-image-remove="${scope}" data-image-index="${index}" data-image-field="${field}" data-image-photo="${imageIndex}" title="删除图片">×</button>`}
          </span>
        `).join("")}
      </div>
      ${locked ? '<span class="muted">同步</span>' : `
        <label class="image-upload">
          上传
          <input type="file" accept="image/*" multiple data-image-upload="${scope}" data-image-index="${index}" data-image-field="${field}" />
        </label>
      `}
    </div>
  `;
}

function getImageTarget(scope, index) {
  const collections = {
    project: state.projects,
    account: state.accounts,
    progress: state.progress,
    entry: state.entries,
    subledger: state.subLedgers,
    check: state.bankChecks,
  };
  return collections[scope]?.[Number(index)];
}

function closeImageModal() {
  imageModal.classList.remove("active");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.removeAttribute("src");
  imageModalName.textContent = "";
}

function openImageModal(image) {
  imageModalImg.src = image.src;
  imageModalName.textContent = image.name || "凭证图片";
  imageModal.classList.add("active");
  imageModal.setAttribute("aria-hidden", "false");
}

function resizeImage(dataUrl, maxSide = 560, quality = 0.55) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const src = await resizeImage(String(reader.result || ""));
      resolve({
        id: makeId(),
        name: file.name || "图片",
        src,
        addedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function shouldCompactImage(image) {
  return typeof image?.src === "string" && image.src.startsWith("data:image/") && image.src.length > 120000;
}

async function compactImage(image) {
  if (!shouldCompactImage(image)) return image;
  const src = await resizeImage(image.src, 560, 0.55);
  return src.length < image.src.length ? { ...image, src, compactedAt: new Date().toLocaleString("zh-CN", { hour12: false }) } : image;
}

async function compactImageList(list) {
  if (!Array.isArray(list) || !list.some(shouldCompactImage)) return { list, changed: false };
  const next = await Promise.all(list.map(compactImage));
  return {
    list: next,
    changed: next.some((image, index) => image?.src !== list[index]?.src),
  };
}

async function compactObjectImages(item, fields = ["images"]) {
  if (!item || typeof item !== "object") return false;
  let changed = false;
  for (const field of fields) {
    const result = await compactImageList(item[field]);
    if (result.changed) {
      item[field] = result.list;
      changed = true;
    }
  }
  return changed;
}

async function compactStoredImages() {
  let changed = false;
  const collections = [
    ["projects", ["contractImages"]],
    ["accounts", ["images"]],
    ["entries", ["images"]],
    ["progress", ["images"]],
    ["subLedgers", ["images"]],
    ["bankChecks", ["images"]],
    ["warehouseItems", ["images"]],
    ["warehouseOutbounds", ["images"]],
  ];
  for (const [key, fields] of collections) {
    const rows = Array.isArray(state[key]) ? state[key] : [];
    for (const row of rows) {
      if (await compactObjectImages(row, fields)) changed = true;
    }
  }
  for (const report of Array.isArray(state.aiReports) ? state.aiReports : []) {
    if (shouldCompactImage({ src: report.image })) {
      const image = await compactImage({ src: report.image });
      if (image.src !== report.image) {
        report.image = image.src;
        changed = true;
      }
    }
  }
  for (const report of Array.isArray(state.drawingReports) ? state.drawingReports : []) {
    if (shouldCompactImage({ src: report.image })) {
      const image = await compactImage({ src: report.image });
      if (image.src !== report.image) {
        report.image = image.src;
        changed = true;
      }
    }
    if (await compactObjectImages(report, ["images"])) changed = true;
  }
  return changed;
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsText(file, "utf-8");
  });
}

const PDF_PREVIEW_PAGE_LIMIT = 3;
const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";
const SHEETJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
let pdfJsLoading = null;
let sheetJsLoading = null;

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfJsLoading) return pdfJsLoading;
  pdfJsLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import * as pdfjsLib from "${PDFJS_URL}";
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
      window.pdfjsLib = pdfjsLib;
      window.dispatchEvent(new Event("pdfjs-ready"));
    `;
    const timer = setTimeout(() => reject(new Error("PDF解析库加载超时。")), 15000);
    window.addEventListener("pdfjs-ready", () => {
      clearTimeout(timer);
      resolve(window.pdfjsLib);
    }, { once: true });
    script.onerror = () => {
      clearTimeout(timer);
      reject(new Error("PDF解析库加载失败。"));
    };
    document.head.appendChild(script);
  });
  return pdfJsLoading;
}

function loadSheetJs() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (sheetJsLoading) return sheetJsLoading;
  sheetJsLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SHEETJS_URL;
    script.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error("Excel解析库加载失败。"));
    script.onerror = () => reject(new Error("Excel解析库加载失败，请检查网络。"));
    document.head.appendChild(script);
  });
  return sheetJsLoading;
}

function extractPdfReadableText(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  const chunks = [];
  binary.replace(/\(([^()]{2,300})\)/g, (_, text) => {
    const cleaned = text.replace(/\\([()\\])/g, "$1").replace(/\\n|\\r|\\t/g, " ").trim();
    if (/[A-Za-z]{3}/.test(cleaned)) chunks.push(cleaned);
    return "";
  });
  binary.replace(/<([0-9A-Fa-f\s]{6,600})>/g, (_, hex) => {
    const clean = hex.replace(/\s+/g, "");
    let text = "";
    for (let index = 0; index < clean.length; index += 2) {
      const code = parseInt(clean.slice(index, index + 2), 16);
      if (code >= 32 && code <= 126) text += String.fromCharCode(code);
    }
    if (/[A-Za-z]{3}/.test(text)) chunks.push(text.trim());
    return "";
  });
  return [...new Set(chunks)].join("\n").slice(0, 12000);
}

async function readPdfDrawingFile(file) {
  const buffer = await file.arrayBuffer();
  const rawText = extractPdfReadableText(buffer);
  try {
    const pdfjsLib = await loadPdfJs();
    const pdf = await pdfjsLib.getDocument({ data: buffer.slice(0) }).promise;
    const pageCount = Math.min(pdf.numPages, PDF_PREVIEW_PAGE_LIMIT);
    const images = [];
    for (let pageNo = 1; pageNo <= pageCount; pageNo += 1) {
      const page = await pdf.getPage(pageNo);
      const viewport = page.getViewport({ scale: 1.05 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const context = canvas.getContext("2d");
      await page.render({ canvasContext: context, viewport }).promise;
      images.push({
        id: makeId(),
        name: `${file.name} 第${pageNo}页`,
        src: canvas.toDataURL("image/jpeg", 0.58),
        addedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      });
    }
    return { fileType: "PDF", pageCount, totalPages: pdf.numPages, images, rawText };
  } catch (error) {
    if (!rawText) throw error;
    return { fileType: "PDF", pageCount: 0, totalPages: 0, images: [], rawText };
  }
}

function bindImageControls() {
  document.querySelectorAll("[data-image-upload]").forEach((input) => {
    if (input.dataset.imageBound) return;
    input.dataset.imageBound = "1";
    input.addEventListener("change", async () => {
      const target = getImageTarget(input.dataset.imageUpload, input.dataset.imageIndex);
      const field = input.dataset.imageField || "images";
      if (!target || !input.files?.length) return;
      const existing = normalizeImages(target[field]);
      if (existing.length + input.files.length > 4) {
        alert("每条记录最多上传 4 张图片。");
        input.value = "";
        return;
      }
      const images = await Promise.all([...input.files].filter((file) => file.type.startsWith("image/")).map(readImageFile));
      target[field] = [...existing, ...images];
      if (input.dataset.imageUpload === "entry") syncEntryToSubLedger(Number(input.dataset.imageIndex));
      saveState("上传图片");
      renderAll();
    });
  });
  document.querySelectorAll("[data-image-preview]").forEach((button) => {
    if (button.dataset.imageBound) return;
    button.dataset.imageBound = "1";
    button.addEventListener("click", () => {
      const target = getImageTarget(button.dataset.imagePreview, button.dataset.imageIndex);
      const image = normalizeImages(target?.[button.dataset.imageField || "images"])[Number(button.dataset.imagePhoto)];
      if (image) openImageModal(image);
    });
  });
  document.querySelectorAll("[data-image-remove]").forEach((button) => {
    if (button.dataset.imageBound) return;
    button.dataset.imageBound = "1";
    button.addEventListener("click", () => {
      if (!confirm("确定删除这张图片吗？")) return;
      const target = getImageTarget(button.dataset.imageRemove, button.dataset.imageIndex);
      const field = button.dataset.imageField || "images";
      if (!target) return;
      target[field] = normalizeImages(target[field]).filter((_, index) => index !== Number(button.dataset.imagePhoto));
      if (button.dataset.imageRemove === "entry") syncEntryToSubLedger(Number(button.dataset.imageIndex));
      saveState("删除图片");
      renderAll();
    });
  });
}

function baseState() {
  const projectId = makeId();
  const accounts = originalData.accounts.map((account) => ({
    id: makeId(),
    name: account.name,
    initial: account.initial,
    status: "启用",
    images: [],
  }));
  const accountByName = new Map(accounts.map((account) => [account.name, account.id]));
  return {
    projects: [{
      id: projectId,
      name: originalData.metrics.projectName || "巴丹 4 层钢结构工程",
      area: originalData.metrics.area,
      unitPrice: originalData.metrics.unitPrice,
      contractAmount: 0,
      advanceReceived: originalData.metrics.advanceReceived,
      marginAmount: "",
      advanceDeductRate: 0.3,
      marginRate: 0.1,
      materialTaxRate: 0.01,
      laborTaxRate: 0.02,
      philippinesRate: 0.06,
      philippinesAdvanceRate: 0.1878,
      budgetMaterial: "",
      budgetLabor: "",
      budgetSubcontract: "",
      budgetOther: "",
      lateReturn: originalData.metrics.lateReturn,
      dividendPool: "",
      profitShares: [],
      contractImages: [],
      settlementStatus: "未结算",
      settlementDate: "",
      settlementProfit: "",
      settlementDividendPool: "",
      settlementDividend: "",
      settlementSharePercent: "",
      settlementRetainedProfit: "",
      settlementPayableIds: [],
      budgetSnapshots: [],
    }],
    accounts,
    currency: "PHP",
    categories: [...defaultCategories],
    usages: [...defaultUsages],
    subUsages: [...defaultSubUsages],
    receivableUnits: [...defaultReceivableUnits],
    payableUnits: [...defaultPayableUnits],
    translations: defaultTranslations.map((item) => ({ id: makeId(), ...item })),
    history: [],
    deletedRecords: [],
    userAccounts: [createDefaultUserAccount()],
    accountAdjustments: [],
    companyDebts: [],
    payables: [],
    bankChecks: [],
    changeOrders: [],
    aiReports: [],
    drawingReports: [],
    materialPlans: [],
    laborRecords: [],
    warehouseItems: [],
    warehouseOutbounds: [],
    subprojects: [],
    subLedgers: [],
    progress: originalData.progress.map((item) => ({
      id: makeId(),
      projectId,
      allocations: [],
      date: "",
      period: item.period,
      amount: item.amount,
      percent: item.percent,
      status: item.status,
      note: "",
      images: [],
    })),
    entries: originalData.entries.map((entry) => ({
      id: makeId(),
      projectId,
      accountId: accountByName.get(entry.account) || accounts[0]?.id || "",
      type: number(entry.amount) < 0 ? "支出" : "收入",
      usage: entry.usage,
      category: entry.category,
      date: entry.date,
      amount: entry.amount,
      note: entry.note,
      images: [],
    })),
  };
}

function emptyState() {
  const projectId = makeId();
  const accountId = makeId();
  return {
    projects: [{
      id: projectId,
      name: "新项目",
      area: 0,
      unitPrice: 0,
      contractAmount: "",
      advanceReceived: "",
      marginAmount: "",
      advanceDeductRate: 0.3,
      marginRate: 0.1,
      materialTaxRate: 0.01,
      laborTaxRate: 0.02,
      philippinesRate: 0.06,
      philippinesAdvanceRate: 0.1878,
      budgetMaterial: "",
      budgetLabor: "",
      budgetSubcontract: "",
      budgetOther: "",
      profitShares: [],
      contractImages: [],
      settlementStatus: "未结算",
      settlementDate: "",
      settlementProfit: "",
      settlementDividend: "",
      settlementSharePercent: "",
      settlementPayableIds: [],
      budgetSnapshots: [],
    }],
    accounts: [{ id: accountId, name: "资金账户", initial: 0, status: "启用", images: [] }],
    currency: state?.currency || "PHP",
    categories: [...defaultCategories],
    usages: [...defaultUsages],
    subUsages: [...defaultSubUsages],
    receivableUnits: [...defaultReceivableUnits],
    payableUnits: [...defaultPayableUnits],
    translations: defaultTranslations.map((item) => ({ id: makeId(), ...item })),
    history: [],
    deletedRecords: [],
    userAccounts: [createDefaultUserAccount()],
    accountAdjustments: [],
    companyDebts: [],
    payables: [],
    bankChecks: [],
    changeOrders: [],
    aiReports: [],
    drawingReports: [],
    materialPlans: [],
    laborRecords: [],
    warehouseItems: [],
    warehouseOutbounds: [],
    subprojects: [],
    subLedgers: [],
    progress: [],
    entries: [],
  };
}

function loadState() {
  let savedState = null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) savedState = JSON.parse(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  const refreshBackup = loadRefreshBackup();
  const lastGoodBackup = loadLastGoodBackup();
  const bestState = recoverableState(savedState, refreshBackup, lastGoodBackup);
  if (bestState && bestState !== savedState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bestState));
    } catch {
      // The page can still render from the temporary backup; saving may fail if storage is full.
    }
  }
  if (bestState) return bestState;
  return baseState();
}

function dataScore(data) {
  if (!data || typeof data !== "object") return 0;
  const listKeys = [
    "projects", "accounts", "accountAdjustments", "companyDebts", "payables",
    "bankChecks", "changeOrders", "aiReports", "drawingReports", "materialPlans",
    "laborRecords", "warehouseItems", "warehouseOutbounds", "subprojects",
    "subLedgers", "progress", "entries", "deletedRecords",
  ];
  let score = 0;
  listKeys.forEach((key) => {
    if (Array.isArray(data[key])) score += data[key].length * (key === "history" ? 0.2 : 1);
  });
  if (Array.isArray(data.history)) score += Math.min(data.history.length, 50) * 0.05;
  const imageKeys = ["images", "contractImages"];
  listKeys.forEach((key) => {
    (Array.isArray(data[key]) ? data[key] : []).forEach((item) => {
      imageKeys.forEach((field) => {
        if (Array.isArray(item?.[field])) score += item[field].length * 0.5;
      });
    });
  });
  return score;
}

function recoverableState(savedState, refreshBackup, lastGoodBackup) {
  const savedScore = dataScore(savedState);
  const refreshScore = dataScore(refreshBackup);
  const lastGoodScore = dataScore(lastGoodBackup);
  if (!savedState) {
    if (refreshBackup && refreshScore >= lastGoodScore) return refreshBackup;
    if (lastGoodBackup) return lastGoodBackup;
    return null;
  }
  if (refreshBackup && refreshScore > savedScore) return refreshBackup;
  if (savedScore <= 3 && lastGoodBackup && lastGoodScore > savedScore) return lastGoodBackup;
  return savedState;
}

function loadRefreshBackup() {
  const readers = [
    () => sessionStorage.getItem(REFRESH_BACKUP_KEY),
    () => localStorage.getItem(REFRESH_BACKUP_KEY),
  ];
  for (const read of readers) {
    try {
      const saved = read();
      if (!saved) continue;
      const backup = JSON.parse(saved);
      if (backup?.data && backup?.app === "finance-program") return backup.data;
    } catch {
      // Ignore broken temporary backups and keep trying other places.
    }
  }
  return null;
}

function loadLastGoodBackup() {
  try {
    const saved = localStorage.getItem(LAST_GOOD_BACKUP_KEY);
    if (!saved) return null;
    const backup = JSON.parse(saved);
    if (backup?.data && backup?.app === "finance-program") return backup.data;
  } catch {
    localStorage.removeItem(LAST_GOOD_BACKUP_KEY);
  }
  return null;
}

function saveLastGoodBackup() {
  try {
    localStorage.setItem(LAST_GOOD_BACKUP_KEY, JSON.stringify({
      app: "finance-program",
      savedAt: new Date().toISOString(),
      data: dataOnlyState(state),
    }));
  } catch {
    // If the browser is out of space, the normal save warning handles the risk.
  }
}

function saveRefreshBackup() {
  const backup = JSON.stringify({
    app: "finance-program",
    savedAt: new Date().toISOString(),
    data: dataOnlyState(state),
  });
  let saved = false;
  try {
    sessionStorage.setItem(REFRESH_BACKUP_KEY, backup);
    saved = true;
  } catch {
    saved = false;
  }
  try {
    localStorage.setItem(REFRESH_BACKUP_KEY, backup);
    saved = true;
  } catch {
    // Session backup is enough for a normal refresh.
  }
  return saved;
}

function loadUiState() {
  try {
    return JSON.parse(localStorage.getItem(UI_STORAGE_KEY)) || {};
  } catch {
    localStorage.removeItem(UI_STORAGE_KEY);
    return {};
  }
}

function saveUiState(nextUiState) {
  localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({
    ...loadUiState(),
    ...nextUiState,
  }));
}

const uiTranslations = {
  "概况": { en: "Overview", fil: "Pangkalahatan" },
  "预警": { en: "Alerts", fil: "Babala" },
  "日常操作": { en: "Daily Operations", fil: "Pang-araw-araw" },
  "帮助中心": { en: "Help Center", fil: "Help Center" },
  "使用说明": { en: "User Guide", fil: "Gabay sa Paggamit" },
  "待办": { en: "Tasks", fil: "Gawain" },
  "账号": { en: "Users", fil: "Account" },
  "记录": { en: "Records", fil: "Talaan" },
  "系统": { en: "System", fil: "Sistema" },
  "工作台": { en: "Workbench", fil: "Workbench" },
  "项目管理": { en: "Project Management", fil: "Pamamahala ng Proyekto" },
  "财务管理": { en: "Finance Management", fil: "Pamamahala ng Pananalapi" },
  "采购成本": { en: "Procurement & Cost", fil: "Bili at Gastos" },
  "智能报表": { en: "AI & Reports", fil: "AI at Ulat" },
  "系统设置": { en: "System Settings", fil: "Setting ng Sistema" },
  "项目": { en: "Projects", fil: "Proyekto" },
  "工程材料": { en: "Materials", fil: "Materyales" },
  "工程成本": { en: "Cost Control", fil: "Gastos" },
  "财务": { en: "Finance", fil: "Pananalapi" },
  "银行支票": { en: "Bank Checks", fil: "Tseke sa Bangko" },
  "股份分红": { en: "Dividends", fil: "Dibidendo" },
  "应收款": { en: "Receivables", fil: "Sisingilin" },
  "应付款": { en: "Payables", fil: "Babayaran" },
  "豆包AI": { en: "Doubao AI", fil: "Doubao AI" },
  "图纸分析": { en: "Drawing Analysis", fil: "Pagsuri ng Drawing" },
  "项目总览": { en: "Project Overview", fil: "Buod ng Proyekto" },
  "功能说明 / 常用流程 / 注意事项": { en: "Feature guide / common workflow / notes", fil: "Gabay / workflow / paalala" },
  "项目财务系统使用说明": { en: "Project finance system guide", fil: "Project finance system guide" },
  "云端同步": { en: "Cloud Sync", fil: "Cloud Sync" },
  "备份恢复": { en: "Backup & Restore", fil: "Backup & Restore" },
  "建议日常使用顺序": { en: "Recommended daily workflow", fil: "Rekomendadong workflow" },
  "进入日常操作": { en: "Go to Daily Operations", fil: "Pumunta sa Daily Operations" },
  "采购建议有什么用": { en: "What procurement advice is for", fil: "Para saan ang procurement advice" },
  "推荐流程": { en: "Recommended Process", fil: "Rekomendadong Proseso" },
  "风险预警": { en: "Risk Alerts", fil: "Babala sa Risk" },
  "待办事项": { en: "To-do", fil: "Gawain" },
  "变更签证": { en: "Change Orders", fil: "Change Orders" },
  "分包管理": { en: "Subcontracts", fil: "Subcontracts" },
  "收支流水": { en: "Income / Expense", fil: "Kita / Gastos" },
  "应收台账": { en: "Receivables", fil: "Sisingilin" },
  "应付台账": { en: "Payables", fil: "Babayaran" },
  "资金核对": { en: "Cash Check", fil: "Cash Check" },
  "清单识别": { en: "List Recognition", fil: "List Recognition" },
  "账号权限": { en: "Users & Roles", fil: "Users at Roles" },
  "接口开关": { en: "Interface Switches", fil: "Interface Switches" },
  "管理员可开启或关闭外部接口；关闭后按钮不可使用": { en: "Admin can enable or disable external interfaces; disabled buttons cannot be used", fil: "Admin lang ang puwedeng mag-on/off ng external interfaces" },
  "豆包采购清单识别": { en: "Doubao Purchase List Recognition", fil: "Doubao Purchase List Recognition" },
  "图片采购清单翻译、识别并生成报告": { en: "Translate and recognize purchase list images, then create reports", fil: "Translate at recognize purchase list image" },
  "OpenAI备用识别": { en: "OpenAI Backup Recognition", fil: "OpenAI Backup Recognition" },
  "备用图片识别接口，需要单独 API Key": { en: "Backup image recognition, requires separate API Key", fil: "Backup image recognition, kailangan ng API Key" },
  "豆包图纸分析": { en: "Doubao Drawing Analysis", fil: "Doubao Drawing Analysis" },
  "图片/PDF图纸辅助识别、翻译和材料线索": { en: "Image/PDF drawing recognition, translation, and material clues", fil: "Image/PDF drawing recognition at material clues" },
  "项目总表": { en: "Project List", fil: "Listahan ng Proyekto" },
  "资金账户": { en: "Cash Accounts", fil: "Account ng Pondo" },
  "资金流水核对": { en: "Cashflow Check", fil: "Suri ng Daloy ng Pera" },
  "银行支票记录": { en: "Bank Check Records", fil: "Talaan ng Tseke" },
  "盈利股份分红": { en: "Profit Dividends", fil: "Dibidendo ng Kita" },
  "应收款台账": { en: "Receivable Ledger", fil: "Talaan ng Sisingilin" },
  "应付款台账": { en: "Payable Ledger", fil: "Talaan ng Babayaran" },
  "账号管理": { en: "User Management", fil: "Pamamahala ng Account" },
  "分包项目管理": { en: "Subcontract Management", fil: "Pamamahala ng Subcontract" },
  "工程变更签证": { en: "Change Orders", fil: "Pagbabago sa Trabaho" },
  "项目收支流水": { en: "Project Ledger", fil: "Talaan ng Kita/Gastos" },
  "材料采购与库存": { en: "Materials & Inventory", fil: "Materyales at Imbentaryo" },
  "工程成本核算": { en: "Cost Accounting", fil: "Pagtutuos ng Gastos" },
  "查询统计": { en: "Reports", fil: "Ulat" },
  "修改记录": { en: "Change History", fil: "Kasaysayan ng Pagbabago" },
  "常用录入集中入口": { en: "Common entry shortcuts", fil: "Mga madalas gamitin na entry" },
  "财务流水": { en: "Finance Entries", fil: "Talaan ng Pananalapi" },
  "收支、账户调整、进度款入账": { en: "Income, expenses, account adjustments, progress payments", fil: "Kita, gastos, adjustment, progress payment" },
  "应收应付": { en: "Receivable / Payable", fil: "Sisingilin / Babayaran" },
  "客户未收款、供应商未付款、支票": { en: "Customer receivables, supplier payables, checks", fil: "Sisingilin, babayaran, tseke" },
  "材料仓库": { en: "Warehouse", fil: "Bodega" },
  "采购入库、材料领用、材料计划": { en: "Purchases, material issue, material plan", fil: "Bili, labas ng materyal, plano" },
  "项目现场": { en: "Site Work", fil: "Trabaho sa Site" },
  "分包、签证、人工成本": { en: "Subcontract, changes, labor cost", fil: "Subcontract, pagbabago, labor" },
  "新增收支流水": { en: "Add Ledger Entry", fil: "Magdagdag ng Entry" },
  "新增进度款": { en: "Add Progress Payment", fil: "Magdagdag ng Progress Payment" },
  "账户调整": { en: "Account Adjustment", fil: "Adjustment ng Account" },
  "新增应收": { en: "Add Receivable", fil: "Magdagdag ng Sisingilin" },
  "新增应付": { en: "Add Payable", fil: "Magdagdag ng Babayaran" },
  "新增支票": { en: "Add Check", fil: "Magdagdag ng Tseke" },
  "新增采购入库": { en: "Add Purchase Inbound", fil: "Magdagdag ng Pasok sa Bodega" },
  "新增材料领用": { en: "Add Material Issue", fil: "Magdagdag ng Labas Materyal" },
  "新增材料计划": { en: "Add Material Plan", fil: "Magdagdag ng Plano Materyal" },
  "新增分包流水": { en: "Add Subcontract Entry", fil: "Magdagdag ng Subcontract Entry" },
  "新增工程变更": { en: "Add Change Order", fil: "Magdagdag ng Change Order" },
  "新增人工记录": { en: "Add Labor Record", fil: "Magdagdag ng Labor Record" },
  "查看收支流水": { en: "View Ledger", fil: "Tingnan ang Ledger" },
  "查看仓库记录": { en: "View Warehouse", fil: "Tingnan ang Bodega" },
  "查看应收款": { en: "View Receivables", fil: "Tingnan Sisingilin" },
  "查看应付款": { en: "View Payables", fil: "Tingnan Babayaran" },
  "查看资金核对": { en: "View Cash Check", fil: "Tingnan Cash Check" },
  "查看银行支票": { en: "View Checks", fil: "Tingnan Tseke" },
  "今天录入": { en: "Today Entries", fil: "Entry Ngayon" },
  "未收款": { en: "Uncollected", fil: "Hindi Pa Nasingil" },
  "未付款": { en: "Unpaid", fil: "Hindi Pa Bayad" },
  "低库存": { en: "Low Stock", fil: "Mababang Stock" },
  "日期": { en: "Date", fil: "Petsa" },
  "类型": { en: "Type", fil: "Uri" },
  "说明": { en: "Description", fil: "Paliwanag" },
  "金额": { en: "Amount", fil: "Halaga" },
  "查看": { en: "Open", fil: "Buksan" },
  "打开": { en: "Open", fil: "Buksan" },
  "收支流水": { en: "Ledger Entry", fil: "Ledger Entry" },
  "进度款": { en: "Progress Payment", fil: "Progress Payment" },
  "采购入库": { en: "Purchase Inbound", fil: "Pasok sa Bodega" },
  "材料领用": { en: "Material Issue", fil: "Labas Materyal" },
  "应收": { en: "Receivable", fil: "Sisingilin" },
  "应付": { en: "Payable", fil: "Babayaran" },
  "工程变更": { en: "Change Order", fil: "Change Order" },
  "分包流水": { en: "Subcontract Entry", fil: "Subcontract Entry" },
  "保存": { en: "Save", fil: "I-save" },
  "重置": { en: "Reset", fil: "I-reset" },
  "清空数据": { en: "Clear Data", fil: "Burahin Data" },
  "收起": { en: "Collapse", fil: "Itago" },
  "展开": { en: "Expand", fil: "Buksan" },
  "删除": { en: "Delete", fil: "Tanggalin" },
  "新增账户": { en: "Add Account", fil: "Magdagdag Account" },
  "删除账户": { en: "Delete Account", fil: "Tanggalin Account" },
  "模板": { en: "Template", fil: "Template" },
  "导入": { en: "Import", fil: "Import" },
  "导出": { en: "Export", fil: "Export" },
  "清空": { en: "Clear", fil: "Linisin" },
  "全部项目": { en: "All Projects", fil: "Lahat ng Proyekto" },
  "全部账户": { en: "All Accounts", fil: "Lahat ng Account" },
  "全部用途": { en: "All Uses", fil: "Lahat ng Gamit" },
  "全部状态": { en: "All Status", fil: "Lahat ng Status" },
  "开始日期": { en: "Start Date", fil: "Simula Petsa" },
  "结束日期": { en: "End Date", fil: "Wakas Petsa" },
  "状态": { en: "Status", fil: "Status" },
  "备注": { en: "Note", fil: "Tala" },
  "账户": { en: "Account", fil: "Account" },
  "分类": { en: "Category", fil: "Kategorya" },
  "用途": { en: "Use", fil: "Gamit" },
  "语言": { en: "Language", fil: "Wika" },
  "经营预警": { en: "Business Alerts", fil: "Babala sa Negosyo" },
  "自动检查": { en: "Auto Check", fil: "Auto Check" },
  "进度款收款": { en: "Progress Collection", fil: "Progress Collection" },
  "账户余额": { en: "Account Balance", fil: "Balanse ng Account" },
  "预算控制": { en: "Budget Control", fil: "Kontrol ng Budget" },
  "现金流预测": { en: "Cashflow Forecast", fil: "Taya ng Cashflow" },
  "已结算": { en: "Settled", fil: "Settled" },
  "未结算": { en: "Unsettled", fil: "Hindi Pa Settled" },
  "进行中": { en: "In Progress", fil: "Ginagawa" },
  "完成": { en: "Completed", fil: "Tapos" },
  "计划开始": { en: "Planned", fil: "Plano" },
  "已付清": { en: "Paid", fil: "Bayad Na" },
  "部分付款": { en: "Partly Paid", fil: "Bahagyang Bayad" },
  "逾期": { en: "Overdue", fil: "Lampas Petsa" },
  "已收款": { en: "Collected", fil: "Nasingil Na" },
};

const uiPlaceholders = {
  "搜索项目、账户、分类、备注": { en: "Search project, account, category, note", fil: "Hanapin proyekto, account, kategorya, tala" },
  "搜索应收单位、项目、款项说明、备注": { en: "Search receivable unit, project, description, note", fil: "Hanapin sisingilin, proyekto, paliwanag, tala" },
  "搜索应付单位、项目、款项说明、备注": { en: "Search payable unit, project, description, note", fil: "Hanapin babayaran, proyekto, paliwanag, tala" },
  "搜索项目、账户、分类、用途": { en: "Search project, account, category, use", fil: "Hanapin proyekto, account, kategorya, gamit" },
  "输入备注关键词": { en: "Enter note keyword", fil: "Ilagay keyword ng tala" },
  "搜索材料、供应商、快递单号、领用人、备注": { en: "Search material, supplier, tracking no., receiver, note", fil: "Hanapin materyal, supplier, tracking, tumanggap, tala" },
};

function translateUiText(text, mode) {
  if (!text || mode === "zh") return text;
  const item = uiTranslations[text] || uiPlaceholders[text];
  if (!item) return text;
  if (mode === "zh-en") return `${text} / ${item.en}`;
  return item[mode] || item.en || text;
}

function shouldTranslateNode(node) {
  const parent = node.parentElement;
  if (!parent) return false;
  if (parent.closest("#brandTitle, script, style, textarea")) return false;
  return true;
}

function applyLanguageMode(mode = loadUiState().language || "zh") {
  if (!languageSelect) return;
  languageSelect.value = mode;
  document.documentElement.lang = mode === "fil" ? "fil" : mode === "en" ? "en" : "zh-Hant";
  if (mode === "zh") return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!shouldTranslateNode(node)) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue.trim();
      return uiTranslations[text] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const text = raw.trim();
    node.nodeValue = raw.replace(text, translateUiText(text, mode));
  });
  document.querySelectorAll("[placeholder]").forEach((input) => {
    const original = input.getAttribute("placeholder");
    input.setAttribute("placeholder", translateUiText(original, mode));
  });
  document.querySelectorAll("[title]").forEach((item) => {
    const original = item.getAttribute("title");
    item.setAttribute("title", translateUiText(original, mode));
  });
}

function applyBrandSettings(uiState = loadUiState()) {
  const title = String(uiState.systemTitle || "系统登录").trim() || "系统登录";
  brandTitle.textContent = title;
  loginBrandTitle.textContent = title === "系统登录" ? "项目财务登录" : `${title}登录`;
  const logo = uiState.systemLogo || "";
  const logoHtml = logo
    ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(title)}" />`
    : "¥";
  brandLogoMark.innerHTML = logoHtml;
  loginBrandMark.innerHTML = logoHtml;
}

function saveBrandTitle() {
  const title = String(brandTitle.textContent || "").replace(/\s+/g, " ").trim() || "系统登录";
  saveUiState({ systemTitle: title });
  applyBrandSettings({ ...loadUiState(), systemTitle: title });
}

function resizeBrandLogo(file, done) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const img = new Image();
    img.addEventListener("load", () => {
      const size = 192;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      const scale = Math.min(size / img.width, size / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (size - width) / 2;
      const y = (size - height) / 2;
      ctx.drawImage(img, x, y, width, height);
      done(canvas.toDataURL("image/jpeg", 0.78));
    });
    img.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function changeBrandLogo(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) return alert("请选择Logo图片文件。");
  resizeBrandLogo(file, (logo) => {
    try {
      saveUiState({ systemLogo: logo });
      applyBrandSettings();
    } catch {
      alert("Logo图片保存失败，可能是浏览器本地空间不足。请换一张更小的图片后再试。");
    }
  });
}

function loadAiSettings() {
  try {
    return JSON.parse(localStorage.getItem(AI_SETTINGS_KEY)) || {};
  } catch {
    localStorage.removeItem(AI_SETTINGS_KEY);
    return {};
  }
}

function saveAiSettings(nextSettings) {
  localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify({
    ...loadAiSettings(),
    ...nextSettings,
  }));
}

function loadAuthSession() {
  const raw = localStorage.getItem(AUTH_SESSION_KEY);
  if (!raw) return { userId: "", lastActive: 0 };
  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - number(parsed.lastActive) > AUTH_TIMEOUT_MS) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return { userId: "", lastActive: 0 };
    }
    return { userId: parsed.userId || "", lastActive: number(parsed.lastActive) || Date.now() };
  } catch {
    return { userId: raw, lastActive: Date.now() };
  }
}

function saveAuthSession(userId = currentUserId) {
  if (!userId) return;
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
    userId,
    lastActive: Date.now(),
  }));
}

function logoutCurrentUser(showMessage = false) {
  localStorage.removeItem(AUTH_SESSION_KEY);
  currentUserId = "";
  if (authTimer) clearTimeout(authTimer);
  loginPassword.value = "";
  loginCaptcha.value = "";
  applyLoginState();
  if (showMessage) alert("账号已超过 1 小时没有操作，系统已自动退出。");
}

function scheduleAuthTimeout() {
  if (authTimer) clearTimeout(authTimer);
  const session = loadAuthSession();
  if (!session.userId) return;
  const remaining = AUTH_TIMEOUT_MS - (Date.now() - session.lastActive);
  if (remaining <= 0) {
    logoutCurrentUser(true);
    return;
  }
  authTimer = setTimeout(() => logoutCurrentUser(true), remaining);
}

function refreshAuthActivity() {
  if (!currentUser()) return;
  saveAuthSession();
  scheduleAuthTimeout();
}

function fallbackUser() {
  return state.userAccounts.find((user) => user.status === "启用") || state.userAccounts[0];
}

function currentUser() {
  if (!AUTH_ENABLED) return fallbackUser();
  return state.userAccounts.find((user) => user.id === currentUserId && user.status === "启用");
}

function isAdminUser(user = currentUser()) {
  return Boolean(user && user.role === "管理员");
}

function updateAdminOnlyControls() {
  document.querySelectorAll(".admin-only").forEach((item) => {
    item.hidden = !isAdminUser();
  });
  document.querySelectorAll(".danger-admin-only").forEach((item) => {
    item.hidden = !AUTH_ENABLED || !isAdminUser();
  });
  if (clearAllDataButton) clearAllDataButton.hidden = true;
  updateInterfaceControls();
}

const defaultInterfaceSettings = {
  doubaoVision: true,
  openaiVision: false,
  doubaoDrawing: true,
};

function interfaceSettings() {
  return {
    ...defaultInterfaceSettings,
    ...(loadUiState().interfaces || {}),
  };
}

function interfaceEnabled(key) {
  return Boolean(interfaceSettings()[key]);
}

function saveInterfaceSetting(key, enabled) {
  saveUiState({
    interfaces: {
      ...interfaceSettings(),
      [key]: Boolean(enabled),
    },
  });
}

function updateInterfaceControls() {
  const settings = interfaceSettings();
  document.querySelectorAll("[data-interface-toggle]").forEach((input) => {
    input.checked = Boolean(settings[input.dataset.interfaceToggle]);
    input.disabled = !isAdminUser();
  });
  if (aiProvider) {
    [...aiProvider.options].forEach((option) => {
      if (option.value === "doubao") option.disabled = !settings.doubaoVision;
      if (option.value === "openai") option.disabled = !settings.openaiVision;
    });
    if (aiProvider.value === "doubao" && !settings.doubaoVision) aiProvider.value = settings.openaiVision ? "openai" : "doubao";
    if (aiProvider.value === "openai" && !settings.openaiVision) aiProvider.value = settings.doubaoVision ? "doubao" : "openai";
  }
  if (analyzeAiImageButton) {
    const provider = aiProvider?.value || "doubao";
    analyzeAiImageButton.disabled = provider === "doubao" ? !settings.doubaoVision : !settings.openaiVision;
    analyzeAiImageButton.title = analyzeAiImageButton.disabled ? "接口已关闭，请管理员在账号权限里开启。" : "";
  }
  if (analyzeDrawingImageButton) {
    analyzeDrawingImageButton.disabled = !settings.doubaoDrawing;
    analyzeDrawingImageButton.title = !settings.doubaoDrawing ? "图纸分析接口已关闭，请管理员在账号权限里开启。" : "";
  }
}

function userInitial(user) {
  const name = String(user?.name || user?.username || "用户").trim();
  return name.slice(0, 1).toUpperCase() || "用";
}

function renderCurrentUser(user, loggedIn = Boolean(user)) {
  currentUserBadge.textContent = loggedIn && user ? `欢迎，${user.name || user.username}` : "未登录";
  if (user?.avatar) {
    currentUserAvatar.innerHTML = `<img src="${escapeHtml(user.avatar)}" alt="${escapeHtml(user.name || "头像")}" />`;
  } else {
    currentUserAvatar.textContent = userInitial(user);
  }
  updateAdminOnlyControls();
}

function makeCaptcha() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  captchaText = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  captchaCodeButton.textContent = captchaText;
}

function applyLoginState() {
  if (!AUTH_ENABLED) {
    const user = fallbackUser();
    currentUserId = user?.id || "";
    appShell.classList.remove("auth-locked");
    loginScreen.classList.add("hidden");
    renderCurrentUser(user, Boolean(user));
    return;
  }
  const session = loadAuthSession();
  if (currentUserId && !session.userId) currentUserId = "";
  const user = currentUser();
  const loggedIn = Boolean(user);
  appShell.classList.toggle("auth-locked", !loggedIn);
  loginScreen.classList.toggle("hidden", loggedIn);
  renderCurrentUser(user, loggedIn);
  if (!loggedIn) {
    localStorage.removeItem(AUTH_SESSION_KEY);
    currentUserId = "";
    makeCaptcha();
    setTimeout(() => loginUsername.focus(), 0);
  } else {
    saveAuthSession(user.id);
    scheduleAuthTimeout();
  }
}

function bindLoginControls() {
  if (!AUTH_ENABLED) {
    logoutButton.addEventListener("click", () => alert("当前为测试模式，登录功能已临时关闭。"));
    changePasswordButton.addEventListener("click", changeCurrentPassword);
    manualRefreshButton?.addEventListener("click", manualRefreshApp);
    autoRefreshToggle?.addEventListener("click", toggleAutoRefresh);
    return;
  }
  captchaCodeButton.addEventListener("click", makeCaptcha);
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    const captcha = loginCaptcha.value.trim().toUpperCase();
    const user = state.userAccounts.find((item) => item.username === username);
    if (!user || user.status !== "启用") {
      loginError.textContent = "账号不存在或已停用。";
      makeCaptcha();
      return;
    }
    if (user.password !== password) {
      loginError.textContent = "密码不正确。";
      makeCaptcha();
      return;
    }
    if (captcha !== captchaText) {
      loginError.textContent = "验证码不正确。";
      makeCaptcha();
      return;
    }
    currentUserId = user.id;
    saveAuthSession(currentUserId);
    loginError.textContent = "";
    loginPassword.value = "";
    loginCaptcha.value = "";
    applyLoginState();
    renderAll();
  });
  logoutButton.addEventListener("click", () => {
    logoutCurrentUser();
  });
  changePasswordButton.addEventListener("click", changeCurrentPassword);
  manualRefreshButton?.addEventListener("click", manualRefreshApp);
  autoRefreshToggle?.addEventListener("click", toggleAutoRefresh);
}

async function manualRefreshApp() {
  if (manualRefreshButton) {
    manualRefreshButton.disabled = true;
    manualRefreshButton.textContent = "压缩中";
  }
  const compacted = await compactStoredImages();
  if (compacted) renderAll();
  const backupSaved = saveRefreshBackup();
  if (!backupSaved) {
    exportLocalBackup("紧急备份");
    if (manualRefreshButton) {
      manualRefreshButton.disabled = false;
      manualRefreshButton.textContent = "刷新";
    }
    alert("刷新保护备份失败，通常是图片或数据太多导致浏览器空间不足。系统已自动导出一份紧急备份文件，请先保存好备份，再删除部分大图片后继续。");
    return;
  }
  const stateSaved = saveStateOnly();
  if (!stateSaved) {
    exportLocalBackup("紧急备份");
    if (manualRefreshButton) {
      manualRefreshButton.disabled = false;
      manualRefreshButton.textContent = "刷新";
    }
    alert("当前数据没有真正保存到浏览器，所以已停止刷新。系统已自动导出一份紧急备份文件。请先保存好备份，再删除部分大图片后重试。");
    return;
  }
  if (manualRefreshButton) {
    manualRefreshButton.textContent = "刷新中";
  }
  if (window.location.protocol === "file:") {
    renderAll();
    if (manualRefreshButton) {
      manualRefreshButton.disabled = false;
      manualRefreshButton.textContent = "已刷新";
      setTimeout(() => (manualRefreshButton.textContent = "刷新"), 1200);
    }
    return;
  }
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.update().catch(() => null)));
    }
    window.location.reload();
  } catch {
    window.location.reload();
  }
}

function updateAutoRefreshUi(message = "") {
  if (!autoRefreshToggle || !autoRefreshStatus) return;
  autoRefreshToggle.classList.toggle("active", autoRefreshEnabled);
  autoRefreshToggle.setAttribute("aria-pressed", String(autoRefreshEnabled));
  autoRefreshToggle.textContent = autoRefreshEnabled ? "自动刷新 开" : "自动刷新 20秒";
  autoRefreshStatus.textContent = message || (autoRefreshEnabled ? `${autoRefreshRemaining}秒后刷新` : "已关闭");
}

async function backupBeforeAutoRefresh() {
  const backupSaved = saveRefreshBackup();
  if (!backupSaved) {
    exportLocalBackup("自动刷新前备份");
    throw new Error("自动刷新前备份失败，已导出备份文件。");
  }
  const compacted = await compactStoredImages();
  if (compacted) renderAll();
  const stateSaved = saveStateOnly();
  await saveStateToLocalDisk("auto-refresh");
  if (!stateSaved && !isLocalDiskMode()) {
    exportLocalBackup("自动刷新前备份");
    throw new Error("浏览器保存失败，已停止自动刷新。");
  }
}

async function runAutoRefreshCycle() {
  if (!autoRefreshEnabled) return;
  try {
    updateAutoRefreshUi("正在备份...");
    await backupBeforeAutoRefresh();
    updateAutoRefreshUi("正在刷新...");
    if (window.location.protocol === "file:") {
      renderAll();
    } else {
      window.location.reload();
      return;
    }
    resetAutoRefreshTimers();
  } catch (error) {
    stopAutoRefresh(error.message || "自动刷新已停止");
    alert(error.message || "自动刷新前备份失败，已停止自动刷新。");
  }
}

function resetAutoRefreshTimers() {
  clearInterval(autoRefreshCountdownTimer);
  clearTimeout(autoRefreshTimer);
  if (!autoRefreshEnabled) return updateAutoRefreshUi();
  autoRefreshRemaining = 20;
  updateAutoRefreshUi();
  autoRefreshCountdownTimer = setInterval(() => {
    autoRefreshRemaining = Math.max(0, autoRefreshRemaining - 1);
    updateAutoRefreshUi();
  }, 1000);
  autoRefreshTimer = setTimeout(runAutoRefreshCycle, 20000);
}

function startAutoRefresh() {
  autoRefreshEnabled = true;
  saveUiState({ autoRefreshEnabled: true });
  resetAutoRefreshTimers();
}

function stopAutoRefresh(message = "") {
  autoRefreshEnabled = false;
  saveUiState({ autoRefreshEnabled: false });
  clearInterval(autoRefreshCountdownTimer);
  clearTimeout(autoRefreshTimer);
  autoRefreshRemaining = 20;
  updateAutoRefreshUi(message);
}

function toggleAutoRefresh() {
  if (autoRefreshEnabled) stopAutoRefresh();
  else startAutoRefresh();
}

function bindAuthActivity() {
  if (!AUTH_ENABLED) return;
  ["click", "input", "keydown", "change"].forEach((eventName) => {
    document.addEventListener(eventName, () => refreshAuthActivity(), { passive: true });
  });
  window.addEventListener("focus", () => {
    const session = loadAuthSession();
    if (currentUserId && !session.userId) logoutCurrentUser(true);
    else refreshAuthActivity();
  });
}

function changeCurrentPassword() {
  const user = currentUser();
  if (!user) return alert("请先登录账号。");
  const oldPassword = prompt("请输入当前密码");
  if (oldPassword === null) return;
  if (oldPassword !== user.password) return alert("当前密码不正确。");
  const newPassword = prompt("请输入新密码，至少 6 位");
  if (newPassword === null) return;
  if (newPassword.trim().length < 6) return alert("新密码至少需要 6 位。");
  const confirmPassword = prompt("请再次输入新密码");
  if (confirmPassword === null) return;
  if (newPassword !== confirmPassword) return alert("两次输入的新密码不一致。");
  user.password = newPassword;
  saveState(`修改登录密码：${user.name}`);
  alert("密码已修改，下次登录请使用新密码。");
  renderUserAccounts();
}

function resizeAvatar(file, done) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const img = new Image();
    img.addEventListener("load", () => {
      const size = 160;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
      done(canvas.toDataURL("image/jpeg", 0.82));
    });
    img.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function changeCurrentAvatar(file) {
  const user = currentUser();
  if (!user) return alert("请先登录账号。");
  if (!file) return;
  if (!file.type.startsWith("image/")) return alert("请选择图片文件。");
  resizeAvatar(file, (avatar) => {
    user.avatar = avatar;
    saveState(`修改头像：${user.name}`);
    renderCurrentUser(user, true);
    renderUserAccounts();
  });
}

function clampZoom(value) {
  return Math.min(1.3, Math.max(0.8, Math.round(number(value) * 10) / 10));
}

function applyPageZoom(value) {
  const zoom = clampZoom(value || 1);
  document.documentElement.style.setProperty("--app-zoom", zoom);
  zoomResetButton.textContent = `${Math.round(zoom * 100)}%`;
  zoomOutButton.disabled = zoom <= 0.8;
  zoomInButton.disabled = zoom >= 1.3;
}

function changePageZoom(step) {
  const current = clampZoom(loadUiState().pageZoom || 1);
  const next = clampZoom(current + step);
  applyPageZoom(next);
  saveUiState({ pageZoom: next });
}

function toggleFormulaPanel(button, listSelector) {
  const formulaList = document.querySelector(listSelector);
  const hidden = formulaList.classList.toggle("formula-list-hidden");
  button.classList.toggle("active", !hidden);
}

function applySidebarState(hidden) {
  appShell.classList.toggle("sidebar-hidden", Boolean(hidden));
  if (hidden) {
    closeAllNavPopups();
  }
  sidebarToggle.textContent = hidden ? "☰" : "☷";
  sidebarToggle.title = hidden ? "展开侧边栏" : "缩小侧边栏";
  sidebarToggle.setAttribute("aria-label", hidden ? "展开侧边栏" : "缩小侧边栏");
}

function applySubprojectPanelState(hidden) {
  subprojectPanel.classList.toggle("panel-collapsed", Boolean(hidden));
  toggleSubprojectPanelButton.textContent = hidden ? "展开" : "收起";
  toggleSubprojectPanelButton.title = hidden ? "展开分包项目" : "收起分包项目";
}

function applySubLedgerPanelState(hidden) {
  subLedgerPanel.classList.toggle("panel-collapsed", Boolean(hidden));
  toggleSubLedgerPanelButton.textContent = hidden ? "展开" : "收起";
  toggleSubLedgerPanelButton.title = hidden ? "展开分包流水记录" : "收起分包流水记录";
}

function applyAccountControlsState(hidden) {
  accountControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleAccountControlsButton.textContent = hidden ? "展开" : "收起";
  toggleAccountControlsButton.title = hidden ? "展开公共资金账户上方菜单" : "收起公共资金账户上方菜单";
}

function applyCashflowControlsState(hidden) {
  cashflowControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleCashflowControlsButton.textContent = hidden ? "展开" : "收起";
  toggleCashflowControlsButton.title = hidden ? "展开资金流水上方菜单" : "收起资金流水上方菜单";
}

function applyCheckControlsState(hidden) {
  checkControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleCheckControlsButton.textContent = hidden ? "展开" : "收起";
  toggleCheckControlsButton.title = hidden ? "展开银行支票上方菜单" : "收起银行支票上方菜单";
}

function applyDebtControlsState(hidden) {
  debtControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleDebtControlsButton.textContent = hidden ? "展开" : "收起";
  toggleDebtControlsButton.title = hidden ? "展开应收上方菜单" : "收起应收上方菜单";
}

function applyPayableControlsState(hidden) {
  payableControls.classList.toggle("controls-hidden", Boolean(hidden));
  togglePayableControlsButton.textContent = hidden ? "展开" : "收起";
  togglePayableControlsButton.title = hidden ? "展开应付上方菜单" : "收起应付上方菜单";
}

function applyLedgerControlsState(hidden) {
  ledgerControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleLedgerControlsButton.textContent = hidden ? "展开" : "收起";
  toggleLedgerControlsButton.title = hidden ? "展开项目收支流水上方菜单" : "收起项目收支流水上方菜单";
}

function applyWarehouseControlsState(hidden) {
  warehouseControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleWarehouseControlsButton.textContent = hidden ? "展开" : "收起";
  toggleWarehouseControlsButton.title = hidden ? "展开材料采购与库存上方菜单" : "收起材料采购与库存上方菜单";
}

function applyCostControlsState(hidden) {
  if (!costControls || !toggleCostControlsButton) return;
  costControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleCostControlsButton.textContent = hidden ? "展开" : "收起";
  toggleCostControlsButton.title = hidden ? "展开工程成本上方菜单" : "收起工程成本上方菜单";
}

function applyHistoryControlsState(hidden) {
  historyControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleHistoryControlsButton.textContent = hidden ? "展开" : "收起";
  toggleHistoryControlsButton.title = hidden ? "展开记录上方菜单" : "收起记录上方菜单";
}

function applyAnalysisControlsState(hidden) {
  analysisControls.classList.toggle("controls-hidden", Boolean(hidden));
  toggleAnalysisControlsButton.textContent = hidden ? "展开" : "收起";
  toggleAnalysisControlsButton.title = hidden ? "展开统计上方菜单" : "收起统计上方菜单";
}

function ensureStateShape(input) {
  const next = input || baseState();
  next.currency = next.currency || "PHP";
  next.categories = Array.isArray(next.categories) && next.categories.length ? next.categories : [...defaultCategories];
  next.usages = Array.isArray(next.usages) && next.usages.length ? next.usages : [...defaultUsages];
  next.subUsages = Array.isArray(next.subUsages) && next.subUsages.length ? next.subUsages : [...defaultSubUsages];
  next.receivableUnits = Array.isArray(next.receivableUnits) && next.receivableUnits.length ? next.receivableUnits : [...defaultReceivableUnits];
  next.payableUnits = Array.isArray(next.payableUnits) && next.payableUnits.length ? next.payableUnits : [...defaultPayableUnits];
  const existingTranslations = Array.isArray(next.translations) ? next.translations : [];
  const existingKeys = new Set(existingTranslations.map((item) => String(item.zh || "").trim()).filter(Boolean));
  const missingDefaults = defaultTranslations
    .filter((item) => !existingKeys.has(item.zh))
    .map((item) => ({ id: makeId(), ...item }));
  next.translations = [...existingTranslations, ...missingDefaults].map((item) => ({
    id: item.id || makeId(),
    zh: item.zh || "",
    en: item.en || "",
    group: item.group || "常用",
    note: item.note || "",
  }));
  next.history = Array.isArray(next.history) ? next.history : [];
  next.deletedRecords = Array.isArray(next.deletedRecords) ? next.deletedRecords : [];
  next.userAccounts = (next.userAccounts || [createDefaultUserAccount()]).map((user) => normalizeUserAccount(user));
  next.companyDebts = (next.companyDebts || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    company: item.company || item.debtor || "应收单位",
    title: item.title || item.item || "款项说明",
    amount: number(item.amount),
    received: number(item.received),
    dueDate: item.dueDate || "",
    status: debtStatuses.includes(item.status) ? item.status : debtAutoStatus(item),
    note: item.note || "",
    sourceType: item.sourceType || "",
    sourceProgressId: item.sourceProgressId || "",
  }));
  next.payables = (next.payables || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    company: item.company || item.payee || "应付单位",
    title: item.title || item.item || "款项说明",
    amount: number(item.amount),
    paid: number(item.paid),
    dueDate: item.dueDate || "",
    status: payableStatuses.includes(item.status) ? item.status : payableAutoStatus(item),
    note: item.note || "",
    sourceType: item.sourceType || "",
    sourceProjectSettlementId: item.sourceProjectSettlementId || "",
  }));
  next.companyDebts.forEach((item) => {
    if (item.company && !next.receivableUnits.includes(item.company)) next.receivableUnits.push(item.company);
  });
  next.payables.forEach((item) => {
    if (item.company && !next.payableUnits.includes(item.company)) next.payableUnits.push(item.company);
  });
  next.bankChecks = (next.bankChecks || []).map((item) => ({
    id: item.id || makeId(),
    issueDate: item.issueDate || item.date || "",
    dueDate: item.dueDate || "",
    clearedDate: item.clearedDate || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    accountId: item.accountId || next.accounts?.find((account) => account.status !== "关闭")?.id || next.accounts?.[0]?.id || "",
    checkNo: item.checkNo || item.number || "",
    payee: item.payee || item.company || "收款方",
    purpose: item.purpose || item.title || "支票用途",
    amount: number(item.amount),
    status: checkStatuses.includes(item.status) ? item.status : "已开出",
    note: item.note || "",
    images: normalizeImages(item.images),
  }));
  next.changeOrders = (next.changeOrders || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || new Date().toISOString().slice(0, 10),
    projectId: item.projectId || next.projects?.[0]?.id || "",
    code: item.code || "",
    title: item.title || "工程变更事项",
    type: changeOrderTypes.includes(item.type) ? item.type : (number(item.amount) < 0 ? "减少" : "增加"),
    amount: Math.abs(number(item.amount)),
    status: changeOrderStatuses.includes(item.status) ? item.status : "待确认",
    note: item.note || "",
  }));
  next.aiReports = (next.aiReports || []).map((item) => ({
    id: item.id || makeId(),
    createdAt: item.createdAt || new Date().toLocaleString("zh-CN", { hour12: false }),
    date: item.date || new Date().toISOString().slice(0, 10),
    projectId: item.projectId || "",
    title: item.title || "购买清单报告",
    fileName: item.fileName || "",
    image: item.image || "",
    summary: item.summary || "",
    stats: item.stats || {},
    items: Array.isArray(item.items) ? item.items : [],
    risks: Array.isArray(item.risks) ? item.risks : [],
    rawText: item.rawText || "",
  }));
  next.drawingReports = (next.drawingReports || []).map((item) => ({
    id: item.id || makeId(),
    createdAt: item.createdAt || new Date().toLocaleString("zh-CN", { hour12: false }),
    date: item.date || new Date().toISOString().slice(0, 10),
    projectId: item.projectId || "",
    title: item.title || "图纸分析报告",
    fileName: item.fileName || "",
    image: item.image || "",
    images: normalizeDrawingImages(item),
    fileType: item.fileType || (String(item.fileName || "").toLowerCase().endsWith(".pdf") ? "PDF" : "图片"),
    pageCount: number(item.pageCount),
    summary: item.summary || "",
    stats: item.stats || {},
    quantities: Array.isArray(item.quantities) ? item.quantities : [],
    materialQuantities: Array.isArray(item.materialQuantities) ? item.materialQuantities : [],
    risks: Array.isArray(item.risks) ? item.risks : [],
    suggestions: Array.isArray(item.suggestions) ? item.suggestions : [],
    rawText: item.rawText || "",
  }));
  next.materialPlans = (next.materialPlans || []).map((item) => ({
    id: item.id || makeId(),
    projectId: item.projectId || next.projects?.[0]?.id || "",
    stage: constructionStages.includes(item.stage) ? item.stage : "主体结构",
    materialName: item.materialName || item.name || "建筑材料",
    spec: item.spec || "",
    unit: item.unit || "项",
    budgetQuantity: number(item.budgetQuantity),
    budgetUnitPrice: number(item.budgetUnitPrice),
    supplier: item.supplier || "",
    alertPrice: number(item.alertPrice),
    note: item.note || "",
    sourceType: item.sourceType || "",
    sourceDrawingReportId: item.sourceDrawingReportId || "",
  }));
  next.laborRecords = (next.laborRecords || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    stage: constructionStages.includes(item.stage) ? item.stage : "主体结构",
    team: item.team || "施工班组",
    workType: item.workType || "人工",
    workerCount: number(item.workerCount),
    workDays: number(item.workDays),
    dailyRate: number(item.dailyRate),
    overtimeAmount: number(item.overtimeAmount),
    allowance: number(item.allowance),
    paidAmount: number(item.paidAmount),
    mode: laborCostModes.includes(item.mode) ? item.mode : "计入成本",
    note: item.note || "",
  }));
  next.warehouseItems = (next.warehouseItems || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    stage: constructionStages.includes(item.stage) ? item.stage : "主体结构",
    name: item.name || "建筑材料",
    supplier: item.supplier || "",
    quantity: number(item.quantity),
    outboundQuantity: number(item.outboundQuantity) || (item.status === "已出库" ? number(item.quantity) : 0),
    unitPrice: number(item.unitPrice),
    carrier: warehouseCarriers.includes(item.carrier) ? item.carrier : "未选择",
    trackingNo: item.trackingNo || "",
    status: normalizeWarehouseStatus(item.status, item.trackingNo),
    arrivalDate: item.arrivalDate || "",
    note: item.note || "",
  }));
  next.warehouseOutbounds = (next.warehouseOutbounds || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    projectId: item.projectId || next.projects?.[0]?.id || "",
    itemName: item.itemName || item.name || "建筑材料",
    quantity: number(item.quantity),
    receiver: item.receiver || "",
    note: item.note || "",
    sourceItemId: item.sourceItemId || "",
  }));
  next.warehouseItems.forEach((item) => {
    if ((number(item.outboundQuantity) > 0 || item.status === "已出库") && !next.warehouseOutbounds.some((row) => row.sourceItemId === item.id)) {
      next.warehouseOutbounds.push({
        id: makeId(),
        date: item.arrivalDate || item.date || "",
        projectId: item.projectId,
        itemName: item.name,
        quantity: item.status === "已出库" ? number(item.quantity) : Math.min(number(item.outboundQuantity), number(item.quantity)),
        receiver: "",
        note: "旧领用数量自动转入",
        sourceItemId: item.id,
      });
    }
  });
  next.subprojects = (next.subprojects || []).map((item) => ({
    id: item.id || makeId(),
    projectId: item.projectId || next.projects?.[0]?.id || "",
    name: item.name || "分包项目",
    contractor: item.contractor || "",
    contractAmount: number(item.contractAmount),
    startDate: item.startDate || "",
    endDate: item.endDate || "",
    status: subcontractStatuses.includes(item.status) ? item.status : "进行中",
    note: item.note || "",
  }));
  next.subLedgers = (next.subLedgers || []).map((item) => {
    const type = item.type || (number(item.amount) < 0 ? "付款" : "收款");
    return {
      id: item.id || makeId(),
      sourceEntryId: item.sourceEntryId || "",
      date: item.date || "",
      subprojectId: item.subprojectId || next.subprojects?.[0]?.id || "",
      projectId: item.projectId || next.subprojects?.find((sub) => sub.id === item.subprojectId)?.projectId || next.projects?.[0]?.id || "",
      accountId: item.accountId || next.accounts?.find((account) => account.status !== "关闭")?.id || next.accounts?.[0]?.id || "",
      usage: item.usage || next.subUsages?.[0] || "工程款",
      type,
      amount: signedSubLedgerAmount(item.amount, type),
      note: item.note || "",
      images: normalizeImages(item.images),
    };
  });
  next.entries = (next.entries || []).map((entry) => {
    const type = entry.type || (number(entry.amount) < 0 ? "支出" : "收入");
    return {
      ...entry,
      type,
      amount: signedEntryAmount(entry.amount, type),
      usage: entry.usage || next.usages[0] || "钢结构",
      category: entry.category || next.categories[0] || "其它项目",
      subprojectId: entry.subprojectId || "",
      subUsage: entry.subUsage || next.subUsages?.[0] || "工程款",
      receivableId: entry.receivableId || "",
      payableId: entry.payableId || "",
      date: entry.date || "",
      note: entry.note || "",
      images: normalizeImages(entry.images),
    };
  });
  next.accounts = (next.accounts || []).map((account) => ({
    ...account,
    status: accountStatuses.includes(account.status) ? account.status : "启用",
    images: normalizeImages(account.images),
  }));
  next.accountAdjustments = (next.accountAdjustments || []).map((item) => ({
    id: item.id || makeId(),
    date: item.date || "",
    accountId: item.accountId || next.accounts?.[0]?.id || "",
    type: item.type === "减少" ? "减少" : "增加",
    amount: number(item.amount),
    note: item.note || "",
  }));
  next.projects = (next.projects || []).map((project) => ({
    ...project,
    contractAmount: project.contractAmount === "" || project.contractAmount === null || project.contractAmount === undefined ? "" : number(project.contractAmount),
    advanceReceived: project.advanceReceived === "" || project.advanceReceived === null || project.advanceReceived === undefined ? "" : number(project.advanceReceived),
    marginAmount: project.marginAmount === "" || project.marginAmount === null || project.marginAmount === undefined ? "" : number(project.marginAmount),
    advanceDeductRate: project.advanceDeductRate === 0.19125 ? 0.3 : (project.advanceDeductRate ?? 0.3),
    marginRate: project.marginRate ?? 0.1,
    materialTaxRate: project.materialTaxRate ?? 0.01,
    laborTaxRate: project.laborTaxRate ?? 0.02,
    philippinesRate: project.philippinesRate ?? 0.06,
    philippinesAdvanceRate: project.philippinesAdvanceRate ?? 0.1878,
    budgetMaterial: project.budgetMaterial === "" || project.budgetMaterial === null || project.budgetMaterial === undefined ? "" : number(project.budgetMaterial),
    budgetLabor: project.budgetLabor === "" || project.budgetLabor === null || project.budgetLabor === undefined ? "" : number(project.budgetLabor),
    budgetSubcontract: project.budgetSubcontract === "" || project.budgetSubcontract === null || project.budgetSubcontract === undefined ? "" : number(project.budgetSubcontract),
    budgetOther: project.budgetOther === "" || project.budgetOther === null || project.budgetOther === undefined ? "" : number(project.budgetOther),
    dividendPool: manualOrBlank(project.dividendPool),
    profitShares: normalizeProfitShares(project.profitShares),
    contractImages: normalizeImages(project.contractImages),
    settlementStatus: project.settlementStatus === "已结算" ? "已结算" : "未结算",
    settlementDate: project.settlementDate || "",
    settlementProfit: project.settlementProfit === "" || project.settlementProfit === null || project.settlementProfit === undefined ? "" : number(project.settlementProfit),
    settlementDividendPool: manualOrBlank(project.settlementDividendPool),
    settlementDividend: project.settlementDividend === "" || project.settlementDividend === null || project.settlementDividend === undefined ? "" : number(project.settlementDividend),
    settlementSharePercent: project.settlementSharePercent === "" || project.settlementSharePercent === null || project.settlementSharePercent === undefined ? "" : number(project.settlementSharePercent),
    settlementRetainedProfit: manualOrBlank(project.settlementRetainedProfit),
    settlementPayableIds: Array.isArray(project.settlementPayableIds) ? project.settlementPayableIds : [],
    budgetSnapshots: Array.isArray(project.budgetSnapshots) ? project.budgetSnapshots.map((snapshot) => ({
      id: snapshot.id || makeId(),
      date: snapshot.date || new Date().toISOString().slice(0, 10),
      time: snapshot.time || "",
      name: snapshot.name || "预算版本",
      materialBudget: number(snapshot.materialBudget),
      laborBudget: number(snapshot.laborBudget),
      subcontractBudget: number(snapshot.subcontractBudget),
      otherBudget: number(snapshot.otherBudget),
      totalBudget: number(snapshot.totalBudget),
      actualCost: number(snapshot.actualCost),
      note: snapshot.note || "",
    })) : [],
  }));
  next.progress = (next.progress || []).map((row) => ({
    ...row,
    id: row.id || makeId(),
    allocations: Array.isArray(row.allocations) ? row.allocations : (row.accountId ? [{ accountId: row.accountId, amount: "" }] : []),
    date: row.date || "",
    advanceDeducted: row.advanceDeducted ?? "",
    margin: row.margin ?? "",
    ewtMaterial: row.ewtMaterial ?? "",
    ewtLabor: row.ewtLabor ?? "",
    philippinesTotal: row.philippinesTotal ?? "",
    philippinesDeducted: row.philippinesDeducted ?? "",
    philippinesDeductedNote: row.philippinesDeductedNote || "",
    philippinesPayable: row.philippinesPayable ?? "",
    ourRemaining: row.ourRemaining ?? "",
    images: normalizeImages(row.images),
  }));
  return next;
}

function saveState(action = "修改数据") {
  syncAllUpifDeductReceivables();
  const currentSnapshot = JSON.stringify(dataOnlyState(state));
  if (currentSnapshot !== lastDataSnapshot) {
    state.history.unshift({
      id: makeId(),
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      action,
      deletedSummary: pendingDeletedRecords.map((item) => `${item.type}：${item.name}`),
      before: lastDataSnapshot,
      after: currentSnapshot,
    });
    state.history = state.history.slice(0, 300);
    lastDataSnapshot = currentSnapshot;
  }
  pendingDeletedRecords = [];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveLastGoodBackup();
    scheduleLocalDiskSave(action);
    storageWarningShown = false;
    return true;
  } catch {
    scheduleLocalDiskSave(action);
    showStorageWarning();
    return false;
  }
}

function saveStateOnly() {
  syncAllUpifDeductReceivables();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveLastGoodBackup();
    scheduleLocalDiskSave("auto");
    storageWarningShown = false;
    return true;
  } catch {
    scheduleLocalDiskSave("auto");
    showStorageWarning();
    return false;
  }
}

function showStorageWarning() {
  if (storageWarningShown) return;
  storageWarningShown = true;
  alert("图片或数据太多，浏览器本地保存空间不足。本次修改已暂时显示在页面上，但可能无法保存到浏览器。请删除部分图片后再点击保存。");
}

function cloudStatusText() {
  const cloud = window.FinanceCloud;
  if (!cloud) return "云端脚本未加载";
  const status = cloud.status();
  if (!status.enabled) return "云端同步未开启";
  if (!status.configured) return "请先填写 Supabase 配置";
  if (!status.signedIn) return "未登录云端";
  return `已登录：${status.email || "云端账号"}${status.lastSyncAt ? ` / ${new Date(status.lastSyncAt).toLocaleString("zh-CN", { hour12: false })}` : ""}`;
}

function updateCloudStatus(message = "") {
  if (!cloudSyncStatus) return;
  cloudSyncStatus.textContent = message || cloudStatusText();
}

function saveCloudLoginPreference() {
  const remember = Boolean(rememberCloudLogin?.checked);
  saveUiState({
    rememberCloudLogin: remember,
    cloudEmail: cloudEmail?.value.trim() || "",
    cloudPassword: remember ? (cloudPassword?.value || "") : "",
  });
}

function cloudErrorText(error) {
  const message = String(error?.message || error || "");
  if (/jwt expired|token.*expired|invalid jwt/i.test(message)) {
    return "云端登录已过期，请重新点击“登录云端”，再重新操作。";
  }
  if (/invalid login credentials/i.test(message)) {
    return "邮箱或密码不属于这个 Supabase 项目的 Authentication 用户。请在 Supabase 的 Authentication -> Users 里创建用户，或确认邮箱已验证。";
  }
  return message || "云端操作失败。";
}

function isLocalDiskMode() {
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function setLocalDiskStatus(message = "") {
  if (!localDiskStatus) return;
  localDiskStatus.textContent = message || (isLocalDiskMode() ? "本地硬盘保存可用" : "需用本地保存服务打开");
}

async function localDiskRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }
  if (!response.ok) throw new Error(payload?.message || payload?.error || `本地硬盘保存失败 ${response.status}`);
  return payload;
}

async function saveStateToLocalDisk(reason = "auto") {
  if (!isLocalDiskMode()) {
    setLocalDiskStatus("需用本地保存服务打开");
    return false;
  }
  try {
    await localDiskRequest("/api/local-state", {
      method: "POST",
      body: JSON.stringify({
        app: "finance-program",
        reason,
        savedAt: new Date().toISOString(),
        data: cloneForArchive(dataOnlyState(state)),
      }),
    });
    setLocalDiskStatus(`已保存到硬盘 ${new Date().toLocaleTimeString("zh-CN", { hour12: false })}`);
    return true;
  } catch (error) {
    setLocalDiskStatus("硬盘保存失败");
    return false;
  }
}

let localDiskSaveTimer = null;
function scheduleLocalDiskSave(reason = "auto") {
  if (!isLocalDiskMode()) {
    setLocalDiskStatus("需用本地保存服务打开");
    return;
  }
  clearTimeout(localDiskSaveTimer);
  localDiskSaveTimer = setTimeout(() => {
    saveStateToLocalDisk(reason);
  }, 600);
}

async function loadStateFromLocalDisk() {
  if (!isLocalDiskMode()) return alert("请先用“启动本地硬盘保存.command”打开程序，再从硬盘读取。");
  if (!confirm("确认从本地硬盘读取数据吗？当前页面数据会被硬盘保存的数据替换。")) return;
  return loadStateFromLocalDiskNow(true);
}

async function loadStateFromLocalDiskNow(showAlerts = false) {
  setLocalDiskStatus("正在读取硬盘数据...");
  try {
    const payload = await localDiskRequest("/api/local-state");
    const diskData = payload?.data || payload?.payload || payload;
    if (!diskData || !Array.isArray(diskData.projects) || !Array.isArray(diskData.accounts)) {
      throw new Error("硬盘数据文件格式不正确。");
    }
    state = ensureStateShape({ ...diskData, history: state.history || [], deletedRecords: state.deletedRecords || [] });
    lastDataSnapshot = JSON.stringify(dataOnlyState(state));
    saveStateOnly();
    renderAll();
    setLocalDiskStatus("已从硬盘读取");
  } catch (error) {
    setLocalDiskStatus("读取失败");
    if (showAlerts) alert(`从硬盘读取失败：${error.message}`);
  }
}

async function offerLocalDiskLoadOnStart() {
  if (!isLocalDiskMode()) return;
  try {
    const payload = await localDiskRequest("/api/local-state");
    const diskData = payload?.data || payload?.payload || payload;
    if (!diskData || !Array.isArray(diskData.projects) || !Array.isArray(diskData.accounts)) return;
    if (dataScore(diskData) > dataScore(state) && confirm("检测到本地硬盘里有更多已保存数据，是否读取硬盘数据？")) {
      await loadStateFromLocalDiskNow(true);
    } else {
      setLocalDiskStatus("本地硬盘保存可用");
    }
  } catch {
    setLocalDiskStatus("本地硬盘保存可用");
  }
}

async function cloudLogin() {
  const cloud = window.FinanceCloud;
  if (!cloud?.isConfigured()) return alert("云端同步还没有配置。请先填写 cloud/supabase-config.js 里的 Supabase URL 和 anon key，并把 enabled 改为 true。");
  const email = cloudEmail.value.trim();
  const password = cloudPassword.value;
  if (!email || !password) return alert("请填写 Supabase 登录邮箱和密码。");
  updateCloudStatus("正在登录云端...");
  try {
    await cloud.signIn(email, password);
    saveCloudLoginPreference();
    if (!rememberCloudLogin?.checked) cloudPassword.value = "";
    updateCloudStatus("云端登录成功");
  } catch (error) {
    updateCloudStatus("云端登录失败");
    alert(`云端登录失败：${cloudErrorText(error)}`);
  }
}

async function uploadLocalStateToCloud() {
  const cloud = window.FinanceCloud;
  if (!cloud?.isConfigured()) return alert("云端同步还没有配置。");
  if (!cloud.status().signedIn) return alert("请先登录云端账号。");
  if (!confirm("确认把当前设备的数据上传到云端吗？上传前系统会先备份云端旧数据，然后用当前设备数据覆盖云端主数据。")) return;
  updateCloudStatus("正在备份云端旧数据...");
  try {
    const oldCloudState = await cloud.pullState();
    if (oldCloudState) await cloud.backupState(oldCloudState, "before-upload");
    updateCloudStatus("正在上传当前设备数据...");
    await cloud.pushState(dataOnlyState(state));
    updateCloudStatus("本机数据已上传云端");
    alert("上传完成。云端旧数据已自动备份，手机或其它电脑登录后可以下载同一份数据。");
  } catch (error) {
    updateCloudStatus("上传失败");
    alert(`上传失败：${cloudErrorText(error)}`);
  }
}

async function downloadCloudStateToLocal() {
  const cloud = window.FinanceCloud;
  if (!cloud?.isConfigured()) return alert("云端同步还没有配置。");
  if (!cloud.status().signedIn) return alert("请先登录云端账号。");
  if (!confirm("确认从云端下载数据到当前设备吗？下载前系统会先把当前设备数据备份到云端备份记录，然后再替换为云端主数据。")) return;
  updateCloudStatus("正在下载云端数据...");
  try {
    const cloudState = await cloud.pullState();
    if (!cloudState) return alert("云端还没有数据。请先在一台电脑上传本机数据。");
    updateCloudStatus("正在备份当前设备数据...");
    await cloud.backupState(dataOnlyState(state), "before-download");
    state.history.unshift({
      id: makeId(),
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      action: "从云端下载数据前的本机备份",
      before: lastDataSnapshot,
      after: lastDataSnapshot,
    });
    state = ensureStateShape({ ...state, ...cloudState, history: state.history });
    lastDataSnapshot = JSON.stringify(dataOnlyState(state));
    saveStateOnly();
    renderAll();
    updateCloudStatus("云端数据已下载，当前设备旧数据已备份");
    alert("下载完成。当前设备原来的数据已自动备份到云端备份记录。");
  } catch (error) {
    updateCloudStatus("下载失败");
    alert(`下载失败：${cloudErrorText(error)}`);
  }
}

async function backupCloudState() {
  const cloud = window.FinanceCloud;
  if (!cloud?.isConfigured()) return alert("云端同步还没有配置。");
  if (!cloud.status().signedIn) return alert("请先登录云端账号。");
  updateCloudStatus("正在备份云端...");
  try {
    await cloud.backupState(dataOnlyState(state), "manual");
    updateCloudStatus("云端备份完成");
    alert("云端备份已完成。");
  } catch (error) {
    updateCloudStatus("备份失败");
    alert(`备份失败：${cloudErrorText(error)}`);
  }
}

function exportLocalBackup(prefix = "项目财务完整备份") {
  const backup = {
    app: "finance-program",
    version: 1,
    exportedAt: new Date().toISOString(),
    exportedBy: currentUser?.name || currentUser?.username || "本机用户",
    data: cloneForArchive(dataOnlyState(state)),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${prefix}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function restoreLocalBackupFromFile(file) {
  if (!file) return;
  if (!isAdminUser()) return alert("只有管理员可以恢复备份。");
  if (!confirm("恢复备份会覆盖当前本机数据。建议先导出当前本机备份。确定继续吗？")) {
    restoreLocalBackupInput.value = "";
    return;
  }
  const typed = prompt("如确定恢复，请输入：恢复数据");
  if (typed !== "恢复数据") {
    restoreLocalBackupInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const backupData = parsed?.data || parsed;
      if (!backupData || typeof backupData !== "object" || !Array.isArray(backupData.projects) || !Array.isArray(backupData.accounts)) {
        throw new Error("备份文件格式不正确。");
      }
      const previousSnapshot = JSON.stringify(dataOnlyState(state));
      state = ensureStateShape({ ...backupData, history: state.history || [], deletedRecords: state.deletedRecords || [] });
      state.history.unshift({
        id: makeId(),
        time: new Date().toLocaleString("zh-CN", { hour12: false }),
        date: new Date().toISOString().slice(0, 10),
        action: `从本机备份恢复：${file.name}`,
        before: previousSnapshot,
        after: JSON.stringify(dataOnlyState(state)),
      });
      state.history = state.history.slice(0, 300);
      lastDataSnapshot = JSON.stringify(dataOnlyState(state));
      saveStateOnly();
      try {
        renderAll();
      } catch (renderError) {
        console.error(renderError);
      }
      alert("备份恢复完成。当前只是恢复到本机，如果需要同步到手机，请再点击“上传本机数据”到云端。");
    } catch (error) {
      alert(`恢复失败：${error.message}`);
    } finally {
      restoreLocalBackupInput.value = "";
    }
  });
  reader.readAsText(file);
}

function dataOnlyState(source) {
  const { history, deletedRecords, ...rest } = source || {};
  return rest;
}

function cloneForArchive(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function deletedRecordTitle(type, record) {
  return record?.name
    || record?.title
    || record?.code
    || record?.period
    || record?.itemName
    || record?.username
    || record?.note
    || record?.trackingNo
    || record?.date
    || record?.id
    || type;
}

function archiveDeletedRecords(type, records) {
  const list = (Array.isArray(records) ? records : [records]).filter(Boolean);
  if (!list.length) return;
  const time = new Date().toLocaleString("zh-CN", { hour12: false });
  const date = new Date().toISOString().slice(0, 10);
  const archived = list.map((record) => ({
    id: makeId(),
    time,
    date,
    type,
    name: String(deletedRecordTitle(type, record)),
    data: cloneForArchive(record),
  }));
  state.deletedRecords = [...archived, ...(state.deletedRecords || [])].slice(0, 500);
  pendingDeletedRecords.push(...archived);
}

function projectName(id) {
  return state.projects.find((project) => project.id === id)?.name || "未分项目";
}

function accountName(id) {
  return state.accounts.find((account) => account.id === id)?.name || "未选账户";
}

function activeProjectId() {
  return projectFilter.value || "";
}

function projectBaseContract(project) {
  return number(project?.contractAmount) || (number(project?.area) * number(project?.unitPrice));
}

function projectChangeOrderTotal(projectId) {
  return (state.changeOrders || [])
    .filter((item) => item.projectId === projectId && item.status === "已确认")
    .reduce((sum, item) => sum + (item.type === "减少" ? -Math.abs(number(item.amount)) : Math.abs(number(item.amount))), 0);
}

function projectPendingChangeOrderTotal(projectId) {
  return (state.changeOrders || [])
    .filter((item) => item.projectId === projectId && item.status === "待确认")
    .reduce((sum, item) => sum + (item.type === "减少" ? -Math.abs(number(item.amount)) : Math.abs(number(item.amount))), 0);
}

function projectContract(project) {
  return projectBaseContract(project) + projectChangeOrderTotal(project?.id);
}

function manualOrAuto(value, autoValue) {
  return value === "" || value === null || value === undefined ? autoValue : number(value);
}

function projectAdvanceAmount(project) {
  return manualOrAuto(project.advanceReceived, projectContract(project) * number(project.advanceDeductRate ?? 0.3));
}

function projectMarginAmount(project) {
  return manualOrAuto(project.marginAmount, projectContract(project) * number(project.marginRate ?? 0.1));
}

function projectEwtTotals(projectId) {
  return state.progress
    .filter((row) => row.projectId === projectId)
    .map(progressCalc)
    .reduce((total, row) => {
      total.material += number(row.ewtMaterial);
      total.labor += number(row.ewtLabor);
      return total;
    }, { material: 0, labor: 0 });
}

function displayAmount(value) {
  return Math.abs(number(value));
}

function entryType(entry) {
  return entry?.type || (number(entry?.amount) < 0 ? "支出" : "收入");
}

function signedEntryAmount(value, type) {
  const amount = displayAmount(value);
  return type === "收入" ? amount : -amount;
}

function isSubLedgerExpenseType(type) {
  return type === "付款" || type === "扣款";
}

function signedSubLedgerAmount(value, type) {
  const amount = displayAmount(value);
  return isSubLedgerExpenseType(type) ? -amount : amount;
}

function allPermissionIds() {
  return permissionModules.map((item) => item.id);
}

function createDefaultUserAccount() {
  return {
    id: makeId(),
    name: "管理员",
    username: "admin",
    password: "123456",
    role: "管理员",
    status: "启用",
    phone: "",
    avatar: "",
    note: "默认账号",
    permissions: {
      view: allPermissionIds(),
      edit: allPermissionIds(),
    },
  };
}

function createBlankUserAccount() {
  return {
    id: makeId(),
    name: `新账号 ${state.userAccounts.length + 1}`,
    username: `user${state.userAccounts.length + 1}`,
    password: "123456",
    role: "录入员",
    status: "启用",
    phone: "",
    avatar: "",
    note: "",
    permissions: {
      view: ["overview", "projects", "changeOrders", "progress", "ledger", "analysis"],
      edit: ["projects", "changeOrders", "progress", "ledger"],
    },
  };
}

function normalizeUserAccount(user = {}) {
  const view = Array.isArray(user.permissions?.view) ? user.permissions.view : (user.role === "管理员" ? allPermissionIds() : ["overview", "analysis"]);
  const edit = Array.isArray(user.permissions?.edit) ? user.permissions.edit : (user.role === "管理员" ? allPermissionIds() : []);
  return {
    id: user.id || makeId(),
    name: user.name || "未命名",
    username: user.username || "",
    password: user.password || "123456",
    role: userRoles.includes(user.role) ? user.role : "查看员",
    status: userStatuses.includes(user.status) ? user.status : "启用",
    phone: user.phone || "",
    avatar: user.avatar || "",
    note: user.note || "",
    permissions: {
      view: view.filter((item) => permissionModules.some((module) => module.id === item)),
      edit: edit.filter((item) => permissionModules.some((module) => module.id === item)),
    },
  };
}

function permissionChecks(user, kind, index) {
  const selected = new Set(user.permissions?.[kind] || []);
  return `
    <div class="permission-grid">
      ${permissionModules.map((module) => `
        <label class="permission-check">
          <input type="checkbox" data-user-permission="${index}" data-permission-kind="${kind}" data-permission-module="${module.id}" ${selected.has(module.id) ? "checked" : ""} />
          <span>${escapeHtml(module.name)}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function progressCalc(row) {
  const project = state.projects.find((item) => item.id === row.projectId) || state.projects[0];
  const contractTotal = projectContract(project);
  const percent = number(row.percent) || (contractTotal ? number(row.amount) / contractTotal : 0);
  const amount = manualOrAuto(row.amount, contractTotal * percent);
  const advanceTotal = projectAdvanceAmount(project);
  const advanceAuto = advanceTotal * percent;
  const advanceDeducted = manualOrAuto(row.advanceDeducted, advanceAuto);
  const margin = manualOrAuto(row.margin, amount * number(project.marginRate ?? 0.1));
  const ewtMaterial = manualOrAuto(row.ewtMaterial, 0);
  const ewtLabor = manualOrAuto(row.ewtLabor, 0);
  const ewt = ewtMaterial + ewtLabor;
  const philippinesTotal = manualOrAuto(row.philippinesTotal, amount * number(project.philippinesRate ?? 0.06));
  const philippinesDeducted = manualOrAuto(row.philippinesDeducted, amount * number(project.philippinesAdvanceRate));
  const philippinesPayable = manualOrAuto(row.philippinesPayable, philippinesTotal - philippinesDeducted);
  const formulaRemaining = manualOrAuto(row.ourRemaining, amount - advanceDeducted - margin - ewt - philippinesPayable);
  const allocations = progressAllocations(row, formulaRemaining);
  const ourRemaining = allocations.length ? allocations.reduce((sum, item) => sum + number(item.amount), 0) : formulaRemaining;
  return { ...row, amount, percent, advanceTotal, advanceAuto, advanceDeducted, margin, ewtMaterial, ewtLabor, ewt, philippinesTotal, philippinesDeducted, philippinesPayable, expectedRemaining: formulaRemaining, ourRemaining, allocations };
}

function progressAllocations(row, fallbackAmount) {
  const source = Array.isArray(row.allocations) ? row.allocations : (row.accountId ? [{ accountId: row.accountId, amount: "" }] : []);
  if (!source.length) return [];
  if (source.length === 1 && (source[0].amount === "" || source[0].amount === null || source[0].amount === undefined)) {
    return [{ accountId: source[0].accountId, amount: fallbackAmount }];
  }
  return source.map((item) => ({
    accountId: item.accountId,
    amount: number(item.amount),
  }));
}

function projectAdvanceRecovery(project, projectRows = null) {
  const rows = projectRows || state.progress.filter((row) => row.projectId === project.id).map(progressCalc);
  const advanceTotal = projectAdvanceAmount(project);
  const deducted = rows.reduce((sum, row) => sum + number(row.advanceDeducted), 0);
  const autoDeducted = rows.reduce((sum, row) => sum + number(row.advanceAuto), 0);
  const remaining = Math.max(advanceTotal - deducted, 0);
  return {
    advanceTotal,
    deducted,
    autoDeducted,
    remaining,
    overDeducted: Math.max(deducted - advanceTotal, 0),
  };
}

function allocationSummary(row) {
  const allocations = row.allocations || [];
  return allocations.length
    ? allocations.map((item) => `${accountName(item.accountId)} ${fmtMoney(item.amount)}`).join(" / ")
    : "未分配";
}

function cashflowSourceLabel(source) {
  if (source === "收支总明细") return "项目收支流水";
  if (source === "仓库采购") return "采购入库";
  if (source === "仓库出库") return "材料领用出库";
  return source || "其它";
}

function entrySettlementLabel(entry) {
  const receivable = (state.companyDebts || []).find((item) => item.id === entry.receivableId);
  if (receivable) return `应收：${receivable.company || ""} / ${receivable.title || ""}`.trim();
  const payable = (state.payables || []).find((item) => item.id === entry.payableId);
  if (payable) return `应付：${payable.company || ""} / ${payable.title || ""}`.trim();
  return "";
}

function cashflowRows() {
  const rows = [];
  const selectedProject = projectFilter.value;
  state.accounts.forEach((account) => {
    if (!selectedProject) {
      rows.push({
        id: `initial_${account.id}`,
        date: "",
        projectId: "",
        accountId: account.id,
        source: "初始金额",
        title: "账户初始金额",
        amount: number(account.initial),
        note: "公共资金账户录入",
      });
    }
  });

  state.progress.map(progressCalc).forEach((row) => {
    (row.allocations || []).forEach((allocation, allocationIndex) => {
      rows.push({
        id: `progress_${row.id}_${allocationIndex}`,
        date: row.date || "",
        projectId: row.projectId || "",
        accountId: allocation.accountId || "",
        source: "进度款入账",
        title: row.period || "进度款",
        amount: number(allocation.amount),
        note: `银行入账分配 ${allocationSummary(row)} ${row.note || ""}`.trim(),
      });
    });
  });

  state.entries.forEach((entry) => {
    const settlement = entrySettlementLabel(entry);
    rows.push({
      id: `entry_${entry.id}`,
      date: entry.date || "",
      projectId: entry.projectId || "",
      accountId: entry.accountId || "",
      source: "项目收支流水",
      title: [`${entryType(entry)} / ${entry.category || entry.usage || ""}`, settlement].filter(Boolean).join(" / "),
      amount: number(entry.amount),
      note: entry.note || "",
    });
  });

  (state.bankChecks || []).filter((item) => item.status === "已兑现").forEach((item) => {
    rows.push({
      id: `check_${item.id}`,
      date: item.clearedDate || item.issueDate || "",
      projectId: item.projectId || "",
      accountId: item.accountId || "",
      source: "银行支票",
      title: `支票 ${item.checkNo || ""} / ${item.payee || ""}`.trim(),
      amount: -Math.abs(number(item.amount)),
      note: `${item.purpose || ""} ${item.note || ""}`.trim(),
    });
  });

  state.subLedgers.filter((row) => !row.sourceEntryId).forEach((row) => {
    const subproject = state.subprojects.find((item) => item.id === row.subprojectId);
    rows.push({
      id: `subledger_${row.id}`,
      date: row.date || "",
      projectId: row.projectId || subproject?.projectId || "",
      accountId: row.accountId || "",
      source: "分包流水",
      title: `${row.type || ""} / ${subproject?.name || row.usage || ""}`,
      amount: number(row.amount),
      note: `${row.usage || ""} ${row.note || ""}`.trim(),
    });
  });

  (state.accountAdjustments || []).forEach((item) => {
    const amount = item.type === "减少" ? -Math.abs(number(item.amount)) : Math.abs(number(item.amount));
    rows.push({
      id: `account_adjust_${item.id}`,
      date: item.date || "",
      projectId: "",
      accountId: item.accountId || "",
      source: "账户调整",
      title: item.type === "减少" ? "账户减少" : "账户增加",
      amount,
      note: item.note || "",
    });
  });

  const chronologicalRows = [...rows].sort((a, b) => `${a.date || "0000-00-00"}_${a.id}`.localeCompare(`${b.date || "0000-00-00"}_${b.id}`));
  const accountBalances = new Map();
  chronologicalRows.forEach((row) => {
    const previous = accountBalances.get(row.accountId) || 0;
    const balanceAfter = previous + number(row.amount);
    accountBalances.set(row.accountId, balanceAfter);
    row.balanceAfter = balanceAfter;
  });

  return rows.sort((a, b) => `${b.date || "9999-99-99"}_${b.id}`.localeCompare(`${a.date || "9999-99-99"}_${a.id}`));
}

function filteredCashflowRows() {
  const words = queryWords(searchInput.value, cashflowSearch.value);
  const source = cashflowSourceFilter.value;
  const from = cashflowDateFrom.value;
  const to = cashflowDateTo.value;
  return cashflowRows().filter((row) => {
    const text = `${cashflowSourceLabel(row.source)} ${row.title} ${projectName(row.projectId)} ${accountName(row.accountId)} ${row.note}`.toLowerCase();
    const date = row.date || "";
    const sourceMatched = !source
      || row.source === source
      || (source === "项目收支流水" && row.source === "收支总明细");
    return textMatches(text, words)
      && sourceMatched
      && (!from || (date && date >= from))
      && (!to || (date && date <= to))
      && (!projectFilter.value || row.projectId === projectFilter.value)
      && (!accountFilter.value || row.accountId === accountFilter.value);
  });
}

function cashflowAuditIssues() {
  const issues = [];
  const projectIds = new Set(state.projects.map((project) => project.id));
  const accountIds = new Set(state.accounts.map((account) => account.id));
  const entryIds = new Set(state.entries.map((entry) => entry.id));
  const rows = cashflowRows().filter((row) => (!projectFilter.value || row.projectId === projectFilter.value) && (!accountFilter.value || row.accountId === accountFilter.value));
  const calc = calculations();

  calc.accountRows
    .filter((account) => !accountFilter.value || account.id === accountFilter.value)
    .forEach((account) => {
      const rowTotal = rows.filter((row) => row.accountId === account.id).reduce((sum, row) => sum + number(row.amount), 0);
      const diff = rowTotal - number(account.ending);
      if (Math.abs(diff) > 0.01) {
        issues.push(`账户「${account.name}」余额不一致：流水合计 ${fmtMoney(rowTotal)}，当前余额 ${fmtMoney(account.ending)}，差额 ${fmtMoney(diff)}。`);
      }
    });

  state.progress.forEach((progress) => {
    const calcRow = progressCalc(progress);
    if (progress.projectId && !projectIds.has(progress.projectId)) issues.push(`进度款「${progress.period || progress.id}」所属项目不存在。`);
    if (progress.advanceDeducted !== "" && Math.abs(number(progress.advanceDeducted) - number(calcRow.advanceAuto)) > 0.01) {
      issues.push(`进度款「${progress.period || progress.id}」预付款扣回为手动金额：${fmtMoney(progress.advanceDeducted)}，公式应扣 ${fmtMoney(calcRow.advanceAuto)}。`);
    }
    progressAllocations(calcRow, 0).forEach((allocation) => {
      if (!allocation.accountId || !accountIds.has(allocation.accountId)) issues.push(`进度款「${progress.period || progress.id}」入账账户不存在。`);
    });
  });
  state.projects.forEach((project) => {
    const recovery = projectAdvanceRecovery(project);
    if (recovery.overDeducted > 0.01) issues.push(`项目「${project.name}」预付款扣回超出预付总金额：已扣 ${fmtMoney(recovery.deducted)}，预付总额 ${fmtMoney(recovery.advanceTotal)}。`);
  });
  (state.bankChecks || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`银行支票「${row.checkNo || row.payee || row.id}」所属项目不存在。`);
    if (row.accountId && !accountIds.has(row.accountId)) issues.push(`银行支票「${row.checkNo || row.payee || row.id}」银行账户不存在。`);
    if (row.status === "已兑现" && !row.clearedDate) issues.push(`银行支票「${row.checkNo || row.payee || row.id}」已兑现但没有填写兑现日期。`);
  });
  (state.changeOrders || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`工程变更签证「${row.code || row.title || row.id}」所属项目不存在。`);
    if (row.status === "已确认" && number(row.amount) <= 0) issues.push(`工程变更签证「${row.code || row.title || row.id}」已确认但金额为0。`);
  });
  (state.materialPlans || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`材料计划「${row.materialName || row.id}」所属项目不存在。`);
    if (number(row.budgetQuantity) > 0 && number(row.budgetUnitPrice) <= 0) issues.push(`材料计划「${row.materialName || row.id}」已填预算数量，但预算单价为0。`);
  });
  (state.laborRecords || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`人工记录「${row.team || row.id}」所属项目不存在。`);
    if (row.mode !== "仅记录" && laborRecordTotal(row) <= 0) issues.push(`人工记录「${row.team || row.id}」计入成本，但应付工资为0。`);
  });
  (state.warehouseItems || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`采购入库「${row.name || row.id}」所属项目不存在。`);
    if (isWarehouseInboundStatus(row.status) && !row.arrivalDate) issues.push(`采购入库「${row.name || row.id}」状态为已入库，但缺少入库日期。`);
    if (row.status !== "已取消" && number(row.quantity) > 0 && number(row.unitPrice) <= 0) issues.push(`采购入库「${row.name || row.id}」已填数量，但采购单价为0。`);
  });
  const purchaseNames = new Set((state.warehouseItems || []).map((row) => `${row.projectId || ""}__${String(row.name || "").trim().toLowerCase()}`));
  const inventoryMap = new Map();
  (state.warehouseItems || []).forEach((row) => {
    const key = `${row.projectId || ""}__${String(row.name || "").trim().toLowerCase()}`;
    const current = inventoryMap.get(key) || { projectId: row.projectId, name: row.name || "建筑材料", inbound: 0, outbound: 0 };
    if (isWarehouseInboundStatus(row.status)) current.inbound += number(row.quantity);
    inventoryMap.set(key, current);
  });
  (state.warehouseOutbounds || []).forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`材料领用「${row.itemName || row.id}」所属项目不存在。`);
    const key = `${row.projectId || ""}__${String(row.itemName || "").trim().toLowerCase()}`;
    if (!purchaseNames.has(key)) issues.push(`材料领用「${row.itemName || row.id}」没有对应采购入库记录。`);
    const current = inventoryMap.get(key) || { projectId: row.projectId, name: row.itemName || "建筑材料", inbound: 0, outbound: 0 };
    current.outbound += number(row.quantity);
    inventoryMap.set(key, current);
  });
  inventoryMap.forEach((row) => {
    const remaining = number(row.inbound) - number(row.outbound);
    if (remaining < 0) issues.push(`材料库存「${row.name}」领用后库存为负：${remaining}。`);
  });
  state.projects.forEach((project) => {
    const lockedBudget = latestBudgetSnapshot(project);
    if (lockedBudget && number(lockedBudget.totalBudget) > 0) {
      const current = projectBudgetSnapshotValues(project);
      if (current.actualCost > number(lockedBudget.totalBudget)) {
        issues.push(`项目「${project.name}」当前实际成本已超过锁定预算：实际 ${fmtMoney(current.actualCost)}，锁定预算 ${fmtMoney(lockedBudget.totalBudget)}。`);
      }
    }
    if (project.settlementStatus !== "已结算") return;
    const generatedPayables = projectSettlementGeneratedPayables(project);
    const payableTotal = generatedPayables.reduce((sum, row) => sum + number(row.amount), 0);
    if (!generatedPayables.length) issues.push(`项目「${project.name}」已结算，但没有找到自动生成的分红应付记录。`);
    if (project.settlementDividend !== "" && Math.abs(payableTotal - number(project.settlementDividend)) > 0.01) {
      issues.push(`项目「${project.name}」分红应付合计与结算金额不一致：应付 ${fmtMoney(payableTotal)}，结算 ${fmtMoney(project.settlementDividend)}。`);
    }
  });
  state.entries.forEach((entry) => {
    if (entry.projectId && !projectIds.has(entry.projectId)) issues.push(`项目收支流水「${entry.note || entry.id}」所属项目不存在。`);
    if (!entry.accountId || !accountIds.has(entry.accountId)) issues.push(`项目收支流水「${entry.note || entry.id}」资金账户不存在。`);
    if (entry.subprojectId && !state.subLedgers.some((row) => row.sourceEntryId === entry.id)) issues.push(`项目收支流水「${entry.note || entry.id}」已关联分包项目，但没有同步到分包流水。`);
  });
  state.subLedgers.forEach((row) => {
    if (row.projectId && !projectIds.has(row.projectId)) issues.push(`分包流水「${row.note || row.id}」所属项目不存在。`);
    if (!row.accountId || !accountIds.has(row.accountId)) issues.push(`分包流水「${row.note || row.id}」资金账户不存在。`);
    if (row.sourceEntryId && !entryIds.has(row.sourceEntryId)) issues.push(`分包流水「${row.note || row.id}」关联的项目收支流水已不存在。`);
  });

  const sourceGroups = new Map();
  state.subLedgers.filter((row) => row.sourceEntryId).forEach((row) => {
    sourceGroups.set(row.sourceEntryId, [...(sourceGroups.get(row.sourceEntryId) || []), row]);
  });
  sourceGroups.forEach((linkedRows, sourceEntryId) => {
    if (linkedRows.length > 1) issues.push(`项目收支流水同步到分包流水重复：${sourceEntryId} 有 ${linkedRows.length} 条同步记录。`);
    const entry = state.entries.find((item) => item.id === sourceEntryId);
    const linked = linkedRows[0];
    if (entry && linked && (linked.accountId !== entry.accountId || linked.projectId !== entry.projectId || number(linked.amount) !== number(entry.amount))) {
      issues.push(`项目收支流水「${entry.note || entry.id}」与同步分包流水金额、项目或账户不一致。`);
    }
  });

  return [...new Set(issues)];
}

function queryWords(...values) {
  return values.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);
}

function textMatches(text, words) {
  const source = String(text || "").toLowerCase();
  return !words.length || words.every((word) => source.includes(word));
}

function filteredProjects() {
  const words = queryWords(searchInput.value);
  return state.projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) => {
      const text = `${project.name} ${project.area} ${project.unitPrice} ${projectContract(project)} ${projectAdvanceAmount(project)} ${projectMarginAmount(project)} 0.06`;
      return textMatches(text, words) && (!projectFilter.value || project.id === projectFilter.value);
    });
}

function filteredAccounts() {
  const words = queryWords(searchInput.value);
  const accountBalances = new Map(calculations().accountRows.map((account) => [account.id, account]));
  return state.accounts
    .map((account, index) => ({ ...account, index, balance: accountBalances.get(account.id) }))
    .filter((account) => {
      const text = `${account.name} ${account.initial} ${account.balance?.ending ?? ""} ${account.status || "启用"}`;
      return textMatches(text, words) && (!accountFilter.value || account.id === accountFilter.value);
    });
}

function filteredProgressRows() {
  const words = queryWords(searchInput.value);
  return state.progress
    .map((row, index) => ({ ...progressCalc(row), index }))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${allocationSummary(row)} ${row.period} ${row.status} ${row.note}`.toLowerCase();
      const accountMatched = !accountFilter.value || (row.allocations || []).some((item) => item.accountId === accountFilter.value);
      return textMatches(text, words)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && accountMatched;
    });
}

function filteredEntries() {
  const words = queryWords(searchInput.value, ledgerSearch.value);
  const noteQ = noteFilter.value.trim().toLowerCase();
  const from = dateFromFilter.value;
  const to = dateToFilter.value;
  return state.entries
    .map((entry, index) => ({ ...entry, index }))
    .filter((entry) => {
      const subproject = state.subprojects.find((item) => item.id === entry.subprojectId);
      const receivable = state.companyDebts.find((item) => item.id === entry.receivableId);
      const payable = state.payables.find((item) => item.id === entry.payableId);
      const text = `${projectName(entry.projectId)} ${accountName(entry.accountId)} ${entryType(entry)} ${subproject?.name || ""} ${receivable?.company || ""} ${receivable?.title || ""} ${payable?.company || ""} ${payable?.title || ""} ${entry.subUsage || ""} ${entry.usage} ${entry.category} ${entry.note}`.toLowerCase();
      const noteText = String(entry.note || "").toLowerCase();
      const date = entry.date || "";
      return textMatches(text, words)
        && (!noteQ || noteText.includes(noteQ))
        && (!from || date >= from)
        && (!to || date <= to)
        && (!projectFilter.value || entry.projectId === projectFilter.value)
        && (!accountFilter.value || entry.accountId === accountFilter.value)
        && (!usageFilter.value || entry.usage === usageFilter.value);
    });
}

function receivableOptions(selected = "", projectId = "") {
  const rows = (state.companyDebts || []).filter((item) => !projectId || item.projectId === projectId || item.id === selected);
  return `<option value="">不关联应收</option>${rows.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === selected ? "selected" : ""}>${escapeHtml(projectName(item.projectId))} / ${bilingualText(item.company)} / ${bilingualText(item.title)} / 未收 ${fmtMoney(debtBalance(item))}</option>`).join("")}`;
}

function payableOptions(selected = "", projectId = "") {
  const rows = (state.payables || []).filter((item) => !projectId || item.projectId === projectId || item.id === selected);
  return `<option value="">不关联应付</option>${rows.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === selected ? "selected" : ""}>${escapeHtml(projectName(item.projectId))} / ${bilingualText(item.company)} / ${bilingualText(item.title)} / 未付 ${fmtMoney(payableBalance(item))}</option>`).join("")}`;
}

function unitOptions(units, selected) {
  const list = [...new Set([selected, ...(units || [])].filter(Boolean))];
  return list.map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? "selected" : ""}>${bilingualText(name)}</option>`).join("");
}

function ensureUnit(listName, name) {
  const value = String(name || "").trim();
  if (value && !state[listName].includes(value)) state[listName].push(value);
  return value;
}

function debtBalance(row) {
  return number(row.amount) - debtTotalReceived(row);
}

function debtLedgerReceived(id) {
  return state.entries
    .filter((entry) => entry.receivableId === id && number(entry.amount) > 0)
    .reduce((sum, entry) => sum + number(entry.amount), 0);
}

function debtTotalReceived(row) {
  return number(row.received) + debtLedgerReceived(row.id);
}

function debtDisplayStatus(row) {
  const balance = debtBalance(row);
  if (balance <= 0) return "已收清";
  if (row.status === "暂停") return "暂停";
  if (row.dueDate && row.dueDate < new Date().toISOString().slice(0, 10)) return "逾期";
  if (debtTotalReceived(row) > 0) return "部分收款";
  return row.status && row.status !== "已收清" ? row.status : "未收款";
}

function debtAutoStatus(row) {
  const balance = number(row.amount) - number(row.received);
  if (balance <= 0 && number(row.amount) > 0) return "已收清";
  if (number(row.received) > 0) return "部分收款";
  return "未收款";
}

function syncAllUpifDeductReceivables() {
  if (!state || !Array.isArray(state.companyDebts) || !Array.isArray(state.progress)) return;
  const activeProgressIds = new Set(state.progress.map((row) => row.id).filter(Boolean));
  state.companyDebts = state.companyDebts.filter((item) => item.sourceType !== "upifDeduct" || activeProgressIds.has(item.sourceProgressId));
  state.progress.forEach((row) => syncUpifDeductReceivable(row));
}

function syncUpifDeductReceivable(progressRow) {
  if (!progressRow?.id) return;
  const existingIndex = state.companyDebts.findIndex((item) => item.sourceType === "upifDeduct" && item.sourceProgressId === progressRow.id);
  const calc = progressCalc(progressRow);
  const amount = number(calc.philippinesDeducted);
  const note = String(progressRow.philippinesDeductedNote || "").trim();
  if (!note || amount <= 0) {
    if (existingIndex >= 0) state.companyDebts.splice(existingIndex, 1);
    return;
  }
  const existing = existingIndex >= 0 ? state.companyDebts[existingIndex] : null;
  if (!state.receivableUnits.includes("UPIF公司")) state.receivableUnits.push("UPIF公司");
  const next = {
    id: existing?.id || makeId(),
    date: progressRow.date || new Date().toISOString().slice(0, 10),
    projectId: progressRow.projectId || state.projects[0]?.id || "",
    company: "UPIF公司",
    title: `UPIF预扣待收${progressRow.period ? ` - ${progressRow.period}` : ""}`,
    amount,
    received: number(existing?.received),
    dueDate: existing?.dueDate || "",
    status: existing?.status === "暂停" ? "暂停" : debtAutoStatus({ amount, received: number(existing?.received) }),
    note: [
      progressRow.period ? `期次：${progressRow.period}` : "",
      note,
    ].filter(Boolean).join("；"),
    sourceType: "upifDeduct",
    sourceProgressId: progressRow.id,
  };
  if (existingIndex >= 0) {
    state.companyDebts[existingIndex] = next;
  } else {
    state.companyDebts.unshift(next);
  }
}

function createBlankDebt() {
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    company: receivableUnitSelect.value || state.receivableUnits[0] || "应收单位",
    title: "款项说明",
    amount: 0,
    received: 0,
    dueDate: "",
    status: "未收款",
    note: "",
    sourceType: "",
    sourceProgressId: "",
  };
}

function filteredDebts() {
  const words = queryWords(searchInput.value, debtSearch.value);
  const status = debtStatusFilter.value;
  const from = debtDateFrom.value;
  const to = debtDateTo.value;
  return (state.companyDebts || [])
    .map((row, index) => ({ ...row, index, balance: debtBalance(row), displayStatus: debtDisplayStatus(row) }))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${row.company} ${row.title} ${row.status} ${row.displayStatus} ${row.note}`.toLowerCase();
      const date = row.date || "";
      return textMatches(text, words)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && (!status || row.displayStatus === status || row.status === status)
        && (!from || date >= from)
        && (!to || date <= to);
    });
}

function renderDebtReport(rows) {
  const total = rows.reduce((sum, row) => sum + number(row.amount), 0);
  const received = rows.reduce((sum, row) => sum + debtTotalReceived(row), 0);
  const unpaid = rows.reduce((sum, row) => sum + Math.max(debtBalance(row), 0), 0);
  const overdue = rows.filter((row) => row.displayStatus === "逾期").reduce((sum, row) => sum + Math.max(row.balance, 0), 0);
  document.querySelector("#debtReport").innerHTML = `
    <div class="settlement-report">
      ${settlementItem("应收总额", fmtMoney(total))}
      ${settlementItem("已收金额", fmtMoney(received), "positive")}
      ${settlementItem("未收金额", fmtMoney(unpaid), unpaid > 0 ? "warn-text" : "positive")}
      ${settlementItem("逾期金额", fmtMoney(overdue), overdue > 0 ? "negative" : "positive")}
    </div>
  `;
}

function renderUnitManagers() {
  const selectedReceivable = receivableUnitSelect.value;
  const selectedPayable = payableUnitSelect.value;
  receivableUnitSelect.innerHTML = unitOptions(state.receivableUnits, selectedReceivable || state.receivableUnits[0] || "");
  payableUnitSelect.innerHTML = unitOptions(state.payableUnits, selectedPayable || state.payableUnits[0] || "");
  if (state.receivableUnits.includes(selectedReceivable)) receivableUnitSelect.value = selectedReceivable;
  if (state.payableUnits.includes(selectedPayable)) payableUnitSelect.value = selectedPayable;
}

function addUnit(listName, label) {
  const name = prompt(`请输入新的${label}名称：`, "");
  const value = String(name || "").trim();
  if (!value) return;
  if (state[listName].includes(value)) return alert(`${label}已经存在。`);
  state[listName].push(value);
  saveState(`新增${label}：${value}`);
  renderAll();
}

function renameUnit(listName, select, collectionName, label) {
  const oldValue = select.value;
  if (!oldValue) return alert(`请先选择要改名的${label}。`);
  const name = prompt(`修改${label}名称：`, oldValue);
  const newValue = String(name || "").trim();
  if (!newValue || newValue === oldValue) return;
  if (state[listName].includes(newValue)) return alert(`${label}已经存在。`);
  const index = state[listName].indexOf(oldValue);
  if (index >= 0) state[listName][index] = newValue;
  state[collectionName].forEach((row) => {
    if (row.company === oldValue) row.company = newValue;
  });
  saveState(`修改${label}：${oldValue} 改为 ${newValue}`);
  renderAll();
}

function deleteUnit(listName, select, collectionName, label, fallback) {
  const value = select.value;
  if (!value) return alert(`请先选择要删除的${label}。`);
  const used = state[collectionName].some((row) => row.company === value);
  if (used) return alert(`这个${label}已经在记录中使用，请先把相关记录改成其它单位。`);
  if (state[listName].length <= 1) return alert(`至少保留一个${label}。`);
  if (!confirm(`确定删除${label}「${value}」吗？`)) return;
  archiveDeletedRecords(label, { name: value });
  state[listName] = state[listName].filter((item) => item !== value);
  if (!state[listName].length) state[listName].push(fallback);
  saveState(`删除${label}：${value}`);
  renderAll();
}

function renderDebts() {
  const rows = filteredDebts();
  document.querySelector("#debtCount").textContent = `${rows.length} 条`;
  renderDebtReport(rows);
  renderUnitManagers();
  const body = rows.map((row) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-debt="${row.index}" /></td>
      <td><input class="cell-input" data-debt="${row.index}" data-field="date" type="date" value="${escapeHtml(row.date)}" /></td>
      <td><select class="cell-input" data-debt="${row.index}" data-field="projectId">${selectOptions(state.projects, row.projectId)}</select></td>
      <td><select class="cell-input" data-debt="${row.index}" data-field="company">${unitOptions(state.receivableUnits, row.company)}</select></td>
      <td><input class="cell-input wide-note" data-debt="${row.index}" data-field="title" value="${escapeHtml(row.title)}" /></td>
      <td><input class="cell-input num" data-debt="${row.index}" data-field="amount" type="number" step="0.01" min="0" value="${number(row.amount)}" /></td>
      <td><input class="cell-input num" data-debt="${row.index}" data-field="received" type="number" step="0.01" min="0" value="${number(row.received)}" /></td>
      <td class="readonly positive">${fmtMoney(debtLedgerReceived(row.id))}</td>
      <td class="readonly ${row.balance > 0 ? "negative" : "positive"}">${fmtMoney(row.balance)}</td>
      <td><input class="cell-input" data-debt="${row.index}" data-field="dueDate" type="date" value="${escapeHtml(row.dueDate)}" /></td>
      <td>
        <select class="cell-input ${row.displayStatus === "逾期" ? "input-danger" : ""}" data-debt="${row.index}" data-field="status">
          ${selectOptions(debtStatuses, row.displayStatus)}
        </select>
      </td>
      <td><input class="cell-input wide-note" data-debt="${row.index}" data-field="note" value="${escapeHtml(row.note)}" /></td>
    </tr>
  `).join("");
  document.querySelector("#debtTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>项目</th><th>应收单位</th><th>款项说明</th><th class="num">应收</th><th class="num">手动已收</th><th class="num">流水已收</th><th class="num">未收</th><th>到期日</th><th>状态</th><th>备注</th></tr></thead>
    <tbody>${body || `<tr><td colspan="12" class="empty">暂无应收记录</td></tr>`}</tbody>
  `;
  bindDebtInputs();
}

function bindDebtInputs() {
  document.querySelectorAll("[data-debt]").forEach((input) => {
    const updateDebt = () => {
      const index = Number(input.dataset.debt);
      const field = input.dataset.field;
      if (!state.companyDebts[index]) return;
      state.companyDebts[index][field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "company") ensureUnit("receivableUnits", state.companyDebts[index].company);
      if (["amount", "received"].includes(field) && state.companyDebts[index].status !== "暂停") {
        state.companyDebts[index].status = debtAutoStatus(state.companyDebts[index]);
      }
      saveState(`修改应收：${state.companyDebts[index].company || "未命名"}`);
      renderOverview();
      renderAnalysis();
    };
    input.addEventListener("input", updateDebt);
    input.addEventListener("change", updateDebt);
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedDebts() {
  const indexes = selectedIndexes("[data-select-debt]");
  if (!indexes.length) return alert("请先勾选要删除的应收记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条应收记录吗？`)) return;
  const removedIds = new Set(indexes.map((index) => state.companyDebts[index]?.id).filter(Boolean));
  archiveDeletedRecords("应收", indexes.map((index) => state.companyDebts[index]));
  indexes.forEach((index) => state.companyDebts.splice(index, 1));
  state.entries.forEach((entry) => {
    if (removedIds.has(entry.receivableId)) entry.receivableId = "";
  });
  saveState(`删除应收：${indexes.length} 条`);
  renderAll();
}

function payableBalance(row) {
  return number(row.amount) - payableTotalPaid(row);
}

function payableLedgerPaid(id) {
  return state.entries
    .filter((entry) => entry.payableId === id && number(entry.amount) < 0)
    .reduce((sum, entry) => sum + Math.abs(number(entry.amount)), 0);
}

function payableTotalPaid(row) {
  return number(row.paid) + payableLedgerPaid(row.id);
}

function payableDisplayStatus(row) {
  const balance = payableBalance(row);
  if (balance <= 0) return "已付清";
  if (row.status === "暂停") return "暂停";
  if (row.dueDate && row.dueDate < new Date().toISOString().slice(0, 10)) return "逾期";
  if (payableTotalPaid(row) > 0) return "部分付款";
  return row.status && row.status !== "已付清" ? row.status : "未付款";
}

function payableAutoStatus(row) {
  const balance = number(row.amount) - number(row.paid);
  if (balance <= 0 && number(row.amount) > 0) return "已付清";
  if (number(row.paid) > 0) return "部分付款";
  return "未付款";
}

function createBlankPayable() {
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    company: payableUnitSelect.value || state.payableUnits[0] || "应付单位",
    title: "款项说明",
    amount: 0,
    paid: 0,
    dueDate: "",
    status: "未付款",
    note: "",
  };
}

function filteredPayables() {
  const words = queryWords(searchInput.value, payableSearch.value);
  const status = payableStatusFilter.value;
  const from = payableDateFrom.value;
  const to = payableDateTo.value;
  return (state.payables || [])
    .map((row, index) => ({ ...row, index, balance: payableBalance(row), displayStatus: payableDisplayStatus(row) }))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${row.company} ${row.title} ${row.status} ${row.displayStatus} ${row.note}`.toLowerCase();
      const date = row.date || "";
      return textMatches(text, words)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && (!status || row.displayStatus === status || row.status === status)
        && (!from || date >= from)
        && (!to || date <= to);
    });
}

function renderPayableReport(rows) {
  const total = rows.reduce((sum, row) => sum + number(row.amount), 0);
  const paid = rows.reduce((sum, row) => sum + payableTotalPaid(row), 0);
  const unpaid = rows.reduce((sum, row) => sum + Math.max(payableBalance(row), 0), 0);
  const overdue = rows.filter((row) => row.displayStatus === "逾期").reduce((sum, row) => sum + Math.max(row.balance, 0), 0);
  document.querySelector("#payableReport").innerHTML = `
    <div class="settlement-report">
      ${settlementItem("应付总额", fmtMoney(total))}
      ${settlementItem("已付金额", fmtMoney(paid), "positive")}
      ${settlementItem("未付金额", fmtMoney(unpaid), unpaid > 0 ? "warn-text" : "positive")}
      ${settlementItem("逾期金额", fmtMoney(overdue), overdue > 0 ? "negative" : "positive")}
    </div>
  `;
}

function renderPayables() {
  const rows = filteredPayables();
  document.querySelector("#payableCount").textContent = `${rows.length} 条`;
  renderPayableReport(rows);
  renderUnitManagers();
  const body = rows.map((row) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-payable="${row.index}" /></td>
      <td><input class="cell-input" data-payable="${row.index}" data-field="date" type="date" value="${escapeHtml(row.date)}" /></td>
      <td><select class="cell-input" data-payable="${row.index}" data-field="projectId">${selectOptions(state.projects, row.projectId)}</select></td>
      <td><select class="cell-input" data-payable="${row.index}" data-field="company">${unitOptions(state.payableUnits, row.company)}</select></td>
      <td><input class="cell-input wide-note" data-payable="${row.index}" data-field="title" value="${escapeHtml(row.title)}" /></td>
      <td><input class="cell-input num" data-payable="${row.index}" data-field="amount" type="number" step="0.01" min="0" value="${number(row.amount)}" /></td>
      <td><input class="cell-input num" data-payable="${row.index}" data-field="paid" type="number" step="0.01" min="0" value="${number(row.paid)}" /></td>
      <td class="readonly positive">${fmtMoney(payableLedgerPaid(row.id))}</td>
      <td class="readonly ${row.balance > 0 ? "negative" : "positive"}">${fmtMoney(row.balance)}</td>
      <td><input class="cell-input" data-payable="${row.index}" data-field="dueDate" type="date" value="${escapeHtml(row.dueDate)}" /></td>
      <td>
        <select class="cell-input ${row.displayStatus === "逾期" ? "input-danger" : ""}" data-payable="${row.index}" data-field="status">
          ${selectOptions(payableStatuses, row.displayStatus)}
        </select>
      </td>
      <td><input class="cell-input wide-note" data-payable="${row.index}" data-field="note" value="${escapeHtml(row.note)}" /></td>
    </tr>
  `).join("");
  document.querySelector("#payableTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>项目</th><th>应付单位</th><th>款项说明</th><th class="num">应付</th><th class="num">手动已付</th><th class="num">流水已付</th><th class="num">未付</th><th>到期日</th><th>状态</th><th>备注</th></tr></thead>
    <tbody>${body || `<tr><td colspan="12" class="empty">暂无应付记录</td></tr>`}</tbody>
  `;
  bindPayableInputs();
}

function bindPayableInputs() {
  document.querySelectorAll("[data-payable]").forEach((input) => {
    const updatePayable = () => {
      const index = Number(input.dataset.payable);
      const field = input.dataset.field;
      if (!state.payables[index]) return;
      state.payables[index][field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "company") ensureUnit("payableUnits", state.payables[index].company);
      if (["amount", "paid"].includes(field) && state.payables[index].status !== "暂停") {
        state.payables[index].status = payableAutoStatus(state.payables[index]);
      }
      saveState(`修改应付：${state.payables[index].company || "未命名"}`);
      renderOverview();
      renderAnalysis();
    };
    input.addEventListener("input", updatePayable);
    input.addEventListener("change", updatePayable);
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedPayables() {
  const indexes = selectedIndexes("[data-select-payable]");
  if (!indexes.length) return alert("请先勾选要删除的应付记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条应付记录吗？`)) return;
  const removedIds = new Set(indexes.map((index) => state.payables[index]?.id).filter(Boolean));
  archiveDeletedRecords("应付", indexes.map((index) => state.payables[index]));
  indexes.forEach((index) => state.payables.splice(index, 1));
  state.entries.forEach((entry) => {
    if (removedIds.has(entry.payableId)) entry.payableId = "";
  });
  saveState(`删除应付：${indexes.length} 条`);
  renderAll();
}

function createBlankChangeOrder() {
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    code: `CO-${String((state.changeOrders || []).length + 1).padStart(3, "0")}`,
    title: "工程变更事项",
    type: "增加",
    amount: 0,
    status: "待确认",
    note: "",
  };
}

function filteredChangeOrders() {
  const words = queryWords(searchInput.value, changeOrderSearch.value);
  const status = changeOrderStatusFilter.value;
  const from = changeOrderDateFrom.value;
  const to = changeOrderDateTo.value;
  return (state.changeOrders || [])
    .map((row, index) => ({ ...row, index }))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${row.code} ${row.title} ${row.type} ${row.status} ${row.note}`.toLowerCase();
      return textMatches(text, words)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && (!status || row.status === status)
        && (!from || row.date >= from)
        && (!to || row.date <= to);
    });
}

function renderChangeOrders() {
  if (!changeOrderCount) return;
  const rows = filteredChangeOrders();
  const confirmed = rows.filter((row) => row.status === "已确认").reduce((sum, row) => sum + (row.type === "减少" ? -Math.abs(number(row.amount)) : Math.abs(number(row.amount))), 0);
  const pending = rows.filter((row) => row.status === "待确认").reduce((sum, row) => sum + Math.abs(number(row.amount)), 0);
  changeOrderCount.textContent = `${rows.length} 条`;
  changeOrderSummary.innerHTML = `
    <div class="settlement-report">
      ${settlementItem("已确认变更", fmtMoney(confirmed), confirmed < 0 ? "negative" : "positive")}
      ${settlementItem("待确认金额", fmtMoney(pending), pending > 0 ? "warn-text" : "")}
      ${settlementItem("待确认数量", `${rows.filter((row) => row.status === "待确认").length} 条`)}
      ${settlementItem("已取消", `${rows.filter((row) => row.status === "已取消").length} 条`)}
    </div>
  `;
  const body = rows.map((row) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-change-order="${row.index}" /></td>
      <td><input class="cell-input" data-change-order="${row.index}" data-field="date" type="date" value="${escapeHtml(row.date)}" /></td>
      <td><select class="cell-input" data-change-order="${row.index}" data-field="projectId">${selectOptions(state.projects, row.projectId)}</select></td>
      <td><input class="cell-input" data-change-order="${row.index}" data-field="code" value="${escapeHtml(row.code)}" placeholder="编号" /></td>
          <td><input class="cell-input wide-note" data-change-order="${row.index}" data-field="title" value="${escapeHtml(row.title)}" placeholder="工程变更事项" /></td>
      <td><select class="cell-input" data-change-order="${row.index}" data-field="type">${selectOptions(changeOrderTypes, row.type)}</select></td>
      <td><input class="cell-input num" data-change-order="${row.index}" data-field="amount" type="number" step="0.01" min="0" value="${number(row.amount)}" /></td>
      <td><select class="cell-input ${row.status === "待确认" ? "input-danger" : ""}" data-change-order="${row.index}" data-field="status">${selectOptions(changeOrderStatuses, row.status)}</select></td>
      <td><input class="cell-input wide-note" data-change-order="${row.index}" data-field="note" value="${escapeHtml(row.note)}" /></td>
    </tr>
  `).join("");
  document.querySelector("#changeOrderTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>项目</th><th>编号</th><th>工程变更事项</th><th>类型</th><th class="num">金额</th><th>状态</th><th>备注</th></tr></thead>
    <tbody>${body || `<tr><td colspan="9" class="empty">暂无工程变更签证</td></tr>`}</tbody>
  `;
  bindChangeOrderInputs();
}

function bindChangeOrderInputs() {
  document.querySelectorAll("[data-change-order]").forEach((input) => {
    const updateChangeOrder = () => {
      const index = Number(input.dataset.changeOrder);
      const field = input.dataset.field;
      if (!state.changeOrders[index]) return;
      state.changeOrders[index][field] = field === "amount" ? Math.abs(number(input.value)) : input.value;
      saveState(`修改工程变更签证：${state.changeOrders[index].title || state.changeOrders[index].code || "未命名"}`);
      renderOverview();
      renderProjects();
      renderAnalysis();
    };
    input.addEventListener("input", updateChangeOrder);
    input.addEventListener("change", updateChangeOrder);
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedChangeOrders() {
  const indexes = selectedIndexes("[data-select-change-order]");
  if (!indexes.length) return alert("请先勾选要删除的工程变更签证。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条工程变更签证吗？`)) return;
  archiveDeletedRecords("工程变更签证", indexes.map((index) => state.changeOrders[index]));
  indexes.forEach((index) => state.changeOrders.splice(index, 1));
  saveState(`删除工程变更签证：${indexes.length} 条`);
  renderAll();
}

function createBlankCheck() {
  return {
    id: makeId(),
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    clearedDate: "",
    projectId: projectFilter.value || state.projects[0]?.id || "",
    accountId: accountFilter.value || newRecordAccountId(),
    checkNo: "",
    payee: "收款方",
    purpose: "支票用途",
    amount: 0,
    status: "已开出",
    note: "",
    images: [],
  };
}

function filteredChecks() {
  const words = queryWords(searchInput.value, checkSearch.value);
  const status = checkStatusFilter.value;
  const from = checkDateFrom.value;
  const to = checkDateTo.value;
  return (state.bankChecks || [])
    .map((row, index) => ({ ...row, index }))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${accountName(row.accountId)} ${row.checkNo} ${row.payee} ${row.purpose} ${row.status} ${row.note}`.toLowerCase();
      const date = row.issueDate || row.clearedDate || "";
      return textMatches(text, words)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && (!accountFilter.value || row.accountId === accountFilter.value)
        && (!status || row.status === status)
        && (!from || date >= from)
        && (!to || date <= to);
    });
}

function renderCheckReport(rows) {
  const issued = rows.filter((row) => row.status !== "作废").reduce((sum, row) => sum + number(row.amount), 0);
  const cleared = rows.filter((row) => row.status === "已兑现").reduce((sum, row) => sum + number(row.amount), 0);
  const pending = rows.filter((row) => row.status !== "已兑现" && row.status !== "作废").reduce((sum, row) => sum + number(row.amount), 0);
  const voided = rows.filter((row) => row.status === "作废").length;
  document.querySelector("#checkReport").innerHTML = `
    <div class="settlement-report">
      ${settlementItem("有效支票", fmtMoney(issued))}
      ${settlementItem("已兑现", fmtMoney(cleared), "negative")}
      ${settlementItem("未兑现", fmtMoney(pending), pending > 0 ? "warn-text" : "positive")}
      ${settlementItem("作废张数", `${voided} 张`)}
    </div>
  `;
}

function renderChecks() {
  const rows = filteredChecks();
  document.querySelector("#checkCount").textContent = `${rows.length} 张`;
  renderCheckReport(rows);
  const body = rows.map((row) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-check="${row.index}" /></td>
      <td><input class="cell-input" data-check="${row.index}" data-field="issueDate" type="date" value="${escapeHtml(row.issueDate)}" /></td>
      <td><input class="cell-input" data-check="${row.index}" data-field="dueDate" type="date" value="${escapeHtml(row.dueDate)}" /></td>
      <td><input class="cell-input" data-check="${row.index}" data-field="clearedDate" type="date" value="${escapeHtml(row.clearedDate)}" /></td>
      <td><select class="cell-input" data-check="${row.index}" data-field="projectId">${selectOptions(state.projects, row.projectId)}</select></td>
      <td><select class="cell-input" data-check="${row.index}" data-field="accountId">${accountSelectOptions(row.accountId)}</select></td>
      <td><input class="cell-input" data-check="${row.index}" data-field="checkNo" value="${escapeHtml(row.checkNo)}" placeholder="支票号" /></td>
      <td><input class="cell-input" data-check="${row.index}" data-field="payee" value="${escapeHtml(row.payee)}" /></td>
      <td><input class="cell-input wide-note" data-check="${row.index}" data-field="purpose" value="${escapeHtml(row.purpose)}" /></td>
      <td><input class="cell-input num" data-check="${row.index}" data-field="amount" type="number" step="0.01" min="0" value="${number(row.amount)}" /></td>
      <td><select class="cell-input ${row.status === "作废" ? "muted-input" : ""}" data-check="${row.index}" data-field="status">${selectOptions(checkStatuses, row.status)}</select></td>
      <td><input class="cell-input wide-note" data-check="${row.index}" data-field="note" value="${escapeHtml(row.note)}" /></td>
      <td>${imagesCell("check", row.index, row.images)}</td>
    </tr>
  `).join("");
  document.querySelector("#checkTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>开票日期</th><th>到期日</th><th>兑现日期</th><th>项目</th><th>银行账户</th><th>支票号</th><th>收款方</th><th>用途</th><th class="num">金额</th><th>状态</th><th>备注</th><th>图片</th></tr></thead>
    <tbody>${body || `<tr><td colspan="13" class="empty">暂无银行支票记录</td></tr>`}</tbody>
  `;
  bindCheckInputs();
  bindImageControls();
}

function bindCheckInputs() {
  document.querySelectorAll("[data-check]").forEach((input) => {
    const updateCheck = () => {
      const index = Number(input.dataset.check);
      const field = input.dataset.field;
      const row = state.bankChecks[index];
      if (!row) return;
      row[field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "status" && input.value === "已兑现" && !row.clearedDate) {
        row.clearedDate = new Date().toISOString().slice(0, 10);
      }
      saveState(`修改银行支票：${row.checkNo || row.payee || "未命名"}`);
      renderOverview();
      renderCashflow();
    };
    input.addEventListener("input", updateCheck);
    input.addEventListener("change", updateCheck);
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedChecks() {
  const indexes = selectedIndexes("[data-select-check]");
  if (!indexes.length) return alert("请先勾选要删除的银行支票。");
  if (!confirm(`确定删除选中的 ${indexes.length} 张银行支票吗？`)) return;
  archiveDeletedRecords("银行支票", indexes.map((index) => state.bankChecks[index]));
  indexes.forEach((index) => state.bankChecks.splice(index, 1));
  saveState(`删除银行支票：${indexes.length} 张`);
  renderAll();
}

function aiJsonFromText(text) {
  const cleaned = String(text || "").trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error("AI返回内容不是标准JSON。");
  }
}

function aiReportStats(report) {
  const stats = report.stats || {};
  const items = Array.isArray(report.items) ? report.items : [];
  const total = number(stats.totalAmount) || items.reduce((sum, item) => sum + number(item.total), 0);
  const count = number(stats.itemCount) || items.length;
  const currency = stats.currency || "未识别";
  const suppliers = stats.suppliers || [...new Set(items.map((item) => item.supplier).filter(Boolean))].join("、") || "未识别";
  return { total, count, currency, suppliers };
}

function renderAiReports() {
  const reports = state.aiReports || [];
  aiReportCount.textContent = `${reports.length} 份`;
  aiProjectSelect.innerHTML = `<option value="">全部项目</option>${selectOptions(state.projects, aiProjectSelect.value || projectFilter.value)}`;
  const rows = reports.map((report, index) => {
    const stats = aiReportStats(report);
    return `
      <article class="ai-report-card">
        <div class="ai-report-head">
          <label><input class="row-check" type="checkbox" data-select-ai-report="${index}" /> ${escapeHtml(report.title)}</label>
          <span>${escapeHtml(report.createdAt)}</span>
        </div>
        <div class="ai-stat-grid">
          ${settlementItem("项目", report.projectId ? projectName(report.projectId) : "未分项目")}
          ${settlementItem("合计金额", `${escapeHtml(stats.currency)} ${fmtMoney(stats.total)}`, "danger-text")}
          ${settlementItem("明细数量", `${stats.count} 项`)}
          ${settlementItem("供应商", stats.suppliers)}
        </div>
        <p class="ai-summary">${escapeHtml(report.summary || "暂无摘要")}</p>
        ${(report.risks || []).length ? `<div class="ai-risk-list">${report.risks.map((risk) => `<span>${escapeHtml(risk)}</span>`).join("")}</div>` : ""}
        <details class="ai-details">
          <summary>查看明细和原文</summary>
          <div class="table-wrap compact-wrap">
            <table class="mini-table">
              <thead><tr><th>英文名称</th><th>中文名称</th><th>数量</th><th>单价</th><th>金额</th><th>备注</th></tr></thead>
              <tbody>${(report.items || []).map((item) => `
                <tr>
                  <td>${escapeHtml(item.englishName || "")}</td>
                  <td>${escapeHtml(item.chineseName || "")}</td>
                  <td>${escapeHtml(item.quantity || "")}</td>
                  <td>${escapeHtml(item.unitPrice || "")}</td>
                  <td>${escapeHtml(item.total || "")}</td>
                  <td>${escapeHtml(item.note || "")}</td>
                </tr>
              `).join("") || `<tr><td colspan="6" class="empty">AI没有识别到明细</td></tr>`}</tbody>
            </table>
          </div>
          <pre class="ai-raw-text">${escapeHtml(report.rawText || "")}</pre>
        </details>
        ${report.image ? `<button class="thumb-button ai-report-image" type="button" data-ai-preview="${index}"><img src="${report.image}" alt="${escapeHtml(report.fileName || "清单图片")}" /></button>` : ""}
      </article>
    `;
  }).join("");
  aiReportList.innerHTML = rows || `<p class="empty">暂无采购清单识别报告</p>`;
  document.querySelectorAll("[data-ai-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const report = state.aiReports[Number(button.dataset.aiPreview)];
      if (report?.image) openImageModal({ src: report.image, name: report.fileName || report.title });
    });
  });
}

function drawingReportStats(report) {
  const stats = report.stats || {};
  return {
    drawingType: stats.drawingType || "未识别",
    floors: stats.floors || "未识别",
    mainMaterials: stats.mainMaterials || "未识别",
    estimatedArea: stats.estimatedArea || "未识别",
    confidence: stats.confidence || "中",
  };
}

function renderDrawingReports() {
  if (!drawingReportList) return;
  const reports = state.drawingReports || [];
  const selectedProject = drawingProjectSelect?.value || "";
  const filtered = reports.filter((report) => !selectedProject || report.projectId === selectedProject);
  drawingReportCount.textContent = `${filtered.length}/${reports.length} 份`;
  drawingProjectSelect.innerHTML = `<option value="">全部项目</option>${selectOptions(state.projects, selectedProject)}`;
  if (selectedProject) drawingProjectSelect.value = selectedProject;
  const rows = filtered.map((report) => {
    const realIndex = reports.indexOf(report);
    const stats = drawingReportStats(report);
    return `
      <article class="ai-report-card">
        <div class="ai-report-head">
          <label><input class="row-check" type="checkbox" data-select-drawing-report="${realIndex}" /> ${escapeHtml(report.title)}</label>
          <div class="ai-report-actions">
            ${(report.materialQuantities || []).length ? `<button class="tool-button ghost" type="button" data-drawing-to-material-plan="${realIndex}">转材料计划</button>` : ""}
            <span>${escapeHtml(report.createdAt)}</span>
          </div>
        </div>
        <div class="ai-stat-grid">
          ${settlementItem("所属项目", report.projectId ? projectName(report.projectId) : "未分项目")}
          ${settlementItem("文件类型", report.fileType || "图片")}
          ${settlementItem("分析页数", report.pageCount ? `${report.pageCount} 页` : "1 页")}
          ${settlementItem("图纸类型", stats.drawingType)}
          ${settlementItem("楼层/区域", stats.floors)}
          ${settlementItem("识别可信度", stats.confidence)}
        </div>
        <p class="ai-summary">${escapeHtml(report.summary || "暂无图纸摘要")}</p>
        <div class="ai-stat-grid">
          ${settlementItem("主要材料", stats.mainMaterials)}
          ${settlementItem("面积/范围", stats.estimatedArea)}
        </div>
        ${(report.risks || []).length ? `<div class="ai-risk-list">${report.risks.map((risk) => `<span>${escapeHtml(risk)}</span>`).join("")}</div>` : ""}
        <details class="ai-details">
          <summary>查看材料用量、工程量线索和识别文字</summary>
          <div class="table-wrap compact-wrap">
            <table class="mini-table">
              <thead><tr><th>英文材料</th><th>中文材料</th><th>规格</th><th>数量</th><th>单位</th><th>使用部位</th><th>依据</th><th>可信度</th></tr></thead>
              <tbody>${(report.materialQuantities || []).map((item) => `
                <tr>
                  <td>${escapeHtml(item.englishName || "")}</td>
                  <td>${escapeHtml(item.chineseName || item.item || "")}</td>
                  <td>${escapeHtml(item.spec || "")}</td>
                  <td>${escapeHtml(item.quantity || "")}</td>
                  <td>${escapeHtml(item.unit || "")}</td>
                  <td>${escapeHtml(item.location || "")}</td>
                  <td>${escapeHtml(item.basis || "")}</td>
                  <td>${escapeHtml(item.confidence || "")}</td>
                </tr>
              `).join("") || `<tr><td colspan="8" class="empty">AI没有识别到材料用量清单</td></tr>`}</tbody>
            </table>
          </div>
          <div class="table-wrap compact-wrap">
            <table class="mini-table">
              <thead><tr><th>项目</th><th>数量</th><th>单位</th><th>依据</th><th>可信度</th></tr></thead>
              <tbody>${(report.quantities || []).map((item) => `
                <tr>
                  <td>${escapeHtml(item.item || "")}</td>
                  <td>${escapeHtml(item.quantity || "")}</td>
                  <td>${escapeHtml(item.unit || "")}</td>
                  <td>${escapeHtml(item.basis || "")}</td>
                  <td>${escapeHtml(item.confidence || "")}</td>
                </tr>
              `).join("") || `<tr><td colspan="5" class="empty">AI没有识别到可用工程量线索</td></tr>`}</tbody>
            </table>
          </div>
          ${(report.suggestions || []).length ? `<div class="ai-risk-list">${report.suggestions.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
          <pre class="ai-raw-text">${escapeHtml(report.rawText || "")}</pre>
        </details>
        ${normalizeDrawingImages(report).length ? `<div class="thumb-list ai-report-thumbs">${normalizeDrawingImages(report).map((image, imageIndex) => `<button class="thumb-button ai-report-image" type="button" data-drawing-preview="${realIndex}" data-drawing-image-index="${imageIndex}"><img src="${image.src}" alt="${escapeHtml(image.name || report.fileName || "图纸")}" /></button>`).join("")}</div>` : ""}
      </article>
    `;
  }).join("");
  drawingReportList.innerHTML = rows || `<p class="empty">暂无图纸分析报告</p>`;
  document.querySelectorAll("[data-drawing-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const report = state.drawingReports[Number(button.dataset.drawingPreview)];
      const image = normalizeDrawingImages(report)[Number(button.dataset.drawingImageIndex) || 0];
      if (image) openImageModal(image);
    });
  });
  document.querySelectorAll("[data-drawing-to-material-plan]").forEach((button) => {
    button.addEventListener("click", () => createMaterialPlansFromDrawingReport(Number(button.dataset.drawingToMaterialPlan)));
  });
}

function parseQuantityForPlan(value) {
  const text = String(value || "").replace(/,/g, "").trim();
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Math.max(number(match[0]), 0) : 0;
}

function drawingStageFromText(text) {
  const source = String(text || "");
  if (/foundation|footing|pile|地基|基础/i.test(source)) return "地基基础";
  if (/steel|beam|column|truss|结构|钢/i.test(source)) return "钢结构";
  if (/concrete|slab|柱|梁|主体/i.test(source)) return "主体结构";
  if (/water|electrical|plumb|水电/i.test(source)) return "水电安装";
  if (/door|window|门窗/i.test(source)) return "门窗";
  if (/tile|floor|wall tile|地砖|墙砖/i.test(source)) return "地砖墙砖";
  if (/paint|coating|油漆|涂料/i.test(source)) return "油漆涂料";
  if (/finish|装修|收尾/i.test(source)) return "装修收尾";
  return "主体结构";
}

function materialPlanExists(projectId, item) {
  const name = String(item.materialName || "").trim().toLowerCase();
  const spec = String(item.spec || "").trim().toLowerCase();
  const unit = String(item.unit || "").trim().toLowerCase();
  return (state.materialPlans || []).some((row) => row.projectId === projectId
    && String(row.materialName || "").trim().toLowerCase() === name
    && String(row.spec || "").trim().toLowerCase() === spec
    && String(row.unit || "").trim().toLowerCase() === unit);
}

function createMaterialPlansFromDrawingReport(reportIndex) {
  const report = state.drawingReports?.[reportIndex];
  if (!report) return;
  const rows = Array.isArray(report.materialQuantities) ? report.materialQuantities : [];
  if (!rows.length) return alert("这份图纸报告没有可转入的材料用量清单。");
  const projectId = report.projectId || projectFilter.value || state.projects[0]?.id || "";
  if (!projectId) return alert("请先建立项目，再转入材料计划。");
  if (!confirm(`确定把「${report.title}」识别到的 ${rows.length} 条材料用量转入材料计划吗？\n已有相同材料、规格、单位的记录会自动跳过。`)) return;

  let added = 0;
  let skipped = 0;
  rows.forEach((item) => {
    const materialName = item.chineseName || item.item || item.englishName || "建筑材料";
    const plan = {
      id: makeId(),
      projectId,
      stage: drawingStageFromText(`${item.location || ""} ${item.basis || ""} ${materialName}`),
      materialName,
      spec: item.spec || "",
      unit: item.unit || "项",
      budgetQuantity: parseQuantityForPlan(item.quantity) || 1,
      budgetUnitPrice: 0,
      supplier: "",
      alertPrice: 0,
      note: `来自图纸算量：${report.title}；英文：${item.englishName || ""}；部位：${item.location || ""}；依据：${item.basis || ""}；可信度：${item.confidence || ""}`,
      sourceType: "图纸算量",
      sourceDrawingReportId: report.id,
    };
    if (materialPlanExists(projectId, plan)) {
      skipped += 1;
      return;
    }
    state.materialPlans.unshift(plan);
    added += 1;
  });

  saveState(`图纸算量转入材料计划：${added} 条`);
  activeCostSection = "material";
  setView("costControl");
  renderAll();
  alert(`已转入材料计划：新增 ${added} 条${skipped ? `，重复跳过 ${skipped} 条` : ""}。请在材料计划里补充预算单价。`);
}

function buildAiPrompt() {
  return `请识别这张购买清单图片。如果内容是英文，请翻译成中文，并生成简洁中文采购报告。只返回JSON，不要Markdown。
JSON格式：
{
  "summary": "中文小报告，包含清单用途、主要采购内容、是否适合入账核对",
  "stats": {"currency":"识别到的币种", "totalAmount": 数字, "itemCount": 数字, "suppliers":"供应商或未识别"},
  "items": [
    {"englishName":"英文品名", "chineseName":"中文品名", "quantity":"数量", "unitPrice":"单价", "total":"金额", "supplier":"供应商", "note":"备注"}
  ],
  "risks": ["价格不清楚、数量不清楚、币种不清楚等提醒"],
  "rawText": "从图片识别出的原文"
}
如果看不清楚，请在risks里说明。金额字段无法识别时填0或空字符串。`;
}

function buildDrawingPrompt() {
  return `请分析这份建筑工程图纸或英文PDF图纸，生成中文图纸辅助算量报告。只返回JSON，不要Markdown。
重点：
1. 如果图纸文字是英文，请翻译成中文。
2. 尽量识别材料名称、规格、数量、单位、使用部位和计算依据。
3. 无法确定的数量不要硬算，要写明“需人工复核”。
JSON格式：
{
  "summary": "中文小报告，说明图纸大概内容、用途、能识别到的关键构件、区域和材料",
  "stats": {"drawingType":"平面图/结构图/节点图/立面图/材料表/PDF图纸/未知", "floors":"楼层或区域", "mainMaterials":"主要材料", "estimatedArea":"可识别面积或未知", "confidence":"高/中/低"},
  "materialQuantities": [
    {"englishName":"英文材料名", "chineseName":"中文材料名", "spec":"规格型号或尺寸", "quantity":"数量或估算", "unit":"单位", "location":"使用部位", "basis":"图纸依据或计算依据", "confidence":"高/中/低"}
  ],
  "quantities": [
    {"item":"构件或工程量名称", "quantity":"数量或估算", "unit":"单位", "basis":"识别依据", "confidence":"高/中/低"}
  ],
  "risks": ["尺寸不清楚、比例不完整、标注冲突、缺少详图等风险"],
  "suggestions": ["需要人工复核的事项、需要补充的图纸、对采购/预算/施工的建议"],
  "rawText": "识别到的图纸文字、尺寸、标注"
}
注意：这只是图纸辅助识别和粗略工程量线索，不要把识别结果当作最终算量或结算依据。看不清楚的内容要写入risks。`;
}

function chatCompletionText(payload) {
  return payload?.choices?.[0]?.message?.content
    || payload?.choices?.[0]?.delta?.content
    || "";
}

async function requestDoubaoReport(apiKey, model) {
  return requestDoubaoVisionReport(apiKey, model, buildAiPrompt(), aiImageDataUrl);
}

function doubaoErrorText(error, model = "") {
  const message = String(error?.message || error || "");
  if (/model or endpoint .*does not exist|do not have access|does not exist or you do not have access/i.test(message)) {
    return `豆包 Endpoint ID 不存在或当前 API Key 没有权限访问。你现在填写的是「${model || "空"}」。请到火山方舟控制台的“推理接入点/Endpoint”页面复制正确的 Endpoint ID，并确认这个 API Key 属于同一个账号/项目且已开通视觉模型权限。`;
  }
  if (/unauthorized|invalid api key|authentication|permission/i.test(message)) {
    return "豆包 API Key 无效或没有权限，请检查火山方舟 API Key 是否复制完整，并确认账号已开通对应模型。";
  }
  return message || "豆包请求失败。";
}

function validateDoubaoEndpoint(model) {
  const value = String(model || "").trim();
  if (!value) return "请填写豆包 Endpoint ID。";
  if (/^\d+$/.test(value)) {
    return "你填写的是纯数字，看起来像账号ID或项目ID，不像豆包推理接入点 Endpoint ID。请到火山方舟“推理接入点/Endpoint”页面复制正确 ID。";
  }
  return "";
}

async function requestDoubaoVisionReport(apiKey, model, prompt, imageDataUrl) {
  const imageUrls = Array.isArray(imageDataUrl) ? imageDataUrl : [imageDataUrl].filter(Boolean);
  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...imageUrls.map((url) => ({ type: "image_url", image_url: { url } })),
        ],
      }],
      temperature: 0.1,
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(doubaoErrorText(payload?.error?.message || payload?.message || "豆包请求失败。", model));
  const outputText = chatCompletionText(payload);
  if (!outputText) throw new Error("豆包没有返回可读取的报告内容。");
  return { parsed: aiJsonFromText(outputText), outputText };
}

async function requestDoubaoTextReport(apiKey, model, prompt, text) {
  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{
        role: "user",
        content: `${prompt}\n\n以下是PDF内可提取的英文/图纸文字，请据此生成报告：\n${text}`,
      }],
      temperature: 0.1,
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(doubaoErrorText(payload?.error?.message || payload?.message || "豆包请求失败。", model));
  const outputText = chatCompletionText(payload);
  if (!outputText) throw new Error("豆包没有返回可读取的报告内容。");
  return { parsed: aiJsonFromText(outputText), outputText };
}

async function requestDrawingReport(apiKey, model) {
  const upload = drawingUploadData || { images: drawingImageDataUrl ? [drawingImageDataUrl] : [], rawText: "" };
  if (upload.images?.length) return requestDoubaoVisionReport(apiKey, model, buildDrawingPrompt(), upload.images);
  if (upload.rawText) return requestDoubaoTextReport(apiKey, model, buildDrawingPrompt(), upload.rawText);
  throw new Error("没有可分析的图纸内容。");
}

async function requestOpenAiReport(apiKey, model) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [{
        role: "user",
        content: [
          { type: "input_text", text: buildAiPrompt() },
          { type: "input_image", image_url: aiImageDataUrl },
        ],
      }],
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error?.message || "OpenAI请求失败。");
  const outputText = payload.output_text || (payload.output || [])
    .flatMap((item) => item.content || [])
    .map((item) => item.text || "")
    .join("\n");
  if (!outputText) throw new Error("OpenAI没有返回可读取的报告内容。");
  return { parsed: aiJsonFromText(outputText), outputText };
}

async function analyzeAiImage() {
  const provider = aiProvider.value || "doubao";
  if (provider === "doubao" && !interfaceEnabled("doubaoVision")) return alert("豆包采购清单识别接口已关闭，请管理员开启后再使用。");
  if (provider === "openai" && !interfaceEnabled("openaiVision")) return alert("OpenAI备用识别接口已关闭，请管理员开启后再使用。");
  const apiKey = aiApiKey.value.trim();
  const model = aiModel.value.trim();
  if (!apiKey) return alert(provider === "doubao" ? "请先填写豆包 API Key。" : "请先填写 API Key。");
  if (!model) return alert(provider === "doubao" ? "请填写豆包接入点 ID。" : "请填写模型名称。");
  if (provider === "doubao") {
    const endpointIssue = validateDoubaoEndpoint(model);
    if (endpointIssue) return alert(endpointIssue);
  }
  if (!aiImageDataUrl) return alert("请先上传图片。");
  analyzeAiImageButton.disabled = true;
  aiStatus.textContent = provider === "doubao" ? "豆包正在识别图片并生成报告..." : "AI正在识别图片并生成报告...";
  try {
    const result = provider === "doubao"
      ? await requestDoubaoReport(apiKey, model)
      : await requestOpenAiReport(apiKey, model);
    const parsed = result.parsed;
    state.aiReports.unshift({
      id: makeId(),
      createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      projectId: aiProjectSelect.value || projectFilter.value || "",
      title: aiReportTitle.value.trim() || "采购清单识别报告",
      fileName: aiImageInput.files?.[0]?.name || "",
      image: aiImageDataUrl,
      summary: parsed.summary || "",
      stats: parsed.stats || {},
      items: Array.isArray(parsed.items) ? parsed.items : [],
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      rawText: parsed.rawText || result.outputText || "",
    });
    saveAiSettings({ apiKey, model, provider });
    saveState(provider === "doubao" ? "新增采购清单识别报告" : "新增备用AI采购清单报告");
    aiStatus.textContent = provider === "doubao" ? "豆包报告已生成，明细默认隐藏。" : "报告已生成，明细默认隐藏。";
    aiReportTitle.value = "";
    aiImageInput.value = "";
    aiImageDataUrl = "";
    aiImagePreview.innerHTML = "";
    renderAll();
  } catch (error) {
    aiStatus.textContent = `生成失败：${error.message}`;
    alert(`${provider === "doubao" ? "豆包识别" : "AI识别"}失败：${error.message}`);
  } finally {
    analyzeAiImageButton.disabled = false;
  }
}

function deleteSelectedAiReports() {
  const indexes = selectedIndexes("[data-select-ai-report]");
  if (!indexes.length) return alert("请先勾选要删除的豆包报告。");
  if (!confirm(`确定删除选中的 ${indexes.length} 份豆包报告吗？`)) return;
  archiveDeletedRecords("采购清单识别报告", indexes.map((index) => state.aiReports[index]));
  indexes.forEach((index) => state.aiReports.splice(index, 1));
  saveState(`删除采购清单识别报告：${indexes.length} 份`);
  renderAll();
}

async function analyzeDrawingImage() {
  if (!interfaceEnabled("doubaoDrawing")) return alert("豆包图纸分析接口已关闭，请管理员开启后再使用。");
  const apiKey = drawingApiKey.value.trim();
  const model = drawingModel.value.trim();
  if (!apiKey) return alert("请先填写豆包 API Key。");
  if (!model) return alert("请填写豆包视觉接入点 ID。");
  const endpointIssue = validateDoubaoEndpoint(model);
  if (endpointIssue) return alert(endpointIssue);
  if (!drawingUploadData?.images?.length && !drawingUploadData?.rawText) return alert("请先上传PDF或图纸图片。");
  analyzeDrawingImageButton.disabled = true;
  drawingStatus.textContent = "豆包正在分析图纸并生成材料用量报告...";
  try {
    const result = await requestDrawingReport(apiKey, model);
    const parsed = result.parsed;
    const images = normalizeImages(drawingUploadData.images || []);
    state.drawingReports.unshift({
      id: makeId(),
      createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      projectId: drawingProjectSelect.value || projectFilter.value || "",
      title: drawingReportTitle.value.trim() || "图纸算量报告",
      fileName: drawingImageInput.files?.[0]?.name || "",
      fileType: drawingUploadData.fileType || "图片",
      pageCount: drawingUploadData.pageCount || images.length || 1,
      image: images[0]?.src || "",
      images,
      summary: parsed.summary || "",
      stats: parsed.stats || {},
      quantities: Array.isArray(parsed.quantities) ? parsed.quantities : [],
      materialQuantities: Array.isArray(parsed.materialQuantities) ? parsed.materialQuantities : [],
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      rawText: parsed.rawText || result.outputText || "",
    });
    saveAiSettings({ provider: "doubao", apiKey, model });
    saveState("新增图纸分析报告");
    drawingStatus.textContent = "图纸报告已生成，工程量线索默认隐藏。";
    drawingReportTitle.value = "";
    drawingImageInput.value = "";
    drawingImageDataUrl = "";
    drawingUploadData = null;
    drawingImagePreview.innerHTML = "";
    renderAll();
  } catch (error) {
    drawingStatus.textContent = `生成失败：${error.message}`;
    alert(`图纸分析失败：${error.message}`);
  } finally {
    analyzeDrawingImageButton.disabled = false;
  }
}

function localMaterialFromObject(row) {
  const englishName = row["英文材料"] || row["英文名称"] || row["English"] || row["Material"] || row["Item"] || "";
  const chineseName = row["中文材料"] || row["中文名称"] || row["材料名称"] || row["品名"] || row["Name"] || "";
  const spec = row["规格"] || row["规格型号"] || row["Spec"] || row["Size"] || "";
  const quantity = row["数量"] || row["Qty"] || row["Quantity"] || "";
  const unit = row["单位"] || row["Unit"] || "";
  if (!englishName && !chineseName && !quantity) return null;
  return {
    englishName,
    chineseName: chineseName || englishName,
    spec,
    quantity,
    unit,
    location: row["部位"] || row["使用部位"] || row["Location"] || "",
    basis: row["依据"] || row["备注"] || row["Note"] || "表格导入",
    confidence: "中",
  };
}

function localMaterialFromLine(line) {
  const text = String(line || "").trim();
  if (!text || text.length < 3) return null;
  const parts = text.split(/\s{2,}|\t|,/).map((item) => item.trim()).filter(Boolean);
  const quantityMatch = text.match(/(\d+(?:\.\d+)?)\s*(pcs?|sets?|m2|m3|sqm|cu\.?m|kg|tons?|tonnes?|bags?|rolls?|sheets?|lengths?|mm|cm|m|㎡|立方|米|吨|公斤|袋|卷|张|套|个|根|项)\b/i);
  if (!quantityMatch && parts.length < 3) return null;
  const quantity = quantityMatch ? quantityMatch[1] : parts.find((item) => /\d/.test(item)) || "";
  const unit = quantityMatch ? quantityMatch[2] : "";
  const name = parts.find((item) => /[A-Za-z\u4e00-\u9fa5]/.test(item) && !/\d/.test(item)) || text.replace(quantityMatch?.[0] || "", "").trim();
  if (!name || !quantity) return null;
  return {
    englishName: /[A-Za-z]/.test(name) ? name : "",
    chineseName: /[\u4e00-\u9fa5]/.test(name) ? name : name,
    spec: parts.find((item) => /\d+\s*[xX*]\s*\d+|mm|cm|inch|dia|ø/i.test(item)) || "",
    quantity,
    unit,
    location: "",
    basis: text,
    confidence: "低",
  };
}

function parseLocalDrawingMaterials(text) {
  const objects = csvObjects(text);
  const fromObjects = objects.map(localMaterialFromObject).filter(Boolean);
  if (fromObjects.length) return fromObjects;
  return String(text || "")
    .split(/\r?\n/)
    .map(localMaterialFromLine)
    .filter(Boolean)
    .slice(0, 200);
}

function analyzeDrawingLocal() {
  const upload = drawingUploadData || {};
  const rawText = String(upload.rawText || "").trim();
  if (!rawText) {
    return alert("免费分析只能读取PDF文字、CSV表格或TXT文本。图片/扫描PDF没有文字时，需要使用AI视觉识别。");
  }
  const materialQuantities = parseLocalDrawingMaterials(rawText);
  if (!materialQuantities.length) return alert("没有从文件文字中识别到材料数量。建议使用CSV模板整理材料名称、数量、单位后再导入。");
  const title = drawingReportTitle.value.trim() || "免费图纸算量报告";
  state.drawingReports.unshift({
    id: makeId(),
    createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    date: new Date().toISOString().slice(0, 10),
    projectId: drawingProjectSelect.value || projectFilter.value || "",
    title,
    fileName: drawingImageInput.files?.[0]?.name || "",
    fileType: upload.fileType || "文字/表格",
    pageCount: upload.pageCount || 1,
    image: "",
    images: [],
    summary: `本地免费分析完成，共识别 ${materialQuantities.length} 条材料用量线索。`,
    stats: {
      drawingType: upload.fileType === "PDF" ? "PDF文字" : "材料表/文本",
      floors: "未识别",
      mainMaterials: [...new Set(materialQuantities.map((item) => item.chineseName || item.englishName).filter(Boolean))].slice(0, 8).join("、") || "未识别",
      estimatedArea: "未识别",
      confidence: "中",
    },
    quantities: materialQuantities.map((item) => ({
      item: item.chineseName || item.englishName,
      quantity: item.quantity,
      unit: item.unit,
      basis: item.basis,
      confidence: item.confidence,
    })),
    materialQuantities,
    risks: ["本报告为本地文字/表格分析，不包含图片OCR和复杂图纸理解，正式算量需人工复核。"],
    suggestions: ["如识别不完整，请把材料表整理为CSV：材料名称、规格、数量、单位、部位、备注。"],
    rawText,
  });
  saveState("新增免费图纸算量报告");
  drawingStatus.textContent = "免费算量报告已生成，明细默认隐藏。";
  drawingReportTitle.value = "";
  drawingImageInput.value = "";
  drawingImageDataUrl = "";
  drawingUploadData = null;
  drawingImagePreview.innerHTML = "";
  renderAll();
}

function deleteSelectedDrawingReports() {
  const indexes = selectedIndexes("[data-select-drawing-report]");
  if (!indexes.length) return alert("请先勾选要删除的图纸报告。");
  if (!confirm(`确定删除选中的 ${indexes.length} 份图纸报告吗？`)) return;
  archiveDeletedRecords("图纸分析报告", indexes.map((index) => state.drawingReports[index]));
  indexes.forEach((index) => state.drawingReports.splice(index, 1));
  saveState(`删除图纸分析报告：${indexes.length} 份`);
  renderAll();
}

function projectSettlementReport(project, projectRows) {
  const report = projectSettlementMetrics(project, projectRows);
  return `
    <div class="settlement-visible">
      <div class="settlement-report">
        ${settlementItem("结算状态", report.completed ? "可结算" : "进行中", report.completed ? "positive" : "")}
        ${settlementItem("合同额", fmtMoney(report.contractTotal))}
        ${settlementItem("收款进度", `${report.percent.toFixed(3)}%`)}
        ${settlementItem("实际入账", fmtMoney(report.actualIncome), "danger-text")}
        ${settlementItem("支出成本", fmtMoney(report.totalCost))}
        ${settlementItem("预估盈利", fmtMoney(report.profit), report.profit < 0 ? "negative" : "positive")}
      </div>
    </div>
  `;
}

function projectSettlementMetrics(project, projectRows) {
  const contractTotal = projectContract(project);
  const progressTotal = projectRows.reduce((sum, row) => sum + number(row.amount), 0);
  const actualIncome = projectRows.reduce((sum, row) => sum + number(row.ourRemaining), 0);
  const ewtTotal = projectRows.reduce((sum, row) => sum + number(row.ewt), 0);
  const upifTotal = projectRows.reduce((sum, row) => sum + number(row.philippinesPayable), 0);
  const ledgerRows = state.entries.filter((entry) => entry.projectId === project.id);
  const ledgerIncome = ledgerRows.reduce((sum, entry) => sum + (number(entry.amount) > 0 ? number(entry.amount) : 0), 0);
  const ledgerExpense = ledgerRows.reduce((sum, entry) => sum + (number(entry.amount) < 0 ? Math.abs(number(entry.amount)) : 0), 0);
  const subRows = state.subLedgers.filter((row) => row.projectId === project.id && !row.sourceEntryId);
  const subIncome = subRows.reduce((sum, row) => sum + (number(row.amount) > 0 ? number(row.amount) : 0), 0);
  const subExpense = subRows.reduce((sum, row) => sum + (number(row.amount) < 0 ? Math.abs(number(row.amount)) : 0), 0);
  const warehouseCost = (state.warehouseItems || [])
    .filter((item) => item.projectId === project.id && item.status !== "已取消")
    .reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
  const laborControlCost = projectLaborCost(project.id);
  const totalCost = ledgerExpense + subExpense + warehouseCost + laborControlCost + ewtTotal + upifTotal;
  const profit = actualIncome + ledgerIncome + subIncome - totalCost;
  const completed = isProjectCompleted(project, projectRows, progressTotal, contractTotal);
  const percent = contractTotal ? Math.min(progressTotal / contractTotal * 100, 999) : 0;
  return { contractTotal, progressTotal, actualIncome, totalCost, profit, completed, percent, laborControlCost };
}

function projectBudgetTotal(project) {
  return number(project.budgetMaterial) + number(project.budgetLabor) + number(project.budgetSubcontract) + number(project.budgetOther);
}

function projectBudgetSnapshotValues(project) {
  const materialBudget = projectMaterialPlanTotal(project.id) || number(project.budgetMaterial);
  const laborBudget = number(project.budgetLabor);
  const subcontractBudget = number(project.budgetSubcontract);
  const otherBudget = number(project.budgetOther);
  const totalBudget = materialBudget + laborBudget + subcontractBudget + otherBudget;
  const report = projectBudgetReport(project);
  return {
    materialBudget,
    laborBudget,
    subcontractBudget,
    otherBudget,
    totalBudget,
    actualCost: report.totalCost,
  };
}

function latestBudgetSnapshot(project) {
  return Array.isArray(project.budgetSnapshots) && project.budgetSnapshots.length ? project.budgetSnapshots[0] : null;
}

function budgetSnapshotPanel(project) {
  const current = projectBudgetSnapshotValues(project);
  const locked = latestBudgetSnapshot(project);
  const diff = locked ? current.totalBudget - number(locked.totalBudget) : 0;
  const costDiff = locked ? current.actualCost - number(locked.actualCost) : 0;
  return `
    <div class="budget-lock-panel">
      <div class="budget-lock-head">
        <div>
          <strong>预算版本</strong>
          <span>${locked ? `最近锁定：${escapeHtml(locked.name)} / ${escapeHtml(locked.date)}` : "未锁定预算"}</span>
        </div>
        <div class="budget-lock-actions">
          <button class="tool-button ghost" type="button" data-lock-budget="${escapeHtml(project.id)}">${locked ? "重新锁定" : "锁定预算"}</button>
          ${locked ? `<button class="tool-button ghost danger-button" type="button" data-undo-budget-lock="${escapeHtml(project.id)}">撤销锁定</button>` : ""}
        </div>
      </div>
      <div class="settlement-report budget-lock-report">
        ${settlementItem("当前预算", fmtMoney(current.totalBudget), current.totalBudget <= 0 ? "warn-text" : "")}
        ${settlementItem("锁定预算", locked ? fmtMoney(locked.totalBudget) : "-")}
        ${settlementItem("预算差额", locked ? fmtMoney(diff) : "-", diff > 0 ? "negative" : diff < 0 ? "positive" : "")}
        ${settlementItem("当前实际成本", fmtMoney(current.actualCost), current.actualCost > current.totalBudget && current.totalBudget > 0 ? "negative" : "")}
        ${settlementItem("锁定时成本", locked ? fmtMoney(locked.actualCost) : "-")}
        ${settlementItem("成本变化", locked ? fmtMoney(costDiff) : "-", costDiff > 0 ? "negative" : costDiff < 0 ? "positive" : "")}
      </div>
    </div>
  `;
}

function projectBudgetReport(project) {
  const progressRows = state.progress.filter((row) => row.projectId === project.id).map(progressCalc);
  const settlement = projectSettlementMetrics(project, progressRows);
  const budgetTotal = projectBudgetTotal(project);
  const variance = budgetTotal ? budgetTotal - settlement.totalCost : 0;
  const usedPercent = budgetTotal ? settlement.totalCost / budgetTotal * 100 : 0;
  return { ...settlement, budgetTotal, variance, usedPercent };
}

function projectDividendPlan(project, settlement) {
  const shares = normalizeProfitShares(project.profitShares);
  const sharePercent = shares.reduce((sum, share) => sum + number(share.percent), 0);
  const profit = number(settlement.profit);
  const hasManualPool = project.dividendPool !== "" && project.dividendPool !== null && project.dividendPool !== undefined;
  const dividendPool = hasManualPool ? Math.max(number(project.dividendPool), 0) : Math.max(profit, 0);
  const dividendTotal = shares.reduce((sum, share) => sum + dividendPool * number(share.percent) / 100, 0);
  const remainingProfit = profit - dividendTotal;
  return { shares, sharePercent, dividendPool, dividendTotal, remainingProfit, hasManualPool };
}

function projectDividendAccountStatus(project, settlement) {
  const generatedPayables = projectSettlementGeneratedPayables(project);
  const payableAmount = generatedPayables.reduce((sum, row) => sum + number(row.amount), 0);
  const paidAmount = generatedPayables.reduce((sum, row) => sum + payableTotalPaid(row), 0);
  const accountDeducted = generatedPayables.reduce((sum, row) => sum + payableLedgerPaid(row.id), 0);
  const unpaidAmount = Math.max(payableAmount - paidAmount, 0);
  const paidNotDeducted = Math.max(paidAmount - accountDeducted, 0);
  const retainedProfit = number(settlement.profit) - payableAmount;
  return { generatedPayables, payableAmount, paidAmount, accountDeducted, unpaidAmount, paidNotDeducted, retainedProfit };
}

function cashflowForecast(days = 30) {
  const today = new Date();
  const todayText = today.toISOString().slice(0, 10);
  const end = new Date(today);
  end.setDate(end.getDate() + days);
  const endText = end.toISOString().slice(0, 10);
  const inRange = (date) => date && date >= todayText && date <= endText;
  const selectedProject = activeProjectId();
  const receivables = (state.companyDebts || [])
    .filter((row) => (!selectedProject || row.projectId === selectedProject) && inRange(row.dueDate))
    .reduce((sum, row) => sum + Math.max(debtBalance(row), 0), 0);
  const payables = (state.payables || [])
    .filter((row) => (!selectedProject || row.projectId === selectedProject) && inRange(row.dueDate))
    .reduce((sum, row) => sum + Math.max(payableBalance(row), 0), 0);
  const checks = (state.bankChecks || [])
    .filter((row) => (!selectedProject || row.projectId === selectedProject) && row.status === "未兑现" && inRange(row.dueDate || row.issueDate))
    .reduce((sum, row) => sum + Math.abs(number(row.amount)), 0);
  return { days, receivables, payables, checks, net: receivables - payables - checks };
}

function projectHealthRows(calc) {
  return calc.projects.map((project) => {
    const report = projectBudgetReport(project);
    const debtUnpaid = (state.companyDebts || [])
      .filter((row) => row.projectId === project.id)
      .reduce((sum, row) => sum + Math.max(debtBalance(row), 0), 0);
    const payableUnpaid = (state.payables || [])
      .filter((row) => row.projectId === project.id)
      .reduce((sum, row) => sum + Math.max(payableBalance(row), 0), 0);
    const confirmedChange = projectChangeOrderTotal(project.id);
    const pendingChange = projectPendingChangeOrderTotal(project.id);
    const budgetUsed = report.budgetTotal ? report.totalCost / report.budgetTotal * 100 : 0;
    const incomeCover = report.totalCost ? report.actualIncome / report.totalCost * 100 : 0;
    let status = "正常";
    let level = "info";
    const reasons = [];
    if (report.profit < 0) {
      status = "高风险";
      level = "danger";
      reasons.push("预估亏损");
    }
    if (report.budgetTotal > 0 && report.variance < 0) {
      status = "高风险";
      level = "danger";
      reasons.push("超预算");
    }
    if (report.percent >= 80 && report.actualIncome < report.totalCost) {
      if (level !== "danger") {
        status = "需关注";
        level = "warn";
      }
      reasons.push("回款覆盖不足");
    }
    if (debtUnpaid > 0) {
      if (level === "info") {
        status = "需关注";
        level = "warn";
      }
      reasons.push("有未收款");
    }
    if (Math.abs(pendingChange) > 0.01) {
      if (level === "info") {
        status = "需关注";
        level = "warn";
      }
      reasons.push("签证待确认");
    }
    return {
      project,
      report,
      confirmedChange,
      pendingChange,
      debtUnpaid,
      payableUnpaid,
      budgetUsed,
      incomeCover,
      status,
      level,
      reason: reasons.join("、") || "暂无明显风险",
    };
  });
}

function profitShareReport(project, profit, locked = false) {
  const plan = projectDividendPlan(project, { profit });
  const shares = plan.shares;
  const disabled = locked ? "disabled" : "";
  return `
    <div class="profit-share-panel ${locked ? "profit-share-locked" : ""}">
      <div class="profit-share-head">
        <strong>盈利股份分红</strong>
        <span>股份 ${plan.sharePercent.toFixed(2)}% / 本次分红 ${fmtMoney(plan.dividendTotal)} / 剩余盈利 ${fmtMoney(plan.remainingProfit)}</span>
        ${locked ? `<span class="sensitive-note">已结算，撤销后可修改</span>` : `<button class="tool-button ghost" type="button" data-add-profit-share="${escapeHtml(project.id)}">新增股份</button>`}
      </div>
      <div class="dividend-pool-row">
        <label class="field">
          <span>本次拿出分红金额</span>
          <input class="cell-input num" data-project-dividend-pool="${escapeHtml(project.id)}" type="number" min="0" step="0.01" value="${project.dividendPool === "" || project.dividendPool === null || project.dividendPool === undefined ? "" : number(project.dividendPool)}" placeholder="留空=按全部盈利" ${disabled} />
        </label>
        <div class="settlement-report dividend-pool-report">
          ${settlementItem("可分盈利", fmtMoney(profit), profit < 0 ? "negative" : "positive")}
          ${settlementItem("分红基数", fmtMoney(plan.dividendPool), plan.hasManualPool ? "info-text" : "")}
          ${settlementItem("本次应分", fmtMoney(plan.dividendTotal), plan.dividendTotal > 0 ? "negative" : "")}
          ${settlementItem("保留盈利", fmtMoney(plan.remainingProfit), plan.remainingProfit < 0 ? "negative sensitive-value" : "positive")}
        </div>
      </div>
      <div class="profit-share-list">
        ${shares.map((share, index) => `
          <div class="profit-share-row">
            <input class="cell-input" data-profit-share="${escapeHtml(project.id)}" data-share-index="${index}" data-field="name" value="${escapeHtml(share.name)}" placeholder="分红人" ${disabled} />
            <input class="cell-input num" data-profit-share="${escapeHtml(project.id)}" data-share-index="${index}" data-field="percent" type="number" min="0" step="0.01" value="${number(share.percent)}" ${disabled} />
            <strong class="${plan.dividendPool * number(share.percent) / 100 > 0 ? "negative" : "positive"}">${fmtMoney(plan.dividendPool * number(share.percent) / 100)}</strong>
            <input class="cell-input" data-profit-share="${escapeHtml(project.id)}" data-share-index="${index}" data-field="note" value="${escapeHtml(share.note)}" placeholder="备注" ${disabled} />
            ${locked ? "" : `<button class="icon-button danger-button" type="button" data-delete-profit-share="${escapeHtml(project.id)}" data-share-index="${index}">删除股东</button>`}
          </div>
        `).join("") || `<p class="empty">暂无分红设置，点击“新增股份”添加。</p>`}
      </div>
    </div>
  `;
}

function bindProfitShareControls() {
  document.querySelectorAll("[data-add-profit-share]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.projects.find((item) => item.id === button.dataset.addProfitShare);
      if (!project) return;
      project.profitShares = normalizeProfitShares(project.profitShares);
      project.profitShares.push({ id: makeId(), name: `分红人 ${project.profitShares.length + 1}`, percent: 0, note: "" });
      saveState(`新增分红股份：${project.name}`);
      renderAll();
    });
  });
  document.querySelectorAll("[data-delete-profit-share]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.projects.find((item) => item.id === button.dataset.deleteProfitShare);
      const index = Number(button.dataset.shareIndex);
      if (!project?.profitShares?.[index]) return;
      if (!confirm(`确定删除「${project.profitShares[index].name || "分红人"}」的分红设置吗？`)) return;
      archiveDeletedRecords("盈利股份分红", project.profitShares[index]);
      project.profitShares.splice(index, 1);
      saveState(`删除分红股份：${project.name}`);
      renderAll();
    });
  });
  document.querySelectorAll("[data-profit-share]").forEach((input) => {
    input.addEventListener("input", () => {
      const project = state.projects.find((item) => item.id === input.dataset.profitShare);
      const share = project?.profitShares?.[Number(input.dataset.shareIndex)];
      if (!share) return;
      share[input.dataset.field] = input.type === "number" ? number(input.value) : input.value;
      saveState(`修改分红股份：${project.name}`);
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-project-dividend-pool]").forEach((input) => {
    input.addEventListener("input", () => {
      const project = state.projects.find((item) => item.id === input.dataset.projectDividendPool);
      if (!project) return;
      project.dividendPool = input.value === "" ? "" : number(input.value);
      saveState(`修改本次分红金额：${project.name}`);
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-settle-project]").forEach((button) => {
    button.addEventListener("click", () => settleProjectDividends(button.dataset.settleProject));
  });
  document.querySelectorAll("[data-undo-settlement]").forEach((button) => {
    button.addEventListener("click", () => undoProjectSettlement(button.dataset.undoSettlement));
  });
}

function projectSettlementGeneratedPayables(project) {
  const ids = new Set(project.settlementPayableIds || []);
  return (state.payables || []).filter((row) => ids.has(row.id) || (row.sourceType === "股份分红结算" && row.sourceProjectSettlementId === project.id));
}

function settleProjectDividends(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  if (project.settlementStatus === "已结算") return alert("这个项目已经结算过，如需调整请先撤销结算。");

  const settlement = projectSettlementMetrics(project, state.progress.filter((row) => row.projectId === project.id).map(progressCalc));
  const plan = projectDividendPlan(project, settlement);
  const shares = plan.shares.filter((share) => number(share.percent) > 0);
  const sharePercent = plan.sharePercent;
  const dividendTotal = plan.dividendTotal;

  if (!settlement.completed && !confirm(`「${project.name}」目前还显示为进行中，确定提前结算吗？`)) return;
  if (settlement.profit <= 0) return alert("当前项目没有可分配盈利，请先核对实际入账和支出成本。");
  if (!shares.length) return alert("请先增加分红人和股份比例。");
  if (plan.dividendPool <= 0) return alert("请先填写本次拿出分红金额，或保留空白按全部盈利计算。");
  if (sharePercent > 100 && !confirm(`股份合计为 ${sharePercent.toFixed(2)}%，超过100%，确定继续生成分红应付款吗？`)) return;
  if (plan.dividendPool > settlement.profit && !confirm(`本次分红基数 ${fmtMoney(plan.dividendPool)} 已超过预估盈利 ${fmtMoney(settlement.profit)}，确定继续吗？`)) return;
  if (!confirm(`确认结算「${project.name}」吗？\n预估盈利：${fmtMoney(settlement.profit)}\n本次分红基数：${fmtMoney(plan.dividendPool)}\n本次应分：${fmtMoney(dividendTotal)}\n保留盈利：${fmtMoney(plan.remainingProfit)}\n确认后会自动生成应付款台账，银行账户会在实际付款流水录入后减少。`)) return;

  const today = new Date().toISOString().slice(0, 10);
  const payableIds = [];
  shares.forEach((share) => {
    const amount = plan.dividendPool * number(share.percent) / 100;
    if (amount <= 0) return;
    ensureUnit("payableUnits", share.name || "分红人");
    const payable = {
      id: makeId(),
      date: today,
      projectId: project.id,
      company: share.name || "分红人",
      title: `${project.name} 股份分红`,
      amount,
      paid: 0,
      dueDate: "",
      status: "未付款",
      note: `项目结算自动生成；本次分红基数 ${fmtMoney(plan.dividendPool)}；股份 ${number(share.percent).toFixed(2)}%；${share.note || ""}`.trim(),
      sourceType: "股份分红结算",
      sourceProjectSettlementId: project.id,
    };
    state.payables.unshift(payable);
    payableIds.push(payable.id);
  });

  project.settlementStatus = "已结算";
  project.settlementDate = today;
  project.settlementProfit = settlement.profit;
  project.settlementDividendPool = plan.dividendPool;
  project.settlementDividend = dividendTotal;
  project.settlementSharePercent = sharePercent;
  project.settlementRetainedProfit = plan.remainingProfit;
  project.settlementPayableIds = payableIds;
  saveState(`项目结算并生成分红应付：${project.name}`);
  renderAll();
}

function undoProjectSettlement(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project || project.settlementStatus !== "已结算") return;
  const generatedPayables = projectSettlementGeneratedPayables(project);
  const paidRows = generatedPayables.filter((row) => payableTotalPaid(row) > 0);
  if (paidRows.length) return alert("已有分红应付款发生付款记录，不能直接撤销结算。请先核对付款流水。");
  if (!confirm(`确定撤销「${project.name}」的结算吗？\n系统会删除自动生成、且尚未付款的分红应付记录。`)) return;

  const removedIds = new Set(generatedPayables.map((row) => row.id));
  archiveDeletedRecords("自动分红应付", generatedPayables);
  state.payables = (state.payables || []).filter((row) => !removedIds.has(row.id));
  project.settlementStatus = "未结算";
  project.settlementDate = "";
  project.settlementProfit = "";
  project.settlementDividendPool = "";
  project.settlementDividend = "";
  project.settlementSharePercent = "";
  project.settlementRetainedProfit = "";
  project.settlementPayableIds = [];
  saveState(`撤销项目结算：${project.name}`);
  renderAll();
}

function renderDividends() {
  const projects = filteredProjects();
  const projectReports = projects.map((project) => {
    const settlement = projectSettlementMetrics(project, state.progress.filter((row) => row.projectId === project.id).map(progressCalc));
    const plan = projectDividendPlan(project, settlement);
    const accountStatus = projectDividendAccountStatus(project, settlement);
    return { project, settlement, ...plan, ...accountStatus };
  });
  const totalProfit = projectReports.reduce((sum, row) => sum + row.settlement.profit, 0);
  const totalDividend = projectReports.reduce((sum, row) => sum + (row.project.settlementStatus === "已结算" ? row.payableAmount : row.dividendTotal), 0);
  const totalPaid = projectReports.reduce((sum, row) => sum + row.paidAmount, 0);
  const totalAccountDeducted = projectReports.reduce((sum, row) => sum + row.accountDeducted, 0);
  const totalUnpaid = projectReports.reduce((sum, row) => sum + row.unpaidAmount, 0);
  const totalPeople = projectReports.reduce((sum, row) => sum + row.shares.length, 0);
  dividendCount.textContent = `${totalPeople} 个分红设置`;
  dividendSummary.innerHTML = `
    <div class="settlement-report">
      ${settlementItem("项目数量", `${projectReports.length} 个`)}
      ${settlementItem("预估盈利", fmtMoney(totalProfit), totalProfit < 0 ? "negative" : "positive")}
      ${settlementItem("应分红合计", fmtMoney(totalDividend), totalDividend > 0 ? "negative" : "positive")}
      ${settlementItem("已付分红", fmtMoney(totalPaid), totalPaid > 0 ? "positive" : "")}
      ${settlementItem("账户已扣", fmtMoney(totalAccountDeducted), totalAccountDeducted > 0 ? "info-text" : "")}
      ${settlementItem("未付分红", fmtMoney(totalUnpaid), totalUnpaid > 0 ? "warn-text" : "positive")}
      ${settlementItem("分红人数", `${totalPeople} 人`)}
    </div>
  `;
  dividendList.innerHTML = projectReports.map(({ project, settlement, sharePercent, dividendPool, dividendTotal, remainingProfit, payableAmount, paidAmount, accountDeducted, unpaidAmount, paidNotDeducted, retainedProfit }) => {
    const settled = project.settlementStatus === "已结算";
    const displayDividend = settled ? payableAmount : dividendTotal;
    const displayRetained = settled ? retainedProfit : remainingProfit;
    return `
      <article class="dividend-card ${settled ? "settled-card" : ""}">
        <div class="dividend-card-head">
          <div>
            <strong>${escapeHtml(project.name)}</strong>
            <span>股份 ${sharePercent.toFixed(2)}% / 本次分红基数 ${fmtMoney(settled ? number(project.settlementDividendPool) || dividendPool : dividendPool)} / 应分 ${fmtMoney(displayDividend)}</span>
          </div>
          <div class="dividend-actions">
            ${settled ? `<button class="tool-button ghost danger-button" type="button" data-undo-settlement="${escapeHtml(project.id)}">撤销结算</button>` : `<button class="tool-button primary" type="button" data-settle-project="${escapeHtml(project.id)}">确认结算</button>`}
            <button class="tool-button ghost" type="button" data-add-profit-share="${escapeHtml(project.id)}">新增股份</button>
          </div>
        </div>
        <div class="settlement-report dividend-settlement-report">
          ${settlementItem("结算状态", settled ? "已结算" : (settlement.completed ? "可结算" : "进行中"), settled ? "positive" : "")}
          ${settlementItem("结算日期", settled ? project.settlementDate || "-" : "-")}
          ${settlementItem("已生成应付", settled ? fmtMoney(payableAmount) : "-", payableAmount > 0 ? "negative" : "")}
          ${settlementItem("已付分红", settled ? fmtMoney(paidAmount) : "-", paidAmount > 0 ? "positive" : "")}
          ${settlementItem("账户已扣", settled ? fmtMoney(accountDeducted) : "-", accountDeducted > 0 ? "info-text" : "")}
          ${settlementItem("已付未扣账户", settled ? fmtMoney(paidNotDeducted) : "-", paidNotDeducted > 0 ? "warn-text" : "positive")}
          ${settlementItem("未付分红", settled ? fmtMoney(unpaidAmount) : "-", unpaidAmount > 0 ? "warn-text" : "positive")}
          ${settlementItem("保留盈利", fmtMoney(displayRetained), displayRetained < 0 ? "negative sensitive-value" : "positive")}
          ${settlementItem("账户核对", settled ? (paidNotDeducted > 0 ? "需补收支流水" : unpaidAmount > 0 ? "付款后扣账户" : "已对上") : "结算后生成应付", paidNotDeducted > 0 || unpaidAmount > 0 ? "warn-text" : "positive")}
        </div>
        ${profitShareReport(project, settlement.profit, settled)}
      </article>
    `;
  }).join("") || `<p class="empty">没有查询到项目分红设置</p>`;
  bindProfitShareControls();
}

function importanceClass(label = "", value = "", className = "") {
  const text = `${label} ${value} ${className}`;
  if (/negative|danger-text|sensitive-value|逾期|超扣|超预算|亏损|为负|库存为负|高风险|紧急|异常|错误|红色|风险/.test(text)) {
    return `${className} importance-danger`.trim();
  }
  if (/warn-text|未收|未付|未扣|待确认|未兑现|需采购|库存偏低|提醒|待设置|未填|不足|差额|待处理|待入库|待出库|临期|欠款/.test(text)) {
    return `${className} importance-warn`.trim();
  }
  if (/info-text|核对|进行中|未分配|未识别|待采购|运输中|审核中|草稿|计划开始/.test(text)) {
    return `${className} importance-info`.trim();
  }
  if (/positive|已收|已付|已结算|已入库|已确认|正常|完成|已完成|已够用|启用|可结算|已兑现/.test(text)) {
    return `${className} importance-ok`.trim();
  }
  return className;
}

function kpiTone(className = "") {
  if (/importance-danger|danger-text|negative|sensitive-value/.test(className)) return "kpi-danger";
  if (/importance-warn|warn-text/.test(className)) return "kpi-warn";
  if (/importance-info|info-text/.test(className)) return "kpi-info";
  if (/importance-ok|positive/.test(className)) return "kpi-ok";
  return "";
}

function settlementItem(label, value, className = "") {
  const importantClass = importanceClass(label, value, className);
  return `
    <div class="settlement-item">
      <span>${escapeHtml(label)}</span>
      <strong class="${escapeHtml(importantClass)}">${escapeHtml(value)}</strong>
    </div>
  `;
}

function isProjectCompleted(project, rows, progressTotal = null, contractTotal = null) {
  const contract = contractTotal ?? projectContract(project);
  const progress = progressTotal ?? rows.reduce((sum, row) => sum + number(row.amount), 0);
  return (contract > 0 && progress >= contract - 0.01)
    || rows.some((row) => /完成|完工|结算|已完成/.test(row.status || ""));
}

function filteredSubprojects() {
  const q = queryWords(searchInput.value, subcontractSearch.value);
  const selectedProject = subprojectProjectFilter.value;
  return state.subprojects
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.name} ${item.contractor} ${item.startDate} ${item.endDate} ${item.status} ${item.note}`.toLowerCase();
      return textMatches(text, q)
        && (!selectedProject || item.projectId === selectedProject)
        && (!projectFilter.value || item.projectId === projectFilter.value);
    });
}

function filteredSubLedgers() {
  const q = queryWords(searchInput.value, subcontractSearch.value);
  const from = subcontractDateFrom.value;
  const to = subcontractDateTo.value;
  const selectedProject = subprojectProjectFilter.value;
  const selectedSubproject = subprojectLedgerFilter.value;
  return state.subLedgers
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const sub = state.subprojects.find((row) => row.id === item.subprojectId);
      const text = `${projectName(item.projectId)} ${accountName(item.accountId)} ${sub?.name || ""} ${sub?.contractor || ""} ${item.usage || ""} ${item.type} ${item.note}`.toLowerCase();
      const date = item.date || "";
      return textMatches(text, q)
        && (!from || date >= from)
        && (!to || date <= to)
        && (!selectedProject || item.projectId === selectedProject)
        && (!selectedSubproject || item.subprojectId === selectedSubproject)
        && (!projectFilter.value || item.projectId === projectFilter.value)
        && (!accountFilter.value || item.accountId === accountFilter.value);
    });
}

function subprojectRemaining(subprojectId, contractAmount) {
  const ledgerTotal = state.subLedgers
    .filter((item) => item.subprojectId === subprojectId)
    .reduce((sum, item) => sum + number(item.amount), 0);
  return number(contractAmount) + ledgerTotal;
}

function isAccountUsed(accountId) {
  return state.entries.some((entry) => entry.accountId === accountId)
    || state.subLedgers.some((row) => row.accountId === accountId)
    || state.progress.some((row) => (row.allocations || []).some((item) => item.accountId === accountId) || row.accountId === accountId)
    || (state.bankChecks || []).some((item) => item.accountId === accountId)
    || (state.accountAdjustments || []).some((item) => item.accountId === accountId);
}

function calculations() {
  const projectIds = activeProjectId() ? [activeProjectId()] : state.projects.map((project) => project.id);
  const projects = state.projects.filter((project) => projectIds.includes(project.id));
  const progressRows = state.progress.filter((row) => projectIds.includes(row.projectId)).map(progressCalc);
  const entries = state.entries.filter((entry) => projectIds.includes(entry.projectId));
  const subLedgers = state.subLedgers.filter((row) => projectIds.includes(row.projectId));
  const debts = (state.companyDebts || []).filter((row) => projectIds.includes(row.projectId));
  const payables = (state.payables || []).filter((row) => projectIds.includes(row.projectId));
  const contractTotal = projects.reduce((sum, project) => sum + projectContract(project), 0);
  const progressTotal = progressRows.reduce((sum, row) => sum + row.amount, 0);
  const ourRemaining = progressRows.reduce((sum, row) => sum + row.ourRemaining, 0);
  const advanceDeducted = progressRows.reduce((sum, row) => sum + row.advanceDeducted, 0);
  const marginDeducted = progressRows.reduce((sum, row) => sum + row.margin, 0);
  const ewtTotal = progressRows.reduce((sum, row) => sum + row.ewt, 0);
  const ledgerIncome = entries.filter((entry) => number(entry.amount) > 0).reduce((sum, entry) => sum + number(entry.amount), 0);
  const ledgerExpense = entries.filter((entry) => number(entry.amount) < 0).reduce((sum, entry) => sum + number(entry.amount), 0);
  const netLedger = entries.reduce((sum, entry) => sum + number(entry.amount), 0);
  const debtUnpaid = debts.reduce((sum, row) => sum + Math.max(debtBalance(row), 0), 0);
  const payableUnpaid = payables.reduce((sum, row) => sum + Math.max(payableBalance(row), 0), 0);

  const accountRows = state.accounts.map((account) => {
    const accountEntries = state.entries.filter((entry) => entry.accountId === account.id && projectIds.includes(entry.projectId));
    const accountSubLedgers = state.subLedgers.filter((entry) => !entry.sourceEntryId && entry.accountId === account.id && projectIds.includes(entry.projectId));
    const accountChecks = (state.bankChecks || []).filter((item) => item.status === "已兑现" && item.accountId === account.id && projectIds.includes(item.projectId));
    const accountAdjustments = activeProjectId() ? [] : (state.accountAdjustments || []).filter((item) => item.accountId === account.id);
    const accountProgress = state.progress.filter((row) => projectIds.includes(row.projectId)).map(progressCalc);
    const progressIncome = accountProgress.reduce((sum, row) => {
      return sum + (row.allocations || []).filter((item) => item.accountId === account.id).reduce((sub, item) => sub + number(item.amount), 0);
    }, 0);
    const steel = accountEntries.filter((entry) => entry.usage === "钢结构").reduce((sum, entry) => sum + number(entry.amount), 0);
    const other = accountEntries.filter((entry) => entry.usage === "其它项目").reduce((sum, entry) => sum + number(entry.amount), 0);
    const subLedgerTotal = accountSubLedgers.reduce((sum, entry) => sum + number(entry.amount), 0);
    const checkTotal = accountChecks.reduce((sum, item) => sum - Math.abs(number(item.amount)), 0);
    const adjustmentTotal = accountAdjustments.reduce((sum, item) => sum + (item.type === "减少" ? -Math.abs(number(item.amount)) : Math.abs(number(item.amount))), 0);
    return {
      ...account,
      progressIncome,
      steel,
      other,
      subLedgerTotal,
      checkTotal,
      adjustmentTotal,
      ending: (activeProjectId() ? 0 : number(account.initial)) + progressIncome + steel + other + subLedgerTotal + checkTotal + adjustmentTotal,
    };
  });

  return {
    projects,
    progressRows,
    entries,
    subLedgers,
    debts,
    payables,
    contractTotal,
    progressTotal,
    progressPercent: contractTotal ? progressTotal / contractTotal : 0,
    ourRemaining,
    advanceDeducted,
    marginDeducted,
    ewtTotal,
    ledgerIncome,
    ledgerExpense,
    netLedger,
    debtUnpaid,
    payableUnpaid,
    accountRows,
  };
}

function navItems() {
  return [...document.querySelectorAll(".nav [data-view]")];
}

function closeAllNavPopups() {
  if (appShell.classList.contains("sidebar-hidden")) {
    nav.querySelectorAll(".nav-group[open]").forEach((group) => group.removeAttribute("open"));
  }
}

function clearPageSearchForShortcut(viewName) {
  const map = {
    subcontracts: subcontractSearch,
    changeOrders: changeOrderSearch,
    warehouse: warehouseSearch,
    costControl: costSearch,
    dividends: null,
    aiTools: null,
    cashflow: cashflowSearch,
    checks: checkSearch,
    debts: debtSearch,
    payables: payableSearch,
    ledger: ledgerSearch,
    analysis: analysisSearch,
  };
  if (map[viewName]) map[viewName].value = "";
}

function applySidebarShortcut(item) {
  const viewName = item.dataset.view;
  const projectId = item.dataset.projectId || "";
  const accountId = item.dataset.accountId || "";
  const warehouseSection = item.dataset.warehouseSection || "";
  const costSection = item.dataset.costSection || "";
  const overviewSection = item.dataset.overviewSection || "";

  if (item.dataset.clearFilters === "true") {
    if (viewName === "warehouse") activeWarehouseSection = "";
    if (viewName === "costControl") activeCostSection = "";
    projectFilter.value = "";
    accountFilter.value = "";
    ledgerProjectSelect.value = "";
    subprojectProjectFilter.value = "";
    subprojectLedgerFilter.value = "";
    clearPageSearchForShortcut(viewName);
    renderAll();
    return;
  }

  if (overviewSection) {
    renderAll();
    setTimeout(() => {
      const target = overviewSection === "alerts"
        ? document.querySelector("#businessAlerts")?.closest(".panel")
        : document.querySelector("#overview");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return;
  }

  if (warehouseSection) {
    activeWarehouseSection = warehouseSection;
    renderAll();
    return;
  }

  if (costSection) {
    activeCostSection = costSection;
    renderAll();
    return;
  }

  if (projectId) {
    if (viewName === "warehouse") activeWarehouseSection = "";
    if (viewName === "costControl") activeCostSection = "";
    projectFilter.value = projectId;
    accountFilter.value = "";
    ledgerProjectSelect.value = projectId;
    subprojectProjectFilter.value = projectId;
    clearPageSearchForShortcut(viewName);
    renderAll();
  }

  if (accountId) {
    projectFilter.value = "";
    accountFilter.value = accountId;
    ledgerProjectSelect.value = "";
    subprojectProjectFilter.value = "";
    clearPageSearchForShortcut(viewName);
    renderAll();
  }
}

function applyWarehouseSectionState() {
  const sectionIds = {
    inventory: "warehouseInventorySection",
    purchase: "warehousePurchaseSection",
    outbound: "warehouseOutboundSection",
    flow: "warehouseFlowSection",
  };
  Object.entries(sectionIds).forEach(([key, id]) => {
    const section = document.querySelector(`#${id}`);
    if (section) section.classList.toggle("section-hidden", Boolean(activeWarehouseSection) && activeWarehouseSection !== key);
  });
}

function applyCostSectionState() {
  const sectionIds = {
    summary: "costSummarySection",
    stage: "stageCostSection",
    advice: "purchaseAdviceSection",
    material: "materialPlanSection",
    labor: "laborControlSection",
    price: "priceCompareSection",
  };
  Object.entries(sectionIds).forEach(([key, id]) => {
    const section = document.querySelector(`#${id}`);
    if (section) section.classList.toggle("section-hidden", Boolean(activeCostSection) && activeCostSection !== key);
  });
}

function syncNavActiveState() {
  navItems().forEach((item) => {
    const projectMatched = !item.dataset.projectId || item.dataset.projectId === projectFilter.value;
    const accountMatched = !item.dataset.accountId || item.dataset.accountId === accountFilter.value;
    const clearMatched = item.dataset.clearFilters !== "true" || (!projectFilter.value && !accountFilter.value);
    const sectionMatched = (!item.dataset.warehouseSection || item.dataset.warehouseSection === activeWarehouseSection)
      && (!item.dataset.costSection || item.dataset.costSection === activeCostSection);
    const filterMatched = projectMatched && accountMatched && clearMatched && sectionMatched;
    const active = item.dataset.view === currentView && filterMatched;
    item.classList.toggle("active", active);
    if (active) {
      if (!appShell.classList.contains("sidebar-hidden")) item.closest(".nav-group")?.setAttribute("open", "");
    }
  });
}

function navProjectButtons(viewName, allLabel) {
  const allButton = `<button type="button" data-view="${viewName}" data-clear-filters="true" data-short="全">${escapeHtml(allLabel)}</button>`;
  const projectButtons = state.projects.map((project) => (
    `<button type="button" data-view="${viewName}" data-project-id="${escapeHtml(project.id)}" data-short="项"><span>${escapeHtml(project.name)}</span>${project.settlementStatus === "已结算" ? `<em class="nav-status-badge">已结算</em>` : ""}</button>`
  )).join("");
  return allButton + projectButtons;
}

function navAccountButtons(viewName, allLabel) {
  const allButton = `<button type="button" data-view="${viewName}" data-clear-filters="true" data-short="全">${escapeHtml(allLabel)}</button>`;
  const accountButtons = state.accounts.map((account) => (
    `<button type="button" data-view="${viewName}" data-account-id="${escapeHtml(account.id)}" data-short="账">${escapeHtml(account.name)}</button>`
  )).join("");
  return allButton + accountButtons;
}

function navWarehouseButtons() {
  return state.projects.map((project) => (
    `<button type="button" data-view="warehouse" data-project-id="${escapeHtml(project.id)}" data-short="项">${escapeHtml(project.name)}</button>`
  )).join("");
}

function renderSidebarNav() {
  document.querySelector("#projectNavList").innerHTML = navProjectButtons("projects", "全部项目");
  document.querySelector("#changeOrderNavList").innerHTML = navProjectButtons("changeOrders", "全部变更");
  document.querySelector("#subcontractNavList").innerHTML = navProjectButtons("subcontracts", "全部分包");
  document.querySelector("#warehouseNavList").innerHTML = navWarehouseButtons();
  document.querySelector("#accountNavList").innerHTML = navAccountButtons("accounts", "全部账户");
  document.querySelector("#cashflowNavList").innerHTML = navAccountButtons("cashflow", "全部资金流水核对");
  document.querySelector("#checkNavList").innerHTML = navAccountButtons("checks", "全部支票");
  document.querySelector("#dividendNavList").innerHTML = navProjectButtons("dividends", "全部分红");
  document.querySelector("#debtNavList").innerHTML = navProjectButtons("debts", "全部应收款");
  document.querySelector("#payableNavList").innerHTML = navProjectButtons("payables", "全部应付款");
  document.querySelector("#ledgerNavList").innerHTML = navProjectButtons("ledger", "全部项目收支");
  document.querySelector("#analysisNavList").innerHTML = navProjectButtons("analysis", "全部查询统计");
  syncNavActiveState();
}

function renderPageTabs() {
  if (!pageTabs) return;
  pageTabs.innerHTML = [...openViews].map((viewId) => `
    <button class="page-tab ${viewId === currentView ? "active" : ""}" type="button" data-tab-view="${escapeHtml(viewId)}">
      <span>${escapeHtml(pageTitles[viewId] || viewId)}</span>
      ${viewId === "overview" ? "" : `<i data-close-tab="${escapeHtml(viewId)}" title="关闭标签">×</i>`}
    </button>
  `).join("");
}

function setView(name) {
  const nextView = name === "progress" ? "projects" : name;
  currentView = nextView;
  openViews.add(nextView);
  views.forEach((view) => view.classList.toggle("active", view.id === nextView));
  syncNavActiveState();
  renderPageTabs();
  pageTitle.textContent = pageTitles[nextView] || nextView;
}

function scrollGuideSection(section = "start") {
  const map = {
    start: "#guideStart",
    daily: "#guideDaily",
    cloud: "#guideCloud",
    backup: "#guideBackup",
  };
  const target = document.querySelector(map[section] || "#guideStart");
  if (!target) return;
  setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
}

function bindTopControls() {
  document.querySelectorAll("[data-close-image]").forEach((button) => button.addEventListener("click", closeImageModal));
  brandLogoButton.addEventListener("click", () => brandLogoInput.click());
  brandLogoInput.addEventListener("change", () => {
    changeBrandLogo(brandLogoInput.files?.[0]);
    brandLogoInput.value = "";
  });
  brandTitle.addEventListener("blur", saveBrandTitle);
  brandTitle.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    brandTitle.blur();
  });
  avatarButton.addEventListener("click", () => avatarInput.click());
  avatarInput.addEventListener("change", () => {
    changeCurrentAvatar(avatarInput.files?.[0]);
    avatarInput.value = "";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("active")) closeImageModal();
  });
  sidebarToggle.addEventListener("click", () => {
    const hidden = !appShell.classList.contains("sidebar-hidden");
    applySidebarState(hidden);
    saveUiState({ sidebarHidden: hidden });
  });
  toggleSubprojectPanelButton.addEventListener("click", () => {
    const hidden = !subprojectPanel.classList.contains("panel-collapsed");
    applySubprojectPanelState(hidden);
    saveUiState({ subprojectPanelHidden: hidden });
  });
  toggleSubLedgerPanelButton.addEventListener("click", () => {
    const hidden = !subLedgerPanel.classList.contains("panel-collapsed");
    applySubLedgerPanelState(hidden);
    saveUiState({ subLedgerPanelHidden: hidden });
  });
  toggleAccountControlsButton.addEventListener("click", () => {
    const hidden = !accountControls.classList.contains("controls-hidden");
    applyAccountControlsState(hidden);
    saveUiState({ accountControlsHidden: hidden });
  });
  toggleCashflowControlsButton.addEventListener("click", () => {
    const hidden = !cashflowControls.classList.contains("controls-hidden");
    applyCashflowControlsState(hidden);
    saveUiState({ cashflowControlsHidden: hidden });
  });
  toggleCheckControlsButton.addEventListener("click", () => {
    const hidden = !checkControls.classList.contains("controls-hidden");
    applyCheckControlsState(hidden);
    saveUiState({ checkControlsHidden: hidden });
  });
  toggleDebtControlsButton.addEventListener("click", () => {
    const hidden = !debtControls.classList.contains("controls-hidden");
    applyDebtControlsState(hidden);
    saveUiState({ debtControlsHidden: hidden });
  });
  togglePayableControlsButton.addEventListener("click", () => {
    const hidden = !payableControls.classList.contains("controls-hidden");
    applyPayableControlsState(hidden);
    saveUiState({ payableControlsHidden: hidden });
  });
  toggleLedgerControlsButton.addEventListener("click", () => {
    const hidden = !ledgerControls.classList.contains("controls-hidden");
    applyLedgerControlsState(hidden);
    saveUiState({ ledgerControlsHidden: hidden });
  });
  toggleWarehouseControlsButton.addEventListener("click", () => {
    const hidden = !warehouseControls.classList.contains("controls-hidden");
    applyWarehouseControlsState(hidden);
    saveUiState({ warehouseControlsHidden: hidden });
  });
  toggleCostControlsButton?.addEventListener("click", () => {
    const hidden = !costControls.classList.contains("controls-hidden");
    applyCostControlsState(hidden);
    saveUiState({ costControlsHidden: hidden });
  });
  toggleHistoryControlsButton.addEventListener("click", () => {
    const hidden = !historyControls.classList.contains("controls-hidden");
    applyHistoryControlsState(hidden);
    saveUiState({ historyControlsHidden: hidden });
  });
  toggleAnalysisControlsButton.addEventListener("click", () => {
    const hidden = !analysisControls.classList.contains("controls-hidden");
    applyAnalysisControlsState(hidden);
    saveUiState({ analysisControlsHidden: hidden });
  });
  toggleProjectFormulaButton.addEventListener("click", () => toggleFormulaPanel(toggleProjectFormulaButton, "#projectFormulaList"));
  toggleProgressFormulaButton.addEventListener("click", () => toggleFormulaPanel(toggleProgressFormulaButton, "#progressFormulaList"));
  nav.addEventListener("click", (event) => {
    const groupSummary = event.target.closest(".nav-group > summary");
    if (groupSummary && nav.contains(groupSummary) && appShell.classList.contains("sidebar-hidden")) {
      event.preventDefault();
      const group = groupSummary.closest(".nav-group");
      const willOpen = !group?.hasAttribute("open");
      closeAllNavPopups();
      if (willOpen) group?.setAttribute("open", "");
      return;
    }
    const item = event.target.closest("[data-view]");
    if (!item || !nav.contains(item)) return;
    setView(item.dataset.view);
    applySidebarShortcut(item);
    if (item.dataset.view === "helpGuide" && item.dataset.guideSection) {
      scrollGuideSection(item.dataset.guideSection);
    }
    if (item.closest(".nav-group-list")) {
      closeAllNavPopups();
      setTimeout(closeAllNavPopups, 0);
    }
  });
  document.querySelector("#dailyOps")?.addEventListener("click", handleDailyOpsClick);
  document.querySelector("#taskCenter")?.addEventListener("click", handleShortcutOpen);
  document.querySelector("#managementChecklist")?.addEventListener("click", handleShortcutOpen);
  document.querySelector("#helpGuide")?.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-guide-open]");
    if (!openButton) return;
    setView(openButton.dataset.guideOpen);
  });
  document.querySelectorAll("[data-interface-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      if (!isAdminUser()) {
        input.checked = interfaceEnabled(input.dataset.interfaceToggle);
        return alert("只有管理员可以修改接口开关。");
      }
      saveInterfaceSetting(input.dataset.interfaceToggle, input.checked);
      updateInterfaceControls();
    });
  });
  pageTabs?.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-tab]");
    if (closeButton && pageTabs.contains(closeButton)) {
      event.stopPropagation();
      const viewId = closeButton.dataset.closeTab;
      openViews.delete(viewId);
      if (currentView === viewId) {
        const remainingViews = [...openViews];
        currentView = remainingViews[remainingViews.length - 1] || "overview";
      }
      setView(currentView);
      return;
    }
    const tab = event.target.closest("[data-tab-view]");
    if (!tab || !pageTabs.contains(tab)) return;
    setView(tab.dataset.tabView);
  });
  document.addEventListener("click", (event) => {
    if (nav.contains(event.target) || sidebarToggle.contains(event.target)) return;
    closeAllNavPopups();
  });
  zoomOutButton.addEventListener("click", () => changePageZoom(-0.1));
  zoomInButton.addEventListener("click", () => changePageZoom(0.1));
  zoomResetButton.addEventListener("click", () => {
    applyPageZoom(1);
    saveUiState({ pageZoom: 1 });
  });
  currencySelect.value = state.currency || "PHP";
  currencySelect.addEventListener("change", () => {
    state.currency = currencySelect.value;
    saveState("修改货币");
    renderAll();
  });
  languageSelect.addEventListener("change", () => {
    saveUiState({ language: languageSelect.value });
    renderAll();
  });
  [searchInput, projectFilter, accountFilter, usageFilter, dateFromFilter, dateToFilter, noteFilter].forEach((control) => control.addEventListener("input", renderAll));
  [userSearch, ledgerSearch].forEach((control) => control.addEventListener("input", renderAll));
  [warehouseSearch, warehouseStatusFilter, warehouseDateFrom, warehouseDateTo].forEach((control) => control.addEventListener("input", renderWarehouse));
  [costSearch, costDateFrom, costDateTo].filter(Boolean).forEach((control) => control.addEventListener("input", renderCostControl));
  [cashflowSearch, cashflowSourceFilter, cashflowDateFrom, cashflowDateTo].forEach((control) => control.addEventListener("input", renderCashflow));
  aiProjectSelect.addEventListener("input", renderAiReports);
  aiProvider.addEventListener("change", updateInterfaceControls);
  aiImageInput.addEventListener("change", async () => {
    const file = aiImageInput.files?.[0];
    aiImageDataUrl = "";
    aiImagePreview.innerHTML = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("请选择图片文件。");
    const image = await readImageFile(file);
    aiImageDataUrl = image.src;
    aiImagePreview.innerHTML = `<img src="${image.src}" alt="${escapeHtml(image.name)}" />`;
    aiStatus.textContent = "图片已上传，可以生成报告。";
  });
  analyzeAiImageButton.addEventListener("click", analyzeAiImage);
  saveAiSettingsButton.addEventListener("click", () => {
    saveAiSettings({ provider: aiProvider.value || "doubao", apiKey: aiApiKey.value.trim(), model: aiModel.value.trim() });
    aiStatus.textContent = "AI设置已保存到本机浏览器。";
  });
  deleteSelectedAiReportsButton.addEventListener("click", deleteSelectedAiReports);
  drawingProjectSelect?.addEventListener("input", renderDrawingReports);
  drawingImageInput?.addEventListener("change", async () => {
    const file = drawingImageInput.files?.[0];
    drawingImageDataUrl = "";
    drawingUploadData = null;
    drawingImagePreview.innerHTML = "";
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");
    const isText = file.type === "text/plain" || file.type === "text/csv" || /\.(csv|txt)$/i.test(file.name);
    try {
      if (isText) {
        const rawText = await readTextFile(file);
        drawingUploadData = { fileType: file.name.toLowerCase().endsWith(".csv") ? "CSV表格" : "文字文本", pageCount: 1, images: [], rawText };
        drawingImagePreview.innerHTML = `<pre class="ai-raw-text">${escapeHtml(rawText.slice(0, 1800))}</pre>`;
        drawingStatus.textContent = "表格/文本已读取，可以点击“免费分析”。";
        return;
      }
      if (isImage) {
        const image = await readImageFile(file);
        drawingImageDataUrl = image.src;
        drawingUploadData = { fileType: "图片", pageCount: 1, images: [image], rawText: "" };
        drawingImagePreview.innerHTML = `<img src="${image.src}" alt="${escapeHtml(image.name)}" />`;
        drawingStatus.textContent = "图纸图片已上传。图片免费方式无法识别文字，请使用AI算量。";
        return;
      }
      if (isPdf) {
        drawingStatus.textContent = "正在读取PDF图纸，默认提取前3页...";
        const pdfData = await readPdfDrawingFile(file);
        drawingUploadData = pdfData;
        drawingImageDataUrl = pdfData.images[0]?.src || "";
        drawingImagePreview.innerHTML = pdfData.images.length
          ? `<div class="pdf-preview-grid">${pdfData.images.map((image) => `<img src="${image.src}" alt="${escapeHtml(image.name)}" />`).join("")}</div>`
          : `<p class="empty">PDF无法生成预览，但已提取到文字，可生成文字版算量报告。</p>`;
        drawingStatus.textContent = pdfData.rawText
          ? `PDF已读取：共 ${pdfData.totalPages || pdfData.pageCount || "未知"} 页，可点击“免费分析”或“AI算量”。`
          : `PDF已读取：共 ${pdfData.totalPages || pdfData.pageCount} 页，未提取到文字，建议使用AI算量。`;
        return;
      }
      alert("请选择PDF、图片、CSV或TXT文件。");
    } catch (error) {
      drawingUploadData = null;
      drawingStatus.textContent = `PDF读取失败：${error.message}`;
      alert(`图纸文件读取失败：${error.message}`);
    }
  });
  analyzeDrawingImageButton?.addEventListener("click", analyzeDrawingImage);
  analyzeDrawingLocalButton?.addEventListener("click", analyzeDrawingLocal);
  saveDrawingSettingsButton?.addEventListener("click", () => {
    saveAiSettings({ provider: "doubao", apiKey: drawingApiKey.value.trim(), model: drawingModel.value.trim() });
    drawingStatus.textContent = "图纸AI设置已保存到本机浏览器。";
  });
  deleteSelectedDrawingReportsButton?.addEventListener("click", deleteSelectedDrawingReports);
  [checkSearch, checkStatusFilter, checkDateFrom, checkDateTo].forEach((control) => control.addEventListener("input", renderChecks));
  [debtSearch, debtStatusFilter, debtDateFrom, debtDateTo].forEach((control) => control.addEventListener("input", renderDebts));
  [payableSearch, payableStatusFilter, payableDateFrom, payableDateTo].forEach((control) => control.addEventListener("input", renderPayables));
  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    projectFilter.value = "";
    accountFilter.value = "";
    usageFilter.value = "";
    cashflowSearch.value = "";
    cashflowSourceFilter.value = "";
    cashflowDateFrom.value = "";
    cashflowDateTo.value = "";
    checkSearch.value = "";
    checkStatusFilter.value = "";
    checkDateFrom.value = "";
    checkDateTo.value = "";
    debtSearch.value = "";
    debtStatusFilter.value = "";
    debtDateFrom.value = "";
    debtDateTo.value = "";
    payableSearch.value = "";
    payableStatusFilter.value = "";
    payableDateFrom.value = "";
    payableDateTo.value = "";
    if (changeOrderSearch) changeOrderSearch.value = "";
    if (changeOrderStatusFilter) changeOrderStatusFilter.value = "";
    if (changeOrderDateFrom) changeOrderDateFrom.value = "";
    if (changeOrderDateTo) changeOrderDateTo.value = "";
    userSearch.value = "";
    ledgerSearch.value = "";
    warehouseSearch.value = "";
    warehouseStatusFilter.value = "";
    warehouseDateFrom.value = "";
    warehouseDateTo.value = "";
    analysisSearch.value = "";
    analysisDateFrom.value = "";
    analysisDateTo.value = "";
    dateFromFilter.value = "";
    dateToFilter.value = "";
    noteFilter.value = "";
    renderAll();
  });
  clearCashflowSearchButton.addEventListener("click", () => {
    cashflowSearch.value = "";
    cashflowSourceFilter.value = "";
    cashflowDateFrom.value = "";
    cashflowDateTo.value = "";
    renderCashflow();
  });
  checkCashflowErrorsButton.addEventListener("click", checkCashflowErrors);
  exportCashflowButton.addEventListener("click", exportCashflow);
  clearCheckSearchButton.addEventListener("click", () => {
    checkSearch.value = "";
    checkStatusFilter.value = "";
    checkDateFrom.value = "";
    checkDateTo.value = "";
    renderChecks();
  });
  clearDebtSearchButton.addEventListener("click", () => {
    debtSearch.value = "";
    debtStatusFilter.value = "";
    debtDateFrom.value = "";
    debtDateTo.value = "";
    renderDebts();
  });
  addReceivableUnitButton.addEventListener("click", () => addUnit("receivableUnits", "应收单位"));
  renameReceivableUnitButton.addEventListener("click", () => renameUnit("receivableUnits", receivableUnitSelect, "companyDebts", "应收单位"));
  deleteReceivableUnitButton.addEventListener("click", () => deleteUnit("receivableUnits", receivableUnitSelect, "companyDebts", "应收单位", "应收单位"));
  clearPayableSearchButton.addEventListener("click", () => {
    payableSearch.value = "";
    payableStatusFilter.value = "";
    payableDateFrom.value = "";
    payableDateTo.value = "";
    renderPayables();
  });
  clearChangeOrderSearchButton?.addEventListener("click", () => {
    changeOrderSearch.value = "";
    changeOrderStatusFilter.value = "";
    changeOrderDateFrom.value = "";
    changeOrderDateTo.value = "";
    renderChangeOrders();
  });
  addPayableUnitButton.addEventListener("click", () => addUnit("payableUnits", "应付单位"));
  renamePayableUnitButton.addEventListener("click", () => renameUnit("payableUnits", payableUnitSelect, "payables", "应付单位"));
  deletePayableUnitButton.addEventListener("click", () => deleteUnit("payableUnits", payableUnitSelect, "payables", "应付单位", "应付单位"));
  clearUserSearchButton.addEventListener("click", () => {
    userSearch.value = "";
    renderUserAccounts();
  });
  clearLedgerSearchButton.addEventListener("click", () => {
    ledgerSearch.value = "";
    dateFromFilter.value = "";
    dateToFilter.value = "";
    noteFilter.value = "";
    renderLedger();
    renderAnalysis();
  });
  clearWarehouseSearchButton.addEventListener("click", () => {
    warehouseSearch.value = "";
    warehouseStatusFilter.value = "";
    warehouseDateFrom.value = "";
    warehouseDateTo.value = "";
    renderWarehouse();
  });
  clearCostSearchButton?.addEventListener("click", () => {
    costSearch.value = "";
    costDateFrom.value = "";
    costDateTo.value = "";
    renderCostControl();
  });
  deleteSelectedProjectsButton.addEventListener("click", deleteSelectedProjects);
  deleteSelectedAccountsButton.addEventListener("click", deleteSelectedAccounts);
  deleteSelectedUsersButton.addEventListener("click", deleteSelectedUsers);
  deleteSelectedProgressButton.addEventListener("click", deleteSelectedProgress);
  deleteSelectedEntriesButton.addEventListener("click", deleteSelectedEntries);
  deleteSelectedChecksButton.addEventListener("click", deleteSelectedChecks);
  deleteSelectedDebtsButton.addEventListener("click", deleteSelectedDebts);
  deleteSelectedPayablesButton.addEventListener("click", deleteSelectedPayables);
  deleteSelectedChangeOrdersButton?.addEventListener("click", deleteSelectedChangeOrders);
  deleteSelectedWarehouseButton.addEventListener("click", deleteSelectedWarehouse);
  deleteSelectedWarehouseOutboundButton.addEventListener("click", deleteSelectedWarehouseOutbounds);
  deleteSelectedMaterialPlansButton?.addEventListener("click", deleteSelectedMaterialPlans);
  deleteSelectedLaborRecordsButton?.addEventListener("click", deleteSelectedLaborRecords);
  applyLedgerProjectButton.addEventListener("click", applyLedgerProjectToSelected);
  exportLedgerButton.addEventListener("click", exportLedger);
  bindCsvTools();
  addUsageButton.addEventListener("click", () => addType("usages", "用途"));
  addCategoryButton.addEventListener("click", () => addType("categories", "分类"));
  [historyFromFilter, historyToFilter, historySearch].forEach((control) => control.addEventListener("input", renderHistory));
  translationSearch?.addEventListener("input", renderTranslations);
  clearTranslationSearchButton?.addEventListener("click", () => {
    translationSearch.value = "";
    renderTranslations();
  });
  addTranslationButton?.addEventListener("click", addTranslation);
  deleteSelectedTranslationsButton?.addEventListener("click", deleteSelectedTranslations);
  [analysisSearch, analysisDateFrom, analysisDateTo].forEach((control) => control.addEventListener("input", renderAnalysis));
  [changeOrderSearch, changeOrderStatusFilter, changeOrderDateFrom, changeOrderDateTo].forEach((control) => control?.addEventListener("input", renderChangeOrders));
  clearAnalysisSearchButton.addEventListener("click", () => {
    analysisSearch.value = "";
    analysisDateFrom.value = "";
    analysisDateTo.value = "";
    renderAnalysis();
  });
  exportAnalysisButton.addEventListener("click", exportAnalysis);
  clearHistorySearchButton.addEventListener("click", () => {
    historyFromFilter.value = "";
    historyToFilter.value = "";
    historySearch.value = "";
    renderHistory();
  });
  clearHistoryButton.addEventListener("click", () => {
    if (!confirm("确定清空所有修改记录吗？这不会删除当前财务数据。")) return;
    state.history = [];
    saveStateOnly();
    renderHistory();
  });
  deleteSelectedHistoryButton.addEventListener("click", deleteSelectedHistory);
  cloudLoginButton?.addEventListener("click", cloudLogin);
  cloudUploadButton?.addEventListener("click", uploadLocalStateToCloud);
  cloudDownloadButton?.addEventListener("click", downloadCloudStateToLocal);
  cloudBackupButton?.addEventListener("click", backupCloudState);
  cloudEmail?.addEventListener("change", saveCloudLoginPreference);
  cloudPassword?.addEventListener("change", saveCloudLoginPreference);
  rememberCloudLogin?.addEventListener("change", saveCloudLoginPreference);
  exportLocalBackupButton?.addEventListener("click", () => exportLocalBackup());
  restoreLocalBackupButton?.addEventListener("click", () => restoreLocalBackupInput?.click());
  restoreLocalBackupInput?.addEventListener("change", () => restoreLocalBackupFromFile(restoreLocalBackupInput.files?.[0]));
  localDiskSaveButton?.addEventListener("click", async () => {
    localDiskSaveButton.textContent = "保存中";
    const ok = await saveStateToLocalDisk("manual");
    localDiskSaveButton.textContent = ok ? "已保存" : "保存失败";
    setTimeout(() => (localDiskSaveButton.textContent = "保存到硬盘"), 1200);
  });
  localDiskLoadButton?.addEventListener("click", loadStateFromLocalDisk);
  saveButton.addEventListener("click", () => {
    state.history.unshift({
      id: makeId(),
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      action: "手动保存",
      before: lastDataSnapshot,
      after: lastDataSnapshot,
    });
    state.history = state.history.slice(0, 300);
    saveStateOnly();
    saveState("手动保存");
    saveButton.textContent = "已保存";
    setTimeout(() => (saveButton.textContent = "保存"), 1000);
  });
  resetButton.addEventListener("click", () => {
    if (!confirm("重置数据会清除当前浏览器保存的修改，确定重置吗？")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_GOOD_BACKUP_KEY);
    localStorage.removeItem(REFRESH_BACKUP_KEY);
    try {
      sessionStorage.removeItem(REFRESH_BACKUP_KEY);
    } catch {
      // Ignore browsers that block session storage cleanup.
    }
    state = baseState();
    renderAll();
  });
  clearAllDataButton.addEventListener("click", () => {
    if (!isAdminUser()) return alert("只有管理员可以清空全部数据。");
    const typed = prompt("这会清空所有项目、账户、流水、应收、应付、材料库存、支票、工程变更签证、豆包报告和分红数据。\n如确定清空，请输入：清空数据");
    if (typed !== "清空数据") return;
    state = ensureStateShape(emptyState());
    lastDataSnapshot = JSON.stringify(dataOnlyState(state));
    localStorage.removeItem(LAST_GOOD_BACKUP_KEY);
    localStorage.removeItem(REFRESH_BACKUP_KEY);
    try {
      sessionStorage.removeItem(REFRESH_BACKUP_KEY);
    } catch {
      // Ignore browsers that block session storage cleanup.
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveButton.textContent = "已清空";
    renderAll();
    setTimeout(() => (saveButton.textContent = "保存"), 1200);
  });
  addProjectButton.addEventListener("click", () => {
    state.projects.push({ ...createBlankProject(), name: `新项目 ${state.projects.length + 1}` });
    saveState("新增项目");
    renderAll();
  });
  addAccountButton.addEventListener("click", () => {
    state.accounts.push({ id: makeId(), name: `新账户 ${state.accounts.length + 1}`, initial: 0, status: "启用", images: [] });
    saveState("新增资金账户");
    renderAll();
  });
  addAccountAdjustmentButton.addEventListener("click", () => {
    state.accountAdjustments.unshift({
      id: makeId(),
      date: new Date().toISOString().slice(0, 10),
      accountId: accountFilter.value || state.accounts[0]?.id || "",
      type: "增加",
      amount: 0,
      note: "",
    });
    saveState("新增账户调整");
    renderAll();
  });
  addUserAccountButton.addEventListener("click", () => {
    state.userAccounts.unshift(createBlankUserAccount());
    saveState("新增账号");
    renderAll();
  });
  addProgressButton.addEventListener("click", () => {
    addProgressForProject(projectFilter.value || state.projects[0]?.id || "");
  });
  addEntryButton.addEventListener("click", () => {
    state.entries.unshift({
      id: makeId(),
      projectId: ledgerProjectSelect.value || projectFilter.value || state.projects[0]?.id || "",
      accountId: newRecordAccountId(),
      type: "支出",
      usage: usageFilter.value || state.usages[0] || "钢结构",
      category: state.categories[0] || "钢结构支出",
      subprojectId: "",
      subUsage: state.subUsages[0] || "工程款",
      receivableId: "",
      payableId: "",
      date: new Date().toISOString().slice(0, 10),
      amount: 0,
      note: "",
      images: [],
    });
    saveState();
    renderAll();
  });
  addDebtButton.addEventListener("click", () => {
    state.companyDebts.unshift(createBlankDebt());
    saveState("新增应收");
    renderAll();
  });
  addPayableButton.addEventListener("click", () => {
    state.payables.unshift(createBlankPayable());
    saveState("新增应付");
    renderAll();
  });
  addChangeOrderButton?.addEventListener("click", () => {
    state.changeOrders.unshift(createBlankChangeOrder());
    saveState("新增工程变更签证");
    renderAll();
  });
  addCheckButton.addEventListener("click", () => {
    state.bankChecks.unshift(createBlankCheck());
    saveState("新增银行支票");
    renderAll();
  });
  addWarehouseItemButton.addEventListener("click", () => {
    state.warehouseItems.unshift(createBlankWarehouseItem());
    saveState("新增采购入库");
    renderAll();
  });
  addWarehouseOutboundButton.addEventListener("click", () => {
    state.warehouseOutbounds.unshift(createBlankWarehouseOutbound());
    saveState("新增材料领用出库");
    renderAll();
  });
  addMaterialPlanButton?.addEventListener("click", () => {
    state.materialPlans.unshift(createBlankMaterialPlan());
    saveState("新增材料计划");
    renderAll();
  });
  addLaborRecordButton?.addEventListener("click", () => {
    state.laborRecords.unshift(createBlankLaborRecord());
    saveState("新增人工记录");
    renderAll();
  });
  addSubprojectButton.addEventListener("click", () => {
    state.subprojects.unshift(createBlankSubproject());
    saveState("新增分包项目");
    renderAll();
  });
  addSubLedgerButton.addEventListener("click", () => {
    if (!state.subprojects.length) state.subprojects.unshift(createBlankSubproject());
    const selectedProject = subprojectProjectFilter.value || projectFilter.value;
    const selectedSubproject = state.subprojects.find((item) => item.id === subprojectLedgerFilter.value)
      || state.subprojects.find((item) => !selectedProject || item.projectId === selectedProject)
      || state.subprojects[0];
    const row = createBlankSubLedger(selectedSubproject.id);
    state.subLedgers.unshift(row);
    showNewSubLedgerRow(row);
    saveState("新增分包流水");
    renderAll();
    addSubLedgerButton.textContent = "已新增";
    setTimeout(() => (addSubLedgerButton.textContent = "新增流水"), 1200);
  });
  addSubUsageButton.addEventListener("click", addSubUsageType);
  renameSubUsageButton.addEventListener("click", renameSelectedSubUsageType);
  deleteSubUsageButton.addEventListener("click", deleteSelectedSubUsageType);
  subcontractSearch.addEventListener("input", renderSubcontracts);
  subprojectProjectFilter.addEventListener("input", () => {
    const selectedSubproject = state.subprojects.find((item) => item.id === subprojectLedgerFilter.value);
    if (selectedSubproject && selectedSubproject.projectId !== subprojectProjectFilter.value) subprojectLedgerFilter.value = "";
    renderSubcontracts();
  });
  [subprojectLedgerFilter, subcontractDateFrom, subcontractDateTo].forEach((control) => control.addEventListener("input", renderSubcontracts));
  clearSubcontractSearchButton.addEventListener("click", () => {
    subcontractSearch.value = "";
    subprojectProjectFilter.value = "";
    subprojectLedgerFilter.value = "";
    subcontractDateFrom.value = "";
    subcontractDateTo.value = "";
    renderSubcontracts();
  });
  applySubprojectProjectButton.addEventListener("click", applyProjectToSelectedSubprojects);
  deleteSelectedSubprojectsButton.addEventListener("click", deleteSelectedSubprojects);
  deleteSelectedSubLedgersButton.addEventListener("click", deleteSelectedSubLedgers);
}

function addProgressForProject(projectId) {
  state.progress.unshift({
    id: makeId(),
    projectId: projectId || state.projects[0]?.id || "",
    allocations: accountFilter.value && state.accounts.find((account) => account.id === accountFilter.value)?.status !== "关闭" ? [{ accountId: accountFilter.value, amount: "" }] : [],
    date: new Date().toISOString().slice(0, 10),
    period: `第${state.progress.length + 1}次`,
    amount: "",
    percent: 0,
    status: "",
    note: "",
    advanceDeducted: "",
    margin: "",
    ewtMaterial: "",
    ewtLabor: "",
    philippinesTotal: "",
    philippinesDeducted: "",
    philippinesDeductedNote: "",
    philippinesPayable: "",
    ourRemaining: "",
    images: [],
  });
  saveState("新增进度款");
  renderAll();
}

function createBlankWarehouseItem() {
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    stage: "主体结构",
    name: "建筑材料",
    supplier: "",
    quantity: 1,
    outboundQuantity: 0,
    unitPrice: 0,
    carrier: "未选择",
    trackingNo: "",
    status: "待采购",
    arrivalDate: "",
    note: "",
  };
}

function warehouseItemOptions(selected = "", projectId = "") {
  const names = [...new Set((state.warehouseItems || [])
    .filter((item) => !projectId || item.projectId === projectId)
    .map((item) => String(item.name || "").trim())
    .filter(Boolean))];
  const values = names.length ? names : ["建筑材料"];
  return selectOptions(values, selected || values[0]);
}

function createBlankWarehouseOutbound() {
  const selectedProject = projectFilter.value || state.warehouseItems[0]?.projectId || state.projects[0]?.id || "";
  const itemName = state.warehouseItems.find((item) => item.projectId === selectedProject)?.name || state.warehouseItems[0]?.name || "建筑材料";
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: selectedProject,
    itemName,
    quantity: 1,
    receiver: "",
    note: "",
    sourceItemId: "",
  };
}

function createBlankMaterialPlan() {
  return {
    id: makeId(),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    stage: "主体结构",
    materialName: "建筑材料",
    spec: "",
    unit: "项",
    budgetQuantity: 1,
    budgetUnitPrice: 0,
    supplier: "",
    alertPrice: 0,
    note: "",
  };
}

function createBlankLaborRecord() {
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    projectId: projectFilter.value || state.projects[0]?.id || "",
    stage: "主体结构",
    team: "施工班组",
    workType: "人工",
    workerCount: 1,
    workDays: 1,
    dailyRate: 0,
    overtimeAmount: 0,
    allowance: 0,
    paidAmount: 0,
    mode: "计入成本",
    note: "",
  };
}

function laborRecordTotal(row) {
  return number(row.workerCount) * number(row.workDays) * number(row.dailyRate)
    + number(row.overtimeAmount)
    + number(row.allowance);
}

function projectLaborCost(projectId) {
  return (state.laborRecords || [])
    .filter((row) => row.projectId === projectId && row.mode !== "仅记录")
    .reduce((sum, row) => sum + laborRecordTotal(row), 0);
}

function projectMaterialPlanTotal(projectId) {
  return (state.materialPlans || [])
    .filter((row) => row.projectId === projectId)
    .reduce((sum, row) => sum + number(row.budgetQuantity) * number(row.budgetUnitPrice), 0);
}

function refreshFilters() {
  const selectedProject = projectFilter.value;
  const selectedAccount = accountFilter.value;
  const selectedUsage = usageFilter.value;
  const selectedLedgerProject = ledgerProjectSelect.value;
  const selectedWarehouseStatus = warehouseStatusFilter.value;
  const selectedDebtStatus = debtStatusFilter.value;
  const selectedPayableStatus = payableStatusFilter.value;
  const selectedCheckStatus = checkStatusFilter.value;
  const selectedChangeOrderStatus = changeOrderStatusFilter?.value || "";
  projectFilter.innerHTML = `<option value="">全部项目</option>${selectOptions(state.projects, selectedProject)}`;
  accountFilter.innerHTML = `<option value="">全部账户</option>${selectOptions(state.accounts, selectedAccount)}`;
  usageFilter.innerHTML = `<option value="">全部用途</option>${selectOptions(state.usages, selectedUsage)}`;
  warehouseStatusFilter.innerHTML = `<option value="">全部状态</option>${selectOptions(warehouseStatuses, selectedWarehouseStatus)}`;
  debtStatusFilter.innerHTML = `<option value="">全部状态</option>${selectOptions(debtStatuses, selectedDebtStatus)}`;
  payableStatusFilter.innerHTML = `<option value="">全部状态</option>${selectOptions(payableStatuses, selectedPayableStatus)}`;
  checkStatusFilter.innerHTML = `<option value="">全部状态</option>${selectOptions(checkStatuses, selectedCheckStatus)}`;
  if (changeOrderStatusFilter) changeOrderStatusFilter.innerHTML = `<option value="">全部状态</option>${selectOptions(changeOrderStatuses, selectedChangeOrderStatus)}`;
  ledgerProjectSelect.innerHTML = `<option value="">选择项目</option>${selectOptions(state.projects, selectedLedgerProject || projectFilter.value)}`;
  if (state.projects.some((project) => project.id === selectedProject)) projectFilter.value = selectedProject;
  if (state.accounts.some((account) => account.id === selectedAccount)) accountFilter.value = selectedAccount;
  if (state.usages.includes(selectedUsage)) usageFilter.value = selectedUsage;
  if (warehouseStatuses.includes(selectedWarehouseStatus)) warehouseStatusFilter.value = selectedWarehouseStatus;
  if (debtStatuses.includes(selectedDebtStatus)) debtStatusFilter.value = selectedDebtStatus;
  if (payableStatuses.includes(selectedPayableStatus)) payableStatusFilter.value = selectedPayableStatus;
  if (checkStatuses.includes(selectedCheckStatus)) checkStatusFilter.value = selectedCheckStatus;
  if (changeOrderStatusFilter && changeOrderStatuses.includes(selectedChangeOrderStatus)) changeOrderStatusFilter.value = selectedChangeOrderStatus;
  if (state.projects.some((project) => project.id === selectedLedgerProject)) ledgerProjectSelect.value = selectedLedgerProject;
  else if (state.projects.some((project) => project.id === selectedProject)) ledgerProjectSelect.value = selectedProject;
}

function kpi(label, value, hint, valueClass = "") {
  const importantClass = importanceClass(label, value, valueClass);
  const tone = kpiTone(importantClass);
  return `<article class="kpi ${tone}"><span>${label}</span><strong class="${importantClass}">${value}</strong><em>${hint}</em></article>`;
}

function businessAlertRows(calc) {
  const today = new Date().toISOString().slice(0, 10);
  const alerts = [];
  calc.accountRows.forEach((account) => {
    if (account.status !== "关闭" && account.ending < 0) {
      alerts.push({
        level: "danger",
        title: "账户余额为负",
        text: `${account.name} 当前余额 ${fmtMoney(account.ending)}，建议核对入账、支出或账户调整。`,
      });
    }
  });
  calc.debts.forEach((row) => {
    const balance = debtBalance(row);
    if (balance > 0 && row.dueDate && row.dueDate < today) {
      alerts.push({
        level: "danger",
        title: "应收逾期",
        text: `${projectName(row.projectId)} / ${row.company || "未填单位"}：未收 ${fmtMoney(balance)}，到期 ${row.dueDate}。`,
      });
    }
  });
  calc.payables.forEach((row) => {
    const balance = payableBalance(row);
    if (balance > 0 && row.dueDate && row.dueDate < today) {
      alerts.push({
        level: "warn",
        title: "应付逾期",
        text: `${projectName(row.projectId)} / ${row.company || "未填单位"}：未付 ${fmtMoney(balance)}，到期 ${row.dueDate}。`,
      });
    }
  });
  (state.bankChecks || [])
    .filter((row) => (!activeProjectId() || row.projectId === activeProjectId()) && row.status === "未兑现")
    .forEach((row) => {
      alerts.push({
        level: "warn",
        title: "支票未兑现",
        text: `${projectName(row.projectId)} / ${row.checkNo || "未填支票号"}：金额 ${fmtMoney(row.amount)}，建议定期对账。`,
      });
    });
  calc.projects.forEach((project) => {
    const report = projectBudgetReport(project);
    const pendingChange = projectPendingChangeOrderTotal(project.id);
    if (Math.abs(pendingChange) > 0.01) {
      alerts.push({
        level: "warn",
        title: "工程变更签证待确认",
        text: `${project.name}：待确认变更净额 ${fmtMoney(pendingChange)}，确认后会影响合同额。`,
      });
    }
    if (report.profit < 0) {
      alerts.push({
        level: "danger",
        title: "项目预估亏损",
        text: `${project.name}：预估盈利 ${fmtMoney(report.profit)}，建议核对成本、分包和未收款。`,
      });
    }
    if (report.percent >= 80 && report.actualIncome < report.totalCost) {
      alerts.push({
        level: "warn",
        title: "收款覆盖不足",
        text: `${project.name}：收款进度 ${report.percent.toFixed(3)}%，实际入账低于成本。`,
      });
    }
    if (report.budgetTotal > 0 && report.variance < 0) {
      alerts.push({
        level: "danger",
        title: "项目超预算",
        text: `${project.name}：实际成本超出预算 ${fmtMoney(Math.abs(report.variance))}。`,
      });
    }
  });
  state.progress
    .filter((row) => !activeProjectId() || row.projectId === activeProjectId())
    .map(progressCalc)
    .forEach((row) => {
      const diff = row.ourRemaining - row.expectedRemaining;
      if (Math.abs(diff) > 0.01) {
        alerts.push({
          level: "info",
          title: "进度款入账差额",
          text: `${projectName(row.projectId)} / ${row.period || "未填期次"}：入账分配与公式金额差额 ${fmtMoney(diff)}。`,
        });
      }
    });
  const inventoryMap = new Map();
  const purchaseRows = (state.warehouseItems || []).filter((item) => !activeProjectId() || item.projectId === activeProjectId());
  purchaseRows.forEach((item) => {
    const key = `${item.projectId || ""}__${String(item.name || "").trim().toLowerCase()}`;
    const row = inventoryMap.get(key) || { projectId: item.projectId, name: item.name || "未命名物品", inbound: 0, outbound: 0 };
    if (isWarehouseInboundStatus(item.status)) row.inbound += number(item.quantity);
    inventoryMap.set(key, row);
  });
  (state.warehouseOutbounds || [])
    .filter((item) => !activeProjectId() || item.projectId === activeProjectId())
    .forEach((item) => {
      const key = `${item.projectId || ""}__${String(item.itemName || "").trim().toLowerCase()}`;
      const row = inventoryMap.get(key) || { projectId: item.projectId, name: item.itemName || "未命名物品", inbound: 0, outbound: 0 };
      row.outbound += number(item.quantity);
      inventoryMap.set(key, row);
    });
  [...inventoryMap.values()].map((item) => ({ ...item, remaining: item.inbound - item.outbound })).forEach((item) => {
    if (item.remaining < 0) {
      alerts.push({
        level: "danger",
        title: "库存为负",
        text: `${projectName(item.projectId)} / ${item.name}：库存 ${item.remaining}，请核对出库数量。`,
      });
    } else if (item.remaining < 5) {
      alerts.push({
        level: "warn",
        title: "库存偏低",
        text: `${projectName(item.projectId)} / ${item.name}：剩余 ${item.remaining}，低于 5。`,
      });
    }
  });
  return alerts.slice(0, 10);
}

function taskCenterRows() {
  const selectedProject = activeProjectId();
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  const addTask = (level, moduleName, projectId, title, detail, dueDate = "", action = "查看", viewName = "overview", section = "") => {
    rows.push({
      level,
      moduleName,
      projectName: projectName(projectId),
      title,
      detail,
      dueDate,
      action,
      viewName,
      section,
      sortDate: dueDate || today,
    });
  };

  (state.changeOrders || [])
    .filter((row) => (!selectedProject || row.projectId === selectedProject) && row.status === "待确认")
    .forEach((row) => addTask("warn", "工程变更签证", row.projectId, row.title || row.code || "待确认变更", `金额 ${fmtMoney(row.amount)}，类型 ${row.type}`, row.date, "确认/取消", "changeOrders"));

  (state.companyDebts || [])
    .filter((row) => !selectedProject || row.projectId === selectedProject)
    .forEach((row) => {
      const balance = debtBalance(row);
      if (balance > 0 && row.dueDate && row.dueDate < today) addTask("danger", "应收", row.projectId, row.company || "应收单位", `未收 ${fmtMoney(balance)}，${row.title || ""}`, row.dueDate, "催收", "debts");
    });

  (state.payables || [])
    .filter((row) => !selectedProject || row.projectId === selectedProject)
    .forEach((row) => {
      const balance = payableBalance(row);
      if (balance > 0 && row.dueDate && row.dueDate < today) addTask("warn", "应付", row.projectId, row.company || "应付单位", `未付 ${fmtMoney(balance)}，${row.title || ""}`, row.dueDate, "安排付款", "payables");
    });

  (state.bankChecks || [])
    .filter((row) => (!selectedProject || row.projectId === selectedProject) && row.status === "未兑现")
    .forEach((row) => addTask("warn", "银行支票", row.projectId, row.checkNo || row.payee || "未兑现支票", `金额 ${fmtMoney(row.amount)}，收款方 ${row.payee || ""}`, row.dueDate || row.issueDate, "对账", "checks"));

  state.progress
    .filter((row) => !selectedProject || row.projectId === selectedProject)
    .map(progressCalc)
    .forEach((row) => {
      const diff = row.ourRemaining - row.expectedRemaining;
      if (Math.abs(diff) > 0.01) addTask("info", "进度款", row.projectId, row.period || "进度款差额", `入账分配与公式差额 ${fmtMoney(diff)}`, row.date, "核对入账", "projects");
    });

  state.projects
    .filter((project) => !selectedProject || project.id === selectedProject)
    .forEach((project) => {
      const report = projectBudgetReport(project);
      if (report.budgetTotal > 0 && report.variance < 0) addTask("danger", "预算", project.id, "项目超预算", `超出 ${fmtMoney(Math.abs(report.variance))}，实际成本 ${fmtMoney(report.totalCost)}`, "", "核对成本", "costControl", "summary");
      if (report.profit < 0) addTask("danger", "利润", project.id, "项目预估亏损", `预估盈利 ${fmtMoney(report.profit)}`, "", "核对利润", "projects");
    });

  const inventoryMap = new Map();
  (state.warehouseItems || [])
    .filter((item) => !selectedProject || item.projectId === selectedProject)
    .forEach((item) => {
      const key = `${item.projectId || ""}__${String(item.name || "").trim().toLowerCase()}`;
      const row = inventoryMap.get(key) || { projectId: item.projectId, name: item.name || "未命名物品", inbound: 0, outbound: 0 };
      if (isWarehouseInboundStatus(item.status)) row.inbound += number(item.quantity);
      inventoryMap.set(key, row);
    });
  (state.warehouseOutbounds || [])
    .filter((item) => !selectedProject || item.projectId === selectedProject)
    .forEach((item) => {
      const key = `${item.projectId || ""}__${String(item.itemName || "").trim().toLowerCase()}`;
      const row = inventoryMap.get(key) || { projectId: item.projectId, name: item.itemName || "未命名物品", inbound: 0, outbound: 0 };
      row.outbound += number(item.quantity);
      inventoryMap.set(key, row);
    });
  [...inventoryMap.values()].forEach((item) => {
    const remaining = item.inbound - item.outbound;
    if (remaining < 0) addTask("danger", "材料库存", item.projectId, "库存为负", `${item.name} 库存 ${remaining}`, "", "核对领用出库", "warehouse", "inventory");
    else if (remaining < 5) addTask("warn", "材料库存", item.projectId, "库存偏低", `${item.name} 剩余 ${remaining}`, "", "补货/核对", "costControl", "advice");
  });

  return rows.sort((a, b) => {
    const levelOrder = { danger: 0, warn: 1, info: 2 };
    return (levelOrder[a.level] ?? 9) - (levelOrder[b.level] ?? 9)
      || (a.sortDate || "").localeCompare(b.sortDate || "");
  });
}

function renderTaskCenter() {
  if (!taskCenterTable) return;
  const rows = taskCenterRows();
  const danger = rows.filter((row) => row.level === "danger").length;
  const warn = rows.filter((row) => row.level === "warn").length;
  const info = rows.filter((row) => row.level === "info").length;
  taskCenterCount.textContent = `${rows.length} 项`;
  taskSummary.innerHTML = `
    <div class="settlement-report">
      ${settlementItem("紧急", `${danger} 项`, danger ? "negative" : "positive")}
      ${settlementItem("提醒", `${warn} 项`, warn ? "warn-text" : "positive")}
      ${settlementItem("核对", `${info} 项`)}
      ${settlementItem("当前范围", activeProjectId() ? projectName(activeProjectId()) : "全部项目")}
    </div>
  `;
  taskCenterTable.innerHTML = `
    <thead><tr><th>级别</th><th>模块</th><th>项目</th><th>事项</th><th>说明</th><th>日期</th><th>建议操作</th></tr></thead>
    <tbody>${rows.map((row) => `
      <tr>
        <td><span class="task-badge ${row.level}">${row.level === "danger" ? "紧急" : row.level === "warn" ? "提醒" : "核对"}</span></td>
        <td>${escapeHtml(row.moduleName)}</td>
        <td>${escapeHtml(row.projectName)}</td>
        <td>${escapeHtml(row.title)}</td>
        <td>${escapeHtml(row.detail)}</td>
        <td>${escapeHtml(row.dueDate || "")}</td>
        <td><button class="mini-action-button" type="button" data-task-open="${escapeHtml(row.viewName)}" data-task-section="${escapeHtml(row.section || "")}">${escapeHtml(row.action)}</button></td>
      </tr>
    `).join("") || `<tr><td colspan="7" class="empty">当前没有待办事项</td></tr>`}</tbody>
  `;
}

function managementChecklistRows(calc) {
  const selectedProject = activeProjectId();
  const scopedProjects = state.projects.filter((project) => !selectedProject || project.id === selectedProject);
  const scopedEntries = state.entries.filter((entry) => !selectedProject || entry.projectId === selectedProject);
  const scopedProgress = state.progress.filter((row) => !selectedProject || row.projectId === selectedProject).map(progressCalc);
  const scopedWarehouse = (state.warehouseItems || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const scopedOutbounds = (state.warehouseOutbounds || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const scopedMaterialPlans = (state.materialPlans || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const scopedLabor = (state.laborRecords || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const scopedSubprojects = (state.subprojects || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const scopedSubLedgers = (state.subLedgers || []).filter((item) => !selectedProject || item.projectId === selectedProject);
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  const addRow = (moduleName, level, status, detail, viewName, section = "", action = "去处理") => {
    rows.push({ moduleName, level, status, detail, viewName, section, action });
  };

  const missingContract = scopedProjects.filter((project) => projectContract(project) <= 0).length;
  const missingBudget = scopedProjects.filter((project) => projectBudgetReport(project).budgetTotal <= 0).length;
  if (!scopedProjects.length) addRow("项目资料", "danger", "没有项目", "请先新增工程项目，后面的进度款、流水、材料才能归属到项目。", "projects", "", "新增项目");
  else if (missingContract || missingBudget) addRow("项目资料", "warn", "资料未完整", `${missingContract} 个项目未填合同额，${missingBudget} 个项目未设置预算。`, "projects");
  else addRow("项目资料", "info", "正常", `${scopedProjects.length} 个项目已有基础合同和预算资料。`, "projects", "", "查看");

  const negativeAccounts = calc.accountRows.filter((account) => account.status !== "关闭" && account.ending < 0).length;
  const closedAccounts = state.accounts.filter((account) => account.status === "关闭").length;
  if (!state.accounts.length) addRow("资金账户", "danger", "没有账户", "请先新增银行或现金账户，方便流水和进度款入账。", "accounts", "", "新增账户");
  else if (negativeAccounts) addRow("资金账户", "danger", "余额异常", `${negativeAccounts} 个启用账户余额为负，需要核对资金流水。`, "cashflow");
  else addRow("资金账户", "info", "正常", `${state.accounts.length} 个账户，${closedAccounts} 个已关闭。`, "accounts", "", "查看");

  const progressDiff = scopedProgress.filter((row) => Math.abs(row.ourRemaining - row.expectedRemaining) > 0.01).length;
  const advanceLeftProjects = scopedProjects.filter((project) => {
    const totalAdvance = projectAdvanceAmount(project);
    const deducted = scopedProgress.filter((row) => row.projectId === project.id).reduce((sum, row) => sum + number(row.advanceDeducted), 0);
    return totalAdvance > 0 && totalAdvance - deducted > 0.01;
  }).length;
  if (!scopedProgress.length) addRow("进度款入账", "warn", "未录进度款", "如项目已经收款，请在项目总表下面新增进度款入账明细。", "projects", "", "新增进度款");
  else if (progressDiff) addRow("进度款入账", "danger", "入账差额", `${progressDiff} 条进度款的银行入账分配与公式金额不一致。`, "projects");
  else addRow("进度款入账", advanceLeftProjects ? "warn" : "info", advanceLeftProjects ? "预付款未扣完" : "正常", advanceLeftProjects ? `${advanceLeftProjects} 个项目还有预付款未扣回。` : `${scopedProgress.length} 条进度款已记录。`, "projects", "", "查看");

  const ledgerMissing = scopedEntries.filter((entry) => !entry.projectId || !entry.accountId || !entry.usage || !entry.category).length;
  if (!scopedEntries.length) addRow("收支总明细", "warn", "未录流水", "日常支出、收入、分包关联都建议从收支总明细录入。", "ledger", "", "新增流水");
  else if (ledgerMissing) addRow("收支总明细", "warn", "信息不完整", `${ledgerMissing} 条流水缺少项目、账户、用途或分类。`, "ledger");
  else addRow("收支总明细", "info", "正常", `${scopedEntries.length} 条流水记录可用于统计和对账。`, "ledger", "", "查看");

  const overdueReceivable = (state.companyDebts || []).filter((row) => (!selectedProject || row.projectId === selectedProject) && debtBalance(row) > 0 && row.dueDate && row.dueDate < today).length;
  const overduePayable = (state.payables || []).filter((row) => (!selectedProject || row.projectId === selectedProject) && payableBalance(row) > 0 && row.dueDate && row.dueDate < today).length;
  if (overdueReceivable || overduePayable) addRow("应收应付", overdueReceivable ? "danger" : "warn", "有逾期", `应收逾期 ${overdueReceivable} 条，应付逾期 ${overduePayable} 条。`, overdueReceivable ? "debts" : "payables");
  else addRow("应收应付", "info", "正常", `未收 ${fmtMoney(calc.debtUnpaid)}，未付 ${fmtMoney(calc.payableUnpaid)}。`, "debts", "", "查看");

  const inventoryMap = new Map();
  const ensureInventory = (projectId, name) => {
    const cleanName = String(name || "未命名物品").trim() || "未命名物品";
    const key = `${projectId || ""}__${cleanName.toLowerCase()}`;
    if (!inventoryMap.has(key)) inventoryMap.set(key, { projectId, name: cleanName, inbound: 0, outbound: 0 });
    return inventoryMap.get(key);
  };
  scopedWarehouse.forEach((item) => {
    if (!isWarehouseInboundStatus(item.status)) return;
    ensureInventory(item.projectId, item.name).inbound += number(item.quantity);
  });
  scopedOutbounds.forEach((item) => {
    ensureInventory(item.projectId, item.itemName).outbound += number(item.quantity);
  });
  const inventoryRows = [...inventoryMap.values()].map((item) => ({ ...item, remaining: item.inbound - item.outbound }));
  const negativeStock = inventoryRows.filter((item) => item.remaining < 0).length;
  const lowStock = inventoryRows.filter((item) => item.remaining >= 0 && item.remaining < 5).length;
  const missingTracking = scopedWarehouse.filter((item) => (item.status === "运输中" || item.status === "已下单") && !String(item.trackingNo || "").trim()).length;
  if (negativeStock) addRow("材料仓库", "danger", "库存为负", `${negativeStock} 项材料出库大于入库，需要核对。`, "warehouse", "inventory");
  else if (lowStock || missingTracking) addRow("材料仓库", "warn", "需要跟进", `低库存 ${lowStock} 项，缺快递单号 ${missingTracking} 条。`, "warehouse", lowStock ? "inventory" : "purchase");
  else addRow("材料仓库", "info", "正常", `${scopedWarehouse.length} 条采购，${scopedOutbounds.length} 条领用。`, "warehouse", "", "查看");

  const purchaseAdvice = purchaseAdviceRows(scopedMaterialPlans);
  const needBuy = purchaseAdvice.filter((item) => item.needToBuy > 0).length;
  const laborMissing = scopedLabor.filter((item) => item.mode !== "仅记录" && (!number(item.workerCount) || !number(item.dailyRate))).length;
  if (!scopedMaterialPlans.length && !scopedLabor.length) addRow("成本控制", "warn", "缺成本基础", "建议录入材料计划和人工记录，才能形成成本预算、采购建议和利润判断。", "costControl", "material");
  else if (needBuy || laborMissing) addRow("成本控制", "warn", "需要完善", `建议采购 ${needBuy} 项，人工记录缺人数或单价 ${laborMissing} 条。`, "costControl", needBuy ? "advice" : "labor");
  else addRow("成本控制", "info", "正常", "材料、采购和人工记录可以形成成本统计。", "costControl", "", "查看");

  const subMissingProject = scopedSubprojects.filter((item) => !item.projectId).length;
  if (!scopedSubprojects.length) addRow("分包管理", "warn", "未建分包", "如有分包工程，建议先建立分包项目，再录分包流水。", "subcontracts", "", "新增分包");
  else if (subMissingProject) addRow("分包管理", "warn", "归属不清", `${subMissingProject} 个分包项目未选择所属项目。`, "subcontracts");
  else addRow("分包管理", "info", "正常", `${scopedSubprojects.length} 个分包项目，${scopedSubLedgers.length} 条分包流水。`, "subcontracts", "", "查看");

  const settledProjects = scopedProjects.filter((project) => project.settlementStatus === "已结算").length;
  const finishCandidates = scopedProjects.filter((project) => {
    const report = projectBudgetReport(project);
    return project.settlementStatus !== "已结算" && report.contractTotal > 0 && report.actualIncome >= report.contractTotal * 0.95;
  }).length;
  if (finishCandidates) addRow("结算分红", "warn", "可检查结算", `${finishCandidates} 个项目收款接近合同额，可检查是否需要结算和部分分红。`, "dividends");
  else addRow("结算分红", "info", "正常", `${settledProjects} 个项目已结算，分红付款以应付款和收支流水核对。`, "dividends", "", "查看");

  return rows;
}

function renderManagementChecklist(calc) {
  const rows = managementChecklistRows(calc);
  const rank = { danger: 0, warn: 1, info: 2 };
  const sortedRows = rows.sort((a, b) => (rank[a.level] ?? 9) - (rank[b.level] ?? 9));
  const badgeText = (level) => level === "danger" ? "重点" : level === "warn" ? "提醒" : "正常";
  document.querySelector("#managementChecklist").innerHTML = `
    <table class="mini-table management-table">
      <thead><tr><th>状态</th><th>模块</th><th>检查结果</th><th>说明</th><th>操作</th></tr></thead>
      <tbody>${sortedRows.map((row) => `
        <tr>
          <td><span class="task-badge ${row.level}">${badgeText(row.level)}</span></td>
          <td><strong>${escapeHtml(row.moduleName)}</strong></td>
          <td>${escapeHtml(row.status)}</td>
          <td>${escapeHtml(row.detail)}</td>
          <td><button class="mini-action-button" type="button" data-management-open="${escapeHtml(row.viewName)}" data-management-section="${escapeHtml(row.section || "")}">${escapeHtml(row.action)}</button></td>
        </tr>
      `).join("")}</tbody>
    </table>
  `;
}

function renderBusinessAlerts(calc) {
  const alerts = businessAlertRows(calc);
  document.querySelector("#businessAlerts").innerHTML = alerts.length ? `
    <div class="warehouse-alert-list">
      ${alerts.map((item) => `
        <div class="warehouse-alert ${item.level}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `).join("")}
    </div>
  ` : `<p class="empty">当前没有发现明显风险。</p>`;
  document.querySelector("#improveList").innerHTML = [
    "预算/目标成本：给每个项目设置材料、人工、机械、分包预算，自动看超支。",
    "工程变更签证：把合同外增加、减少工程单独记录，影响合同额和利润。",
    "审批流程：大额支出、支票、分包付款增加审核状态，减少误录。",
    "现金流预测：按未来应收、应付、支票兑现日期预测资金缺口。",
    "发票税务台账：把发票、EWT、保证金、预付款扣回统一核对。",
    "资料归档：合同、支票、收据、采购清单按项目自动归档查询。",
  ].map((item) => `<div class="improve-item">${escapeHtml(item)}</div>`).join("");
  const budgetRows = calc.projects.map((project) => {
    const report = projectBudgetReport(project);
    const hasBudget = report.budgetTotal > 0;
    return `
      <div class="budget-row">
        <div>
          <strong>${escapeHtml(project.name)}</strong>
          <span>${hasBudget ? `已用 ${report.usedPercent.toFixed(1)}%` : "未设置预算"}</span>
        </div>
        <div class="budget-values">
          <span>预算 ${hasBudget ? fmtMoney(report.budgetTotal) : "未填"}</span>
          <span>实际 ${fmtMoney(report.totalCost)}</span>
          <strong class="${report.variance < 0 ? "negative" : "positive"}">${hasBudget ? fmtMoney(report.variance) : "待设置"}</strong>
        </div>
      </div>
    `;
  }).join("");
  document.querySelector("#budgetOverview").innerHTML = budgetRows || `<p class="empty">暂无项目预算</p>`;
  const forecast = cashflowForecast(30);
  document.querySelector("#cashflowForecast").innerHTML = `
    <div class="forecast-grid">
      ${settlementItem("预计收款", fmtMoney(forecast.receivables), "positive")}
      ${settlementItem("预计付款", fmtMoney(forecast.payables), forecast.payables > 0 ? "negative" : "")}
      ${settlementItem("未兑现支票", fmtMoney(forecast.checks), forecast.checks > 0 ? "negative" : "")}
      ${settlementItem("预计净现金流", fmtMoney(forecast.net), forecast.net < 0 ? "negative" : "positive")}
    </div>
    <p class="forecast-note">按应收/应付到期日和未兑现支票日期估算，仅用于提前发现资金缺口。</p>
  `;
  const healthRows = projectHealthRows(calc);
  document.querySelector("#projectHealthTable").innerHTML = `
    <thead><tr><th>状态</th><th>项目</th><th class="num">合同额</th><th class="num">已确认变更</th><th class="num">预算使用</th><th class="num">实际入账</th><th class="num">成本</th><th class="num">未收</th><th class="num">未付</th><th class="num">预估利润</th><th>原因</th></tr></thead>
    <tbody>${healthRows.map((row) => `
      <tr>
        <td><span class="task-badge ${row.level}">${escapeHtml(row.status)}</span></td>
        <td>${escapeHtml(row.project.name)}</td>
        <td class="num">${fmtMoney(row.report.contractTotal)}</td>
        <td class="num ${row.confirmedChange < 0 ? "negative" : "positive"}">${fmtMoney(row.confirmedChange)}</td>
        <td class="num ${row.budgetUsed > 100 ? "negative" : ""}">${row.report.budgetTotal ? `${row.budgetUsed.toFixed(1)}%` : "未填"}</td>
        <td class="num ${row.incomeCover < 100 && row.report.totalCost > 0 ? "warn-text" : "positive"}">${fmtMoney(row.report.actualIncome)}</td>
        <td class="num">${fmtMoney(row.report.totalCost)}</td>
        <td class="num ${row.debtUnpaid > 0 ? "warn-text" : ""}">${fmtMoney(row.debtUnpaid)}</td>
        <td class="num ${row.payableUnpaid > 0 ? "warn-text" : ""}">${fmtMoney(row.payableUnpaid)}</td>
        <td class="num ${row.report.profit < 0 ? "negative" : "positive"}">${fmtMoney(row.report.profit)}</td>
        <td>${escapeHtml(row.reason)}</td>
      </tr>
    `).join("") || `<tr><td colspan="11" class="empty">暂无项目数据</td></tr>`}</tbody>
  `;
}

function renderOverview() {
  const calc = calculations();
  const subtitle = projectFilter.value ? projectName(projectFilter.value) : `${state.projects.length} 个项目共用资金`;
  const totalAccountBalance = calc.accountRows.reduce((sum, row) => sum + row.ending, 0);
  const warehouseRows = (state.warehouseItems || []).filter((item) => !projectFilter.value || item.projectId === projectFilter.value);
  const warehouseInTransit = warehouseRows.filter((item) => item.status === "运输中").length;
  const warehouseAmount = warehouseRows
    .filter((item) => item.status !== "已取消")
    .reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
  const laborControlAmount = (state.laborRecords || [])
    .filter((item) => (!projectFilter.value || item.projectId === projectFilter.value) && item.mode !== "仅记录")
    .reduce((sum, item) => sum + laborRecordTotal(item), 0);
  document.querySelector(".eyebrow").textContent = subtitle;
  document.querySelector("#kpiGrid").innerHTML = [
    kpi("合同总收入", fmtMoney(calc.contractTotal), projectFilter.value ? "当前项目" : "全部项目合计"),
    kpi("累计进度款", fmtMoney(calc.progressTotal), `完成 ${pct(calc.progressPercent)}`),
    kpi("实际入账金额", fmtMoney(calc.ourRemaining), "按银行入账分配金额统计"),
    kpi("未收金额", fmtMoney(calc.debtUnpaid), `${calc.debts.length} 条应收记录`, calc.debtUnpaid > 0 ? "negative" : "positive"),
    kpi("未付金额", fmtMoney(calc.payableUnpaid), `${calc.payables.length} 条应付记录`, calc.payableUnpaid > 0 ? "negative" : "positive"),
    kpi("公共资金余额", fmtMoney(totalAccountBalance), "账户初始 + 流水 + 分包流水 + 支票兑现 + 入账进度款", totalAccountBalance < 0 ? "negative" : "positive"),
    kpi("流水收入", fmtMoney(calc.ledgerIncome), `${calc.entries.length} 笔筛选内流水`),
    kpi("流水支出", fmtMoney(Math.abs(calc.ledgerExpense)), "按收支类型自动统计"),
    kpi("保证金扣款", fmtMoney(calc.marginDeducted), "按项目保证金比例扣回"),
    kpi("EWT 税费", fmtMoney(calc.ewtTotal), "材料税 + 人工税"),
    kpi("采购入库", fmtMoney(warehouseAmount), `运输中 ${warehouseInTransit} 条`),
    kpi("人工成本", fmtMoney(laborControlAmount), "人工记录中计入成本的金额"),
  ].join("");

  document.querySelector("#progressBadge").textContent = pct(calc.progressPercent);
  document.querySelector("#progressFill").style.width = `${Math.min(100, calc.progressPercent * 100)}%`;
  document.querySelector("#progressMini").innerHTML = calc.progressRows.slice(0, 8)
    .map((item) => `<div class="mini-row"><div><strong>${escapeHtml(projectName(item.projectId))} / ${escapeHtml(item.period)}</strong><div class="muted">${pct(item.percent)} / 入账 ${escapeHtml(allocationSummary(item))}</div></div><strong>${fmtMoney(item.amount)}</strong></div>`)
    .join("") || `<p class="empty">暂无进度款</p>`;

  document.querySelector("#accountList").innerHTML = calc.accountRows
    .map((account) => `<div class="account-row"><div><strong>${escapeHtml(account.name)}</strong><div class="muted">进度入账 ${fmtMoney(account.progressIncome)} / 支票 ${fmtMoney(account.checkTotal)} / 分包 ${fmtMoney(account.subLedgerTotal)} / 钢结构 ${fmtMoney(account.steel)} / 其它 ${fmtMoney(account.other)}</div></div><strong class="${account.ending < 0 ? "negative" : "positive"}">${fmtMoney(account.ending)}</strong></div>`)
    .join("");
  renderBusinessAlerts(calc);
  renderManagementChecklist(calc);
}

function renderProjects() {
  const projectRows = filteredProjects().map((project) => {
    const ewtTotals = projectEwtTotals(project.id);
    const confirmedChange = projectChangeOrderTotal(project.id);
    const pendingChange = projectPendingChangeOrderTotal(project.id);
    return `
    <article class="simple-card project-simple-card">
      <div class="simple-card-check">
        <input class="row-check" type="checkbox" data-select-project="${project.index}" />
      </div>
      <label class="simple-field name-field">
        <span>项目名称</span>
        <input class="cell-input" data-project="${project.index}" data-field="name" value="${escapeHtml(project.name)}" />
      </label>
      <label class="simple-field">
        <span>合同额</span>
        <input class="cell-input num" data-project="${project.index}" data-field="contractAmount" type="number" step="0.01" placeholder="${fmtMoney(number(project.area) * number(project.unitPrice))}" value="${project.contractAmount === "" || project.contractAmount === undefined || project.contractAmount === null ? "" : number(project.contractAmount)}" />
      </label>
      <label class="simple-field">
        <span>预付总金额</span>
        <input class="cell-input num" data-project="${project.index}" data-field="advanceReceived" type="number" step="0.01" placeholder="${fmtMoney(projectContract(project) * number(project.advanceDeductRate ?? 0.3))}" value="${project.advanceReceived === "" || project.advanceReceived === undefined || project.advanceReceived === null ? "" : number(project.advanceReceived)}" />
      </label>
      <label class="simple-field">
        <span>预付扣回比例</span>
        <input class="cell-input num" data-project="${project.index}" data-field="advanceDeductRate" type="number" step="0.0001" value="${number(project.advanceDeductRate ?? 0.3)}" />
      </label>
      <label class="simple-field">
        <span>保证金</span>
        <input class="cell-input num" data-project="${project.index}" data-field="marginAmount" type="number" step="0.01" placeholder="${fmtMoney(projectContract(project) * number(project.marginRate ?? 0.1))}" value="${project.marginAmount === "" || project.marginAmount === undefined || project.marginAmount === null ? "" : number(project.marginAmount)}" />
      </label>
      <div class="simple-field">
        <span>已确认变更</span>
        <strong class="readonly ${confirmedChange < 0 ? "negative" : "positive"}">${fmtMoney(confirmedChange)}</strong>
      </div>
      <details class="simple-more">
        <summary>更多</summary>
        <div class="simple-grid">
          <label class="simple-field">
            <span>平方</span>
            <input class="cell-input num" data-project="${project.index}" data-field="area" type="number" step="0.01" value="${number(project.area)}" />
          </label>
          <label class="simple-field">
            <span>单价</span>
            <input class="cell-input num" data-project="${project.index}" data-field="unitPrice" type="number" step="0.01" value="${number(project.unitPrice)}" />
          </label>
          <div class="simple-field">
            <span>材料EWT</span>
            <strong class="readonly">${fmtMoney(ewtTotals.material)}</strong>
          </div>
          <div class="simple-field">
            <span>人工EWT</span>
            <strong class="readonly">${fmtMoney(ewtTotals.labor)}</strong>
          </div>
          <div class="simple-field">
            <span>待确认变更</span>
            <strong class="readonly ${pendingChange < 0 ? "negative" : "danger-text"}">${fmtMoney(pendingChange)}</strong>
          </div>
          <label class="simple-field">
            <span>UPIF比例</span>
            <input class="cell-input num" data-project="${project.index}" data-field="philippinesRate" type="number" step="0.0001" value="${number(project.philippinesRate ?? 0.06)}" />
          </label>
          <label class="simple-field">
            <span>UPIF预扣比例</span>
            <input class="cell-input num" data-project="${project.index}" data-field="philippinesAdvanceRate" type="number" step="0.0001" value="${number(project.philippinesAdvanceRate)}" />
          </label>
          <label class="simple-field">
            <span>保证金比例</span>
            <input class="cell-input num" data-project="${project.index}" data-field="marginRate" type="number" step="0.0001" value="${number(project.marginRate ?? 0.1)}" />
          </label>
          <label class="simple-field">
            <span>预算-材料</span>
            <input class="cell-input num" data-project="${project.index}" data-field="budgetMaterial" type="number" step="0.01" value="${project.budgetMaterial === "" || project.budgetMaterial === undefined || project.budgetMaterial === null ? "" : number(project.budgetMaterial)}" />
          </label>
          <label class="simple-field">
            <span>预算-人工</span>
            <input class="cell-input num" data-project="${project.index}" data-field="budgetLabor" type="number" step="0.01" value="${project.budgetLabor === "" || project.budgetLabor === undefined || project.budgetLabor === null ? "" : number(project.budgetLabor)}" />
          </label>
          <label class="simple-field">
            <span>预算-分包</span>
            <input class="cell-input num" data-project="${project.index}" data-field="budgetSubcontract" type="number" step="0.01" value="${project.budgetSubcontract === "" || project.budgetSubcontract === undefined || project.budgetSubcontract === null ? "" : number(project.budgetSubcontract)}" />
          </label>
          <label class="simple-field">
            <span>预算-其它</span>
            <input class="cell-input num" data-project="${project.index}" data-field="budgetOther" type="number" step="0.01" value="${project.budgetOther === "" || project.budgetOther === undefined || project.budgetOther === null ? "" : number(project.budgetOther)}" />
          </label>
          <div class="simple-field upload-field">
            <span>合同上传</span>
            ${imagesCell("project", project.index, project.contractImages, false, "contractImages")}
          </div>
        </div>
        ${budgetSnapshotPanel(project)}
      </details>
    </article>
  `;
  }).join("");
  document.querySelector("#projectFormulaList").innerHTML = [
    "合同额 = 手动合同额；如未填写，则为 平方 × 单价",
    "当前合同额 = 基础合同额 + 已确认工程变更签证（增加为正，减少为负）",
    "预付总金额 = 手动输入预付总金额；如未填写，则为 合同额 × 项目预付扣回比例",
    "保证金 = 手动输入保证金；如未填写，则为 合同额 × 项目保证金比例",
    "材料EWT、人工EWT = 只能在进度款入账明细中手动输入，并自动汇总到项目总表",
    "预付款扣回 = 预付总金额 × 进度%；保证金 = 进度款 × 项目保证金比例",
    "UPIF应付金额 = 每一期的进度款 × 项目UPIF比例；最终应付UPIF = UPIF应付金额 - UPIF预扣",
    "预算控制 = 材料预算 + 人工预算 + 分包预算 + 其它预算；预算差额 = 预算总额 - 当前实际成本",
    "实际入账金额 = 银行入账分配金额合计",
  ].map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  document.querySelector("#projectTable").innerHTML = projectRows || `<p class="empty">没有查询到项目</p>`;
  bindProjectInputs();
  bindImageControls();
}

function renderAccounts() {
  const accountRows = filteredAccounts().map((account) => {
    const balance = account.balance;
    const remaining = balance?.ending ?? number(account.initial);
    return `
      <tr>
        <td><input class="row-check" type="checkbox" data-select-account="${account.index}" /></td>
        <td><input class="cell-input" data-account="${account.index}" data-field="name" value="${escapeHtml(account.name)}" /></td>
        <td><input class="cell-input num" data-account="${account.index}" data-field="initial" type="number" step="0.01" value="${number(account.initial)}" /></td>
        <td class="num readonly ${remaining < 0 ? "negative" : "positive"}">${fmtMoney(remaining)}</td>
        <td><select class="cell-input account-status-select" data-account="${account.index}" data-field="status">${selectOptions(accountStatuses, account.status || "启用")}</select></td>
        <td>${imagesCell("account", account.index, account.images)}</td>
      </tr>
    `;
  }).join("");
  document.querySelector("#accountTable").innerHTML = `
    <caption class="account-caption">
      <strong>剩余金额来源</strong>
      <span>全部项目：初始金额 + 账户调整 + 进度款银行入账分配 + 项目收支流水收入/支出 + 独立分包流水。</span>
      <span>选择单个项目时：只统计该项目相关流水，不加公共账户初始金额。关闭账户后不再作为新流水可选账户，历史记录仍保留。</span>
    </caption>
    <thead><tr><th class="select-col"></th><th>账户名称</th><th class="num">初始金额</th><th class="num">剩余金额</th><th>状态</th><th>图片</th></tr></thead>
    <tbody>${accountRows || `<tr><td colspan="6" class="empty">没有查询到账户</td></tr>`}</tbody>
  `;
  bindAccountInputs();
  renderAccountAdjustments();
  bindImageControls();
}

function filteredAccountAdjustments() {
  const words = queryWords(searchInput.value);
  return (state.accountAdjustments || [])
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${accountName(item.accountId)} ${item.type} ${item.amount} ${item.note}`.toLowerCase();
      return textMatches(text, words) && (!accountFilter.value || item.accountId === accountFilter.value);
    });
}

function renderAccountAdjustments() {
  document.querySelector("#accountAdjustmentTable").innerHTML = `
    <thead><tr><th>日期</th><th>账户</th><th>加减</th><th class="num">金额</th><th>备注</th></tr></thead>
    <tbody>${filteredAccountAdjustments().map((item) => `
      <tr>
        <td><input class="cell-input" data-account-adjustment="${item.index}" data-field="date" type="date" value="${escapeHtml(item.date)}" /></td>
        <td><select class="cell-input" data-account-adjustment="${item.index}" data-field="accountId">${selectOptions(state.accounts, item.accountId)}</select></td>
        <td><select class="cell-input" data-account-adjustment="${item.index}" data-field="type">${selectOptions(["增加", "减少"], item.type)}</select></td>
        <td><input class="cell-input num" data-account-adjustment="${item.index}" data-field="amount" type="number" step="0.01" min="0" value="${number(item.amount)}" /></td>
        <td><input class="cell-input wide-note" data-account-adjustment="${item.index}" data-field="note" value="${escapeHtml(item.note)}" placeholder="填写调整原因或备注" /></td>
      </tr>
    `).join("") || `<tr><td colspan="5" class="empty">暂无账户调整记录</td></tr>`}</tbody>
  `;
  bindAccountAdjustmentInputs();
}

function renderCashflow() {
  const rows = filteredCashflowRows();
  const income = rows.filter((row) => number(row.amount) > 0).reduce((sum, row) => sum + number(row.amount), 0);
  const expense = rows.filter((row) => number(row.amount) < 0).reduce((sum, row) => sum + number(row.amount), 0);
  const net = income + expense;
  document.querySelector("#cashflowCount").textContent = `${rows.length} 条`;
  document.querySelector("#cashflowAuditSummary").innerHTML = `
    <div class="audit-card"><span>收入增加</span><strong class="positive">${fmtMoney(income)}</strong></div>
    <div class="audit-card"><span>支出减少</span><strong class="negative">${fmtMoney(Math.abs(expense))}</strong></div>
    <div class="audit-card"><span>余额影响</span><strong class="${net < 0 ? "negative" : "positive"}">${fmtMoney(net)}</strong></div>
  `;
  document.querySelector("#cashflowTable").innerHTML = `
    <thead>
      <tr><th>日期</th><th>来源</th><th>项目</th><th>资金账户</th><th>说明</th><th class="num">收入</th><th class="num">支出</th><th class="num">余额影响</th><th class="num">变动后余额</th><th>备注</th></tr>
    </thead>
    <tbody>${rows.map((row) => {
      const amount = number(row.amount);
      const balanceAfter = number(row.balanceAfter);
      return `
        <tr>
          <td>${escapeHtml(row.date || "初始")}</td>
          <td><span class="badge ${row.source === "收支总明细" || row.source === "项目收支流水" ? "quiet" : ""}">${escapeHtml(cashflowSourceLabel(row.source))}</span></td>
          <td>${row.projectId ? escapeHtml(projectName(row.projectId)) : "公共账户"}</td>
          <td>${escapeHtml(accountName(row.accountId))}</td>
          <td>${escapeHtml(row.title || "")}</td>
          <td class="num positive">${amount > 0 ? fmtMoney(amount) : ""}</td>
          <td class="num negative">${amount < 0 ? fmtMoney(Math.abs(amount)) : ""}</td>
          <td class="num ${amount < 0 ? "negative" : "positive"}">${fmtMoney(amount)}</td>
          <td class="num ${balanceAfter < 0 ? "negative" : "positive"}">${fmtMoney(balanceAfter)}</td>
          <td>${escapeHtml(row.note || "")}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="10" class="empty">没有查询到资金流水变化</td></tr>`}</tbody>
  `;
}

function filteredWarehouseItems() {
  const words = queryWords(searchInput.value, warehouseSearch.value);
  const from = warehouseDateFrom.value;
  const to = warehouseDateTo.value;
  const status = warehouseStatusFilter.value;
  return (state.warehouseItems || [])
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.stage} ${item.name} ${item.supplier} ${item.carrier} ${item.trackingNo} ${item.status} ${item.note}`.toLowerCase();
      const date = item.date || "";
      return textMatches(text, words)
        && (!from || date >= from)
        && (!to || date <= to)
        && (!status || item.status === status)
        && (!projectFilter.value || item.projectId === projectFilter.value);
    });
}

function warehouseInventoryRows(rows) {
  const words = queryWords(searchInput.value, warehouseSearch.value);
  const groups = new Map();
  const ensureGroup = (projectId, name) => {
    const cleanName = String(name || "未命名物品").trim() || "未命名物品";
    const key = `${projectId || ""}__${cleanName.toLowerCase()}`;
    if (!groups.has(key)) {
      groups.set(key, {
        projectId: projectId || "",
        name: cleanName,
        inbound: 0,
        outbound: 0,
        amount: 0,
      });
    }
    return groups.get(key);
  };
  rows.forEach((item) => {
    const row = ensureGroup(item.projectId, item.name);
    const qty = number(item.quantity);
    if (isWarehouseInboundStatus(item.status)) row.inbound += qty;
    row.amount += qty * number(item.unitPrice);
  });
  (state.warehouseOutbounds || [])
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.itemName} ${item.receiver} ${item.note}`.toLowerCase();
      return (!projectFilter.value || item.projectId === projectFilter.value)
        && (!words.length || textMatches(text, words) || rows.some((row) => row.projectId === item.projectId && String(row.name || "").trim().toLowerCase() === String(item.itemName || "").trim().toLowerCase()));
    })
    .forEach((item) => {
      const row = ensureGroup(item.projectId, item.itemName);
      row.outbound += number(item.quantity);
    });
  return [...groups.values()]
    .map((row) => ({ ...row, remaining: row.inbound - row.outbound }))
    .sort((a, b) => projectName(a.projectId).localeCompare(projectName(b.projectId), "zh-Hans-CN") || a.name.localeCompare(b.name, "zh-Hans-CN"));
}

function warehouseOutboundRows(rows) {
  const words = queryWords(searchInput.value, warehouseSearch.value);
  const from = warehouseDateFrom.value;
  const to = warehouseDateTo.value;
  const itemNames = new Set(rows.map((item) => `${item.projectId || ""}__${String(item.name || "").trim().toLowerCase()}`));
  return (state.warehouseOutbounds || [])
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.itemName} ${item.receiver} ${item.note}`.toLowerCase();
      const date = item.date || "";
      const key = `${item.projectId || ""}__${String(item.itemName || "").trim().toLowerCase()}`;
      return textMatches(text, words)
        && (!from || date >= from)
        && (!to || date <= to)
        && (!projectFilter.value || item.projectId === projectFilter.value)
        && (!warehouseSearch.value.trim() || itemNames.has(key) || textMatches(text, words));
    });
}

function warehouseUnitPrice(projectId, itemName) {
  const name = String(itemName || "").trim().toLowerCase();
  const matches = (state.warehouseItems || []).filter((item) => item.projectId === projectId && String(item.name || "").trim().toLowerCase() === name);
  const qty = matches.reduce((sum, item) => sum + number(item.quantity), 0);
  const amount = matches.reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
  return qty ? amount / qty : 0;
}

function warehouseFlowRows(purchaseRows, outboundRows) {
  const movements = [];
  purchaseRows
    .filter((item) => isWarehouseInboundStatus(item.status))
    .forEach((item) => {
      const quantity = number(item.quantity);
      const unitPrice = number(item.unitPrice);
      movements.push({
        id: `in_${item.id}`,
        date: item.arrivalDate || item.date || "",
        projectId: item.projectId,
        itemName: item.name,
        type: "入库",
        quantity,
        unitPrice,
        amount: quantity * unitPrice,
        source: "采购入库",
        note: `${item.supplier || ""} ${item.trackingNo || ""} ${item.note || ""}`.trim(),
      });
    });
  outboundRows.forEach((item) => {
    const quantity = number(item.quantity);
    const unitPrice = warehouseUnitPrice(item.projectId, item.itemName);
    movements.push({
      id: `out_${item.id}`,
      date: item.date || "",
      projectId: item.projectId,
      itemName: item.itemName,
      type: "出库",
      quantity: -quantity,
      unitPrice,
      amount: -quantity * unitPrice,
      source: "材料领用出库",
      note: `${item.receiver || ""} ${item.note || ""}`.trim(),
    });
  });
  const sorted = [...movements].sort((a, b) => (a.date || "").localeCompare(b.date || "") || a.type.localeCompare(b.type, "zh-Hans-CN"));
  const balances = new Map();
  sorted.forEach((item) => {
    const key = `${item.projectId || ""}__${String(item.itemName || "").trim().toLowerCase()}`;
    const nextBalance = number(balances.get(key)) + number(item.quantity);
    balances.set(key, nextBalance);
    item.balanceAfter = nextBalance;
  });
  return sorted.reverse();
}

function warehouseAlertRows(inventoryRows, purchaseRows, outboundRows) {
  const alerts = [];
  inventoryRows.forEach((item) => {
    if (item.remaining < 0) {
      alerts.push({
        level: "danger",
        title: "领用超量",
        text: `${projectName(item.projectId)} / ${item.name}：库存 ${item.remaining}，请核对采购入库或出库数量。`,
      });
    } else if (item.remaining < 5) {
      alerts.push({
        level: "warn",
        title: "库存偏低",
        text: `${projectName(item.projectId)} / ${item.name}：剩余 ${item.remaining}。`,
      });
    }
  });
  purchaseRows.forEach((item) => {
    if ((item.status === "运输中" || item.status === "已下单") && !String(item.trackingNo || "").trim()) {
      alerts.push({
        level: "warn",
        title: "缺快递单号",
        text: `${projectName(item.projectId)} / ${item.name}：${item.status}，建议补充单号。`,
      });
    }
    if (isWarehouseInboundStatus(item.status) && !item.arrivalDate) {
      alerts.push({
        level: "info",
        title: "缺入库日期",
        text: `${projectName(item.projectId)} / ${item.name}：建议补充入库日期，方便追溯。`,
      });
    }
  });
  outboundRows.forEach((item) => {
    if (!String(item.receiver || "").trim()) {
      alerts.push({
        level: "info",
        title: "缺领用说明",
        text: `${projectName(item.projectId)} / ${item.itemName}：建议填写领用人或用途。`,
      });
    }
  });
  return alerts.slice(0, 12);
}

function filteredMaterialPlans() {
  const words = queryWords(searchInput.value, costSearch?.value || "");
  return (state.materialPlans || [])
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.stage} ${item.materialName} ${item.spec} ${item.unit} ${item.supplier} ${item.note}`.toLowerCase();
      return textMatches(text, words) && (!projectFilter.value || item.projectId === projectFilter.value);
    });
}

function filteredLaborRecords() {
  const words = queryWords(searchInput.value, costSearch?.value || "");
  const from = costDateFrom?.value || "";
  const to = costDateTo?.value || "";
  return (state.laborRecords || [])
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const text = `${projectName(item.projectId)} ${item.stage} ${item.team} ${item.workType} ${item.mode} ${item.note}`.toLowerCase();
      const date = item.date || "";
      return textMatches(text, words)
        && (!from || date >= from)
        && (!to || date <= to)
        && (!projectFilter.value || item.projectId === projectFilter.value);
    });
}

function materialPriceStats(projectId, materialName) {
  const cleanName = String(materialName || "").trim().toLowerCase();
  const matches = (state.warehouseItems || [])
    .filter((item) => (!projectId || item.projectId === projectId) && String(item.name || "").trim().toLowerCase() === cleanName && number(item.unitPrice) > 0)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const prices = matches.map((item) => number(item.unitPrice));
  const suppliers = [...new Set(matches.map((item) => item.supplier).filter(Boolean))];
  return {
    count: matches.length,
    latest: matches[0]?.unitPrice ? number(matches[0].unitPrice) : 0,
    lowest: prices.length ? Math.min(...prices) : 0,
    highest: prices.length ? Math.max(...prices) : 0,
    average: prices.length ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0,
    supplierText: suppliers.join("、") || "未记录",
  };
}

function priceCompareRows() {
  const words = queryWords(searchInput.value, costSearch?.value || "");
  const grouped = new Map();
  (state.warehouseItems || [])
    .filter((item) => !projectFilter.value || item.projectId === projectFilter.value)
    .forEach((item) => {
      const cleanName = String(item.name || "建筑材料").trim() || "建筑材料";
      const key = `${item.projectId || ""}__${cleanName.toLowerCase()}`;
      const row = grouped.get(key) || {
        projectId: item.projectId,
        materialName: cleanName,
        quantity: 0,
        amount: 0,
        suppliers: new Set(),
        prices: [],
        latestDate: "",
        latestPrice: 0,
      };
      const qty = number(item.quantity);
      const price = number(item.unitPrice);
      row.quantity += qty;
      row.amount += qty * price;
      if (item.supplier) row.suppliers.add(item.supplier);
      if (price > 0) row.prices.push(price);
      if ((item.date || "") >= row.latestDate) {
        row.latestDate = item.date || "";
        row.latestPrice = price;
      }
      grouped.set(key, row);
    });
  return [...grouped.values()].map((row) => {
    const plan = (state.materialPlans || []).find((item) => item.projectId === row.projectId && String(item.materialName || "").trim().toLowerCase() === row.materialName.toLowerCase());
    const budgetPrice = number(plan?.budgetUnitPrice);
    const average = row.prices.length ? row.prices.reduce((sum, price) => sum + price, 0) / row.prices.length : 0;
    return {
      ...row,
      suppliers: [...row.suppliers].join("、") || "未填",
      lowest: row.prices.length ? Math.min(...row.prices) : 0,
      highest: row.prices.length ? Math.max(...row.prices) : 0,
      average,
      budgetPrice,
      diff: budgetPrice ? row.latestPrice - budgetPrice : 0,
    };
  }).filter((row) => {
    const text = `${projectName(row.projectId)} ${row.materialName} ${row.suppliers}`.toLowerCase();
    return textMatches(text, words);
  }).sort((a, b) => projectName(a.projectId).localeCompare(projectName(b.projectId), "zh-Hans-CN") || a.materialName.localeCompare(b.materialName, "zh-Hans-CN"));
}

function costAlertRows(materialRows, laborRows, priceRows, adviceRows = []) {
  const alerts = [];
  materialRows.forEach((item) => {
    const budget = number(item.budgetQuantity) * number(item.budgetUnitPrice);
    const stats = materialPriceStats(item.projectId, item.materialName);
    const comparePrice = stats.latest || stats.average;
    const overPrice = number(item.alertPrice) || number(item.budgetUnitPrice);
    if (budget <= 0) {
      alerts.push({ level: "info", title: "材料预算未完整", text: `${projectName(item.projectId)} / ${item.materialName}：建议填写预算数量和预算单价。` });
    }
    if (overPrice > 0 && comparePrice > overPrice) {
      alerts.push({ level: "danger", title: "材料单价超预算", text: `${projectName(item.projectId)} / ${item.materialName}：最新或平均单价 ${fmtMoney(comparePrice)}，预算/预警单价 ${fmtMoney(overPrice)}。` });
    }
  });
  laborRows.forEach((item) => {
    const total = laborRecordTotal(item);
    if (item.mode !== "仅记录" && total > 0 && number(item.paidAmount) > total) {
      alerts.push({ level: "warn", title: "人工付款超应付", text: `${projectName(item.projectId)} / ${item.team}：已付 ${fmtMoney(item.paidAmount)}，应付 ${fmtMoney(total)}。` });
    }
    if (item.mode !== "仅记录" && number(item.workerCount) <= 0) {
      alerts.push({ level: "info", title: "人工人数未填", text: `${projectName(item.projectId)} / ${item.team}：建议填写人数，方便核算工日。` });
    }
  });
  priceRows.forEach((item) => {
    if (item.budgetPrice > 0 && item.diff > 0) {
      alerts.push({ level: "warn", title: "采购价格上涨", text: `${projectName(item.projectId)} / ${item.materialName}：最新采购单价比预算高 ${fmtMoney(item.diff)}。` });
    }
  });
  adviceRows.forEach((item) => {
    if (item.status === "领用超计划") {
      alerts.push({ level: "danger", title: "材料领用超计划", text: `${projectName(item.projectId)} / ${item.materialName}：计划 ${item.budgetQuantity} ${item.unit}，已领用 ${item.outbound} ${item.unit}。` });
    } else if (item.needToBuy > 0) {
      alerts.push({ level: "warn", title: "材料需采购", text: `${projectName(item.projectId)} / ${item.materialName}：建议采购 ${item.needToBuy} ${item.unit}。` });
    }
  });
  state.projects
    .filter((project) => !projectFilter.value || project.id === projectFilter.value)
    .forEach((project) => {
      const laborBudget = number(project.budgetLabor);
      const laborCost = projectLaborCost(project.id);
      if (laborBudget > 0 && laborCost > laborBudget) {
        alerts.push({ level: "danger", title: "人工成本超预算", text: `${project.name}：人工已用 ${fmtMoney(laborCost)}，预算 ${fmtMoney(laborBudget)}。` });
      }
    });
  return alerts.slice(0, 12);
}

function purchaseAdviceRows(materialRows) {
  const purchaseRows = (state.warehouseItems || []).filter((item) => item.status !== "已取消" && (!projectFilter.value || item.projectId === projectFilter.value));
  const inventoryRows = warehouseInventoryRows(purchaseRows);
  const inventoryMap = new Map(inventoryRows.map((item) => [`${item.projectId || ""}__${String(item.name || "").trim().toLowerCase()}`, item]));
  const groups = new Map();
  const ensure = (item) => {
    const key = `${item.projectId || ""}__${String(item.materialName || "").trim().toLowerCase()}`;
    if (!groups.has(key)) {
      groups.set(key, {
        projectId: item.projectId || "",
        materialName: item.materialName || "建筑材料",
        spec: item.spec || "",
        unit: item.unit || "项",
        stages: new Set(),
        budgetQuantity: 0,
        budgetAmount: 0,
        latestPrice: 0,
      });
    }
    return groups.get(key);
  };
  materialRows.forEach((item) => {
    const row = ensure(item);
    if (item.stage) row.stages.add(item.stage);
    row.budgetQuantity += number(item.budgetQuantity);
    row.budgetAmount += number(item.budgetQuantity) * number(item.budgetUnitPrice);
    const latest = materialPriceStats(item.projectId, item.materialName).latest;
    if (latest) row.latestPrice = latest;
  });
  return [...groups.values()].map((row) => {
    const inventory = inventoryMap.get(`${row.projectId || ""}__${String(row.materialName || "").trim().toLowerCase()}`) || { inbound: 0, outbound: 0, remaining: 0 };
    const needToBuy = Math.max(row.budgetQuantity - number(inventory.inbound), 0);
    const overUsed = number(inventory.outbound) > row.budgetQuantity && row.budgetQuantity > 0;
    let status = "已够用";
    let level = "positive";
    if (overUsed) {
      status = "领用超计划";
      level = "negative";
    } else if (needToBuy > 0) {
      status = "需采购";
      level = "warn-text";
    } else if (number(inventory.remaining) < 5) {
      status = "库存偏低";
      level = "warn-text";
    }
    return {
      ...row,
      stages: [...row.stages].join("、") || "未分阶段",
      inbound: number(inventory.inbound),
      outbound: number(inventory.outbound),
      remaining: number(inventory.remaining),
      needToBuy,
      estimatedAmount: needToBuy * (row.latestPrice || (row.budgetQuantity ? row.budgetAmount / row.budgetQuantity : 0)),
      status,
      level,
    };
  }).sort((a, b) => {
    const score = (item) => item.status === "领用超计划" ? 0 : item.status === "需采购" ? 1 : item.status === "库存偏低" ? 2 : 3;
    return score(a) - score(b) || projectName(a.projectId).localeCompare(projectName(b.projectId), "zh-Hans-CN") || a.materialName.localeCompare(b.materialName, "zh-Hans-CN");
  });
}

function stageCostRows(materialRows, laborRows, purchaseRows) {
  const groups = new Map();
  const ensure = (projectId, stage) => {
    const cleanStage = constructionStages.includes(stage) ? stage : "其它";
    const key = `${projectId || ""}__${cleanStage}`;
    if (!groups.has(key)) {
      groups.set(key, {
        projectId: projectId || "",
        stage: cleanStage,
        materialBudget: 0,
        purchaseActual: 0,
        laborActual: 0,
      });
    }
    return groups.get(key);
  };
  materialRows.forEach((item) => {
    ensure(item.projectId, item.stage).materialBudget += number(item.budgetQuantity) * number(item.budgetUnitPrice);
  });
  purchaseRows.forEach((item) => {
    if (item.status === "已取消") return;
    ensure(item.projectId, item.stage).purchaseActual += number(item.quantity) * number(item.unitPrice);
  });
  laborRows.forEach((item) => {
    if (item.mode === "仅记录") return;
    ensure(item.projectId, item.stage).laborActual += laborRecordTotal(item);
  });
  return [...groups.values()]
    .map((row) => ({
      ...row,
      totalActual: row.purchaseActual + row.laborActual,
      materialDiff: row.materialBudget ? row.materialBudget - row.purchaseActual : 0,
    }))
    .sort((a, b) => projectName(a.projectId).localeCompare(projectName(b.projectId), "zh-Hans-CN")
      || constructionStages.indexOf(a.stage) - constructionStages.indexOf(b.stage));
}

function renderCostControl() {
  if (!costControlCount) return;
  const materialRows = filteredMaterialPlans();
  const laborRows = filteredLaborRecords();
  const priceRows = priceCompareRows();
  const adviceRows = purchaseAdviceRows(materialRows);
  const materialBudget = materialRows.reduce((sum, item) => sum + number(item.budgetQuantity) * number(item.budgetUnitPrice), 0);
  const laborCost = laborRows.filter((item) => item.mode !== "仅记录").reduce((sum, item) => sum + laborRecordTotal(item), 0);
  const laborPaid = laborRows.reduce((sum, item) => sum + number(item.paidAmount), 0);
  const purchaseWords = queryWords(searchInput.value, costSearch?.value || "");
  const purchaseRows = (state.warehouseItems || []).filter((item) => {
    const text = `${projectName(item.projectId)} ${item.stage} ${item.name} ${item.supplier} ${item.carrier} ${item.trackingNo} ${item.status} ${item.note}`.toLowerCase();
    return (!projectFilter.value || item.projectId === projectFilter.value) && textMatches(text, purchaseWords);
  });
  const stageRows = stageCostRows(materialRows, laborRows, purchaseRows);
  const purchaseCost = purchaseRows
    .filter((item) => item.status !== "已取消")
    .reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
  const overPriceCount = priceRows.filter((item) => item.budgetPrice > 0 && item.diff > 0).length;
  costControlCount.textContent = `${materialRows.length} 材料 / ${laborRows.length} 人工`;
  document.querySelector("#costStats").innerHTML = `
    <div class="audit-card"><span>材料计划预算</span><strong>${fmtMoney(materialBudget)}</strong></div>
    <div class="audit-card"><span>采购实际金额</span><strong>${fmtMoney(purchaseCost)}</strong></div>
    <div class="audit-card"><span>人工应付成本</span><strong>${fmtMoney(laborCost)}</strong></div>
    <div class="audit-card"><span>人工已付</span><strong class="${laborPaid > laborCost ? "negative" : "positive"}">${fmtMoney(laborPaid)}</strong></div>
    <div class="audit-card"><span>价格超预算</span><strong class="${overPriceCount ? "negative" : "positive"}">${overPriceCount} 项</strong></div>
  `;
  const alerts = costAlertRows(materialRows, laborRows, priceRows, adviceRows);
  document.querySelector("#costAlerts").innerHTML = alerts.length ? `
    <div class="warehouse-alert-title">成本提醒</div>
    <div class="warehouse-alert-list">
      ${alerts.map((item) => `
        <div class="warehouse-alert ${item.level}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `).join("")}
    </div>
  ` : `<p class="empty">当前没有发现明显成本风险。</p>`;
  const summaryRows = state.projects
    .filter((project) => !projectFilter.value || project.id === projectFilter.value)
    .map((project) => {
      const report = projectBudgetReport(project);
      const projectPurchase = (state.warehouseItems || []).filter((item) => item.projectId === project.id && item.status !== "已取消").reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
      const projectMaterialBudget = projectMaterialPlanTotal(project.id) || number(project.budgetMaterial);
      const projectLabor = projectLaborCost(project.id);
      const laborBudget = number(project.budgetLabor);
      return { project, report, projectPurchase, projectMaterialBudget, projectLabor, laborBudget };
    });
  document.querySelector("#costSummaryTable").innerHTML = `
    <thead><tr><th>项目</th><th class="num">合同额</th><th class="num">材料预算</th><th class="num">采购实际</th><th class="num">材料差额</th><th class="num">人工预算</th><th class="num">人工实际</th><th class="num">人工差额</th><th class="num">项目总成本</th><th class="num">预估利润</th></tr></thead>
    <tbody>${summaryRows.map((row) => `
      <tr>
        <td>${escapeHtml(row.project.name)}</td>
        <td class="num">${fmtMoney(row.report.contractTotal)}</td>
        <td class="num">${row.projectMaterialBudget ? fmtMoney(row.projectMaterialBudget) : "未填"}</td>
        <td class="num">${fmtMoney(row.projectPurchase)}</td>
        <td class="num ${row.projectMaterialBudget && row.projectMaterialBudget - row.projectPurchase < 0 ? "negative" : "positive"}">${row.projectMaterialBudget ? fmtMoney(row.projectMaterialBudget - row.projectPurchase) : "待设置"}</td>
        <td class="num">${row.laborBudget ? fmtMoney(row.laborBudget) : "未填"}</td>
        <td class="num">${fmtMoney(row.projectLabor)}</td>
        <td class="num ${row.laborBudget && row.laborBudget - row.projectLabor < 0 ? "negative" : "positive"}">${row.laborBudget ? fmtMoney(row.laborBudget - row.projectLabor) : "待设置"}</td>
        <td class="num">${fmtMoney(row.report.totalCost)}</td>
        <td class="num ${row.report.profit < 0 ? "negative" : "positive"}">${fmtMoney(row.report.profit)}</td>
      </tr>
    `).join("") || `<tr><td colspan="10" class="empty">暂无成本汇总</td></tr>`}</tbody>
  `;
  document.querySelector("#stageCostTable").innerHTML = `
    <thead><tr><th>项目</th><th>施工阶段</th><th class="num">材料预算</th><th class="num">采购实际</th><th class="num">材料差额</th><th class="num">人工实际</th><th class="num">阶段实际成本</th><th>提示</th></tr></thead>
    <tbody>${stageRows.map((row) => {
      const overMaterial = row.materialBudget > 0 && row.materialDiff < 0;
      return `
        <tr>
          <td>${escapeHtml(projectName(row.projectId))}</td>
          <td>${bilingualText(row.stage)}</td>
          <td class="num">${row.materialBudget ? fmtMoney(row.materialBudget) : "未设"}</td>
          <td class="num">${fmtMoney(row.purchaseActual)}</td>
          <td class="num ${overMaterial ? "negative" : "positive"}">${row.materialBudget ? fmtMoney(row.materialDiff) : "待设置"}</td>
          <td class="num">${fmtMoney(row.laborActual)}</td>
          <td class="num">${fmtMoney(row.totalActual)}</td>
          <td>${overMaterial ? '<span class="task-badge danger">材料超预算</span>' : '<span class="task-badge info">正常</span>'}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="8" class="empty">暂无施工阶段成本数据；录入材料计划、采购入库或人工记录后自动汇总。</td></tr>`}</tbody>
  `;
  document.querySelector("#purchaseAdviceTable").innerHTML = `
    <thead><tr><th>项目</th><th>材料名称</th><th>规格</th><th>阶段</th><th class="num">计划数量</th><th class="num">已入库</th><th class="num">已领用</th><th class="num">当前库存</th><th class="num">建议采购</th><th class="num">预计金额</th><th>状态</th></tr></thead>
    <tbody>${adviceRows.map((row) => `
      <tr>
        <td>${escapeHtml(projectName(row.projectId))}</td>
        <td>${bilingualText(row.materialName)}</td>
        <td>${escapeHtml(row.spec || "")}</td>
        <td>${bilingualText(row.stages)}</td>
        <td class="num">${number(row.budgetQuantity)} ${bilingualText(row.unit)}</td>
        <td class="num">${number(row.inbound)} ${bilingualText(row.unit)}</td>
        <td class="num ${row.outbound > row.budgetQuantity && row.budgetQuantity > 0 ? "negative" : ""}">${number(row.outbound)} ${bilingualText(row.unit)}</td>
        <td class="num ${row.remaining < 0 ? "negative" : row.remaining < 5 ? "warn-text" : "positive"}">${number(row.remaining)} ${bilingualText(row.unit)}</td>
        <td class="num ${row.needToBuy > 0 ? "warn-text" : "positive"}">${number(row.needToBuy)} ${bilingualText(row.unit)}</td>
        <td class="num">${row.estimatedAmount ? fmtMoney(row.estimatedAmount) : "待报价"}</td>
        <td><span class="task-badge ${row.level === "positive" ? "info" : row.level === "negative" ? "danger" : "warn"}">${escapeHtml(row.status)}</span></td>
      </tr>
    `).join("") || `<tr><td colspan="11" class="empty">暂无采购建议；录入材料计划后自动生成。</td></tr>`}</tbody>
  `;
  document.querySelector("#materialPlanTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>项目</th><th>阶段</th><th>材料名称</th><th>规格</th><th>单位</th><th class="num">预算数量</th><th class="num">预算单价</th><th class="num">预算金额</th><th class="num">最新采购价</th><th class="num">价差</th><th>目标供应商</th><th>备注</th></tr></thead>
    <tbody>${materialRows.map((item) => {
      const budgetAmount = number(item.budgetQuantity) * number(item.budgetUnitPrice);
      const stats = materialPriceStats(item.projectId, item.materialName);
      const latest = stats.latest || stats.average;
      const diff = number(item.budgetUnitPrice) ? latest - number(item.budgetUnitPrice) : 0;
      return `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-material-plan="${item.index}" /></td>
          <td><select class="cell-input" data-material-plan="${item.index}" data-field="projectId">${selectOptions(state.projects, item.projectId)}</select></td>
          <td><select class="cell-input" data-material-plan="${item.index}" data-field="stage">${selectOptions(constructionStages, item.stage)}</select></td>
          <td><input class="cell-input" data-material-plan="${item.index}" data-field="materialName" value="${escapeHtml(item.materialName)}" /></td>
          <td><input class="cell-input" data-material-plan="${item.index}" data-field="spec" value="${escapeHtml(item.spec)}" /></td>
          <td><input class="cell-input" data-material-plan="${item.index}" data-field="unit" value="${escapeHtml(item.unit)}" /></td>
          <td><input class="cell-input num" data-material-plan="${item.index}" data-field="budgetQuantity" type="number" step="0.01" min="0" value="${number(item.budgetQuantity)}" /></td>
          <td><input class="cell-input num" data-material-plan="${item.index}" data-field="budgetUnitPrice" type="number" step="0.01" min="0" value="${number(item.budgetUnitPrice)}" /></td>
          <td class="num readonly">${fmtMoney(budgetAmount)}</td>
          <td class="num ${diff > 0 ? "negative" : "positive"}">${latest ? fmtMoney(latest) : "无采购"}</td>
          <td class="num ${diff > 0 ? "negative" : "positive"}">${latest && item.budgetUnitPrice ? fmtMoney(diff) : ""}</td>
          <td><input class="cell-input" data-material-plan="${item.index}" data-field="supplier" value="${escapeHtml(item.supplier)}" /></td>
          <td><input class="cell-input wide-note" data-material-plan="${item.index}" data-field="note" value="${escapeHtml(item.note)}" /></td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="13" class="empty">暂无材料计划，点击“新增材料计划”录入预算数量和预算单价。</td></tr>`}</tbody>
  `;
  document.querySelector("#laborRecordTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>项目</th><th>施工阶段</th><th>施工班组</th><th>工种</th><th class="num">人数</th><th class="num">工日数</th><th class="num">工日单价</th><th class="num">加班费</th><th class="num">补贴</th><th class="num">应付工资</th><th class="num">已付工资</th><th>是否计入成本</th><th>备注</th></tr></thead>
    <tbody>${laborRows.map((item) => {
      const total = laborRecordTotal(item);
      const balance = total - number(item.paidAmount);
      return `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-labor-record="${item.index}" /></td>
          <td><input class="cell-input" data-labor-record="${item.index}" data-field="date" type="date" value="${escapeHtml(item.date)}" /></td>
          <td><select class="cell-input" data-labor-record="${item.index}" data-field="projectId">${selectOptions(state.projects, item.projectId)}</select></td>
          <td><select class="cell-input" data-labor-record="${item.index}" data-field="stage">${selectOptions(constructionStages, item.stage)}</select></td>
          <td><input class="cell-input" data-labor-record="${item.index}" data-field="team" value="${escapeHtml(item.team)}" /></td>
          <td><input class="cell-input" data-labor-record="${item.index}" data-field="workType" value="${escapeHtml(item.workType)}" /></td>
          <td><input class="cell-input num" data-labor-record="${item.index}" data-field="workerCount" type="number" step="0.01" min="0" value="${number(item.workerCount)}" /></td>
          <td><input class="cell-input num" data-labor-record="${item.index}" data-field="workDays" type="number" step="0.01" min="0" value="${number(item.workDays)}" /></td>
          <td><input class="cell-input num" data-labor-record="${item.index}" data-field="dailyRate" type="number" step="0.01" min="0" value="${number(item.dailyRate)}" /></td>
          <td><input class="cell-input num" data-labor-record="${item.index}" data-field="overtimeAmount" type="number" step="0.01" min="0" value="${number(item.overtimeAmount)}" /></td>
          <td><input class="cell-input num" data-labor-record="${item.index}" data-field="allowance" type="number" step="0.01" min="0" value="${number(item.allowance)}" /></td>
          <td class="num readonly">${fmtMoney(total)}</td>
          <td><input class="cell-input num ${balance < 0 ? "input-danger" : ""}" data-labor-record="${item.index}" data-field="paidAmount" type="number" step="0.01" min="0" value="${number(item.paidAmount)}" /></td>
          <td><select class="cell-input" data-labor-record="${item.index}" data-field="mode">${selectOptions(laborCostModes, item.mode)}</select></td>
          <td><input class="cell-input wide-note" data-labor-record="${item.index}" data-field="note" value="${escapeHtml(item.note)}" /></td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="15" class="empty">暂无人工记录，点击“新增人工记录”录入班组、工日和工资。</td></tr>`}</tbody>
  `;
  document.querySelector("#priceCompareTable").innerHTML = `
    <thead><tr><th>项目</th><th>材料名称</th><th>供应商</th><th class="num">采购次数</th><th class="num">采购数量</th><th class="num">预算单价</th><th class="num">最新单价</th><th class="num">最低价</th><th class="num">平均价</th><th class="num">最高价</th><th class="num">最新差额</th></tr></thead>
    <tbody>${priceRows.map((item) => `
      <tr>
        <td>${escapeHtml(projectName(item.projectId))}</td>
        <td>${escapeHtml(item.materialName)}</td>
        <td>${escapeHtml(item.suppliers)}</td>
        <td class="num">${item.prices.length}</td>
        <td class="num">${item.quantity}</td>
        <td class="num">${item.budgetPrice ? fmtMoney(item.budgetPrice) : "未设"}</td>
        <td class="num ${item.diff > 0 ? "negative" : "positive"}">${item.latestPrice ? fmtMoney(item.latestPrice) : ""}</td>
        <td class="num positive">${item.lowest ? fmtMoney(item.lowest) : ""}</td>
        <td class="num">${item.average ? fmtMoney(item.average) : ""}</td>
        <td class="num ${item.budgetPrice && item.highest > item.budgetPrice ? "negative" : ""}">${item.highest ? fmtMoney(item.highest) : ""}</td>
        <td class="num ${item.diff > 0 ? "negative" : "positive"}">${item.budgetPrice ? fmtMoney(item.diff) : ""}</td>
      </tr>
    `).join("") || `<tr><td colspan="11" class="empty">暂无采购价格可比对；采购入库后会自动汇总。</td></tr>`}</tbody>
  `;
  applyCostSectionState();
  bindCostInputs();
}

function renderWarehouse() {
  const rows = filteredWarehouseItems();
  const inventoryRows = warehouseInventoryRows(rows);
  const outboundRows = warehouseOutboundRows(rows);
  const flowRows = warehouseFlowRows(rows, outboundRows);
  const totalAmount = rows.filter((item) => item.status !== "已取消").reduce((sum, item) => sum + number(item.quantity) * number(item.unitPrice), 0);
  const inTransit = rows.filter((item) => item.status === "运输中").length;
  const arrived = rows.filter((item) => isWarehouseInboundStatus(item.status)).length;
  const pending = rows.filter((item) => item.status === "待采购" || item.status === "已下单").length;
  const inboundTotal = inventoryRows.reduce((sum, item) => sum + item.inbound, 0);
  const outboundTotal = inventoryRows.reduce((sum, item) => sum + item.outbound, 0);
  const stockTotal = inventoryRows.reduce((sum, item) => sum + item.remaining, 0);
  const lowStock = inventoryRows.filter((item) => item.remaining < 5).length;
  document.querySelector("#warehouseCount").textContent = `${rows.length} 条`;
  document.querySelector("#warehouseStats").innerHTML = `
    <div class="audit-card"><span>采购总额</span><strong>${fmtMoney(totalAmount)}</strong></div>
    <div class="audit-card"><span>待处理</span><strong>${pending} 条</strong></div>
    <div class="audit-card"><span>运输中</span><strong>${inTransit} 条</strong></div>
    <div class="audit-card"><span>已入库</span><strong>${arrived} 条</strong></div>
    <div class="audit-card"><span>入库数量</span><strong>${inboundTotal}</strong></div>
    <div class="audit-card"><span>出库数量</span><strong>${outboundTotal}</strong></div>
    <div class="audit-card"><span>库存剩余</span><strong class="${stockTotal < 5 ? "negative" : "positive"}">${stockTotal}</strong></div>
    <div class="audit-card"><span>低库存提示</span><strong class="${lowStock ? "negative" : "positive"}">${lowStock} 项</strong></div>
  `;
  const alerts = warehouseAlertRows(inventoryRows, rows, outboundRows);
  document.querySelector("#warehouseAlerts").innerHTML = alerts.length ? `
    <div class="warehouse-alert-title">库存提醒</div>
    <div class="warehouse-alert-list">
      ${alerts.map((item) => `
        <div class="warehouse-alert ${item.level}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `).join("")}
    </div>
  ` : "";
  document.querySelector("#warehouseInventoryTable").innerHTML = `
    <caption class="inventory-caption">库存总览：采购入库自动增加库存，材料领用出库自动扣减库存，剩余低于 5 会红色提示。</caption>
    <thead><tr><th>项目</th><th>材料名称</th><th class="num">入库</th><th class="num">领用出库</th><th class="num">库存剩余</th><th class="num">采购金额</th></tr></thead>
    <tbody>${inventoryRows.map((item) => `
      <tr>
        <td>${escapeHtml(projectName(item.projectId))}</td>
        <td>${bilingualText(item.name)}</td>
        <td class="num positive">${item.inbound}</td>
        <td class="num negative">${item.outbound}</td>
        <td class="num ${item.remaining < 5 ? "negative low-stock" : "positive"}">${item.remaining}</td>
        <td class="num">${fmtMoney(item.amount)}</td>
      </tr>
    `).join("") || `<tr><td colspan="6" class="empty">暂无库存统计</td></tr>`}</tbody>
  `;
  document.querySelector("#warehouseOutboundTable").innerHTML = `
    <thead>
      <tr><th class="select-col"></th><th>领用日期</th><th>项目</th><th>材料名称</th><th class="num">领用数量</th><th class="num">当前剩余</th><th>领用人/用途</th><th>备注</th></tr>
    </thead>
    <tbody>${outboundRows.map((item) => {
      const stock = inventoryRows.find((row) => row.projectId === item.projectId && row.name.toLowerCase() === String(item.itemName || "").trim().toLowerCase());
      const remainingQty = stock?.remaining ?? 0;
      return `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-warehouse-outbound="${item.index}" /></td>
          <td><input class="cell-input" data-warehouse-outbound="${item.index}" data-field="date" type="date" value="${escapeHtml(item.date)}" /></td>
          <td><select class="cell-input" data-warehouse-outbound="${item.index}" data-field="projectId">${selectOptions(state.projects, item.projectId)}</select></td>
          <td><select class="cell-input" data-warehouse-outbound="${item.index}" data-field="itemName">${warehouseItemOptions(item.itemName, item.projectId)}</select></td>
          <td><input class="cell-input num ${remainingQty < 0 ? "input-danger" : ""}" data-warehouse-outbound="${item.index}" data-field="quantity" type="number" step="0.01" min="0" value="${number(item.quantity)}" /></td>
          <td class="num readonly ${remainingQty < 5 ? "negative low-stock" : "positive"}">${remainingQty}</td>
          <td><input class="cell-input" data-warehouse-outbound="${item.index}" data-field="receiver" value="${escapeHtml(item.receiver)}" /></td>
          <td><input class="cell-input wide-note" data-warehouse-outbound="${item.index}" data-field="note" value="${escapeHtml(item.note)}" /></td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="8" class="empty">暂无材料领用记录，点击“新增领用”录入分批出库。</td></tr>`}</tbody>
  `;
  document.querySelector("#warehouseFlowTable").innerHTML = `
    <thead>
      <tr><th>日期</th><th>类型</th><th>项目</th><th>材料名称</th><th class="num">入库</th><th class="num">领用出库</th><th class="num">库存余额</th><th class="num">金额影响</th><th>来源</th><th>备注</th></tr>
    </thead>
    <tbody>${flowRows.map((item) => {
      const quantity = number(item.quantity);
      const amount = number(item.amount);
      return `
        <tr>
          <td>${escapeHtml(item.date || "")}</td>
          <td><span class="badge ${item.type === "出库" ? "quiet" : ""}">${escapeHtml(item.type)}</span></td>
          <td>${escapeHtml(projectName(item.projectId))}</td>
          <td>${bilingualText(item.itemName || "")}</td>
          <td class="num positive">${quantity > 0 ? quantity : ""}</td>
          <td class="num negative">${quantity < 0 ? Math.abs(quantity) : ""}</td>
          <td class="num ${number(item.balanceAfter) < 5 ? "negative low-stock" : "positive"}">${number(item.balanceAfter)}</td>
          <td class="num ${amount < 0 ? "negative" : "positive"}">${fmtMoney(amount)}</td>
          <td>${escapeHtml(item.source || "")}</td>
          <td>${escapeHtml(item.note || "")}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="10" class="empty">暂无库存流水；采购入库后会生成入库记录，材料领用后会生成领用出库记录。</td></tr>`}</tbody>
  `;
  document.querySelector("#warehouseTable").innerHTML = `
    <thead>
      <tr><th class="select-col"></th><th>采购日期</th><th>项目</th><th>施工阶段</th><th>材料名称</th><th>供应商</th><th class="num">数量</th><th class="num">采购单价</th><th class="num">采购金额</th><th>物流公司</th><th>快递单号</th><th>状态</th><th>入库日期</th><th>备注</th><th>物流查询</th></tr>
    </thead>
    <tbody>${rows.map((item) => {
      const total = number(item.quantity) * number(item.unitPrice);
      const trackUrl = item.trackingNo ? `https://www.17track.net/zh-cn/track?nums=${encodeURIComponent(item.trackingNo)}` : "";
      return `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-warehouse="${item.index}" /></td>
          <td><input class="cell-input" data-warehouse="${item.index}" data-field="date" type="date" value="${escapeHtml(item.date)}" /></td>
          <td><select class="cell-input" data-warehouse="${item.index}" data-field="projectId">${selectOptions(state.projects, item.projectId)}</select></td>
          <td><select class="cell-input" data-warehouse="${item.index}" data-field="stage">${selectOptions(constructionStages, item.stage)}</select></td>
          <td><input class="cell-input" data-warehouse="${item.index}" data-field="name" value="${escapeHtml(item.name)}" /></td>
          <td><input class="cell-input" data-warehouse="${item.index}" data-field="supplier" value="${escapeHtml(item.supplier)}" /></td>
          <td><input class="cell-input num" data-warehouse="${item.index}" data-field="quantity" type="number" step="0.01" min="0" value="${number(item.quantity)}" /></td>
          <td><input class="cell-input num" data-warehouse="${item.index}" data-field="unitPrice" type="number" step="0.01" min="0" value="${number(item.unitPrice)}" /></td>
          <td class="num readonly">${fmtMoney(total)}</td>
          <td><select class="cell-input" data-warehouse="${item.index}" data-field="carrier">${selectOptions(warehouseCarriers, item.carrier)}</select></td>
          <td><input class="cell-input" data-warehouse="${item.index}" data-field="trackingNo" value="${escapeHtml(item.trackingNo)}" /></td>
          <td><select class="cell-input" data-warehouse="${item.index}" data-field="status">${selectOptions(warehouseStatuses, item.status)}</select></td>
          <td><input class="cell-input" data-warehouse="${item.index}" data-field="arrivalDate" type="date" value="${escapeHtml(item.arrivalDate)}" /></td>
          <td><input class="cell-input wide-note" data-warehouse="${item.index}" data-field="note" value="${escapeHtml(item.note)}" /></td>
          <td>${trackUrl ? `<a class="track-link" href="${trackUrl}" target="_blank" rel="noopener">查询</a>` : '<span class="muted">无单号</span>'}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="15" class="empty">没有查询到采购入库记录</td></tr>`}</tbody>
  `;
  applyWarehouseSectionState();
  bindWarehouseInputs();
}

function bindWarehouseInputs() {
  document.querySelectorAll("[data-warehouse]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.warehouse);
      const field = input.dataset.field;
      const item = state.warehouseItems[index];
      if (!item) return;
      item[field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "trackingNo" && item.trackingNo && (item.status === "待采购" || item.status === "已下单")) item.status = "运输中";
      if (field === "arrivalDate" && item.arrivalDate && item.status !== "已取消") item.status = "已入库";
      if (field === "outboundQuantity") {
        if (number(item.outboundQuantity) > number(item.quantity)) item.outboundQuantity = number(item.quantity);
        if (number(item.outboundQuantity) > 0 && item.status !== "已取消") item.status = "已入库";
      }
      if (field === "quantity" && number(item.outboundQuantity) > number(item.quantity)) item.outboundQuantity = number(item.quantity);
      saveState(`修改采购入库：${item.name}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-warehouse-outbound]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.warehouseOutbound);
      const field = input.dataset.field;
      const row = state.warehouseOutbounds[index];
      if (!row) return;
      row[field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "projectId") {
        row.itemName = state.warehouseItems.find((item) => item.projectId === row.projectId)?.name || row.itemName;
      }
      saveState(`修改材料领用出库：${row.itemName}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
}

function bindCostInputs() {
  document.querySelectorAll("[data-material-plan]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.materialPlan);
      const field = input.dataset.field;
      const item = state.materialPlans[index];
      if (!item) return;
      item[field] = input.type === "number" ? number(input.value) : input.value;
      saveState(`修改材料计划：${item.materialName}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-labor-record]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.laborRecord);
      const field = input.dataset.field;
      const item = state.laborRecords[index];
      if (!item) return;
      item[field] = input.type === "number" ? number(input.value) : input.value;
      saveState(`修改人工记录：${item.team}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedWarehouse() {
  const indexes = selectedIndexes("[data-select-warehouse]");
  if (!indexes.length) return alert("请先勾选要删除的采购入库记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条采购入库记录吗？`)) return;
  archiveDeletedRecords("采购入库", indexes.map((index) => state.warehouseItems[index]));
  indexes.forEach((index) => state.warehouseItems.splice(index, 1));
  saveState(`删除采购入库：${indexes.length} 条`);
  renderAll();
}

function deleteSelectedMaterialPlans() {
  const indexes = selectedIndexes("[data-select-material-plan]");
  if (!indexes.length) return alert("请先勾选要删除的材料计划。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条材料计划吗？`)) return;
  archiveDeletedRecords("材料计划", indexes.map((index) => state.materialPlans[index]));
  indexes.forEach((index) => state.materialPlans.splice(index, 1));
  saveState(`删除材料计划：${indexes.length} 条`);
  renderAll();
}

function deleteSelectedLaborRecords() {
  const indexes = selectedIndexes("[data-select-labor-record]");
  if (!indexes.length) return alert("请先勾选要删除的人工记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条人工记录吗？`)) return;
  archiveDeletedRecords("人工记录", indexes.map((index) => state.laborRecords[index]));
  indexes.forEach((index) => state.laborRecords.splice(index, 1));
  saveState(`删除人工记录：${indexes.length} 条`);
  renderAll();
}

function deleteSelectedWarehouseOutbounds() {
  const indexes = selectedIndexes("[data-select-warehouse-outbound]");
  if (!indexes.length) return alert("请先勾选要删除的材料领用记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条材料领用记录吗？`)) return;
  archiveDeletedRecords("材料领用出库", indexes.map((index) => state.warehouseOutbounds[index]));
  indexes.forEach((index) => state.warehouseOutbounds.splice(index, 1));
  saveState(`删除材料领用出库：${indexes.length} 条`);
  renderAll();
}

function checkCashflowErrors() {
  const issues = cashflowAuditIssues();
  if (!issues.length) {
    alert("当前未发现资金流水错误。账户余额、项目和账户关联、分包同步记录核对正常。");
    return;
  }
  alert(`发现 ${issues.length} 个可能错误：\n\n${issues.slice(0, 12).join("\n")}${issues.length > 12 ? "\n\n还有更多问题，请缩小查询范围后继续核对。" : ""}`);
}

function exportCashflow() {
  void exportCsvKind("cashflow");
}

function filteredUserAccounts() {
  const words = queryWords(searchInput.value, userSearch.value);
  return (state.userAccounts || [])
    .map((user, index) => ({ ...user, index }))
    .filter((user) => {
      const text = `${user.name} ${user.username} ${user.role} ${user.status} ${user.phone} ${user.note}`.toLowerCase();
      return textMatches(text, words);
    });
}

function renderUserAccounts() {
  const rows = filteredUserAccounts().map((user) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-user="${user.index}" /></td>
      <td><input class="cell-input" data-user="${user.index}" data-field="name" value="${escapeHtml(user.name)}" /></td>
      <td><input class="cell-input" data-user="${user.index}" data-field="username" value="${escapeHtml(user.username)}" /></td>
      <td><input class="cell-input" data-user="${user.index}" data-field="password" type="password" value="${escapeHtml(user.password || "")}" /></td>
      <td><select class="cell-input" data-user="${user.index}" data-field="role">${selectOptions(userRoles, user.role)}</select></td>
      <td><select class="cell-input" data-user="${user.index}" data-field="status">${selectOptions(userStatuses, user.status)}</select></td>
      <td><input class="cell-input" data-user="${user.index}" data-field="phone" value="${escapeHtml(user.phone)}" /></td>
      <td>${permissionChecks(user, "view", user.index)}</td>
      <td>${permissionChecks(user, "edit", user.index)}</td>
      <td><input class="cell-input wide-note" data-user="${user.index}" data-field="note" value="${escapeHtml(user.note)}" /></td>
    </tr>
  `).join("");
  document.querySelector("#userTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>姓名</th><th>登录账号</th><th>登录密码</th><th>角色</th><th>状态</th><th>电话</th><th>查看权限</th><th>编辑权限</th><th>备注</th></tr></thead>
    <tbody>${rows || `<tr><td colspan="10" class="empty">没有查询到账号</td></tr>`}</tbody>
  `;
  bindUserAccountInputs();
}

function bindUserAccountInputs() {
  document.querySelectorAll("[data-user]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.user);
      const field = input.dataset.field;
      state.userAccounts[index][field] = input.value;
      if (field === "role" && input.value === "管理员") {
        state.userAccounts[index].permissions.view = allPermissionIds();
        state.userAccounts[index].permissions.edit = allPermissionIds();
      }
      saveState(`修改账号：${state.userAccounts[index].name}`);
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-user-permission]").forEach((input) => {
    input.addEventListener("change", () => {
      const index = Number(input.dataset.userPermission);
      const kind = input.dataset.permissionKind;
      const moduleId = input.dataset.permissionModule;
      const list = new Set(state.userAccounts[index].permissions[kind] || []);
      if (input.checked) list.add(moduleId);
      else list.delete(moduleId);
      state.userAccounts[index].permissions[kind] = [...list];
      if (kind === "edit" && input.checked && !state.userAccounts[index].permissions.view.includes(moduleId)) {
        state.userAccounts[index].permissions.view.push(moduleId);
      }
      saveState(`修改账号权限：${state.userAccounts[index].name}`);
      renderUserAccounts();
    });
  });
}

function deleteSelectedUsers() {
  const indexes = selectedIndexes("[data-select-user]");
  if (!indexes.length) return alert("请先勾选要删除的账号。");
  if (state.userAccounts.length - indexes.length < 1) return alert("至少保留一个账号。");
  const names = indexes.map((index) => state.userAccounts[index]?.name).filter(Boolean).join("、");
  if (!confirm(`确定删除选中的 ${indexes.length} 个账号吗？`)) return;
  archiveDeletedRecords("账号", indexes.map((index) => state.userAccounts[index]));
  indexes.forEach((index) => state.userAccounts.splice(index, 1));
  saveState(`删除账号：${names}`);
  renderAll();
}

function bindProjectInputs() {
  document.querySelectorAll("[data-project]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.project);
      const field = input.dataset.field;
      const autoFields = new Set(["contractAmount", "advanceReceived", "marginAmount", "budgetMaterial", "budgetLabor", "budgetSubcontract", "budgetOther"]);
      state.projects[index][field] = input.type === "number" ? (autoFields.has(field) && input.value === "" ? "" : number(input.value)) : input.value;
      saveState(`修改项目：${state.projects[index].name}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-lock-budget]").forEach((button) => {
    button.addEventListener("click", () => lockProjectBudget(button.dataset.lockBudget));
  });
  document.querySelectorAll("[data-undo-budget-lock]").forEach((button) => {
    button.addEventListener("click", () => undoProjectBudgetLock(button.dataset.undoBudgetLock));
  });
}

function lockProjectBudget(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  const current = projectBudgetSnapshotValues(project);
  if (current.totalBudget <= 0 && !confirm("当前预算合计为0，确定仍然锁定预算吗？")) return;
  const name = prompt("请输入预算版本名称", `预算版本 ${(project.budgetSnapshots?.length || 0) + 1}`);
  if (name === null) return;
  const note = prompt("请输入锁定备注，例如：开工前预算、图纸更新后预算", "") || "";
  project.budgetSnapshots = Array.isArray(project.budgetSnapshots) ? project.budgetSnapshots : [];
  project.budgetSnapshots.unshift({
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleString("zh-CN", { hour12: false }),
    name: name.trim() || `预算版本 ${project.budgetSnapshots.length + 1}`,
    ...current,
    note,
  });
  project.budgetSnapshots = project.budgetSnapshots.slice(0, 12);
  saveState(`锁定预算版本：${project.name}`);
  renderAll();
}

function undoProjectBudgetLock(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project?.budgetSnapshots?.length) return;
  const snapshot = project.budgetSnapshots[0];
  if (!confirm(`确定撤销「${project.name}」最近一次预算锁定吗？\n版本：${snapshot.name || "预算版本"} / ${snapshot.date || ""}`)) return;
  archiveDeletedRecords("预算版本", snapshot);
  project.budgetSnapshots.shift();
  saveState(`撤销预算锁定：${project.name}`);
  renderAll();
}

function removeProjectAt(index) {
  const project = state.projects[index];
  if (!project) return;
  archiveDeletedRecords("项目总表", project);
  archiveDeletedRecords("关联进度款", state.progress.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联项目收支流水", state.entries.filter((entry) => entry.projectId === project.id));
  archiveDeletedRecords("关联应收", state.companyDebts.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联应付", state.payables.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联工程变更签证", state.changeOrders.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联银行支票", state.bankChecks.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联材料计划", state.materialPlans.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联人工记录", state.laborRecords.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联采购入库", state.warehouseItems.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联材料领用出库", state.warehouseOutbounds.filter((row) => row.projectId === project.id));
  archiveDeletedRecords("关联分包项目", state.subprojects.filter((row) => row.projectId === project.id));
  state.progress = state.progress.filter((row) => row.projectId !== project.id);
  state.entries = state.entries.filter((entry) => entry.projectId !== project.id);
  state.companyDebts = state.companyDebts.filter((row) => row.projectId !== project.id);
  state.payables = state.payables.filter((row) => row.projectId !== project.id);
  state.changeOrders = state.changeOrders.filter((row) => row.projectId !== project.id);
  state.bankChecks = state.bankChecks.filter((row) => row.projectId !== project.id);
  state.materialPlans = state.materialPlans.filter((row) => row.projectId !== project.id);
  state.laborRecords = state.laborRecords.filter((row) => row.projectId !== project.id);
  state.warehouseItems = state.warehouseItems.filter((row) => row.projectId !== project.id);
  state.warehouseOutbounds = state.warehouseOutbounds.filter((row) => row.projectId !== project.id);
  const removedSubprojectIds = new Set(state.subprojects.filter((row) => row.projectId === project.id).map((row) => row.id));
  archiveDeletedRecords("关联分包流水", state.subLedgers.filter((row) => row.projectId === project.id || removedSubprojectIds.has(row.subprojectId)));
  state.subprojects = state.subprojects.filter((row) => row.projectId !== project.id);
  state.subLedgers = state.subLedgers.filter((row) => row.projectId !== project.id && !removedSubprojectIds.has(row.subprojectId));
  state.projects.splice(index, 1);
  if (!state.projects.length) {
    state.projects.push(createBlankProject());
  }
}

function deleteSelectedProjects() {
  const indexes = selectedIndexes("[data-select-project]");
  if (!indexes.length) return alert("请先勾选要删除的项目。");
  const names = indexes.map((index) => state.projects[index]?.name).filter(Boolean).join("、");
  if (!confirm(`确定删除选中的 ${indexes.length} 个项目吗？相关进度款、项目收支流水、工程变更签证、应收、应付、材料计划、人工记录、采购入库和分包记录会一起删除。`)) return;
  indexes.forEach(removeProjectAt);
  saveState(`删除项目：${names}`);
  renderAll();
}

function createBlankProject() {
  return {
    id: makeId(),
    name: "新项目 1",
    area: 0,
    unitPrice: 0,
    contractAmount: "",
    advanceReceived: "",
    marginAmount: "",
    advanceDeductRate: 0.3,
    marginRate: 0.1,
    materialTaxRate: 0.01,
    laborTaxRate: 0.02,
    philippinesRate: 0.06,
    philippinesAdvanceRate: 0.1878,
    budgetMaterial: "",
    budgetLabor: "",
    budgetSubcontract: "",
    budgetOther: "",
    lateReturn: 0,
    dividendPool: "",
    profitShares: [],
    contractImages: [],
    settlementStatus: "未结算",
    settlementDate: "",
    settlementProfit: "",
    settlementDividendPool: "",
    settlementDividend: "",
    settlementSharePercent: "",
    settlementRetainedProfit: "",
    settlementPayableIds: [],
  };
}

function createBlankSubproject() {
  return {
    id: makeId(),
    projectId: subprojectProjectFilter.value || projectFilter.value || state.projects[0]?.id || "",
    name: `分包项目 ${state.subprojects.length + 1}`,
    contractor: "",
    contractAmount: 0,
    startDate: "",
    endDate: "",
    status: "进行中",
    note: "",
  };
}

function createBlankSubLedger(subprojectId = "") {
  const subproject = state.subprojects.find((item) => item.id === subprojectId) || state.subprojects[0];
  return {
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    subprojectId: subproject?.id || "",
    projectId: subproject?.projectId || projectFilter.value || state.projects[0]?.id || "",
    accountId: newRecordAccountId(),
    usage: state.subUsages[0] || "工程款",
    type: "付款",
    amount: 0,
    note: "",
    images: [],
  };
}

function showNewSubLedgerRow(row) {
  if (!row) return;
  if (searchInput) searchInput.value = "";
  if (subcontractSearch) subcontractSearch.value = "";
  if (subcontractDateFrom) subcontractDateFrom.value = "";
  if (subcontractDateTo) subcontractDateTo.value = "";
  if (projectFilter) projectFilter.value = row.projectId || "";
  if (accountFilter) accountFilter.value = "";
  if (subprojectProjectFilter) subprojectProjectFilter.value = row.projectId || "";
  if (subprojectLedgerFilter) subprojectLedgerFilter.value = row.subprojectId || "";
  applySubLedgerPanelState(false);
  saveUiState({ subLedgerPanelHidden: false });
}

function subledgerFromEntry(entry) {
  const subproject = state.subprojects.find((item) => item.id === entry.subprojectId);
  return {
    sourceEntryId: entry.id,
    date: entry.date || "",
    subprojectId: entry.subprojectId || "",
    projectId: subproject?.projectId || entry.projectId || "",
    accountId: entry.accountId || "",
    usage: entry.subUsage || state.subUsages[0] || "工程款",
    type: number(entry.amount) < 0 ? "付款" : "收款",
    amount: number(entry.amount),
    note: entry.note || "",
    images: normalizeImages(entry.images),
  };
}

function hasPossibleDuplicateSubLedger(entry) {
  return state.subLedgers.some((row) => {
    return row.sourceEntryId !== entry.id
      && row.subprojectId === entry.subprojectId
      && row.accountId === entry.accountId
      && row.date === entry.date
      && number(row.amount) === number(entry.amount)
      && String(row.note || "") === String(entry.note || "");
  });
}

function syncEntryToSubLedger(entryIndex, options = {}) {
  const entry = state.entries[entryIndex];
  if (!entry) return true;
  const linkedIndex = state.subLedgers.findIndex((row) => row.sourceEntryId === entry.id);
  if (!entry.subprojectId) {
    if (linkedIndex >= 0) state.subLedgers.splice(linkedIndex, 1);
    return true;
  }
  if (options.promptDuplicate && linkedIndex < 0 && hasPossibleDuplicateSubLedger(entry)) {
    const ok = confirm("分包流水记录里可能已经有相同日期、账户、金额、备注的记录，是否仍然同步新增？");
    if (!ok) {
      entry.subprojectId = "";
      return false;
    }
  }
  const nextRow = subledgerFromEntry(entry);
  if (linkedIndex >= 0) {
    state.subLedgers[linkedIndex] = { ...state.subLedgers[linkedIndex], ...nextRow };
  } else {
    state.subLedgers.unshift({ id: makeId(), ...nextRow });
  }
  return true;
}

function renderSubcontracts() {
  refreshSubprojectProjectFilter();
  refreshSubprojectLedgerFilter();
  const subprojects = filteredSubprojects();
  const subLedgers = filteredSubLedgers();
  document.querySelector("#subprojectTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>分包名称</th><th>分包单位</th><th>开始时间</th><th>结束时间</th><th class="num">合同额</th><th class="num">剩余金额</th><th>状态</th><th>备注</th><th>排序</th></tr></thead>
    <tbody>
      ${subprojects.map((item) => {
        const remaining = subprojectRemaining(item.id, item.contractAmount);
        return `
          <tr>
            <td><input class="row-check" type="checkbox" data-select-subproject="${item.index}" /></td>
            <td><input class="cell-input" data-subproject="${item.index}" data-field="name" value="${escapeHtml(item.name)}" /></td>
            <td><input class="cell-input" data-subproject="${item.index}" data-field="contractor" value="${escapeHtml(item.contractor)}" /></td>
            <td><input class="cell-input" data-subproject="${item.index}" data-field="startDate" type="date" value="${escapeHtml(item.startDate)}" /></td>
            <td><input class="cell-input" data-subproject="${item.index}" data-field="endDate" type="date" value="${escapeHtml(item.endDate)}" /></td>
            <td><input class="cell-input num" data-subproject="${item.index}" data-field="contractAmount" type="number" step="0.01" value="${number(item.contractAmount)}" /></td>
            <td class="num readonly ${remaining < 0 ? "negative" : "positive"}">${fmtMoney(remaining)}</td>
            <td><select class="cell-input" data-subproject="${item.index}" data-field="status">${selectOptions(subcontractStatuses, item.status)}</select></td>
            <td><input class="cell-input wide-note" data-subproject="${item.index}" data-field="note" value="${escapeHtml(item.note)}" /></td>
            <td>
              <details class="move-menu">
                <summary>排序</summary>
                <div class="move-buttons">
                  <button class="mini-button" type="button" data-move-subproject="${item.index}" data-direction="up">上移</button>
                  <button class="mini-button" type="button" data-move-subproject="${item.index}" data-direction="down">下移</button>
                </div>
              </details>
            </td>
          </tr>
        `;
      }).join("") || `<tr><td colspan="10" class="empty">暂无分包项目</td></tr>`}
    </tbody>
  `;
  document.querySelector("#subLedgerCount").textContent = `${subLedgers.length} 笔`;
  renderSubUsageManager();
  document.querySelector("#subLedgerTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>分包项目</th><th>所属项目</th><th>账户</th><th>用途</th><th>类型</th><th class="num">金额</th><th>来源</th><th>备注</th><th>图片</th></tr></thead>
    <tbody>
      ${subLedgers.map((item) => {
        const locked = item.sourceEntryId ? 'disabled title="项目收支流水同步记录，请到项目收支流水修改"' : "";
        return `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-subledger="${item.index}" ${locked} /></td>
          <td><input class="cell-input" data-subledger="${item.index}" data-field="date" type="date" value="${escapeHtml(item.date)}" ${locked} /></td>
          <td><select class="cell-input" data-subledger="${item.index}" data-field="subprojectId" ${locked}>${selectOptions(state.subprojects, item.subprojectId)}</select></td>
          <td><select class="cell-input" data-subledger="${item.index}" data-field="projectId" ${locked}>${selectOptions(state.projects, item.projectId)}</select></td>
          <td><select class="cell-input" data-subledger="${item.index}" data-field="accountId" ${locked}>${accountSelectOptions(item.accountId)}</select></td>
          <td><select class="cell-input" data-subledger="${item.index}" data-field="usage" ${locked}>${selectOptions(state.subUsages, item.usage)}</select></td>
          <td>
            <select class="cell-input" data-subledger="${item.index}" data-field="type" ${locked}>
              ${selectOptions(["付款", "收款", "扣款", "调整"], item.type)}
            </select>
          </td>
          <td><input class="cell-input num" data-subledger="${item.index}" data-field="amount" type="number" step="0.01" min="0" value="${displayAmount(item.amount)}" ${locked} /></td>
          <td>${item.sourceEntryId ? '<span class="badge quiet">收支同步</span>' : '<span class="badge">手动</span>'}</td>
          <td><input class="cell-input wide-note" data-subledger="${item.index}" data-field="note" value="${escapeHtml(item.note)}" ${locked} /></td>
          <td>${imagesCell("subledger", item.index, item.images, Boolean(item.sourceEntryId))}</td>
        </tr>
      `;
      }).join("") || `<tr><td colspan="11" class="empty">暂无分包流水</td></tr>`}
    </tbody>
  `;
  bindSubcontractInputs();
  bindImageControls();
}

function renderSubUsageManager() {
  const selected = subUsageManagerSelect.value;
  subUsageManagerSelect.innerHTML = selectOptions(state.subUsages, selected || state.subUsages[0]);
  if (state.subUsages.includes(selected)) subUsageManagerSelect.value = selected;
}

function refreshSubprojectProjectFilter() {
  const selected = subprojectProjectFilter.value;
  subprojectProjectFilter.innerHTML = `<option value="">全部项目</option>${selectOptions(state.projects, selected)}`;
  if (state.projects.some((item) => item.id === selected)) subprojectProjectFilter.value = selected;
}

function refreshSubprojectLedgerFilter() {
  const selected = subprojectLedgerFilter.value;
  const selectedProject = subprojectProjectFilter.value;
  const options = state.subprojects.filter((item) => !selectedProject || item.projectId === selectedProject);
  subprojectLedgerFilter.innerHTML = `<option value="">全部分包项目</option>${selectOptions(options, selected)}`;
  if (options.some((item) => item.id === selected)) subprojectLedgerFilter.value = selected;
  else subprojectLedgerFilter.value = "";
}

function selectedIndexes(selector) {
  return [...document.querySelectorAll(selector)]
    .filter((input) => input.checked)
    .map((input) => Number(
      input.dataset.selectProject
      ?? input.dataset.selectAccount
      ?? input.dataset.selectUser
      ?? input.dataset.selectProgress
      ?? input.dataset.selectEntry
      ?? input.dataset.selectDebt
      ?? input.dataset.selectPayable
      ?? input.dataset.selectCheck
      ?? input.dataset.selectAiReport
      ?? input.dataset.selectDrawingReport
      ?? input.dataset.selectMaterialPlan
      ?? input.dataset.selectLaborRecord
      ?? input.dataset.selectSubproject
      ?? input.dataset.selectSubledger
      ?? input.dataset.selectWarehouse
      ?? input.dataset.selectWarehouseOutbound
      ?? input.dataset.selectHistory
    ))
    .sort((a, b) => b - a);
}

function deleteSelectedSubprojects() {
  const indexes = selectedIndexes("[data-select-subproject]");
  if (!indexes.length) return alert("请先勾选要删除的分包项目。");
  if (!confirm(`确定删除选中的 ${indexes.length} 个分包项目吗？相关分包流水会一起删除。`)) return;
  const removedIds = new Set(indexes.map((index) => state.subprojects[index]?.id).filter(Boolean));
  const names = indexes.map((index) => state.subprojects[index]?.name).filter(Boolean).join("、");
  archiveDeletedRecords("分包项目", indexes.map((index) => state.subprojects[index]));
  archiveDeletedRecords("关联分包流水", state.subLedgers.filter((item) => removedIds.has(item.subprojectId)));
  state.subprojects = state.subprojects.filter((item) => !removedIds.has(item.id));
  state.subLedgers = state.subLedgers.filter((item) => !removedIds.has(item.subprojectId));
  state.entries.forEach((entry) => {
    if (removedIds.has(entry.subprojectId)) entry.subprojectId = "";
  });
  saveState(`删除分包项目：${names}`);
  renderAll();
}

function applyProjectToSelectedSubprojects() {
  const projectId = subprojectProjectFilter.value;
  if (!projectId) return alert("请先在上方选择一个所属项目。");
  const indexes = selectedIndexes("[data-select-subproject]");
  if (!indexes.length) return alert("请先勾选要修改所属项目的分包项目。");
  const project = state.projects.find((item) => item.id === projectId);
  if (!confirm(`确定把选中的 ${indexes.length} 个分包项目改到「${project?.name || "所选项目"}」吗？相关分包流水也会一起改到这个项目。`)) return;
  indexes.forEach((index) => {
    const subproject = state.subprojects[index];
    if (!subproject) return;
    subproject.projectId = projectId;
    state.subLedgers.forEach((row) => {
      if (row.subprojectId === subproject.id) row.projectId = projectId;
    });
    state.entries.forEach((entry) => {
      if (entry.subprojectId === subproject.id) entry.projectId = projectId;
    });
  });
  saveState(`修改分包项目所属项目：${project?.name || ""}`);
  renderAll();
}

function deleteSelectedSubLedgers() {
  const indexes = selectedIndexes("[data-select-subledger]");
  if (!indexes.length) return alert("请先勾选要删除的分包流水。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条分包流水吗？`)) return;
  archiveDeletedRecords("分包流水", indexes.map((index) => state.subLedgers[index]));
  indexes.forEach((index) => state.subLedgers.splice(index, 1));
  saveState(`删除分包流水：${indexes.length} 条`);
  renderAll();
}

function moveSubproject(index, direction) {
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (nextIndex < 0 || nextIndex >= state.subprojects.length) return;
  const current = state.subprojects[index];
  state.subprojects[index] = state.subprojects[nextIndex];
  state.subprojects[nextIndex] = current;
  saveState(`调整分包项目顺序：${current?.name || ""}`);
  renderAll();
}

function bindSubcontractInputs() {
  document.querySelectorAll(".move-menu").forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;
      document.querySelectorAll(".move-menu[open]").forEach((other) => {
        if (other !== menu) other.removeAttribute("open");
      });
    });
  });
  document.querySelectorAll("[data-move-subproject]").forEach((button) => {
    button.addEventListener("click", () => {
      moveSubproject(Number(button.dataset.moveSubproject), button.dataset.direction);
    });
  });
  document.querySelectorAll("[data-subproject]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.subproject);
      const field = input.dataset.field;
      const subproject = state.subprojects[index];
      if (!subproject) return;
      subproject[field] = input.type === "number" ? number(input.value) : input.value;
      if (field === "projectId") {
        state.subLedgers.forEach((row) => {
          if (row.subprojectId === subproject.id) row.projectId = input.value;
        });
      }
      renderOverview();
      renderAnalysis();
    });
    input.addEventListener("change", () => {
      const index = Number(input.dataset.subproject);
      const subproject = state.subprojects[index];
      if (subproject) saveState(`修改分包项目：${subproject.name}`);
      renderAll();
    });
  });
  document.querySelectorAll("[data-subledger]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.subledger);
      if (state.subLedgers[index]?.sourceEntryId) {
        return renderAll();
      }
      const field = input.dataset.field;
      const row = state.subLedgers[index];
      if (field === "amount") {
        row.amount = signedSubLedgerAmount(input.value, row.type);
      } else if (field === "type") {
        row.type = input.value;
        row.amount = signedSubLedgerAmount(row.amount, row.type);
      } else {
        row[field] = input.type === "number" ? number(input.value) : input.value;
      }
      if (field === "subprojectId") {
        row.projectId = state.subprojects.find((item) => item.id === input.value)?.projectId || row.projectId;
      }
      saveState("修改分包流水");
      renderOverview();
      renderAnalysis();
    });
    input.addEventListener("change", renderAll);
  });
}

function addSubUsageType() {
  const value = prompt("请输入新的分包用途类型");
  const name = value?.trim();
  if (!name) return;
  if (state.subUsages.includes(name)) return alert("分包用途类型已经存在。");
  state.subUsages.push(name);
  saveState(`新增分包用途：${name}`);
  renderAll();
}

function renameSelectedSubUsageType() {
  const oldValue = subUsageManagerSelect.value;
  if (!oldValue) return alert("请先选择一个分包用途类型。");
  const value = prompt("请输入新的分包用途名称", oldValue);
  const newValue = value?.trim();
  if (!newValue || newValue === oldValue) return;
  if (state.subUsages.includes(newValue)) return alert("分包用途类型已经存在。");
  const index = state.subUsages.indexOf(oldValue);
  if (index < 0) return;
  state.subUsages[index] = newValue;
  state.subLedgers.forEach((row) => {
    if (row.usage === oldValue) row.usage = newValue;
  });
  subUsageManagerSelect.value = newValue;
  saveState(`修改分包用途：${oldValue} → ${newValue}`);
  renderAll();
}

function deleteSelectedSubUsageType() {
  const value = subUsageManagerSelect.value;
  if (!value) return alert("请先选择一个分包用途类型。");
  if (state.subUsages.length <= 1) return alert("至少保留一个分包用途类型。");
  const used = state.subLedgers.some((row) => row.usage === value);
  if (used) return alert("这个分包用途已经在流水中使用，请先把相关流水改成其它用途。");
  if (!confirm(`确定删除分包用途「${value}」吗？`)) return;
  archiveDeletedRecords("分包用途", { name: value });
  state.subUsages = state.subUsages.filter((item) => item !== value);
  saveState(`删除分包用途：${value}`);
  renderAll();
}

function bindAccountInputs() {
  document.querySelectorAll("[data-account]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.account);
      const field = input.dataset.field;
      state.accounts[index][field] = input.type === "number" ? number(input.value) : input.value;
      saveState(`修改资金账户：${state.accounts[index].name}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
}

function bindAccountAdjustmentInputs() {
  document.querySelectorAll("[data-account-adjustment]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.accountAdjustment);
      const field = input.dataset.field;
      const item = state.accountAdjustments[index];
      if (!item) return;
      item[field] = input.type === "number" ? number(input.value) : input.value;
      saveState(`修改账户调整：${accountName(item.accountId)}`);
      renderOverview();
    });
    input.addEventListener("change", renderAll);
  });
}

function deleteSelectedAccounts() {
  const indexes = selectedIndexes("[data-select-account]");
  if (!indexes.length) return alert("请先勾选要删除的资金账户。");
  const blocked = indexes.map((index) => state.accounts[index]).filter((account) => account && isAccountUsed(account.id));
  if (blocked.length) return alert(`以下账户正在使用，不能删除：${blocked.map((account) => account.name).join("、")}`);
  const names = indexes.map((index) => state.accounts[index]?.name).filter(Boolean).join("、");
  if (!confirm(`确定删除选中的 ${indexes.length} 个资金账户吗？`)) return;
  archiveDeletedRecords("资金账户", indexes.map((index) => state.accounts[index]));
  indexes.forEach((index) => state.accounts.splice(index, 1));
  saveState(`删除资金账户：${names}`);
  renderAll();
}

function renderProgressTable() {
  const rows = filteredProgressRows();
  document.querySelector("#progressFormulaList").innerHTML = [
    "空白字段按公式自动计算；手动输入后按手动金额统计",
    "进度款 = 手动输入进度款；如未填写，则为 合同额 × 进度%",
    "项目预付总金额 = 手动填写；如未填写，则为 当前合同额 × 预付扣回比例（默认30%）",
    "每期预付款扣回 = 项目预付总金额 × 本期进度%；可手动修改",
    "剩余未扣预付 = 项目预付总金额 - 累计已扣预付款",
    "保证金 = 进度款 × 项目保证金比例",
    "EWT材料、EWT人工 = 只能手动输入；未填写按 0 计算",
    "UPIF应付金额 = 进度款 × 项目UPIF比例",
    "最终应付UPIF = UPIF应付金额 - UPIF预扣",
    "UPIF预扣备注 = 填写后自动更新到应收流水，方便后期查询",
    "实际入账金额 = 银行入账分配金额合计",
  ].map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const projectCards = state.projects
    .map((project) => {
      const projectRows = rows.filter((row) => row.projectId === project.id);
      if (!projectRows.length && projectFilter.value && projectFilter.value !== project.id) return "";
      const collapsed = collapsedProgressProjects.has(project.id);
      const totals = projectRows.reduce((acc, row) => {
        acc.amount += row.amount;
        acc.advance += row.advanceDeducted;
        acc.margin += row.margin;
        acc.ewt += row.ewt;
        acc.phTotal += row.philippinesTotal;
        acc.phDeduct += row.philippinesDeducted;
        acc.remaining += row.ourRemaining;
        return acc;
      }, { amount: 0, advance: 0, margin: 0, ewt: 0, phTotal: 0, phDeduct: 0, remaining: 0 });
      const advanceRecovery = projectAdvanceRecovery(project, projectRows);
      const body = projectRows.map((row) => progressRowHtml(row)).join("") || `<p class="empty">暂无进度款</p>`;
      return `
        <section class="progress-card ${collapsed ? "is-collapsed" : ""}">
          <div class="progress-card-head" data-toggle-progress-head="${project.id}" title="点击标题栏收起或展开">
            <div>
              <h4>${escapeHtml(project.name)}</h4>
              <p>合同额 ${fmtMoney(projectContract(project))} / 进度款 ${fmtMoney(totals.amount)} / 实际入账金额 ${fmtMoney(totals.remaining)}</p>
            </div>
            <div class="progress-card-actions">
              <button class="tool-button ghost" data-toggle-progress-project="${project.id}">${collapsed ? "展开" : "收起"}</button>
              <button class="tool-button ghost" data-move-progress-project="${project.id}" data-direction="up">上移</button>
              <button class="tool-button ghost" data-move-progress-project="${project.id}" data-direction="down">下移</button>
              <button class="tool-button ghost" data-add-progress-project="${project.id}">新增进度款</button>
            </div>
          </div>
          <div class="settlement-report advance-recovery-report">
            ${settlementItem("项目预付款", fmtMoney(advanceRecovery.advanceTotal), "danger-text")}
            ${settlementItem("已扣预付款", fmtMoney(advanceRecovery.deducted))}
            ${settlementItem("未扣预付款", fmtMoney(advanceRecovery.remaining), advanceRecovery.remaining > 0 ? "negative sensitive-value" : "positive")}
            ${settlementItem("超扣金额", advanceRecovery.overDeducted ? fmtMoney(advanceRecovery.overDeducted) : "-", advanceRecovery.overDeducted ? "negative sensitive-value" : "")}
          </div>
          ${projectSettlementReport(project, projectRows)}
          <div class="progress-card-body">
            <div class="progress-simple-list">${body}</div>
          </div>
        </section>
      `;
    })
    .join("");
  document.querySelector("#progressTable").innerHTML = projectCards || `<p class="empty">暂无进度款</p>`;
  document.querySelectorAll("[data-add-progress-project]").forEach((button) => {
    button.addEventListener("click", () => addProgressForProject(button.dataset.addProgressProject));
  });
  document.querySelectorAll("[data-toggle-progress-project]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleProgressProject(button.dataset.toggleProgressProject);
    });
  });
  document.querySelectorAll("[data-toggle-progress-head]").forEach((head) => {
    head.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, textarea, a, details, summary")) return;
      toggleProgressProject(head.dataset.toggleProgressHead);
    });
  });
  document.querySelectorAll("[data-move-progress-project]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      moveProgressProject(button.dataset.moveProgressProject, button.dataset.direction);
    });
  });
  bindProgressInputs();
  bindImageControls();
}

function toggleProgressProject(projectId) {
  if (collapsedProgressProjects.has(projectId)) {
    collapsedProgressProjects.delete(projectId);
  } else {
    collapsedProgressProjects.add(projectId);
  }
  saveUiState({ collapsedProgressProjects: [...collapsedProgressProjects] });
  renderProgressTable();
}

function moveProgressProject(projectId, direction) {
  const index = state.projects.findIndex((project) => project.id === projectId);
  if (index < 0) return;
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (nextIndex < 0 || nextIndex >= state.projects.length) return;
  const [project] = state.projects.splice(index, 1);
  state.projects.splice(nextIndex, 0, project);
  saveState(`调整项目顺序：${project.name}`);
  renderAll();
}

function progressRowHtml(row) {
  const source = state.progress[row.index];
  const project = state.projects.find((item) => item.id === row.projectId) || state.projects[0];
  const projectRows = state.progress
    .filter((item) => item.projectId === row.projectId)
    .map((item) => ({ ...progressCalc(item), sourceId: item.id }))
    .sort((a, b) => (a.date || "").localeCompare(b.date || "") || (a.period || "").localeCompare(b.period || "", "zh-Hans-CN"));
  let runningAdvance = 0;
  for (const item of projectRows) {
    runningAdvance += number(item.advanceDeducted);
    if (item.sourceId === source.id) break;
  }
  const advanceRemainingAfterThis = Math.max(projectAdvanceAmount(project) - runningAdvance, 0);
  return `
    <article class="simple-card progress-simple-card">
      <div class="simple-card-check">
        <input class="row-check" type="checkbox" data-select-progress="${row.index}" />
      </div>
      <div class="progress-left">
        <div class="progress-main-fields">
          <label class="simple-field">
            <span>日期</span>
            <input class="cell-input" data-progress="${row.index}" data-field="date" type="date" value="${escapeHtml(source.date)}" />
          </label>
          <label class="simple-field">
            <span>期次</span>
            <input class="cell-input" data-progress="${row.index}" data-field="period" value="${escapeHtml(row.period)}" />
          </label>
          <label class="simple-field">
            <span>进度款</span>
            <input class="cell-input num" data-progress="${row.index}" data-field="amount" type="number" step="0.01" placeholder="${fmtMoney(projectContract(state.projects.find((item) => item.id === row.projectId) || state.projects[0]) * number(source.percent))}" value="${source.amount === "" || source.amount === undefined || source.amount === null ? "" : number(source.amount)}" />
          </label>
          <label class="simple-field">
            <span>进度%</span>
            <input class="cell-input num" data-progress="${row.index}" data-field="percent" inputmode="decimal" placeholder="例如 10 或 10%" value="${escapeHtml(percentInputValue(source.percent))}" />
          </label>
          <div class="simple-field danger-field">
            <span>实际入账</span>
            <strong class="readonly">${fmtMoney(row.ourRemaining)}</strong>
          </div>
          ${progressMoneyInput(row.index, "advanceDeducted", row.advanceDeducted, "预付款扣回")}
          <div class="simple-field danger-field">
            <span>剩余未扣预付</span>
            <strong class="readonly negative sensitive-value">${fmtMoney(advanceRemainingAfterThis)}</strong>
          </div>
        </div>
        <details class="simple-more">
          <summary>更多</summary>
          <div class="simple-grid">
            <div class="simple-field danger-field">
              <span>本期应扣预付</span>
              <strong class="readonly">${fmtMoney(row.advanceAuto)}</strong>
            </div>
            <div class="simple-field">
              <span>累计已扣预付</span>
              <strong class="readonly">${fmtMoney(runningAdvance)}</strong>
            </div>
            ${progressMoneyInput(row.index, "margin", row.margin, "保证金")}
            ${progressMoneyInput(row.index, "ewtMaterial", row.ewtMaterial, "EWT材料")}
            ${progressMoneyInput(row.index, "ewtLabor", row.ewtLabor, "EWT人工")}
            <div class="simple-field">
              <span>EWT合计</span>
              <strong class="readonly">${fmtMoney(row.ewt)}</strong>
            </div>
            ${progressMoneyInput(row.index, "philippinesTotal", row.philippinesTotal, "UPIF应付")}
            ${progressMoneyInput(row.index, "philippinesDeducted", row.philippinesDeducted, "UPIF预扣")}
            ${progressMoneyInput(row.index, "philippinesPayable", row.philippinesPayable, "最终UPIF", "danger-field")}
            <label class="simple-field upif-deduct-note-field">
              <span>UPIF预扣备注</span>
              <input class="cell-input wide-note" data-progress="${row.index}" data-field="philippinesDeductedNote" value="${escapeHtml(source.philippinesDeductedNote || "")}" placeholder="未支付原因 / 待收说明" />
            </label>
            <label class="simple-field">
              <span>状态</span>
              <input class="cell-input" data-progress="${row.index}" data-field="status" value="${escapeHtml(row.status)}" />
            </label>
            <label class="simple-field note-field">
              <span>备注</span>
              <input class="cell-input wide-note" data-progress="${row.index}" data-field="note" value="${escapeHtml(source.note || "")}" />
            </label>
          </div>
        </details>
      </div>
      <div class="simple-field allocation-field">
        <span>银行入账</span>
        ${allocationEditor(row.index, row)}
        <div class="progress-image-field">
          <span>入账图片</span>
          ${imagesCell("progress", row.index, source.images)}
        </div>
      </div>
    </article>
  `;
}

function allocationEditor(progressIndex, row) {
  const source = state.progress[progressIndex];
  const allocations = Array.isArray(source.allocations) ? source.allocations : [];
  const allocated = (row.allocations || []).reduce((sum, item) => sum + number(item.amount), 0);
  const expected = number(row.expectedRemaining);
  const diff = expected - allocated;
  return `
    <div class="allocation-box">
      <div class="allocation-list">
        ${allocations.length ? `<div class="allocation-head"><span>账户</span><span>金额</span><span></span></div>` : ""}
        ${allocations.map((item, allocationIndex) => `
          <div class="allocation-row">
            <select class="cell-input" data-allocation-progress="${progressIndex}" data-allocation-index="${allocationIndex}" data-allocation-field="accountId">${accountSelectOptions(item.accountId)}</select>
            <input class="cell-input num" data-allocation-progress="${progressIndex}" data-allocation-index="${allocationIndex}" data-allocation-field="amount" type="number" step="0.01" placeholder="${allocationIndex === 0 && allocations.length === 1 ? fmtMoney(row.ourRemaining) : "金额"}" value="${item.amount === "" || item.amount === undefined || item.amount === null ? "" : number(item.amount)}" />
            <button class="icon-button danger-button allocation-delete" data-delete-allocation="${progressIndex}" data-allocation-index="${allocationIndex}" title="删除分配">删</button>
          </div>
        `).join("") || `<div class="muted">未分配到银行</div>`}
      </div>
      <div class="allocation-tools">
        <button class="icon-button allocation-add" data-add-allocation="${progressIndex}">加账户</button>
        <span class="${Math.abs(diff) > 0.01 ? "negative" : "positive"}">应入账 ${fmtMoney(expected)} / 差额 ${fmtMoney(diff)}</span>
      </div>
    </div>
  `;
}

function progressMoneyInput(index, field, autoValue, label = "", extraClass = "") {
  const raw = state.progress[index][field];
  return `<label class="simple-field ${escapeHtml(extraClass)}"><span>${escapeHtml(label)}</span><input class="cell-input num" data-progress="${index}" data-field="${field}" type="number" step="0.01" placeholder="${fmtMoney(autoValue)}" value="${raw === "" || raw === undefined || raw === null ? "" : number(raw)}" /></label>`;
}

function bindProgressInputs() {
  document.querySelectorAll("[data-progress]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.progress);
      const field = input.dataset.field;
      if (field === "percent") {
        state.progress[index][field] = percentValue(input.value);
      } else if (progressOverrideFields.has(field) || field === "amount") {
        state.progress[index][field] = input.value === "" ? "" : number(input.value);
      } else {
        state.progress[index][field] = input.type === "number" ? number(input.value) : input.value;
      }
      saveState("修改进度款");
      renderOverview();
      renderAnalysis();
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-add-allocation]").forEach((button) => {
    button.addEventListener("click", () => {
      const progressIndex = Number(button.dataset.addAllocation);
      if (!Array.isArray(state.progress[progressIndex].allocations)) state.progress[progressIndex].allocations = [];
      state.progress[progressIndex].allocations.push({ accountId: firstEnabledAccountId(), amount: "" });
      saveState("新增银行入账分配");
      renderAll();
    });
  });
  document.querySelectorAll("[data-allocation-progress]").forEach((input) => {
    input.addEventListener("input", () => {
      const progressIndex = Number(input.dataset.allocationProgress);
      const allocationIndex = Number(input.dataset.allocationIndex);
      const field = input.dataset.allocationField;
      if (!Array.isArray(state.progress[progressIndex].allocations)) state.progress[progressIndex].allocations = [];
      state.progress[progressIndex].allocations[allocationIndex][field] = field === "amount" ? (input.value === "" ? "" : number(input.value)) : input.value;
      saveState("修改银行入账分配");
      renderOverview();
      renderAnalysis();
    });
    input.addEventListener("change", renderAll);
  });
  document.querySelectorAll("[data-delete-allocation]").forEach((button) => {
    button.addEventListener("click", () => {
      const progressIndex = Number(button.dataset.deleteAllocation);
      const allocationIndex = Number(button.dataset.allocationIndex);
      if (!confirm("确定删除这条银行入账分配吗？")) return;
      archiveDeletedRecords("银行入账分配", state.progress[progressIndex]?.allocations?.[allocationIndex]);
      state.progress[progressIndex].allocations.splice(allocationIndex, 1);
      saveState("删除银行入账分配");
      renderAll();
    });
  });
}

function deleteSelectedProgress() {
  const indexes = selectedIndexes("[data-select-progress]");
  if (!indexes.length) return alert("请先勾选要删除的进度款。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条进度款吗？`)) return;
  archiveDeletedRecords("进度款", indexes.map((index) => state.progress[index]));
  indexes.forEach((index) => state.progress.splice(index, 1));
  saveState(`删除进度款：${indexes.length} 条`);
  renderAll();
}

function renderLedger() {
  const entries = filteredEntries();
  document.querySelector("#ledgerCount").textContent = `${entries.length} 笔`;
  renderBankSummary(entries);
  renderTypeManager();
  const rows = entries.map((entry) => `
    <tr>
      <td><input class="row-check" type="checkbox" data-select-entry="${entry.index}" /></td>
      <td><input class="cell-input" data-entry="${entry.index}" data-field="date" type="date" value="${escapeHtml(entry.date)}" /></td>
      <td class="readonly">${escapeHtml(projectName(entry.projectId))}</td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="accountId">${accountSelectOptions(entry.accountId)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="type">${selectOptions(entryTypes, entryType(entry))}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="receivableId">${receivableOptions(entry.receivableId, entry.projectId)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="payableId">${payableOptions(entry.payableId, entry.projectId)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="subprojectId"><option value="">不关联分包</option>${selectOptions(state.subprojects, entry.subprojectId)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="subUsage">${selectOptions(state.subUsages, entry.subUsage)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="usage">${selectOptions(state.usages, entry.usage)}</select></td>
      <td><select class="cell-input" data-entry="${entry.index}" data-field="category">${selectOptions(state.categories, entry.category)}</select></td>
      <td><input class="cell-input num" data-entry="${entry.index}" data-field="amount" type="number" step="0.01" min="0" value="${displayAmount(entry.amount)}" /></td>
      <td><input class="cell-input wide-note" data-entry="${entry.index}" data-field="note" value="${escapeHtml(entry.note)}" title="${bilingualText(entry.note)}" /></td>
      <td>${imagesCell("entry", entry.index, entry.images)}</td>
    </tr>
  `).join("");
  document.querySelector("#ledgerTable").innerHTML = `
    <thead><tr><th class="select-col"></th><th>日期</th><th>项目</th><th>账户</th><th>收支</th><th>关联应收</th><th>关联应付</th><th>分包项目</th><th>分包用途</th><th>用途</th><th>分类</th><th class="num">金额</th><th>备注</th><th>图片</th></tr></thead>
    <tbody>${rows || `<tr><td colspan="14" class="empty">没有查询到流水</td></tr>`}</tbody>
  `;
  bindEntryInputs();
  bindImageControls();
}

function renderBankSummary(entries) {
  const rows = state.accounts.map((account) => {
    const accountEntries = entries.filter((entry) => entry.accountId === account.id);
    const income = accountEntries.filter((entry) => number(entry.amount) > 0).reduce((sum, entry) => sum + number(entry.amount), 0);
    const expense = accountEntries.filter((entry) => number(entry.amount) < 0).reduce((sum, entry) => sum + number(entry.amount), 0);
    return { account, count: accountEntries.length, income, expense, net: income + expense };
  }).filter((row) => row.count || !accountFilter.value);
  document.querySelector("#bankSummary").innerHTML = rows
    .map((row) => `
      <button class="bank-card ${accountFilter.value === row.account.id ? "active" : ""}" data-bank-filter="${row.account.id}">
        <strong>${bilingualText(row.account.name)}</strong>
        <span>${row.count} 笔 / 收入 ${fmtMoney(row.income)}</span>
        <em class="${row.net < 0 ? "negative" : "positive"}">支出 ${fmtMoney(Math.abs(row.expense))} / 净额 ${fmtMoney(row.net)}</em>
      </button>
    `).join("") || `<p class="empty">暂无账户明细</p>`;
  document.querySelectorAll("[data-bank-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      accountFilter.value = accountFilter.value === button.dataset.bankFilter ? "" : button.dataset.bankFilter;
      renderAll();
    });
  });
}

function renderTypeManager() {
  document.querySelector("#usageTypeList").innerHTML = state.usages.map((usage, index) => typeTag("usage", usage, index)).join("");
  document.querySelector("#categoryTypeList").innerHTML = state.categories.map((category, index) => typeTag("category", category, index)).join("");
  bindTypeInputs();
}

function typeTag(type, value, index) {
  return `
    <span class="type-tag">
      <input data-type="${type}" data-type-index="${index}" value="${escapeHtml(value)}" />
      <button data-delete-type="${type}" data-type-index="${index}" title="删除">×</button>
    </span>
  `;
}

function bindTypeInputs() {
  document.querySelectorAll("[data-type]").forEach((input) => {
    input.addEventListener("change", () => {
      const listName = input.dataset.type === "usage" ? "usages" : "categories";
      const oldValue = state[listName][Number(input.dataset.typeIndex)];
      const newValue = input.value.trim();
      if (!newValue) return renderAll();
      state[listName][Number(input.dataset.typeIndex)] = newValue;
      if (listName === "usages") {
        state.entries.forEach((entry) => {
          if (entry.usage === oldValue) entry.usage = newValue;
        });
      } else {
        state.entries.forEach((entry) => {
          if (entry.category === oldValue) entry.category = newValue;
        });
      }
      saveState();
      renderAll();
    });
  });
  document.querySelectorAll("[data-delete-type]").forEach((button) => {
    button.addEventListener("click", () => {
      const listName = button.dataset.deleteType === "usage" ? "usages" : "categories";
      if (state[listName].length <= 1) return alert("至少保留一个类型。");
      const index = Number(button.dataset.typeIndex);
      const value = state[listName][index];
      const used = state.entries.some((entry) => listName === "usages" ? entry.usage === value : entry.category === value);
      if (used) return alert("这个类型已经在明细中使用，请先把相关明细改成其它类型。");
      if (!confirm(`确定删除${listName === "usages" ? "用途" : "分类"}「${value}」吗？`)) return;
      archiveDeletedRecords(listName === "usages" ? "用途" : "分类", { name: value });
      state[listName].splice(index, 1);
      saveState(`删除${listName === "usages" ? "用途" : "分类"}：${value}`);
      renderAll();
    });
  });
}

function bindEntryInputs() {
  document.querySelectorAll("[data-entry]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.entry);
      const field = input.dataset.field;
      if (field === "amount") {
        state.entries[index].amount = signedEntryAmount(input.value, entryType(state.entries[index]));
      } else if (field === "type") {
        state.entries[index].type = input.value;
        state.entries[index].amount = signedEntryAmount(state.entries[index].amount, input.value);
        if (input.value === "收入") state.entries[index].payableId = "";
        if (input.value === "支出") state.entries[index].receivableId = "";
      } else {
        state.entries[index][field] = input.type === "number" ? number(input.value) : input.value;
      }
      if (field === "receivableId" && state.entries[index].receivableId) {
        const receivable = state.companyDebts.find((item) => item.id === state.entries[index].receivableId);
        if (receivable) {
          state.entries[index].projectId = receivable.projectId;
          state.entries[index].type = "收入";
          state.entries[index].amount = Math.abs(number(state.entries[index].amount));
          state.entries[index].payableId = "";
        }
      }
      if (field === "payableId" && state.entries[index].payableId) {
        const payable = state.payables.find((item) => item.id === state.entries[index].payableId);
        if (payable) {
          state.entries[index].projectId = payable.projectId;
          state.entries[index].type = "支出";
          state.entries[index].amount = -Math.abs(number(state.entries[index].amount));
          state.entries[index].receivableId = "";
        }
      }
      if (field === "subprojectId" && state.entries[index].subprojectId) {
        const subproject = state.subprojects.find((item) => item.id === state.entries[index].subprojectId);
        if (subproject) state.entries[index].projectId = subproject.projectId;
      }
      syncEntryToSubLedger(index, { promptDuplicate: field === "subprojectId" });
      saveState();
      renderOverview();
      renderAnalysis();
    });
    input.addEventListener("change", renderAll);
  });
}

function applyLedgerProjectToSelected() {
  const projectId = ledgerProjectSelect.value;
  if (!projectId) return alert("请先在上方选择项目。");
  const indexes = selectedIndexes("[data-select-entry]");
  if (!indexes.length) return alert("请先勾选要应用项目的明细。");
  const project = state.projects.find((item) => item.id === projectId);
  indexes.forEach((index) => {
    if (!state.entries[index]) return;
    state.entries[index].projectId = projectId;
    if (state.entries[index].subprojectId) {
      const subproject = state.subprojects.find((item) => item.id === state.entries[index].subprojectId);
      if (subproject && subproject.projectId !== projectId) state.entries[index].subprojectId = "";
    }
    const receivable = state.companyDebts.find((item) => item.id === state.entries[index].receivableId);
    if (receivable && receivable.projectId !== projectId) state.entries[index].receivableId = "";
    const payable = state.payables.find((item) => item.id === state.entries[index].payableId);
    if (payable && payable.projectId !== projectId) state.entries[index].payableId = "";
    syncEntryToSubLedger(index);
  });
  saveState(`项目收支流水应用项目：${project?.name || ""}`);
  renderAll();
}

function deleteSelectedEntries() {
  const indexes = selectedIndexes("[data-select-entry]");
  if (!indexes.length) return alert("请先勾选要删除的项目收支流水。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条项目收支流水吗？`)) return;
  archiveDeletedRecords("项目收支流水", indexes.map((index) => state.entries[index]));
  const linkedIds = new Set(indexes.map((index) => state.entries[index]?.id).filter(Boolean));
  archiveDeletedRecords("关联分包流水", state.subLedgers.filter((row) => linkedIds.has(row.sourceEntryId)));
  indexes.forEach((index) => {
    const entryId = state.entries[index]?.id;
    state.entries.splice(index, 1);
    if (entryId) state.subLedgers = state.subLedgers.filter((row) => row.sourceEntryId !== entryId);
  });
  saveState(`删除项目收支流水：${indexes.length} 条`);
  renderAll();
}

function analysisDateMatches(date) {
  const value = date || "";
  return (!analysisDateFrom.value || value >= analysisDateFrom.value)
    && (!analysisDateTo.value || value <= analysisDateTo.value);
}

function filteredAnalysisEntries() {
  const words = queryWords(searchInput.value, analysisSearch.value);
  return state.entries
    .filter((entry) => {
      const subproject = state.subprojects.find((item) => item.id === entry.subprojectId);
      const text = `${projectName(entry.projectId)} ${accountName(entry.accountId)} ${entryType(entry)} ${subproject?.name || ""} ${entry.subUsage || ""} ${entry.usage} ${entry.category} ${entry.note}`.toLowerCase();
      return textMatches(text, words)
        && analysisDateMatches(entry.date)
        && (!projectFilter.value || entry.projectId === projectFilter.value)
        && (!accountFilter.value || entry.accountId === accountFilter.value)
        && (!usageFilter.value || entry.usage === usageFilter.value);
    });
}

function filteredAnalysisProgressRows() {
  const words = queryWords(searchInput.value, analysisSearch.value);
  return state.progress
    .map((row) => progressCalc(row))
    .filter((row) => {
      const text = `${projectName(row.projectId)} ${allocationSummary(row)} ${row.period} ${row.status} ${row.note}`.toLowerCase();
      const accountMatched = !accountFilter.value || (row.allocations || []).some((item) => item.accountId === accountFilter.value);
      return textMatches(text, words)
        && analysisDateMatches(row.date)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && accountMatched;
    });
}

function filteredAnalysisSubLedgers() {
  const words = queryWords(searchInput.value, analysisSearch.value);
  return state.subLedgers
    .filter((row) => {
      const subproject = state.subprojects.find((item) => item.id === row.subprojectId);
      const text = `${projectName(row.projectId)} ${accountName(row.accountId)} ${subproject?.name || ""} ${subproject?.contractor || ""} ${row.usage || ""} ${row.type || ""} ${row.note || ""}`.toLowerCase();
      return textMatches(text, words)
        && analysisDateMatches(row.date)
        && (!projectFilter.value || row.projectId === projectFilter.value)
        && (!accountFilter.value || row.accountId === accountFilter.value);
    });
}

function renderAnalysis() {
  const entries = filteredAnalysisEntries();
  const progressRows = filteredAnalysisProgressRows();
  const subLedgers = filteredAnalysisSubLedgers();
  const categories = new Map();
  const projects = new Map();
  for (const entry of entries) {
    if (number(entry.amount) < 0) categories.set(entry.category, (categories.get(entry.category) || 0) + Math.abs(number(entry.amount)));
    projects.set(projectName(entry.projectId), (projects.get(projectName(entry.projectId)) || 0) + number(entry.amount));
  }
  for (const row of progressRows) {
    projects.set(projectName(row.projectId), (projects.get(projectName(row.projectId)) || 0) + row.ourRemaining);
  }
  for (const row of subLedgers.filter((item) => !item.sourceEntryId)) {
    projects.set(projectName(row.projectId), (projects.get(projectName(row.projectId)) || 0) + number(row.amount));
  }
  const categoryRows = [...categories.entries()].sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...categoryRows.map((row) => row[1]));
  document.querySelector("#categoryBars").innerHTML = categoryRows
    .map(([name, value]) => `<div class="bar-row"><strong>${escapeHtml(name)}</strong><div class="bar"><span style="width:${(value / max) * 100}%"></span></div><span class="num">${fmtMoney(value)}</span></div>`)
    .join("") || `<p class="empty">暂无支出分类</p>`;

  document.querySelector("#usageSummary").innerHTML = [...projects.entries()]
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .map(([name, value]) => `<div class="summary-row"><div><strong>${escapeHtml(name)}</strong><div class="muted">流水净额 + 已选入账进度款</div></div><strong class="${value < 0 ? "negative" : "positive"}">${fmtMoney(value)}</strong></div>`)
    .join("") || `<p class="empty">暂无项目统计</p>`;

  renderQueryResults(entries, progressRows, subLedgers);
}

function renderQueryResults(entries, progressRows, subLedgers = []) {
  const queryActive = Boolean(searchInput.value.trim() || analysisSearch.value.trim() || analysisDateFrom.value || analysisDateTo.value || projectFilter.value || accountFilter.value || usageFilter.value);
  const progressTotal = progressRows.reduce((sum, row) => sum + row.amount, 0);
  const progressRemain = progressRows.reduce((sum, row) => sum + row.ourRemaining, 0);
  const entryIncome = entries.filter((entry) => number(entry.amount) > 0).reduce((sum, entry) => sum + number(entry.amount), 0);
  const entryExpense = entries.filter((entry) => number(entry.amount) < 0).reduce((sum, entry) => sum + number(entry.amount), 0);
  const subLedgerTotal = subLedgers.reduce((sum, row) => sum + number(row.amount), 0);
  document.querySelector("#querySummary").textContent = queryActive
    ? `进度款 ${progressRows.length} 条，流水 ${entries.length} 条，分包流水 ${subLedgers.length} 条，进度款合计 ${fmtMoney(progressTotal)}，流水收入 ${fmtMoney(entryIncome)}，流水支出 ${fmtMoney(Math.abs(entryExpense))}，分包净额 ${fmtMoney(subLedgerTotal)}`
    : "当前显示全部数据，可输入关键词或选择项目/账户/用途查询";

  const progressResultRows = progressRows.map((row) => `
    <tr>
      <td><span class="badge">进度款</span></td>
      <td>${escapeHtml(projectName(row.projectId))}</td>
      <td>${escapeHtml(allocationSummary(row))}</td>
      <td>${escapeHtml(row.date || "")} ${escapeHtml(row.period)}</td>
      <td class="num positive">${fmtMoney(row.amount)}</td>
      <td class="num ${row.ourRemaining < 0 ? "negative" : "positive"}">${fmtMoney(row.ourRemaining)}</td>
      <td>${escapeHtml(row.status || "")} UPIF应付金额 ${fmtMoney(row.philippinesTotal)} / UPIF预扣 ${fmtMoney(row.philippinesDeducted)} ${escapeHtml(row.philippinesDeductedNote || row.note || "")}</td>
    </tr>
  `);
  const entryResultRows = entries.map((entry) => `
    <tr>
      <td><span class="badge quiet">流水</span></td>
      <td>${escapeHtml(projectName(entry.projectId))}</td>
      <td>${bilingualText(accountName(entry.accountId))}</td>
      <td>${bilingualText(entry.category || entry.usage)}</td>
      <td class="num ${number(entry.amount) < 0 ? "negative" : "positive"}">${fmtMoney(entry.amount)}</td>
      <td class="num"></td>
      <td>${escapeHtml(entry.note || "")}</td>
    </tr>
  `);
  const subLedgerRows = subLedgers.map((row) => {
    const subproject = state.subprojects.find((item) => item.id === row.subprojectId);
    return `
      <tr>
        <td><span class="badge quiet">分包流水</span></td>
        <td>${escapeHtml(projectName(row.projectId))}</td>
        <td>${bilingualText(accountName(row.accountId))}</td>
        <td>${bilingualText(subproject?.name || row.usage || row.type)}</td>
        <td class="num ${number(row.amount) < 0 ? "negative" : "positive"}">${fmtMoney(row.amount)}</td>
        <td class="num"></td>
        <td>${bilingualText(row.usage || "")} ${bilingualText(row.type || "")} ${escapeHtml(row.note || "")}</td>
      </tr>
    `;
  });
  document.querySelector("#queryTable").innerHTML = `
    <thead>
      <tr><th>类型</th><th>项目</th><th>账户</th><th>分类/期次</th><th class="num">金额</th><th class="num">实际入账金额</th><th>备注</th></tr>
    </thead>
    <tbody>${[...progressResultRows, ...entryResultRows, ...subLedgerRows].join("") || `<tr><td colspan="7" class="empty">没有查询到结果</td></tr>`}</tbody>
  `;
}

function addType(listName, label) {
  const value = prompt(`请输入新的${label}名称`);
  const name = value?.trim();
  if (!name) return;
  if (state[listName].includes(name)) return alert(`${label}已经存在。`);
  state[listName].push(name);
  saveState(`新增${label}：${name}`);
  renderAll();
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function downloadXlsx(filename, rows) {
  const XLSX = await loadSheetJs();
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "数据");
  XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

async function downloadTableFile(filename, rows) {
  try {
    await downloadXlsx(filename, rows);
  } catch (error) {
    alert(`Excel文件生成失败，已改为CSV导出：${error.message}`);
    downloadCsv(filename, rows);
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const source = String(text || "").replace(/^\uFEFF/, "");
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((item) => String(item).trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((item) => String(item).trim() !== "")) rows.push(row);
  return rows;
}

function csvObjects(text) {
  const rows = parseCsv(text);
  const headers = (rows.shift() || []).map((item) => String(item || "").trim());
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, String(row[index] ?? "").trim()])));
}

function normalizeImportObjects(rows) {
  return rows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [
    String(key || "").trim(),
    String(value ?? "").trim(),
  ])));
}

async function xlsxObjects(file) {
  const XLSX = await loadSheetJs();
  const workbook = XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: false });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "", raw: false });
  return normalizeImportObjects(rows);
}

function findByNameOrId(items, value, fallback = "") {
  const text = String(value || "").trim();
  if (!text) return fallback;
  const found = items.find((item) => item.id === text || item.name === text);
  return found?.id || fallback;
}

function findReceivableId(value, projectId = "") {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "";
  const rows = state.companyDebts || [];
  const found = rows.find((item) => item.id === text
    || ((item.company || "").toLowerCase() === text && (!projectId || item.projectId === projectId))
    || `${projectName(item.projectId)} / ${item.company} / ${item.title}`.toLowerCase() === text
    || `${item.company} / ${item.title}`.toLowerCase() === text);
  return found?.id || "";
}

function findPayableId(value, projectId = "") {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "";
  const rows = state.payables || [];
  const found = rows.find((item) => item.id === text
    || ((item.company || "").toLowerCase() === text && (!projectId || item.projectId === projectId))
    || `${projectName(item.projectId)} / ${item.company} / ${item.title}`.toLowerCase() === text
    || `${item.company} / ${item.title}`.toLowerCase() === text);
  return found?.id || "";
}

function ensureListOption(listName, value, fallback = "") {
  const text = String(value || "").trim();
  if (!text) return fallback;
  if (!state[listName].includes(text)) state[listName].push(text);
  return text;
}

function percentValue(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const text = String(value).trim();
  const raw = number(text.replace("%", ""));
  return text.includes("%") || raw > 1 ? raw / 100 : raw;
}

const csvTemplateRows = {
  ledger: [
    ["日期", "项目", "账户", "收支", "关联应收", "关联应付", "分包项目", "分包用途", "用途", "分类", "金额", "备注"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", state.accounts[0]?.name || "", "支出", "", "", "", state.subUsages[0] || "工程款", state.usages[0] || "钢结构", state.categories[0] || "其它项目", "1000", "填写备注"],
  ],
  subLedger: [
    ["日期", "分包项目", "所属项目", "账户", "用途", "类型", "金额", "备注"],
    [new Date().toISOString().slice(0, 10), state.subprojects[0]?.name || "", state.projects[0]?.name || "", state.accounts[0]?.name || "", state.subUsages[0] || "工程款", "付款", "1000", "填写备注"],
  ],
  progress: [
    ["日期", "项目", "期次", "进度款", "进度百分比", "预付款扣回", "保证金", "材料EWT", "人工EWT", "UPIF预扣", "UPIF预扣备注", "状态", "备注", "入账账户1", "入账金额1", "入账账户2", "入账金额2"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", "第1次", "1000", "10%", "", "", "", "", "", "填写未支付原因", "", "填写备注", state.accounts[0]?.name || "", "1000", "", ""],
  ],
  warehousePurchase: [
    ["采购日期", "项目", "施工阶段", "材料名称", "供应商", "数量", "采购单价", "物流公司", "快递单号", "状态", "入库日期", "备注"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", "主体结构", "建筑材料", "供应商", "1", "0", "未选择", "", "待采购", "", "填写备注"],
  ],
  warehouseOutbound: [
    ["领用日期", "项目", "材料名称", "领用数量", "领用人/用途", "备注"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", state.warehouseItems[0]?.name || "建筑材料", "1", "领用人", "填写备注"],
  ],
  accountAdjustment: [
    ["日期", "账户", "加减", "金额", "备注"],
    [new Date().toISOString().slice(0, 10), state.accounts[0]?.name || "", "增加", "1000", "填写调整原因"],
  ],
  check: [
    ["开票日期", "到期日", "兑现日期", "项目", "银行账户", "支票号", "收款方", "用途", "金额", "状态", "备注"],
    [new Date().toISOString().slice(0, 10), "", "", state.projects[0]?.name || "", state.accounts[0]?.name || "", "CHK-001", "收款方", "支票用途", "1000", "已开出", "填写备注"],
  ],
  debt: [
    ["日期", "项目", "应收单位", "款项说明", "应收金额", "已收金额", "到期日", "状态", "备注"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", "应收单位", "款项说明", "1000", "0", "", "未收款", "填写备注"],
  ],
  payable: [
    ["日期", "项目", "应付单位", "款项说明", "应付金额", "已付金额", "到期日", "状态", "备注"],
    [new Date().toISOString().slice(0, 10), state.projects[0]?.name || "", "应付单位", "款项说明", "1000", "0", "", "未付款", "填写备注"],
  ],
  aiPurchase: [
    ["项目", "报告名称", "英文名称", "中文名称", "数量", "单价", "金额", "供应商", "备注"],
    [state.projects[0]?.name || "", "采购清单表格报告", "Steel bar", "钢筋", "10", "100", "1000", "供应商", "表格导入，不需要AI"],
  ],
  cashflow: [
    ["日期", "来源", "项目", "资金账户", "说明", "收入", "支出", "余额影响", "变动后余额", "备注"],
  ],
};

async function downloadTemplate(kind) {
  const rows = csvTemplateRows[kind];
  if (!rows) return;
  const names = {
    ledger: "项目收支流水模板",
    subLedger: "分包流水模板",
    progress: "进度款入账模板",
    warehousePurchase: "采购入库模板",
    warehouseOutbound: "材料领用模板",
    warehouseFlow: "库存流水记录模板",
    accountAdjustment: "账户调整模板",
    check: "银行支票模板",
    debt: "应收模板",
    payable: "应付模板",
    aiPurchase: "采购清单表格模板",
    cashflow: "资金流水变化模板",
  };
  await downloadTableFile(names[kind] || "导入模板", rows);
}

function progressExportRows() {
  const header = csvTemplateRows.progress[0];
  const rows = filteredProgressRows().map((row) => [
    row.date || "",
    projectName(row.projectId),
    row.period || "",
    row.amount,
    row.percent,
    row.advanceDeducted,
    row.margin,
    row.ewtMaterial,
    row.ewtLabor,
    row.philippinesDeducted,
    row.philippinesDeductedNote || "",
    row.status || "",
    row.note || "",
    row.allocations?.[0]?.accountId ? accountName(row.allocations[0].accountId) : "",
    row.allocations?.[0]?.amount ?? "",
    row.allocations?.[1]?.accountId ? accountName(row.allocations[1].accountId) : "",
    row.allocations?.[1]?.amount ?? "",
  ]);
  return [header, ...rows];
}

function ledgerExportRows() {
  const header = ["日期", "项目", "账户", "收支", "关联应收", "关联应付", "分包项目", "分包用途", "用途", "分类", "录入金额", "统计金额", "备注"];
  const rows = filteredEntries().map((entry) => [
    entry.date,
    projectName(entry.projectId),
    accountName(entry.accountId),
    entryType(entry),
    receivableExportName(entry.receivableId),
    payableExportName(entry.payableId),
    state.subprojects.find((item) => item.id === entry.subprojectId)?.name || "",
    entry.subUsage,
    entry.usage,
    entry.category,
    displayAmount(entry.amount),
    number(entry.amount),
    entry.note,
  ]);
  return [header, ...rows];
}

function receivableExportName(id) {
  const row = state.companyDebts.find((item) => item.id === id);
  return row ? `${projectName(row.projectId)} / ${row.company} / ${row.title}` : "";
}

function payableExportName(id) {
  const row = state.payables.find((item) => item.id === id);
  return row ? `${projectName(row.projectId)} / ${row.company} / ${row.title}` : "";
}

function subLedgerExportRows() {
  const header = ["日期", "分包项目", "所属项目", "账户", "用途", "类型", "录入金额", "统计金额", "来源", "备注"];
  const rows = filteredSubLedgers().map((row) => [
    row.date || "",
    state.subprojects.find((item) => item.id === row.subprojectId)?.name || "",
    projectName(row.projectId),
    accountName(row.accountId),
    row.usage || "",
    row.type || "",
    displayAmount(row.amount),
    number(row.amount),
    row.sourceEntryId ? "收支同步" : "手动",
    row.note || "",
  ]);
  return [header, ...rows];
}

function warehousePurchaseExportRows() {
  const header = csvTemplateRows.warehousePurchase[0];
  const rows = filteredWarehouseItems().map((item) => [
    item.date || "",
    projectName(item.projectId),
    item.stage || "",
    item.name || "",
    item.supplier || "",
    item.quantity,
    item.unitPrice,
    item.carrier || "",
    item.trackingNo || "",
    item.status || "",
    item.arrivalDate || "",
    item.note || "",
  ]);
  return [header, ...rows];
}

function warehouseOutboundExportRows() {
  const header = csvTemplateRows.warehouseOutbound[0];
  const rows = warehouseOutboundRows(filteredWarehouseItems()).map((item) => [
    item.date || "",
    projectName(item.projectId),
    item.itemName || "",
    item.quantity,
    item.receiver || "",
    item.note || "",
  ]);
  return [header, ...rows];
}

function warehouseFlowExportRows() {
  const header = ["日期", "类型", "项目", "材料名称", "入库数量", "领用出库数量", "库存余额", "金额影响", "来源", "备注"];
  const purchaseRows = filteredWarehouseItems();
  const rows = warehouseFlowRows(purchaseRows, warehouseOutboundRows(purchaseRows)).map((item) => {
    const quantity = number(item.quantity);
    return [
      item.date || "",
      item.type || "",
      projectName(item.projectId),
      item.itemName || "",
      quantity > 0 ? quantity : "",
      quantity < 0 ? Math.abs(quantity) : "",
      number(item.balanceAfter),
      number(item.amount),
      item.source || "",
      item.note || "",
    ];
  });
  return [header, ...rows];
}

function accountAdjustmentExportRows() {
  const header = csvTemplateRows.accountAdjustment[0];
  const rows = filteredAccountAdjustments().map((item) => [
    item.date || "",
    accountName(item.accountId),
    item.type || "增加",
    item.amount,
    item.note || "",
  ]);
  return [header, ...rows];
}

function checkExportRows() {
  const header = ["开票日期", "到期日", "兑现日期", "项目", "银行账户", "支票号", "收款方", "用途", "金额", "状态", "备注", "图片数量"];
  const rows = filteredChecks().map((row) => [
    row.issueDate || "",
    row.dueDate || "",
    row.clearedDate || "",
    projectName(row.projectId),
    accountName(row.accountId),
    row.checkNo || "",
    row.payee || "",
    row.purpose || "",
    number(row.amount),
    row.status || "",
    row.note || "",
    normalizeImages(row.images).length,
  ]);
  return [header, ...rows];
}

function debtExportRows() {
  const header = ["日期", "项目", "应收单位", "款项说明", "应收金额", "手动已收", "流水已收", "合计已收", "未收金额", "到期日", "状态", "备注"];
  const rows = filteredDebts().map((row) => [
    row.date || "",
    projectName(row.projectId),
    row.company || "",
    row.title || "",
    number(row.amount),
    number(row.received),
    debtLedgerReceived(row.id),
    debtTotalReceived(row),
    Math.max(debtBalance(row), 0),
    row.dueDate || "",
    row.displayStatus || row.status || "",
    row.note || "",
  ]);
  return [header, ...rows];
}

function payableExportRows() {
  const header = ["日期", "项目", "应付单位", "款项说明", "应付金额", "手动已付", "流水已付", "合计已付", "未付金额", "到期日", "状态", "备注"];
  const rows = filteredPayables().map((row) => [
    row.date || "",
    projectName(row.projectId),
    row.company || "",
    row.title || "",
    number(row.amount),
    number(row.paid),
    payableLedgerPaid(row.id),
    payableTotalPaid(row),
    Math.max(payableBalance(row), 0),
    row.dueDate || "",
    row.displayStatus || row.status || "",
    row.note || "",
  ]);
  return [header, ...rows];
}

function cashflowExportRows() {
  const header = csvTemplateRows.cashflow[0];
  const rows = filteredCashflowRows().map((row) => {
    const amount = number(row.amount);
    return [
      row.date || "初始",
      cashflowSourceLabel(row.source),
      row.projectId ? projectName(row.projectId) : "公共账户",
      accountName(row.accountId),
      row.title || "",
      amount > 0 ? amount : "",
      amount < 0 ? Math.abs(amount) : "",
      amount,
      number(row.balanceAfter),
      row.note || "",
    ];
  });
  return [header, ...rows];
}

async function exportCsvKind(kind) {
  const map = {
    ledger: ["项目收支流水", ledgerExportRows],
    subLedger: ["分包流水", subLedgerExportRows],
    progress: ["进度款入账明细", progressExportRows],
    warehousePurchase: ["采购入库", warehousePurchaseExportRows],
    warehouseOutbound: ["材料领用记录", warehouseOutboundExportRows],
    warehouseFlow: ["库存流水记录", warehouseFlowExportRows],
    accountAdjustment: ["账户调整记录", accountAdjustmentExportRows],
    check: ["银行支票记录", checkExportRows],
    debt: ["应收款台账", debtExportRows],
    payable: ["应付款台账", payableExportRows],
    cashflow: ["资金流水变化记录", cashflowExportRows],
  };
  const item = map[kind];
  if (!item) return;
  await downloadTableFile(item[0], item[1]());
}

function readImportFile(kind) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    importTableFile(kind, file);
  });
  input.click();
}

function duplicateEntry(row) {
  return state.entries.some((item) => item.date === row.date
    && item.projectId === row.projectId
    && item.accountId === row.accountId
    && item.subprojectId === row.subprojectId
    && item.receivableId === row.receivableId
    && item.payableId === row.payableId
    && number(item.amount) === number(row.amount)
    && String(item.note || "") === String(row.note || ""));
}

function duplicateSubLedger(row) {
  return state.subLedgers.some((item) => item.date === row.date
    && item.subprojectId === row.subprojectId
    && item.accountId === row.accountId
    && number(item.amount) === number(row.amount)
    && String(item.note || "") === String(row.note || ""));
}

function duplicateDebt(row) {
  return (state.companyDebts || []).some((item) => item.date === row.date
    && item.projectId === row.projectId
    && String(item.company || "") === String(row.company || "")
    && String(item.title || "") === String(row.title || "")
    && number(item.amount) === number(row.amount)
    && number(item.received) === number(row.received));
}

function duplicatePayable(row) {
  return (state.payables || []).some((item) => item.date === row.date
    && item.projectId === row.projectId
    && String(item.company || "") === String(row.company || "")
    && String(item.title || "") === String(row.title || "")
    && number(item.amount) === number(row.amount)
    && number(item.paid) === number(row.paid));
}

function duplicateCheck(row) {
  return (state.bankChecks || []).some((item) => item.issueDate === row.issueDate
    && item.accountId === row.accountId
    && String(item.checkNo || "") === String(row.checkNo || "")
    && String(item.payee || "") === String(row.payee || "")
    && number(item.amount) === number(row.amount));
}

function importLedgerRows(rows) {
  let added = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const projectId = findByNameOrId(state.projects, row["项目"], ledgerProjectSelect.value || projectFilter.value || state.projects[0]?.id || "");
    const subprojectId = findByNameOrId(state.subprojects.filter((item) => !projectId || item.projectId === projectId), row["分包项目"], "");
    const subproject = state.subprojects.find((item) => item.id === subprojectId);
    const next = {
      id: makeId(),
      projectId: subproject?.projectId || projectId,
      accountId: findByNameOrId(state.accounts, row["账户"], newRecordAccountId()),
      type: row["收支"] === "收入" ? "收入" : "支出",
      usage: ensureListOption("usages", row["用途"], state.usages[0] || "钢结构"),
      category: ensureListOption("categories", row["分类"], state.categories[0] || "其它项目"),
      subprojectId,
      subUsage: ensureListOption("subUsages", row["分包用途"], state.subUsages[0] || "工程款"),
      receivableId: findReceivableId(row["关联应收"], subproject?.projectId || projectId),
      payableId: findPayableId(row["关联应付"], subproject?.projectId || projectId),
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      amount: signedEntryAmount(row["金额"] || row["录入金额"] || row["统计金额"], row["收支"] === "收入" ? "收入" : "支出"),
      note: row["备注"] || "",
      images: [],
    };
    if (next.receivableId) {
      const receivable = state.companyDebts.find((item) => item.id === next.receivableId);
      if (receivable) {
        next.projectId = receivable.projectId;
        next.type = "收入";
        next.amount = Math.abs(number(next.amount));
        next.payableId = "";
      }
    }
    if (next.payableId) {
      const payable = state.payables.find((item) => item.id === next.payableId);
      if (payable) {
        next.projectId = payable.projectId;
        next.type = "支出";
        next.amount = -Math.abs(number(next.amount));
        next.receivableId = "";
      }
    }
    if (duplicateEntry(next)) {
      skipped += 1;
      return;
    }
    state.entries.unshift(next);
    syncEntryToSubLedger(0);
    added += 1;
  });
  return { added, skipped };
}

function importSubLedgerRows(rows) {
  let added = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const projectId = findByNameOrId(state.projects, row["所属项目"] || row["项目"], subprojectProjectFilter.value || projectFilter.value || state.projects[0]?.id || "");
    let subprojectId = findByNameOrId(state.subprojects.filter((item) => !projectId || item.projectId === projectId), row["分包项目"], "");
    if (!subprojectId && row["分包项目"]) {
      const subproject = { ...createBlankSubproject(), id: makeId(), projectId, name: row["分包项目"] };
      state.subprojects.unshift(subproject);
      subprojectId = subproject.id;
    }
    const type = ["付款", "收款", "扣款", "调整"].includes(row["类型"]) ? row["类型"] : "付款";
    const next = {
      id: makeId(),
      sourceEntryId: "",
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      subprojectId: subprojectId || state.subprojects[0]?.id || "",
      projectId,
      accountId: findByNameOrId(state.accounts, row["账户"], newRecordAccountId()),
      usage: ensureListOption("subUsages", row["用途"], state.subUsages[0] || "工程款"),
      type,
      amount: signedSubLedgerAmount(row["金额"] || row["录入金额"] || row["统计金额"], type),
      note: row["备注"] || "",
      images: [],
    };
    if (duplicateSubLedger(next)) {
      skipped += 1;
      return;
    }
    state.subLedgers.unshift(next);
    added += 1;
  });
  return { added, skipped };
}

function importProgressRows(rows) {
  let added = 0;
  rows.forEach((row) => {
    const projectId = findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || "");
    const allocations = [1, 2, 3, 4].map((index) => {
      const accountId = findByNameOrId(state.accounts, row[`入账账户${index}`], "");
      const amount = row[`入账金额${index}`];
      return accountId || amount ? { accountId: accountId || firstEnabledAccountId(), amount: amount === "" ? "" : number(amount) } : null;
    }).filter(Boolean);
    state.progress.unshift({
      id: makeId(),
      projectId,
      allocations,
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      period: row["期次"] || `第${state.progress.length + 1}次`,
      amount: row["进度款"] === "" ? "" : number(row["进度款"]),
      percent: percentValue(row["进度百分比"]),
      status: row["状态"] || "",
      note: row["备注"] || "",
      advanceDeducted: row["预付款扣回"] === "" ? "" : number(row["预付款扣回"]),
      margin: row["保证金"] === "" ? "" : number(row["保证金"]),
      ewtMaterial: row["材料EWT"] === "" ? "" : number(row["材料EWT"]),
      ewtLabor: row["人工EWT"] === "" ? "" : number(row["人工EWT"]),
      philippinesTotal: "",
      philippinesDeducted: (row["UPIF预扣"] ?? row["UPIF预付款扣回"]) === "" ? "" : number(row["UPIF预扣"] ?? row["UPIF预付款扣回"]),
      philippinesDeductedNote: row["UPIF预扣备注"] || "",
      philippinesPayable: "",
      ourRemaining: "",
      images: [],
    });
    added += 1;
  });
  return { added, skipped: 0 };
}

function importWarehousePurchaseRows(rows) {
  let added = 0;
  rows.forEach((row) => {
    state.warehouseItems.unshift({
      id: makeId(),
      date: row["采购日期"] || row["日期"] || new Date().toISOString().slice(0, 10),
      projectId: findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || ""),
      stage: constructionStages.includes(row["施工阶段"]) ? row["施工阶段"] : "主体结构",
      name: row["材料名称"] || row["物品名称"] || "建筑材料",
      supplier: row["供应商"] || "",
      quantity: number(row["数量"] || 0),
      outboundQuantity: 0,
      unitPrice: number(row["采购单价"] || row["单价"] || 0),
      carrier: warehouseCarriers.includes(row["物流公司"]) ? row["物流公司"] : "未选择",
      trackingNo: row["快递单号"] || "",
      status: normalizeWarehouseStatus(row["状态"], row["快递单号"] || ""),
      arrivalDate: row["入库日期"] || row["到仓日期"] || "",
      note: row["备注"] || "",
    });
    added += 1;
  });
  return { added, skipped: 0 };
}

function importWarehouseOutboundRows(rows) {
  let added = 0;
  rows.forEach((row) => {
    state.warehouseOutbounds.unshift({
      id: makeId(),
      date: row["领用日期"] || row["出库日期"] || row["日期"] || new Date().toISOString().slice(0, 10),
      projectId: findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || ""),
      itemName: row["材料名称"] || row["物品名称"] || "建筑材料",
      quantity: number(row["领用数量"] || row["出库数量"] || row["数量"] || 0),
      receiver: row["领用人/用途"] || row["领用人"] || "",
      note: row["备注"] || "",
      sourceItemId: "",
    });
    added += 1;
  });
  return { added, skipped: 0 };
}

function importAccountAdjustmentRows(rows) {
  let added = 0;
  rows.forEach((row) => {
    state.accountAdjustments.unshift({
      id: makeId(),
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      accountId: findByNameOrId(state.accounts, row["账户"], state.accounts[0]?.id || ""),
      type: row["加减"] === "减少" ? "减少" : "增加",
      amount: number(row["金额"] || 0),
      note: row["备注"] || "",
    });
    added += 1;
  });
  return { added, skipped: 0 };
}

function importCheckRows(rows) {
  let added = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const status = checkStatuses.includes(row["状态"]) ? row["状态"] : "已开出";
    const next = {
      id: makeId(),
      issueDate: row["开票日期"] || row["日期"] || new Date().toISOString().slice(0, 10),
      dueDate: row["到期日"] || "",
      clearedDate: row["兑现日期"] || "",
      projectId: findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || ""),
      accountId: findByNameOrId(state.accounts, row["银行账户"] || row["账户"], newRecordAccountId()),
      checkNo: row["支票号"] || row["票号"] || "",
      payee: row["收款方"] || row["收款单位"] || "收款方",
      purpose: row["用途"] || row["款项说明"] || "支票用途",
      amount: number(row["金额"] || 0),
      status,
      note: row["备注"] || "",
      images: [],
    };
    if (next.status === "已兑现" && !next.clearedDate) next.clearedDate = next.issueDate;
    if (duplicateCheck(next)) {
      skipped += 1;
      return;
    }
    state.bankChecks.unshift(next);
    added += 1;
  });
  return { added, skipped };
}

function importDebtRows(rows) {
  let added = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const next = {
      id: makeId(),
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      projectId: findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || ""),
      company: row["应收单位"] || row["欠款公司"] || row["公司"] || "应收单位",
      title: row["款项说明"] || row["未收事项"] || row["事项"] || "款项说明",
      amount: number(row["应收金额"] || row["金额"] || 0),
      received: number(row["手动已收"] || row["已收金额"] || row["合计已收"] || 0),
      dueDate: row["到期日"] || "",
      status: debtStatuses.includes(row["状态"]) ? row["状态"] : "未收款",
      note: row["备注"] || "",
    };
    if (duplicateDebt(next)) {
      skipped += 1;
      return;
    }
    ensureUnit("receivableUnits", next.company);
    state.companyDebts.unshift(next);
    added += 1;
  });
  return { added, skipped };
}

function importPayableRows(rows) {
  let added = 0;
  let skipped = 0;
  rows.forEach((row) => {
    const next = {
      id: makeId(),
      date: row["日期"] || new Date().toISOString().slice(0, 10),
      projectId: findByNameOrId(state.projects, row["项目"], projectFilter.value || state.projects[0]?.id || ""),
      company: row["应付单位"] || row["付款对象"] || row["单位"] || "应付单位",
      title: row["款项说明"] || row["事项"] || "款项说明",
      amount: number(row["应付金额"] || row["金额"] || 0),
      paid: number(row["手动已付"] || row["已付金额"] || row["合计已付"] || 0),
      dueDate: row["到期日"] || "",
      status: payableStatuses.includes(row["状态"]) ? row["状态"] : "未付款",
      note: row["备注"] || "",
    };
    if (duplicatePayable(next)) {
      skipped += 1;
      return;
    }
    ensureUnit("payableUnits", next.company);
    state.payables.unshift(next);
    added += 1;
  });
  return { added, skipped };
}

function importAiPurchaseRows(rows) {
  const first = rows[0] || {};
  const projectId = findByNameOrId(state.projects, first["项目"], aiProjectSelect.value || projectFilter.value || state.projects[0]?.id || "");
  const title = first["报告名称"] || aiReportTitle.value.trim() || "采购清单表格报告";
  const items = rows.map((row) => {
    const quantity = row["数量"] || row["Qty"] || row["Quantity"] || "";
    const unitPrice = row["单价"] || row["Unit Price"] || row["Price"] || "";
    const total = row["金额"] || row["Total"] || row["Amount"] || "";
    return {
      englishName: row["英文名称"] || row["English Name"] || row["Item"] || "",
      chineseName: row["中文名称"] || row["Chinese Name"] || row["品名"] || row["材料名称"] || "",
      quantity,
      unitPrice,
      total: total === "" ? number(quantity) * number(unitPrice) : number(total),
      supplier: row["供应商"] || row["Supplier"] || "",
      note: row["备注"] || row["Note"] || "",
    };
  }).filter((item) => item.englishName || item.chineseName || number(item.total) || item.quantity);
  if (!items.length) return { added: 0, skipped: rows.length };
  const totalAmount = items.reduce((sum, item) => sum + number(item.total), 0);
  const suppliers = [...new Set(items.map((item) => item.supplier).filter(Boolean))].join("、") || "未填写";
  state.aiReports.unshift({
    id: makeId(),
    createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    date: new Date().toISOString().slice(0, 10),
    projectId,
    title,
    fileName: "表格导入.csv",
    image: "",
    summary: `表格导入采购清单，共 ${items.length} 项，合计 ${fmtMoney(totalAmount)}。`,
    stats: { currency: state.currency || "PHP", totalAmount, itemCount: items.length, suppliers },
    items,
    risks: rows.length !== items.length ? [`有 ${rows.length - items.length} 行为空或无法识别，已跳过。`] : [],
    rawText: "本报告由CSV表格导入生成，没有使用AI图片识别。",
  });
  return { added: 1, skipped: rows.length - items.length };
}

function importRowsKind(kind, rows, sourceLabel = "表格") {
  if (kind === "cashflow") return alert("资金流水变化是系统自动计算记录，只支持导出，不支持导入。");
  if (!rows.length) return alert(`没有读取到可导入的记录，请确认使用的是${sourceLabel}模板。`);
  const importers = {
    ledger: importLedgerRows,
    subLedger: importSubLedgerRows,
    progress: importProgressRows,
    warehousePurchase: importWarehousePurchaseRows,
    warehouseOutbound: importWarehouseOutboundRows,
    accountAdjustment: importAccountAdjustmentRows,
    check: importCheckRows,
    debt: importDebtRows,
    payable: importPayableRows,
    aiPurchase: importAiPurchaseRows,
  };
  const importer = importers[kind];
  if (!importer) return;
  const result = importer(rows);
  saveState(`导入${result.added}条记录`);
  renderAll();
  alert(`导入完成：新增 ${result.added} 条${result.skipped ? `，重复跳过 ${result.skipped} 条` : ""}。`);
}

function importCsvKind(kind, text) {
  return importRowsKind(kind, csvObjects(text), "CSV");
}

async function importTableFile(kind, file) {
  const name = file.name || "";
  try {
    if (/\.xlsx?$/i.test(name)) {
      return importRowsKind(kind, await xlsxObjects(file), "Excel");
    }
    const text = await readTextFile(file);
    return importCsvKind(kind, text);
  } catch (error) {
    alert(`导入失败：${error.message}`);
  }
}

function bindCsvTools() {
  document.querySelectorAll("[data-csv-template]").forEach((button) => {
    button.addEventListener("click", () => downloadTemplate(button.dataset.csvTemplate));
  });
  document.querySelectorAll("[data-csv-import]").forEach((button) => {
    button.addEventListener("click", () => readImportFile(button.dataset.csvImport));
  });
  document.querySelectorAll("[data-csv-export]").forEach((button) => {
    button.addEventListener("click", () => exportCsvKind(button.dataset.csvExport));
  });
}

function exportLedger() {
  void exportCsvKind("ledger");
}

async function exportAnalysis() {
  const entries = filteredAnalysisEntries();
  const progressRows = filteredAnalysisProgressRows();
  const subLedgers = filteredAnalysisSubLedgers();
  const header = ["类型", "日期", "项目", "账户/分配", "分类/期次", "金额", "实际入账金额", "备注"];
  const progressRowsCsv = progressRows.map((row) => [
    "进度款",
    row.date || "",
    projectName(row.projectId),
    allocationSummary(row),
    row.period || "",
    row.amount,
    row.ourRemaining,
    `${row.status || ""} UPIF应付金额 ${fmtMoney(row.philippinesTotal)} / UPIF预扣 ${fmtMoney(row.philippinesDeducted)} ${row.philippinesDeductedNote || row.note || ""}`,
  ]);
  const entryRowsCsv = entries.map((entry) => [
    "项目收支流水",
    entry.date || "",
    projectName(entry.projectId),
    accountName(entry.accountId),
    entry.category || entry.usage || "",
    number(entry.amount),
    "",
    entry.note || "",
  ]);
  const subLedgerRowsCsv = subLedgers.map((row) => {
    const subproject = state.subprojects.find((item) => item.id === row.subprojectId);
    return [
      "分包流水",
      row.date || "",
      projectName(row.projectId),
      accountName(row.accountId),
      subproject?.name || row.usage || row.type || "",
      number(row.amount),
      "",
      `${row.usage || ""} ${row.type || ""} ${row.note || ""}`,
    ];
  });
  await downloadTableFile("分类统计查询", [header, ...progressRowsCsv, ...entryRowsCsv, ...subLedgerRowsCsv]);
}

function openOperationView(viewName, options = {}) {
  if (options.warehouseSection !== undefined) activeWarehouseSection = options.warehouseSection;
  if (options.costSection !== undefined) activeCostSection = options.costSection;
  setView(viewName);
  renderAll();
  setView(viewName);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addDailyEntry(type = "支出") {
  state.entries.unshift({
    id: makeId(),
    projectId: ledgerProjectSelect.value || projectFilter.value || state.projects[0]?.id || "",
    accountId: newRecordAccountId(),
    type,
    usage: usageFilter.value || state.usages[0] || "钢结构",
    category: type === "收入" ? "工程款收入" : state.categories[0] || "钢结构支出",
    subprojectId: "",
    subUsage: state.subUsages[0] || "工程款",
    receivableId: "",
    payableId: "",
    date: new Date().toISOString().slice(0, 10),
    amount: 0,
    note: "",
    images: [],
  });
  saveState(`日常操作新增${type}流水`);
  openOperationView("ledger");
}

function addDailySubLedger() {
  if (!state.subprojects.length) state.subprojects.unshift(createBlankSubproject());
  const selectedProject = subprojectProjectFilter.value || projectFilter.value;
  const selectedSubproject = state.subprojects.find((item) => item.id === subprojectLedgerFilter.value)
    || state.subprojects.find((item) => !selectedProject || item.projectId === selectedProject)
    || state.subprojects[0];
  const row = createBlankSubLedger(selectedSubproject.id);
  state.subLedgers.unshift(row);
  showNewSubLedgerRow(row);
  saveState("日常操作新增分包流水");
  openOperationView("subcontracts");
}

function addDailyAccountAdjustment() {
  state.accountAdjustments.unshift({
    id: makeId(),
    date: new Date().toISOString().slice(0, 10),
    accountId: accountFilter.value || state.accounts[0]?.id || "",
    type: "增加",
    amount: 0,
    note: "",
  });
  saveState("日常操作新增账户调整");
  openOperationView("accounts");
}

function addDailyProject() {
  state.projects.push({ ...createBlankProject(), name: `新项目 ${state.projects.length + 1}` });
  saveState("日常操作新增项目");
  openOperationView("projects");
}

function addDailySubprojectRecord() {
  const subproject = createBlankSubproject();
  subproject.projectId = subprojectProjectFilter.value || projectFilter.value || state.projects[0]?.id || "";
  state.subprojects.unshift(subproject);
  saveState("日常操作新增分包项目");
  openOperationView("subcontracts");
}

function runDailyAction(action) {
  if (action === "project") return addDailyProject();
  if (action === "subproject") return addDailySubprojectRecord();
  if (action === "entry") return addDailyEntry("支出");
  if (action === "entryExpense") return addDailyEntry("支出");
  if (action === "entryIncome") return addDailyEntry("收入");
  if (action === "progress") {
    addProgressForProject(projectFilter.value || state.projects[0]?.id || "");
    return openOperationView("projects");
  }
  if (action === "accountAdjustment") return addDailyAccountAdjustment();
  if (action === "debt") {
    state.companyDebts.unshift(createBlankDebt());
    saveState("日常操作新增应收");
    return openOperationView("debts");
  }
  if (action === "payable") {
    state.payables.unshift(createBlankPayable());
    saveState("日常操作新增应付");
    return openOperationView("payables");
  }
  if (action === "check") {
    state.bankChecks.unshift(createBlankCheck());
    saveState("日常操作新增银行支票");
    return openOperationView("checks");
  }
  if (action === "warehouseIn") {
    state.warehouseItems.unshift(createBlankWarehouseItem());
    saveState("日常操作新增采购入库");
    return openOperationView("warehouse", { warehouseSection: "purchase" });
  }
  if (action === "warehouseOut") {
    state.warehouseOutbounds.unshift(createBlankWarehouseOutbound());
    saveState("日常操作新增材料领用");
    return openOperationView("warehouse", { warehouseSection: "outbound" });
  }
  if (action === "materialPlan") {
    state.materialPlans.unshift(createBlankMaterialPlan());
    saveState("日常操作新增材料计划");
    return openOperationView("costControl", { costSection: "material" });
  }
  if (action === "subLedger") return addDailySubLedger();
  if (action === "changeOrder") {
    state.changeOrders.unshift(createBlankChangeOrder());
    saveState("日常操作新增工程变更");
    return openOperationView("changeOrders");
  }
  if (action === "labor") {
    state.laborRecords.unshift(createBlankLaborRecord());
    saveState("日常操作新增人工记录");
    return openOperationView("costControl", { costSection: "labor" });
  }
  if (action === "purchaseAdvice") return openOperationView("costControl", { costSection: "advice" });
  if (action === "costSummary") return openOperationView("costControl", { costSection: "summary" });
  if (action === "dividend") return openOperationView("dividends");
  if (action === "aiTools") return openOperationView("aiTools");
  if (action === "drawing") return openOperationView("drawingAnalysis");
  if (action === "tasks") return openOperationView("taskCenter");
}

function dailyOperationRows() {
  const rows = [];
  const push = (date, type, projectId, title, amount, viewName) => rows.push({
    date: date || "",
    type,
    projectId,
    title,
    amount,
    viewName,
  });
  state.entries.forEach((row) => push(row.date, "收支流水", row.projectId, `${row.type || ""} / ${row.usage || ""} / ${row.note || ""}`, number(row.amount), "ledger"));
  state.progress.forEach((row) => push(row.date, "进度款", row.projectId, `${row.period || "进度款"} / ${row.status || ""}`, number(row.amount), "projects"));
  (state.accountAdjustments || []).forEach((row) => push(row.date, "账户调整", "", `${accountName(row.accountId)} / ${row.type || ""} / ${row.note || ""}`, row.type === "减少" ? -Math.abs(number(row.amount)) : Math.abs(number(row.amount)), "accounts"));
  (state.materialPlans || []).forEach((row) => push(row.date, "材料计划", row.projectId, `${row.materialName || "材料"} / ${row.stage || ""}`, number(row.quantity) * number(row.budgetPrice), "costControl"));
  (state.laborRecords || []).forEach((row) => push(row.date, "人工记录", row.projectId, `${row.worker || row.team || "人工"} / ${row.stage || ""}`, number(row.amount), "costControl"));
  (state.warehouseItems || []).forEach((row) => push(row.date, "采购入库", row.projectId, `${row.name || "材料"} / ${row.supplier || ""}`, number(row.quantity) * number(row.unitPrice), "warehouse"));
  (state.warehouseOutbounds || []).forEach((row) => push(row.date, "材料领用", row.projectId, `${row.itemName || "材料"} / ${row.receiver || ""}`, 0, "warehouse"));
  (state.companyDebts || []).forEach((row) => push(row.date, "应收", row.projectId, `${row.company || ""} / ${row.title || ""}`, number(row.amount), "debts"));
  (state.payables || []).forEach((row) => push(row.date, "应付", row.projectId, `${row.company || ""} / ${row.title || ""}`, -Math.abs(number(row.amount)), "payables"));
  (state.bankChecks || []).forEach((row) => push(row.issueDate || row.date, "银行支票", row.projectId, `${row.payee || ""} / ${row.purpose || ""}`, -Math.abs(number(row.amount)), "checks"));
  (state.changeOrders || []).forEach((row) => push(row.date, "工程变更", row.projectId, `${row.title || row.reason || "变更签证"} / ${row.status || ""}`, number(row.amount), "changeOrders"));
  (state.subLedgers || []).forEach((row) => push(row.date, "分包流水", row.projectId, `${subprojectName(row.subprojectId)} / ${row.note || ""}`, number(row.amount), "subcontracts"));
  return rows.sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 30);
}

function renderDailyRequiredPanel(todayRows, today) {
  const todayEntries = (state.entries || []).filter((row) => row.date === today);
  const todayProgress = (state.progress || []).filter((row) => row.date === today);
  const todayPurchases = (state.warehouseItems || []).filter((row) => row.date === today || row.arrivalDate === today);
  const todayOutbounds = (state.warehouseOutbounds || []).filter((row) => row.date === today);
  const todayLabor = (state.laborRecords || []).filter((row) => row.date === today);
  const todaySubLedgers = (state.subLedgers || []).filter((row) => row.date === today);
  const todayReceivables = (state.companyDebts || []).filter((row) => row.date === today);
  const todayPayables = (state.payables || []).filter((row) => row.date === today);
  const missingEntryImages = todayEntries.filter((row) => !Array.isArray(row.images) || !row.images.length).length;
  const missingEntryBasics = todayEntries.filter((row) => !row.projectId || !row.accountId || !row.usage || !row.category || !number(row.amount)).length;
  const missingPurchaseBasics = todayPurchases.filter((row) => !row.projectId || !row.name || !number(row.quantity) || !number(row.unitPrice) || !row.supplier).length;
  const missingOutboundBasics = todayOutbounds.filter((row) => !row.projectId || !row.itemName || !number(row.quantity) || !row.receiver).length;
  const missingLaborBasics = todayLabor.filter((row) => !row.projectId || !row.team || !row.workType || !number(row.workerCount) || !number(row.dailyRate)).length;
  const missingProgressBasics = todayProgress.filter((row) => !row.projectId || !row.date || (!number(row.amount) && !number(row.percent)) || !row.allocations?.some((item) => number(item.amount))).length;
  const cards = [
    {
      title: "收支流水必填",
      detail: "日期、项目、资金账户、收入/支出、用途、分类、金额、备注或收据图片。",
      count: todayEntries.length,
      issue: missingEntryBasics + missingEntryImages,
      action: "entryExpense",
      actionText: "录支出",
    },
    {
      title: "进度款必填",
      detail: "日期、项目、期次、进度款、预付款扣回、保证金、EWT、UPIF、实际入账银行分配。",
      count: todayProgress.length,
      issue: missingProgressBasics,
      action: "progress",
      actionText: "录进度款",
    },
    {
      title: "采购入库必填",
      detail: "日期、项目、施工阶段、材料名称、数量、单价、供应商、物流公司、快递单号、状态。",
      count: todayPurchases.length,
      issue: missingPurchaseBasics,
      action: "warehouseIn",
      actionText: "录采购",
    },
    {
      title: "材料领用必填",
      detail: "日期、项目、材料名称、出库数量、领用人、用途备注；数量全部填正数。",
      count: todayOutbounds.length,
      issue: missingOutboundBasics,
      action: "warehouseOut",
      actionText: "录出库",
    },
    {
      title: "应收应付必填",
      detail: "单位、项目、款项说明、金额、已收/已付、到期日期、状态；方便后期催收和付款。",
      count: todayReceivables.length + todayPayables.length,
      issue: 0,
      action: "debt",
      actionText: "录应收",
    },
    {
      title: "现场人工必填",
      detail: "项目、施工阶段、班组、工种、人数、工日、单价、已付工资、是否计入成本。",
      count: todayLabor.length,
      issue: missingLaborBasics,
      action: "labor",
      actionText: "录人工",
    },
    {
      title: "分包流水必填",
      detail: "分包项目、所属项目、资金账户、用途类型、付款/扣款、金额、备注和附件。",
      count: todaySubLedgers.length,
      issue: todaySubLedgers.filter((row) => !row.subprojectId || !row.projectId || !row.accountId || !number(row.amount)).length,
      action: "subLedger",
      actionText: "录分包",
    },
    {
      title: "每日核对",
      detail: "录完后查看资金核对、库存流水、待办提醒，重点看红色或加粗数字。",
      count: todayRows.length,
      issue: taskCenterRows().filter((row) => row.level === "danger").length,
      action: "tasks",
      actionText: "查待办",
    },
  ];
  const levelClass = (card) => card.issue ? "danger" : card.count ? "ok" : "todo";
  document.querySelector("#dailyRequiredPanel").innerHTML = `
    <div class="daily-required-head">
      <div>
        <strong>每日填写清单</strong>
        <span>录入时按这些字段检查，红色表示今天已有记录但还有缺项。</span>
      </div>
      <button class="mini-action-button" type="button" data-daily-open="taskCenter">查看全部待办</button>
    </div>
    <div class="daily-required-grid">
      ${cards.map((card) => `
        <article class="daily-required-card ${levelClass(card)}">
          <div>
            <strong>${escapeHtml(card.title)}</strong>
            <span>${escapeHtml(card.detail)}</span>
          </div>
          <div class="daily-required-foot">
            <em>${card.count ? `今天 ${card.count} 条` : "今天未录"}</em>
            ${card.issue ? `<b>${card.issue} 项待补</b>` : `<b>${card.count ? "已记录" : "可按需填写"}</b>`}
            <button class="mini-action-button" type="button" data-daily-action="${escapeHtml(card.action)}">${escapeHtml(card.actionText)}</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderDailyOps() {
  const today = new Date().toISOString().slice(0, 10);
  const rows = dailyOperationRows();
  const todayRows = rows.filter((row) => row.date === today);
  const unpaidDebt = (state.companyDebts || []).reduce((sum, row) => sum + Math.max(debtBalance(row), 0), 0);
  const unpaidPayable = (state.payables || []).reduce((sum, row) => sum + Math.max(payableBalance(row), 0), 0);
  const lowStock = warehouseInventoryRows(state.warehouseItems || []).filter((row) => row.remaining < 5).length;
  document.querySelector("#dailyOpsSummary").innerHTML = `
    <div class="settlement-report">
      ${settlementItem("今天录入", `${todayRows.length} 条`, todayRows.length ? "info-text" : "")}
      ${settlementItem("未收款", fmtMoney(unpaidDebt), unpaidDebt > 0 ? "warn-text" : "positive")}
      ${settlementItem("未付款", fmtMoney(unpaidPayable), unpaidPayable > 0 ? "warn-text" : "positive")}
      ${settlementItem("低库存", `${lowStock} 项`, lowStock ? "negative" : "positive")}
    </div>
  `;
  renderDailyRequiredPanel(todayRows, today);
  document.querySelector("#dailyOpsRecent").innerHTML = `
    <thead>
      <tr><th>日期</th><th>类型</th><th>项目</th><th>说明</th><th class="num">金额</th><th>查看</th></tr>
    </thead>
    <tbody>
      ${rows.map((row) => `
        <tr>
          <td>${escapeHtml(row.date || "-")}</td>
          <td>${escapeHtml(row.type)}</td>
          <td>${escapeHtml(projectName(row.projectId))}</td>
          <td>${escapeHtml(row.title || "-")}</td>
          <td class="num ${row.amount < 0 ? "negative" : row.amount > 0 ? "positive" : ""}">${row.amount ? fmtMoney(row.amount) : "-"}</td>
          <td><button class="icon-button" type="button" data-daily-open="${escapeHtml(row.viewName)}">打开</button></td>
        </tr>
      `).join("") || `<tr><td colspan="6" class="empty">暂无日常操作记录</td></tr>`}
    </tbody>
  `;
}

function handleDailyOpsClick(event) {
  const actionButton = event.target.closest("[data-daily-action]");
  if (actionButton) return runDailyAction(actionButton.dataset.dailyAction);
  const openButton = event.target.closest("[data-daily-open]");
  if (!openButton) return;
  const viewName = openButton.dataset.dailyOpen;
  if (viewName === "warehouse") return openOperationView("warehouse", { warehouseSection: "" });
  if (viewName === "costControl") return openOperationView("costControl", { costSection: "" });
  return openOperationView(viewName);
}

function openShortcutTarget(viewName, section = "") {
  if (viewName === "warehouse") return openOperationView("warehouse", { warehouseSection: section });
  if (viewName === "costControl") return openOperationView("costControl", { costSection: section });
  return openOperationView(viewName);
}

function handleShortcutOpen(event) {
  const button = event.target.closest("[data-task-open], [data-management-open]");
  if (!button) return;
  const viewName = button.dataset.taskOpen || button.dataset.managementOpen;
  const section = button.dataset.taskSection || button.dataset.managementSection || "";
  openShortcutTarget(viewName, section);
}

function filteredTranslations() {
  const q = (translationSearch?.value || "").trim().toLowerCase();
  return (state.translations || []).map((item, index) => ({ ...item, index })).filter((item) => {
    const text = `${item.zh || ""} ${item.en || ""} ${item.group || ""} ${item.note || ""}`.toLowerCase();
    return !q || text.includes(q);
  });
}

function renderTranslations() {
  const rows = filteredTranslations();
  const count = document.querySelector("#translationCount");
  const table = document.querySelector("#translationTable");
  if (!count || !table) return;
  count.textContent = `${rows.length} 条`;
  table.innerHTML = `
    <thead>
      <tr><th class="select-col"></th><th>中文</th><th>English</th><th>类型</th><th>备注</th><th>显示效果</th></tr>
    </thead>
    <tbody>
      ${rows.map((item) => `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-translation="${item.index}" /></td>
          <td><input class="cell-input" data-translation="${item.index}" data-field="zh" value="${escapeHtml(item.zh)}" placeholder="中文名称" /></td>
          <td><input class="cell-input" data-translation="${item.index}" data-field="en" value="${escapeHtml(item.en)}" placeholder="English name" /></td>
          <td><input class="cell-input" data-translation="${item.index}" data-field="group" value="${escapeHtml(item.group)}" placeholder="分类/用途/材料/单位" /></td>
          <td><input class="cell-input wide-note" data-translation="${item.index}" data-field="note" value="${escapeHtml(item.note || "")}" /></td>
          <td><span class="translation-preview">${bilingualText(item.zh)}</span></td>
        </tr>
      `).join("") || `<tr><td colspan="6" class="empty">暂无中英文对照</td></tr>`}
    </tbody>
  `;
  bindTranslationInputs();
}

function bindTranslationInputs() {
  document.querySelectorAll("[data-translation]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.translation);
      const row = state.translations[index];
      if (!row) return;
      row[input.dataset.field] = input.value;
      renderLedger();
      renderWarehouse();
      renderAnalysis();
    });
    input.addEventListener("change", () => {
      saveState("修改中英文对照");
      renderTranslations();
    });
  });
}

function addTranslation() {
  state.translations.unshift({ id: makeId(), zh: "新名称", en: "New Name", group: "常用", note: "" });
  saveState("新增中英文对照");
  renderAll();
}

function deleteSelectedTranslations() {
  const indexes = selectedIndexes("[data-select-translation]");
  if (!indexes.length) return alert("请先勾选要删除的中英文对照。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条中英文对照吗？`)) return;
  archiveDeletedRecords("中英文对照", indexes.map((index) => state.translations[index]));
  indexes.forEach((index) => state.translations.splice(index, 1));
  saveState(`删除中英文对照：${indexes.length} 条`);
  renderAll();
}

function filteredHistory() {
  const q = historySearch.value.trim().toLowerCase();
  const from = historyFromFilter.value;
  const to = historyToFilter.value;
  return (state.history || []).filter((item) => {
    const text = `${item.time} ${item.action} ${(item.deletedSummary || []).join(" ")}`.toLowerCase();
    return (!q || text.includes(q)) && (!from || item.date >= from) && (!to || item.date <= to);
  });
}

function renderHistory() {
  const rows = filteredHistory();
  document.querySelector("#historyCount").textContent = `${rows.length} 条`;
  document.querySelector("#historyTable").innerHTML = `
    <thead>
      <tr><th class="select-col"></th><th>修改时间</th><th>修改内容</th><th>删除内容</th><th>操作</th></tr>
    </thead>
    <tbody>
      ${rows.map((item, index) => `
        <tr>
          <td><input class="row-check" type="checkbox" data-select-history="${index}" /></td>
          <td>${escapeHtml(item.time)}</td>
          <td>${escapeHtml(item.action)}</td>
          <td>${(item.deletedSummary || []).map((text) => `<span class="history-chip">${escapeHtml(text)}</span>`).join("") || "-"}</td>
          <td><button class="icon-button" data-undo-history="${escapeHtml(item.id)}">撤销</button></td>
        </tr>
      `).join("") || `<tr><td colspan="5" class="empty">暂无修改记录</td></tr>`}
    </tbody>
  `;
  document.querySelectorAll("[data-undo-history]").forEach((button) => {
    button.addEventListener("click", () => undoHistory(button.dataset.undoHistory));
  });
}

function deleteSelectedHistory() {
  const rows = filteredHistory();
  const indexes = selectedIndexes("[data-select-history]");
  if (!indexes.length) return alert("请先勾选要删除的修改记录。");
  if (!confirm(`确定删除选中的 ${indexes.length} 条修改记录吗？这不会删除当前财务数据。`)) return;
  const ids = new Set(indexes.map((index) => rows[index]?.id).filter(Boolean));
  state.history = (state.history || []).filter((item) => !ids.has(item.id));
  saveStateOnly();
  renderHistory();
}

function scopedUndoState(beforeData, afterData, currentData) {
  const collections = ["projects", "accounts", "accountAdjustments", "companyDebts", "payables", "bankChecks", "changeOrders", "aiReports", "drawingReports", "userAccounts", "translations", "materialPlans", "laborRecords", "warehouseItems", "warehouseOutbounds", "subprojects", "subLedgers", "progress", "entries"];
  const collectionSet = new Set(collections);
  const changedTopLevel = new Set([...Object.keys(beforeData), ...Object.keys(afterData)]
    .filter((key) => !collectionSet.has(key) && JSON.stringify(beforeData[key]) !== JSON.stringify(afterData[key])));
  if (changedTopLevel.size) return null;

  const changes = [];
  collections.forEach((key) => {
    const beforeRows = Array.isArray(beforeData[key]) ? beforeData[key] : [];
    const afterRows = Array.isArray(afterData[key]) ? afterData[key] : [];
    const beforeMap = new Map(beforeRows.map((row) => [row.id, row]));
    const afterMap = new Map(afterRows.map((row) => [row.id, row]));
    const ids = new Set([...beforeMap.keys(), ...afterMap.keys()]);
    ids.forEach((id) => {
      if (!id) return;
      const beforeRow = beforeMap.get(id);
      const afterRow = afterMap.get(id);
      if (!beforeRow && afterRow) changes.push({ key, id, type: "added" });
      else if (beforeRow && !afterRow) changes.push({ key, id, type: "deleted", beforeRow });
      else if (JSON.stringify(beforeRow) !== JSON.stringify(afterRow)) changes.push({ key, id, type: "modified", beforeRow });
    });
  });

  if (changes.length !== 1) return null;
  const change = changes[0];
  const next = JSON.parse(JSON.stringify(currentData));
  next[change.key] = Array.isArray(next[change.key]) ? next[change.key] : [];
  const currentIndex = next[change.key].findIndex((row) => row.id === change.id);
  if (change.type === "added") {
    if (currentIndex >= 0) next[change.key].splice(currentIndex, 1);
  } else if (currentIndex >= 0) {
    next[change.key][currentIndex] = change.beforeRow;
  } else {
    next[change.key].push(change.beforeRow);
  }
  return next;
}

function undoHistory(id) {
  const item = (state.history || []).find((record) => record.id === id);
  if (!item) return;
  if (!confirm(`确定撤销 ${item.time} 这次修改吗？如果只改了一条记录，系统会只恢复这一条。`)) return;
  const currentHistory = state.history || [];
  const beforeData = JSON.parse(item.before);
  const afterData = JSON.parse(item.after || item.before);
  const currentData = dataOnlyState(state);
  const restoredData = scopedUndoState(beforeData, afterData, currentData) || beforeData;
  state = ensureStateShape({
    ...restoredData,
    deletedRecords: state.deletedRecords || [],
    history: [{
      id: makeId(),
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      date: new Date().toISOString().slice(0, 10),
      action: `撤销：${item.action}`,
      before: JSON.stringify(dataOnlyState(state)),
      after: JSON.stringify(restoredData),
    }, ...currentHistory],
  });
  lastDataSnapshot = JSON.stringify(dataOnlyState(state));
  saveStateOnly();
  renderAll();
}

function renderAll() {
  updateCloudStatus();
  currencySelect.value = state.currency || "PHP";
  refreshFilters();
  renderSidebarNav();
  renderPageTabs();
  renderDailyOps();
  renderOverview();
  renderTaskCenter();
  renderProjects();
  renderChangeOrders();
  renderDividends();
  renderAccounts();
  renderCashflow();
  renderChecks();
  renderDebts();
  renderPayables();
  renderUserAccounts();
  renderTranslations();
  renderSubcontracts();
  renderProgressTable();
  renderLedger();
  renderWarehouse();
  renderCostControl();
  renderAiReports();
  renderDrawingReports();
  renderAnalysis();
  renderHistory();
  updateAdminOnlyControls();
  updateInterfaceControls();
  applyLanguageMode(loadUiState().language || "zh");
}

function registerAppInstallService() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // App still works in browsers that block service workers on local files.
    });
  });
}

bindLoginControls();
bindAuthActivity();
bindTopControls();
applyLoginState();
setLocalDiskStatus();
renderAll();
if (autoRefreshEnabled) resetAutoRefreshTimers();
else updateAutoRefreshUi();
offerLocalDiskLoadOnStart();
registerAppInstallService();
