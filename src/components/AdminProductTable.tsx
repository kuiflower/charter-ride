"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function AdminProductTable({ products }: { products: Product[] }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function remove(id: string, name: string) {
    if (!confirm(`確定刪除「${name}」嗎？`)) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("刪除失敗");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-jade-deep">遇見沖繩包車</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">產品管理</h1>
          <p className="mt-1 text-sm text-ink/65">
            新建產品時請選擇四大板塊之一，發佈後會出現在對應前台區塊。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-full bg-jade px-4 py-2 text-sm font-medium text-white"
          >
            新建產品
          </Link>
          <Link
            href="/admin/messages"
            className="rounded-full border border-line px-4 py-2 text-sm"
          >
            留言管理
          </Link>
          <Link href="/" className="rounded-full border border-line px-4 py-2 text-sm">
            查看前台
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 text-sm"
          >
            登出
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">產品</th>
              <th className="px-4 py-3 font-medium">板塊</th>
              <th className="px-4 py-3 font-medium">價格</th>
              <th className="px-4 py-3 font-medium">狀態</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink/55">
                  還沒有產品，點擊「新建產品」開始。
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-ink/55">
                      {product.vehicleType} · {product.capacity} 人
                    </div>
                  </td>
                  <td className="px-4 py-4 text-ink/80">
                    {getCategoryLabel(product.category)}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      ¥{formatPrice(product.price)}
                      <span className="text-ink/55"> {product.priceUnit}</span>
                    </div>
                    {product.showPrice === false ? (
                      <div className="mt-1 text-xs text-ink/45">前台隱藏</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        product.published
                          ? "bg-foam text-jade-deep"
                          : "bg-sand/40 text-ink/70"
                      }`}
                    >
                      {product.published ? "已發佈" : "草稿"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-jade-deep underline-offset-2 hover:underline"
                      >
                        編輯
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(product.id, product.name)}
                        className="text-red-600 underline-offset-2 hover:underline"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
