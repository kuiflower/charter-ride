"use client";

import { usePathname } from "next/navigation";
import { LINE_ADD_FRIEND_URL } from "@/lib/contact-channels";

export function ContactFab() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  if (!LINE_ADD_FRIEND_URL.trim()) return null;

  return (
    <div className="fixed bottom-5 right-4 z-50 md:bottom-8 md:right-6">
      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="透過 LINE 加入好友"
        title="LINE 加入好友"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#06C755] text-white shadow-[0_12px_28px_rgba(15,33,51,0.3)] transition hover:scale-105 hover:brightness-110"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 3.98 3.54 7.3 8.3 7.93-.11.5-.63 2.86-.73 3.3-.12.54.2.53.42.39.18-.12 2.85-1.94 3.3-2.25.5.07 1.07.11 1.71.11 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8zm-3.35 10.75H6.28a.47.47 0 0 1-.47-.47V8.72c0-.26.21-.47.47-.47h.66c.26 0 .47.21.47.47v3.69h1.71c.26 0 .47.21.47.47v.66c0 .26-.21.47-.47.47zm1.6-.47a.47.47 0 0 1-.47.47h-.66a.47.47 0 0 1-.47-.47V8.72c0-.26.21-.47.47-.47h.66c.26 0 .47.21.47.47v4.56zm4.61.47h-.66a.47.47 0 0 1-.45-.34l-1.4-4.56a.47.47 0 0 1 .45-.6h.74c.2 0 .38.13.45.32l.76 2.9.76-2.9a.47.47 0 0 1 .45-.32h.74c.3 0 .52.28.45.6l-1.4 4.56a.47.47 0 0 1-.45.34zm4.02 0h-2.37a.47.47 0 0 1-.47-.47V8.72c0-.26.21-.47.47-.47h.66c.26 0 .47.21.47.47v3.69h1.24c.26 0 .47.21.47.47v.66c0 .26-.21.47-.47.47z" />
        </svg>
      </a>
    </div>
  );
}
