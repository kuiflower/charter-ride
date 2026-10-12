/** 所有商品詳情頁底部預設顯示的通用模版圖（不含商品主圖） */
export const COMMON_PRODUCT_TEMPLATES = [
  "/products/day-tour/02-highlights.jpg",
  "/products/day-tour/03-vehicles.jpg",
  "/products/day-tour/12-space.jpg",
  "/products/day-tour/13-luggage.jpg",
  "/products/day-tour/04-price.jpg",
  "/products/day-tour/11-deposit.jpg",
  "/products/day-tour/05-include.jpg",
  "/products/day-tour/09-notes.jpg",
  "/products/day-tour/10-cancel.jpg",
  "/products/day-tour/06-family.jpg",
  "/products/day-tour/08-trust.jpg",
] as const;

const templateSet = new Set<string>(COMMON_PRODUCT_TEMPLATES);

export function isCommonTemplateUrl(url: string) {
  if (templateSet.has(url)) return true;
  // 相容舊資料：僅 day-tour 目錄下非封面圖視為通用模版
  // /products/cruise/ 等商品專屬圖不屬於通用模版
  return (
    url.startsWith("/products/day-tour/") && !url.includes("/01-cover.")
  );
}

/** 商品自己上傳的專屬詳情圖（排除通用模版） */
export function getProductSpecificDetailImages(images: string[] | undefined) {
  return (images ?? []).filter((url) => !isCommonTemplateUrl(url));
}

/** 前台詳情區最終展示：專屬詳情圖 + 通用模版圖 */
export function getDisplayDetailImages(images: string[] | undefined) {
  return [...getProductSpecificDetailImages(images), ...COMMON_PRODUCT_TEMPLATES];
}
