"use client";

import { OpenLineContactButton } from "@/components/OpenLineContactButton";

export function ProductCtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href="#product-booking"
        className="inline-flex rounded-full bg-jade px-6 py-3 text-sm font-semibold text-white transition hover:bg-jade-deep"
      >
        前往預約
      </a>
      <OpenLineContactButton className="inline-flex rounded-full border border-jade px-6 py-3 text-sm font-semibold text-jade-deep transition hover:bg-jade/10">
        客服預約
      </OpenLineContactButton>
    </div>
  );
}
