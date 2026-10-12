"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONTACT_CHANNELS, type ContactChannel } from "@/lib/contact-channels";

function ChannelIcon({ id }: { id: ContactChannel["id"] }) {
  switch (id) {
    case "line":
      return (
        <span className="text-[11px] font-bold tracking-tight text-white">LINE</span>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.89.52 3.66 1.42 5.18L2 22l5.06-1.52a9.86 9.86 0 0 0 4.98 1.34h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.76 14.05c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.66.78 1.95.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
        </svg>
      );
    case "wechat":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.162 4.203 2.973 5.5-.13.47-.948 3.108-.98 3.297-.04.24.11.23.25.17.11-.05 3.62-2.37 4.17-2.74.94.27 1.94.42 2.98.42.27 0 .53-.01.79-.03A6.67 6.67 0 0 1 9.5 13.78c0-3.64 3.34-6.6 7.46-6.6.22 0 .44.01.66.02C16.53 4.16 12.98 2.19 8.69 2.19zm-2.3 4.94c.52 0 .94.42.94.94s-.42.94-.94.94-.94-.42-.94-.94.42-.94.94-.94zm4.98 0c.52 0 .94.42.94.94s-.42.94-.94.94-.94-.42-.94-.94.42-.94.94-.94zM16.96 8.27c-3.56 0-6.44 2.47-6.44 5.51 0 3.04 2.88 5.51 6.44 5.51.76 0 1.49-.12 2.16-.34.64.42 2.7 1.76 2.78 1.81.1.06.22.06.19-.09-.03-.14-.56-1.92-.65-2.27 1.25-1.02 2.06-2.49 2.06-4.12 0-3.04-2.88-5.51-6.54-5.51zm-2.16 3.55c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zm4.32 0c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z" />
        </svg>
      );
    case "kakaotalk":
      return (
        <span className="text-[10px] font-bold tracking-tight text-white">TALK</span>
      );
  }
}

export function ContactFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setTip(null);
  }, [pathname]);

  useEffect(() => {
    if (!tip) return;
    const timer = window.setTimeout(() => setTip(null), 2200);
    return () => window.clearTimeout(timer);
  }, [tip]);

  if (pathname?.startsWith("/admin")) return null;

  const onChannelClick = (channel: ContactChannel) => {
    if (!channel.href.trim()) {
      setTip(`${channel.label} 連結稍後開放，請先用預約表單留言`);
      return;
    }
    window.open(channel.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-6">
      {tip ? (
        <div className="max-w-[220px] rounded-xl bg-ink/90 px-3 py-2 text-xs leading-relaxed text-white shadow-lg">
          {tip}
        </div>
      ) : null}

      {open ? (
        <div className="flex flex-col items-center gap-3">
          {CONTACT_CHANNELS.map((channel) => (
            <button
              key={channel.id}
              type="button"
              aria-label={channel.label}
              title={channel.href ? channel.label : `${channel.label}（即將開放）`}
              onClick={() => onChannelClick(channel)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-jade text-white shadow-[0_10px_24px_rgba(15,33,51,0.28)] transition hover:scale-105 hover:bg-jade-deep"
            >
              <ChannelIcon id={channel.id} />
            </button>
          ))}
          <button
            type="button"
            aria-label="關閉客服選單"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-jade text-white shadow-[0_10px_24px_rgba(15,33,51,0.28)] transition hover:scale-105 hover:bg-jade-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-[2.2]" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label="開啟客服選單"
          onClick={() => setOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-jade text-white shadow-[0_12px_28px_rgba(15,33,51,0.3)] transition hover:scale-105 hover:bg-jade-deep"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
            <path d="M5 5.8A2.8 2.8 0 0 1 7.8 3h8.4A2.8 2.8 0 0 1 19 5.8v7.4a2.8 2.8 0 0 1-2.8 2.8H10l-3.8 3.2c-.7.6-1.8.1-1.8-.8V5.8Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
