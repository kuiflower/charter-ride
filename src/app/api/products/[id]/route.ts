import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteProduct, getProduct, updateProduct } from "@/lib/products";
import { normalizeProductInput } from "@/lib/product-input";
import type { ProductInput } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return NextResponse.json({ error: "產品不存在" }, { status: 404 });
  }
  if (!product.published) {
    const ok = await isAdminAuthenticated();
    if (!ok) {
      return NextResponse.json({ error: "產品不存在" }, { status: 404 });
    }
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<ProductInput>;
  const input = normalizeProductInput(body);
  if (!input) {
    return NextResponse.json({ error: "請填寫完整的產品資訊" }, { status: 400 });
  }

  const product = await updateProduct(id, input);
  if (!product) {
    return NextResponse.json({ error: "產品不存在" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(_request: Request, { params }: Params) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteProduct(id);
  if (!deleted) {
    return NextResponse.json({ error: "產品不存在" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
