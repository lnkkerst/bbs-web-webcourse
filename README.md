# BBS Web

一个简单的博客系统前端，《Web应用程序开发》课设。

## 开发

确保安装 `pnpm`：

```bash
npm install -g pnpm
pnpm setup
```

or：

```bash
corepack enable
```

### 安装依赖

```bash
pnpm i
```

### 开发模式

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

## 部署

### 环境变量

| 名称                        | 作用                                                 |
| --------------------------- | ---------------------------------------------------- |
| `NUXT_PUBLIC_BLOG_API_BASE` | 后端 API 的地址（叫 blogApi 纯粹是因为起错名了;-( ） |

### 运行

```bash
node .output/server/index.mjs
```

### Docker

构建 image：

```bash
docker buildx build -t bbs-web:latest .
```

运行：

```bash
docker run --name bbs-web -d \
  --stopped=unless-stopped \
  -e NUXT_PUBLIC_BLOG_API_BASE=xxx \
  -p 80:80 \
  bbs-web:latest
```

docker compose:

```bash
vim docker-compose.yml
docker compose up -d
```

### Serverless

- [x] Vercel: 直接选中部署就行
