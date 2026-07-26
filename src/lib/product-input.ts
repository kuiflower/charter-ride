import { isProductCategoryId } from "@/lib/categories";
import type { ProductInput } from "@/lib/types";

type ProductInputBody = Omit<Partial<ProductInput>, "features" | "detailImages"> & {
  features?: string[] | string;
  detailImages?: string[] | string;
};

function parseList(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,，]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeProductInput(body: ProductInputBody): ProductInput | null {
  const name = body.name?.trim();
  const summary = body.summary?.trim();
  const description = body.description?.trim();
  const vehicleType = body.vehicleType?.trim();
  const imageUrl = body.imageUrl?.trim();
  const priceUnit = body.priceUnit?.trim() || "起/天";
  const price = Number(body.price);
  const capacity = Number(body.capacity);
  const category =
    typeof body.category === "string" && isProductCategoryId(body.category)
      ? body.category
      : null;

  if (
    !category ||
    !name ||
    !summary ||
    !description ||
    !vehicleType ||
    !imageUrl ||
    Number.isNaN(price) ||
    Number.isNaN(capacity)
  ) {
    return null;
  }

  return {
    category,
    name,
    summary,
    description,
    price,
    priceUnit,
    showPrice: body.showPrice !== false,
    capacity,
    vehicleType,
    imageUrl,
    detailImages: parseList(body.detailImages),
    features: parseList(body.features),
    published: Boolean(body.published),
  };
}
