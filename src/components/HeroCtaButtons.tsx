"use client";

import { OpenLineContactButton } from "@/components/OpenLineContactButton";

export function HeroCtaButtons() {
  return (
    <div className="animate-rise delay-3 mt-6 flex flex-wrap gap-3 md:mt-8">
      <a
        href="#tourism"
        className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
      >
        查看套餐
      </a>
      <OpenLineContactButton
        ariaLabel="諮詢預約"
        className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        諮詢預約
      </OpenLineContactButton>
    </div>
  );
}
