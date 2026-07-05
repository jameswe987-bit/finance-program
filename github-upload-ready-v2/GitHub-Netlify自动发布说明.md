# GitHub + Netlify 自动发布说明

## 以后怎么更新

以后程序修改完成后，只要把当前项目同步到 GitHub，Netlify 会自动重新发布网站。

手机还是打开原来的 Netlify 链接，不需要每次手动上传压缩包。

## 第一次设置

1. 注册或登录 GitHub。
2. 新建一个仓库，例如：`finance-program`。
3. 把当前项目文件夹上传到这个 GitHub 仓库。
4. 打开 Netlify。
5. 选择 `Add new site`。
6. 选择 `Import an existing project`。
7. 连接 GitHub。
8. 选择刚才的 `finance-program` 仓库。
9. Netlify 会读取 `netlify.toml`，自动发布：

`outputs/finance-program-netlify-deploy`

## 每次功能更新后

1. 先在系统里导出本机备份，或上传本机数据到云端。
2. 让 Codex 修改程序。
3. 让 Codex 重新生成 Netlify 发布文件。
4. 把项目同步到 GitHub。
5. Netlify 自动发布。
6. 手机关闭 APP 后重新打开，或浏览器刷新。

## 重要说明

- GitHub + Netlify 负责更新程序功能。
- Supabase 负责同步业务数据。
- 两者不是同一个东西。

