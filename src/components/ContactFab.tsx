"use client";

import { usePathname } from "next/navigation";
import { useLineContact } from "@/components/LineContactProvider";

function LineAppIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/line-icon.png"
      alt=""
      aria-hidden="true"
      className={`object-cover ${className}`}
    />
  );
}

export function ContactFab() {
  const pathname = usePathname();
  const { open, openLineContact } = useLineContact();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 md:bottom-8 md:right-6">
      <button
        type="button"
        aria-label="開啟 LINE 客服"
        aria-expanded={open}
        onClick={openLineContact}
        className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-[0_12px_28px_rgba(15,33,51,0.3)] transition hover:scale-105 hover:brightness-110"
      >
        <LineAppIcon className="h-full w-full" />
      </button>
    </div>
  );
}
