import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminMessageTable } from "@/components/AdminMessageTable";
import { isAdminAuthenticated } from "@/lib/auth";
import { listMessages } from "@/lib/messages";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "留言管理",
};

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function AdminMessagesPage({ searchParams }: Props) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const params = await searchParams;
  const type =
    params.type === "general" || params.type === "product" ? params.type : undefined;
  const messages = await listMessages(type ? { type } : undefined);

  const tabs = [
    { href: "/admin/messages", label: "全部", active: !type },
    {
      href: "/admin/messages?type=general",
      label: "普通意向留言",
      active: type === "general",
    },
    {
      href: "/admin/messages?type=product",
      label: "產品預訂留言",
      active: type === "product",
    },
  ];

  return (
    <div className="min-h-screen bg-mist px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg text-jade-deep">遇見沖繩包車</p>
            <h1 className="mt-1 font-display text-3xl md:text-4xl">留言管理</h1>
            <p className="mt-1 text-sm text-ink/65">
              查看首頁普通意向留言與產品詳情頁預訂留言。
            </p>
          </div>
          <Link href="/admin" className="text-sm text-jade-deep underline-offset-4 hover:underline">
            返回產品管理
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-4 py-2 text-sm ${
                tab.active
                  ? "bg-jade text-white"
                  : "border border-line bg-white text-ink/70"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <AdminMessageTable messages={messages} />
      </div>
    </div>
  );
}
