"use client";

import { OpenLineContactButton } from "@/components/OpenLineContactButton";

export function ProductCtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <OpenLineContactButton className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(6,199,85,0.35)] transition hover:brightness-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/line-icon.png"
          alt=""
          aria-hidden="true"
          className="h-5 w-5 rounded-full object-cover"
        />
        客服預約
      </OpenLineContactButton>
      <a
        href="#product-booking"
        className="inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink/75 transition hover:border-jade hover:text-jade-deep"
      >
        留言預約
      </a>
    </div>
  );
}
