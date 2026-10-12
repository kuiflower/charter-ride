export const PRODUCT_CATEGORIES = [
  {
    id: "tourism",
    label: "沖繩旅遊包車",
    shortLabel: "旅遊包車",
    summary: "一日遊、多日遊與景點串連，專屬司機帶你深度走訪沖繩。",
    anchor: "tourism",
  },
  {
    id: "cruise",
    label: "沖繩郵輪靠港包車",
    shortLabel: "郵輪靠港",
    summary: "郵輪靠港當日專車接送與周邊景點行程，準時回港不耽誤登船。",
    anchor: "cruise",
  },
  {
    id: "airport",
    label: "沖繩接送機",
    shortLabel: "接送機",
    summary: "那霸機場往返飯店、市區與各區景點，準點接機送機更省心。",
    anchor: "airport",
  },
  {
    id: "accessible",
    label: "沖繩無障礙包車",
    shortLabel: "無障礙包車",
    summary: "配備無障礙設備與貼心服務，讓行動不便旅客也能安心暢遊。",
    anchor: "accessible",
  },
  {
    id: "bus",
    label: "沖繩巴士包車",
    shortLabel: "巴士包車",
    summary: "小巴／中巴／大巴可選，小巴可選中文司機，適合家族、公司團與團體出遊。",
    anchor: "bus",
  },
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

export function isProductCategoryId(value: string): value is ProductCategoryId {
  return PRODUCT_CATEGORIES.some((item) => item.id === value);
}

export function getCategory(id: ProductCategoryId) {
  return PRODUCT_CATEGORIES.find((item) => item.id === id)!;
}

export function getCategoryLabel(id: ProductCategoryId) {
  return getCategory(id).label;
}
