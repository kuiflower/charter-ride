import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { isProductCategoryId } from "@/lib/categories";
import { createProduct, listProducts } from "@/lib/products";
import { normalizeProductInput } from "@/lib/product-input";
import type { ProductInput } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const category = searchParams.get("category");

  if (all) {
    const ok = await isAdminAuthenticated();
    if (!ok) {
      return NextResponse.json({ error: "未登入" }, { status: 401 });
    }
    const products = await listProducts(
      category && isProductCategoryId(category) ? { category } : undefined,
    );
    return NextResponse.json(products);
  }

  const products = await listProducts({
    publishedOnly: true,
    ...(category && isProductCategoryId(category) ? { category } : {}),
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ProductInput>;
  const input = normalizeProductInput(body);
  if (!input) {
    return NextResponse.json({ error: "請填寫完整的產品資訊" }, { status: 400 });
  }

  const product = await createProduct(input);
  return NextResponse.json(product, { status: 201 });
}
