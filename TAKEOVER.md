# 接管说明 — uppcoder-starter

给 Muse 与 Claude 的交接文档。这个项目已经实际运行并验证通过，可以直接接管开发。

## 这是什么

一个最小可用的 Express 应用，跑在 Uppcoder 唯一的免费 Stack 上，代码以本仓库为唯一来源。2026-11-23 由 Muse 按 Sakiko 确认的默认方案搭建：占位的模板项目已被本项目替换，全程 Spark Free，未绑卡、未付费。

## 关键位置

| 项目 | 值 |
| --- | --- |
| 代码仓库 | https://github.com/huyuchengnb-rgb/uppcoder-starter （Public，分支 `main`） |
| Uppcoder Stack | portal.uppcoder.com 里的 `9178 Express`（stack 1670），账号 huyuchengNB |
| 应用地址 | https://gbepsxvp-express-9178.apps-5.websson.cloud/ |
| 应用入口 | `index.js`（Express，`npm start` 即 `node index.js`） |
| 监听 | `127.0.0.1:APP_PORT`（默认 8000），容器内 nginx 在 80 端口前置代理 |

## 路由

| 路由 | 说明 |
| --- | --- |
| `GET /` | 首页，显示运行状态和启动时间 |
| `GET /api/health` | JSON 健康检查（status、uptime、started_at） |
| `GET /api/hello?name=X` | 示例 JSON 接口 |
| `GET /health` | 平台自己占用，返回纯文本 `OK`，与本应用无关，不要改它 |

## 部署方式（重要）

1. 在本仓库改代码并推送到 `main`（Muse 的 GitHub 通道已验证可读可写本仓库）。
2. 到 Uppcoder stack 详情页，在仓库卡片上点 **Pull**，容器会拉取新提交并自动重启应用，一般几十秒内生效。
3. 注意：Pull 是 `git pull`，不会覆盖容器里的本地修改；如果有人在容器 IDE 里直接改过文件，先处理冲突再 Pull。
4. 容器里保留了模板自带的 `pixi.toml` / `pixi.lock`（仓库里没有这两个文件，Pull 不会删它们）；Node 版本由 pixi 环境提供（>=20）。不要轻易删除 pixi.toml。

## 验证记录（2026-11-23 00:52–00:55 CST，云浏览器已登录会话实测）

- Stack 状态：Active（platform reports this stack as 'running'），仓库卡片显示 `main · f475221`，与仓库 head 一致。
- `GET /`：返回新首页 "uppcoder-starter is running"（占位模板的 "Hello from Express!" 已消失）。
- `GET /api/health`：返回 `{"status":"ok","service":"uppcoder-starter","uptime_seconds":43,...}`。
- `GET /api/hello?name=Sakiko`：返回 `{"message":"Hello, Sakiko!","from":"uppcoder-starter"}`。
- 用量：内存 0.23 / 2 GB，磁盘 0.26 / 2 GB，都在免费额度内。

## 免费额度与限制（Spark Free）

- 1 个常驻 Stack、2 GB 内存、2 GB 磁盘、每天 500 CPU 秒。
- 保持单 Stack，不要新增收费组件；自定义域名不在免费套餐内。

## 访问权限现状

应用当前是 **Private**：打开应用地址需要先登录 Uppcoder 账号。如需任何人可直接打开的链接，到 stack 详情页打开 "Enable public access (no login)" 开关即可（改动前先问 Sakiko）。

## 下一步建议

- 在 `index.js` 里按需要加路由即可，结构不用动；加依赖后记得把 `package-lock.json` 一起提交。
- 若要接数据库：免费额度内还有 1 个 database 名额（当前 0/1），开通前先问 Sakiko。
- 改完代码的标准动作：推送 GitHub → Uppcoder 点 Pull → 打开 `/api/health` 确认 `started_at` 已刷新。
