import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/ProductForm";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "編輯產品",
};

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-mist px-5 py-8 md:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl">編輯產品</h1>
          <Link href="/admin" className="text-sm text-jade-deep">
            返回列表
          </Link>
        </div>
        <ProductForm mode="edit" initial={product} />
      </div>
    </div>
  );
}
