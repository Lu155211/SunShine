# JianLu Personal Site

公网部署项目名：`lujian`

在线网站：https://lujian.river-kicker.workers.dev

网站静态文件位于 `public/`，Cloudflare 配置位于 `wrangler.jsonc`。

本地预览：

```bash
cd public
python3 -m http.server 4175
```

部署到 Cloudflare Workers：

```bash
npx wrangler login
npx wrangler deploy
```
