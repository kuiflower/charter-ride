"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  InquiryForm,
  type InquiryFormValues,
} from "@/components/InquiryForm";

type Props = {
  productId: string;
  productName: string;
};

type StoredBooking = InquiryFormValues & {
  createdAt: string;
};

function storageKey(productId: string) {
  return `charter-booking:${productId}`;
}

function readStoredBooking(productId: string): StoredBooking | null {
  try {
    const raw = localStorage.getItem(storageKey(productId));
    if (!raw) return null;
    return JSON.parse(raw) as StoredBooking;
  } catch {
    return null;
  }
}

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("charter-booking-change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("charter-booking-change", handler);
  };
}

export function ProductBookingPanel({ productId, productName }: Props) {
  const getSnapshot = useCallback(
    () => readStoredBooking(productId),
    [productId],
  );
  const booking = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const booked = Boolean(booking);

  const summary = useMemo(() => {
    if (!booking) return null;
    return [
      `護照姓名：${booking.passportName}`,
      `信箱：${booking.email}`,
      `即時通訊：${booking.messagingId}`,
      `人數：${booking.partySize} 人`,
      `抵達日期：${booking.arrivalDate}`,
    ];
  }, [booking]);

  function handleSuccess(_message: unknown, values: InquiryFormValues) {
    const payload: StoredBooking = {
      ...values,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(storageKey(productId), JSON.stringify(payload));
    window.dispatchEvent(new Event("charter-booking-change"));
  }

  return (
    <section id="product-booking" className="scroll-mt-24">
      {booked ? (
        <div className="space-y-4">
          <button
            type="button"
            disabled
            className="inline-flex w-fit cursor-default rounded-full bg-ink/15 px-6 py-3 text-sm font-semibold text-ink/55"
          >
            已預約
          </button>
          {summary ? (
            <div className="max-w-xl space-y-3 rounded-2xl border border-line bg-white px-5 py-5">
              <p className="text-sm font-medium text-ink">您的預約資訊</p>
              <ul className="space-y-1 text-sm text-ink/70">
                {summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-[#e67e22]">
                我們已經收到您的預約資訊，會盡快透過您預留的聯絡方式與您取得聯繫，為您提供預訂服務。
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="max-w-2xl rounded-[1.75rem] border border-line bg-white px-5 py-8 md:px-8">
          <InquiryForm
            type="product"
            productId={productId}
            productName={productName}
            title="關於沖繩旅遊我想問..."
            subtitle="請填寫下列表格完成此套餐預約留言"
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </section>
  );
}
