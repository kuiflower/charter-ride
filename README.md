# 遇見沖繩包車（charter-ride）

沖繩包車服務展示站：前台展示四大板塊套餐，後台管理產品與留言，支援手機自適應。

## 一圖看懂：本地 / GitHub / 线上

```text
本地改代码  →  Push 到 GitHub  →  Vercel 自动部署  →  网站更新
   Cursor          代码仓库              托管平台           线上访问
```

| 角色 | 是什么 | 你要做什么 |
|---|---|---|
| **本地项目** | 你电脑上的开发目录 | 改代码、本地预览 |
| **GitHub** | 代码的「正式存档」 | Commit 后务必 Push |
| **Vercel** | 网站托管与上线 | 一般不用手动操作，跟 GitHub 自动同步 |

简单说：

- **代码只维护一份真相：GitHub**
- 本地是开发工具
- Vercel 负责把 GitHub 上的代码变成可访问的网站

## 线上地址

- 网站：https://charter-ride.vercel.app
- 后台：https://charter-ride.vercel.app/admin
- GitHub 仓库：https://github.com/kuiflower/charter-ride

后台默认密码：`admin123`（线上已配置环境变量 `ADMIN_PASSWORD`，可在 Vercel 项目设置里修改）

## 以后怎么更新网站

1. 在本地改代码（Cursor / SourceTree 都行）
2. 提交（Commit）
3. 推送到 GitHub 的 `main` 分支（Push）
4. 等 1–2 分钟，Vercel 自动重新部署
5. 刷新线上网站即可看到更新

注意：

- 只保存、或不 Push，**网站不会变**
- 必须 Push 成功，Vercel 才会更新

## 自定义域名（可选）

如果你有自己的域名，在 Vercel 项目里添加域名后，到域名服务商做解析：

- 根域名（如 `example.com`）：A 记录 → `76.76.21.21`
- `www`：CNAME → `cname.vercel-dns.com`

Vercel 显示配置有效后，HTTPS 会自动生效。

## 本地开发

```bash
npm install
npm run dev
```

- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin
- 留言管理：http://localhost:3000/admin/messages
- 本地密码可在 `.env.local` 修改 `ADMIN_PASSWORD`

## 主要功能

- 四大板塊：旅遊包車、郵輪靠港、接送機、無障礙包車
- 產品 CRUD、詳情圖上傳、封面上傳（超出尺寸自動裁剪）
- 前台價格顯示開關
- 首頁普通意向留言 / 產品詳情預訂留言
- 關於我們、信任保障、用車對比（靜態內容）

## 补充说明

- 后台在**线上**新增的产品、留言、上传图片，属于运行时数据，**不会自动写回 GitHub**
- 代码、页面结构、功能改动，才需要通过 GitHub 发布

## 技術棧

Next.js · React · TypeScript · Tailwind CSS · Sharp · Vercel
