#!/bin/zsh
cd "$(dirname "$0")"
echo "正在启动项目财务系统本地硬盘保存..."
echo "打开地址：http://127.0.0.1:8787"
echo "数据保存位置：$(pwd)/local-data/finance-state.json"
echo ""
open "http://127.0.0.1:8787" >/dev/null 2>&1 &
CODEX_NODE="/Users/james/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
if [ -x "$CODEX_NODE" ]; then
  "$CODEX_NODE" local-save-server.js
elif command -v node >/dev/null 2>&1; then
  node local-save-server.js
else
  echo "没有找到 Node.js。请先安装 Node.js，或让 Codex 帮你改成桌面版。"
  read "unused?按回车关闭"
fi
