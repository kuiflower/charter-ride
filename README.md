# 遇見沖繩包車（charter-ride）

沖繩包車服務展示站：前台展示四大板塊套餐，後台管理產品與留言，支援手機自適應。

## 快速開始

```bash
npm install
npm run dev
```

- 前台：http://localhost:3000
- 後台：http://localhost:3000/admin
- 留言管理：http://localhost:3000/admin/messages
- 預設後台密碼：`admin123`（可在 `.env.local` 修改 `ADMIN_PASSWORD`）

## 主要功能

- 四大板塊：旅遊包車、郵輪靠港、接送機、無障礙包車
- 產品 CRUD、詳情圖上傳、封面上傳（超出尺寸自動裁剪）
- 前台價格顯示開關
- 首頁普通意向留言 / 產品詳情預訂留言
- 關於我們、信任保障、用車對比（靜態內容）

## 技術棧

Next.js · React · TypeScript · Tailwind CSS · Sharp
