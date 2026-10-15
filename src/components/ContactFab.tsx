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
    // 外层留出内边距，避免手机底部安全区/视口把阴影横切裁掉
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:p-8">
      <button
        type="button"
        aria-label="開啟 LINE 客服"
        aria-expanded={open}
        onClick={openLineContact}
        className="pointer-events-auto relative inline-flex h-14 w-14 items-center justify-center rounded-full transition hover:scale-105 hover:brightness-110 [filter:drop-shadow(0_3px_6px_rgba(15,33,51,0.22))]"
      >
        <span className="h-full w-full overflow-hidden rounded-full">
          <LineAppIcon className="h-full w-full" />
        </span>
      </button>
    </div>
  );
}
