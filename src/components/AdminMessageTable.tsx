"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { InquiryMessage } from "@/lib/types";

export function AdminMessageTable({ messages }: { messages: InquiryMessage[] }) {
  const router = useRouter();

  async function remove(id: string) {
    if (!confirm("確定刪除這則留言嗎？")) return;
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("刪除失敗");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">類型</th>
              <th className="px-4 py-3 font-medium">聯絡資訊</th>
              <th className="px-4 py-3 font-medium">行程</th>
              <th className="px-4 py-3 font-medium">留言</th>
              <th className="px-4 py-3 font-medium">時間</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink/55">
                  目前還沒有留言。
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message.id} className="border-b border-line/70 align-top last:border-0">
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        message.type === "product"
                          ? "bg-amber/30 text-ink"
                          : "bg-foam text-jade-deep"
                      }`}
                    >
                      {message.type === "product" ? "產品預訂" : "普通意向"}
                    </span>
                    {message.type === "product" ? (
                      <div className="mt-2 text-xs text-ink/65">
                        {message.productName || "未知產品"}
                        {message.productId ? (
                          <div>
                            <Link
                              href={`/products/${message.productId}`}
                              className="text-jade-deep underline-offset-2 hover:underline"
                            >
                              查看產品
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{message.passportName}</div>
                    <div className="text-xs text-ink/60">{message.email}</div>
                    <div className="text-xs text-ink/60">{message.messagingId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div>{message.partySize} 人</div>
                    <div className="text-xs text-ink/60">{message.arrivalDate}</div>
                  </td>
                  <td className="max-w-xs px-4 py-4">
                    <p className="whitespace-pre-wrap text-ink/75">{message.question}</p>
                  </td>
                  <td className="px-4 py-4 text-xs text-ink/55">
                    {new Date(message.createdAt).toLocaleString("zh-TW")}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => remove(message.id)}
                      className="text-red-600 underline-offset-2 hover:underline"
                    >
                      刪除
                    </button>
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
