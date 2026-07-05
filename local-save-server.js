const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = Number(process.env.PORT || 8787);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "local-data");
const STATE_FILE = path.join(DATA_DIR, "finance-state.json");
const MAX_BODY = 150 * 1024 * 1024;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...headers,
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload, null, 2), { "Content-Type": "application/json; charset=utf-8" });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("数据太大，无法保存到本地硬盘。"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function safeStaticPath(requestPath) {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0]);
  const filePath = path.join(ROOT, cleanPath === "/" ? "index.html" : cleanPath);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(ROOT)) return "";
  return resolved;
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") return send(res, 204, "");
  if (pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, dataFile: STATE_FILE });
  }
  if (pathname === "/api/local-state" && req.method === "GET") {
    if (!fs.existsSync(STATE_FILE)) return sendJson(res, 404, { message: "本地硬盘还没有保存数据。" });
    return send(res, 200, fs.readFileSync(STATE_FILE), { "Content-Type": "application/json; charset=utf-8" });
  }
  if (pathname === "/api/local-state" && req.method === "POST") {
    const body = await readBody(req);
    const payload = JSON.parse(body || "{}");
    if (!payload || payload.app !== "finance-program" || !payload.data) {
      return sendJson(res, 400, { message: "保存数据格式不正确。" });
    }
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmpFile = `${STATE_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(payload, null, 2));
    fs.renameSync(tmpFile, STATE_FILE);
    return sendJson(res, 200, { ok: true, savedAt: new Date().toISOString(), dataFile: STATE_FILE });
  }
  return sendJson(res, 404, { message: "接口不存在。" });
}

function handleStatic(req, res, pathname) {
  const filePath = safeStaticPath(pathname);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
  }
  const ext = path.extname(filePath);
  send(res, 200, fs.readFileSync(filePath), {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url || "/");
    const pathname = parsed.pathname || "/";
    if (pathname.startsWith("/api/")) return await handleApi(req, res, pathname);
    return handleStatic(req, res, pathname);
  } catch (error) {
    return sendJson(res, 500, { message: error.message || "本地保存服务错误。" });
  }
});

server.on("error", (error) => {
  console.error("本地硬盘保存服务启动失败：");
  console.error(error.message || error);
  console.error("请确认没有其它程序占用 8787 端口，或重新双击启动文件。");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`项目财务系统本地硬盘保存已启动：http://127.0.0.1:${PORT}`);
  console.log(`数据保存位置：${STATE_FILE}`);
});
