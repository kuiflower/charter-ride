"use client";

import { FormEvent, useMemo, useState } from "react";
import type { InquiryMessage, MessageType } from "@/lib/types";

export type InquiryFormValues = {
  passportName: string;
  email: string;
  messagingId: string;
  partySize: number;
  arrivalDate: string;
  question: string;
};

type Props = {
  type: MessageType;
  productId?: string;
  productName?: string;
  variant?: "light" | "dark";
  title?: string;
  subtitle?: string;
  onSuccess?: (message: InquiryMessage, values: InquiryFormValues) => void;
};

const partyOptions = Array.from({ length: 20 }, (_, index) => index + 1);

export function InquiryForm({
  type,
  productId,
  productName,
  variant = "light",
  title = "關於沖繩旅遊我想問...",
  subtitle = "有任何問題歡迎填寫下列表格與我們聯繫",
  onSuccess,
}: Props) {
  const [passportName, setPassportName] = useState("");
  const [email, setEmail] = useState("");
  const [messagingId, setMessagingId] = useState("");
  const [partySize, setPartySize] = useState<number | "">("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const fieldClass = useMemo(
    () =>
      variant === "dark"
        ? "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-foam outline-none ring-amber placeholder:text-foam/40 focus:ring-2"
        : "w-full rounded-xl border border-[#d7dde3] bg-white px-4 py-3 text-ink outline-none ring-jade placeholder:text-ink/35 focus:ring-2",
    [variant],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (partySize === "") {
      setError("請選擇此次行程人數");
      return;
    }
    setLoading(true);
    setError("");

    const values: InquiryFormValues = {
      passportName: passportName.trim(),
      email: email.trim(),
      messagingId: messagingId.trim(),
      partySize,
      arrivalDate,
      question: question.trim(),
    };

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        productId: type === "product" ? productId : null,
        ...values,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "提交失敗，請稍後再試");
      return;
    }

    const message = (await res.json()) as InquiryMessage;
    setDone(true);
    onSuccess?.(message, values);
  }

  if (done && type === "general") {
    return (
      <div className={variant === "dark" ? "text-foam" : "text-ink"}>
        <h2 className="font-display text-3xl text-jade md:text-4xl">已收到您的留言</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#e67e22] md:text-base">
          我們已經收到您的預約資訊，會盡快透過您預留的聯絡方式與您取得聯繫，為您提供預訂服務。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h2
          className={`font-display text-3xl md:text-4xl ${
            variant === "dark" ? "text-jade" : "text-jade-deep"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-2 text-sm md:text-base ${
            variant === "dark" ? "text-foam/70" : "text-ink/55"
          }`}
        >
          {subtitle}
          {productName ? `（預約套餐：${productName}）` : ""}
        </p>
      </div>

      <input
        required
        value={passportName}
        onChange={(e) => setPassportName(e.target.value)}
        className={fieldClass}
        placeholder="請輸入您的護照英文姓名拼音"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldClass}
        placeholder="請輸入您的電子信箱，例：hello@example.com"
      />
      <input
        required
        value={messagingId}
        onChange={(e) => setMessagingId(e.target.value)}
        className={fieldClass}
        placeholder="請輸入您的即時通訊 ID，例：LINE ID 或 WeChat ID"
      />
      <select
        required
        value={partySize === "" ? "" : String(partySize)}
        onChange={(e) => setPartySize(Number(e.target.value))}
        className={fieldClass}
      >
        <option value="" disabled>
          請選擇此次行程共有幾人（1–20）
        </option>
        {partyOptions.map((count) => (
          <option key={count} value={count}>
            {count} 人
          </option>
        ))}
      </select>
      <input
        required
        type="date"
        value={arrivalDate}
        onChange={(e) => setArrivalDate(e.target.value)}
        className={fieldClass}
        placeholder="請輸入您預計抵達沖繩日期"
      />
      <textarea
        required
        rows={5}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={fieldClass}
        placeholder="請輸入您的問題"
      />

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-jade py-3 text-sm font-semibold text-white transition hover:bg-jade-deep disabled:opacity-60 md:w-auto md:px-10"
      >
        {loading ? "送出中..." : "送出留言"}
      </button>
    </form>
  );
}
