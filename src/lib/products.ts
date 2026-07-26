import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { isProductCategoryId } from "./categories";
import type { Product, ProductInput } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "products.json");

const seedProducts: Product[] = [
  {
    id: "seed-tourism-day",
    category: "tourism",
    name: "沖繩經典一日遊",
    summary: "美之海水族館、古宇利大橋與北岸風景一次走完。",
    description:
      "適合首次到訪沖繩的旅客。司機熟悉北部熱門路線，可依體力與喜好彈性調整停留時間，當天來回飯店或機場。",
    price: 28000,
    priceUnit: "起/天",
    showPrice: true,
    capacity: 6,
    vehicleType: "Alphard / Vellfire",
    imageUrl:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["專屬司機", "路線可調", "含通行過橋建議", "中文溝通"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-tourism-custom",
    category: "tourism",
    name: "沖繩客製景點包車",
    summary: "依你的清單規劃南部、中部或離島周邊行程。",
    description:
      "想去首里城、國際通、瀨長島，或追櫻花與日落，都可以事先告知。我們會依交通與人潮安排最順路線。",
    price: 32000,
    priceUnit: "起/天",
    showPrice: true,
    capacity: 6,
    vehicleType: "Alphard / HiAce",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["完全客製", "多日可約", "景點建議", "親子友善"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-cruise-half",
    category: "cruise",
    name: "郵輪靠港半日遊",
    summary: "靠港當日精華行程，準時返回碼頭。",
    description:
      "從那霸港或中城灣港出發，安排市區與近郊熱門點，預留充裕回港時間，降低誤船風險。",
    price: 18000,
    priceUnit: "起/趟",
    showPrice: true,
    capacity: 6,
    vehicleType: "Alphard",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["碼頭接送", "回港準時", "半日精華", "行李可暫置建議"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-cruise-full",
    category: "cruise",
    name: "郵輪靠港全日包車",
    summary: "靠港全日深度遊，含碼頭接送與彈性停留。",
    description:
      "適合停靠時間較長的郵輪旅客，可往北岸或南部景點，結束後直接送回碼頭。",
    price: 30000,
    priceUnit: "起/天",
    showPrice: true,
    capacity: 7,
    vehicleType: "HiAce / Alphard",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["全日包車", "碼頭對接", "行程彈性", "團體可詢"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-airport-naha",
    category: "airport",
    name: "那霸機場接送",
    summary: "那霸機場往返飯店、市區與主要住宿區。",
    description:
      "航班落地後舉牌接機，協助行李上車；送機可依航班時間安排出發，減少趕路壓力。",
    price: 4500,
    priceUnit: "起/趟",
    showPrice: true,
    capacity: 4,
    vehicleType: "轎車 / Alphard",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["舉牌接機", "準點送機", "行李協助", "夜間可約"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-airport-area",
    category: "airport",
    name: "機場至各區專車",
    summary: "往返恩納、名護、本部、豐崎等熱門住宿區。",
    description:
      "長途接送一樣舒適準時，可依行李量與人數推薦車型，適合家庭與多人同行。",
    price: 9000,
    priceUnit: "起/趟",
    showPrice: true,
    capacity: 6,
    vehicleType: "Alphard / HiAce",
    imageUrl:
      "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["跨區接送", "大行李友善", "航班追蹤", "兒童座椅可選"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-accessible-tour",
    category: "accessible",
    name: "無障礙觀光包車",
    summary: "輪椅友好車輛與景點路線規劃，安心出遊。",
    description:
      "提供斜坡板／升降設備車輛選項，司機協助上下車。可事先確認景點無障礙設施與停留便利性。",
    price: 36000,
    priceUnit: "起/天",
    showPrice: true,
    capacity: 4,
    vehicleType: "無障礙福祉車",
    imageUrl:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["斜坡板協助", "路線評估", "耐心接送", "陪伴同行友善"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "seed-accessible-airport",
    category: "accessible",
    name: "無障礙接送機",
    summary: "機場與飯店之間的無障礙專車接送。",
    description:
      "適合輪椅使用者與行動不便旅客，預留充足上下車時間，行李與輔具可一併協助搬運。",
    price: 8000,
    priceUnit: "起/趟",
    showPrice: true,
    capacity: 3,
    vehicleType: "無障礙福祉車",
    imageUrl:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["福祉車", "輔具協助", "舉牌接機", "預留緩衝時間"],
    published: true,
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
];

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seedProducts, null, 2), "utf8");
  }
}

function normalizeProduct(raw: Product): Product {
  return {
    ...raw,
    category: isProductCategoryId(raw.category) ? raw.category : "tourism",
    detailImages: Array.isArray(raw.detailImages) ? raw.detailImages : [],
    showPrice: raw.showPrice !== false,
  };
}

async function readAll(): Promise<Product[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const products = JSON.parse(raw) as Product[];
  return products.map(normalizeProduct);
}

async function writeAll(products: Product[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
}

export async function listProducts(options?: {
  publishedOnly?: boolean;
  category?: Product["category"];
}) {
  const products = await readAll();
  let filtered = options?.publishedOnly
    ? products.filter((p) => p.published)
    : products;
  if (options?.category) {
    filtered = filtered.filter((p) => p.category === options.category);
  }
  return filtered.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getProduct(id: string) {
  const products = await readAll();
  return products.find((p) => p.id === id) ?? null;
}

export async function createProduct(input: ProductInput) {
  const products = await readAll();
  const now = new Date().toISOString();
  const product: Product = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  products.unshift(product);
  await writeAll(products);
  return product;
}

export async function updateProduct(id: string, input: ProductInput) {
  const products = await readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated: Product = {
    ...products[index],
    ...input,
    id,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  await writeAll(products);
  return updated;
}

export async function deleteProduct(id: string) {
  const products = await readAll();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  await writeAll(next);
  return true;
}

export async function resetSeedProducts() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(seedProducts, null, 2), "utf8");
  return seedProducts;
}
