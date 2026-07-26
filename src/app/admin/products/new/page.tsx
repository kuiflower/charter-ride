import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/ProductForm";
import { isAdminAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "新建產品",
};

export default async function NewProductPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  return (
    <div className="min-h-screen bg-mist px-5 py-8 md:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl">新建產品</h1>
          <Link href="/admin" className="text-sm text-jade-deep">
            返回列表
          </Link>
        </div>
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
