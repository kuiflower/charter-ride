import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminProductTable } from "@/components/AdminProductTable";
import { isAdminAuthenticated } from "@/lib/auth";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <div className="min-h-screen bg-mist px-5 py-16">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl text-ink">
            遇見沖繩包車
          </Link>
        </div>
        <AdminLoginForm />
      </div>
    );
  }

  const products = await listProducts();

  return (
    <div className="min-h-screen bg-mist px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <AdminProductTable products={products} />
      </div>
    </div>
  );
}
