"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { LINE_CONTACT } from "@/lib/contact-channels";

type LineContactContextValue = {
  open: boolean;
  openLineContact: () => void;
  closeLineContact: () => void;
};

const LineContactContext = createContext<LineContactContextValue | null>(null);

export function useLineContact() {
  const ctx = useContext(LineContactContext);
  if (!ctx) {
    throw new Error("useLineContact must be used within LineContactProvider");
  }
  return ctx;
}

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

function LineContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.classList.add("line-modal-open");

    const preventBackgroundScroll = (event: TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-line-modal-panel]")) return;
      event.preventDefault();
    };
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.classList.remove("line-modal-open");
      document.removeEventListener("touchmove", preventBackgroundScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!open) return null;

  const copyAccountId = async () => {
    try {
      await navigator.clipboard.writeText(LINE_CONTACT.accountId);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{
        paddingTop: "max(2.75rem, calc(env(safe-area-inset-top) + 1.25rem))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right))",
      }}
    >
      <button
        type="button"
        aria-label="關閉"
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
        style={{ touchAction: "none" }}
        onClick={onClose}
      />

      <div
        data-line-modal-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[61] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,33,51,0.28)]"
      >
        <div className="flex items-start justify-between gap-3 bg-[#06C755] px-5 py-3.5 text-white">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-white/85">官方客服</p>
            <h2 id={titleId} className="mt-0.5 text-base font-semibold sm:text-lg">
              加入 LINE，預約更方便
            </h2>
          </div>
          <button
            type="button"
            aria-label="關閉視窗"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-[2.4]" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-3.5 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink/70">
            加入「{LINE_CONTACT.displayName}」後，直接傳日期、人數與接送地點即可報價。
          </p>

          <ol className="space-y-2 text-sm text-ink/80">
            {[
              "點下方按鈕，或掃描二維碼加入好友",
              "傳送：預訂日期、人數、接送地點",
              "專人回覆報價與確認細節",
            ].map((step, index) => (
              <li key={step} className="flex gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#06C755]/15 text-[11px] font-semibold text-[#06C755]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-center rounded-2xl border border-line bg-mist/60 px-3 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LINE_CONTACT.qrImage}
              alt="遇見沖繩包車 LINE 官方帳號二維碼"
              className="h-36 w-36 rounded-xl bg-white object-contain p-1.5 shadow-sm"
            />
            <p className="mt-2 text-center text-xs text-ink/55">
              用 LINE 掃描，或點下方按鈕開啟
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-ink/45">LINE 帳號 ID</p>
              <p className="truncate font-mono text-sm font-semibold text-ink">
                {LINE_CONTACT.accountId}
              </p>
            </div>
            <button
              type="button"
              onClick={copyAccountId}
              className="shrink-0 rounded-full bg-foam px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-[#d8ebe3]"
            >
              {copied ? "已複製" : "複製 ID"}
            </button>
          </div>

          <a
            href={LINE_CONTACT.addFriendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#06C755] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
          >
            <LineAppIcon className="h-7 w-7 rounded-full" />
            開啟 LINE 加入好友
          </a>

          <p className="text-center text-[11px] leading-relaxed text-ink/45">
            搜尋不到時，可複製帳號 ID，到 LINE「加入好友」→「搜尋 ID」貼上。
          </p>
        </div>
      </div>
    </div>
  );
}

export function LineContactProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openLineContact = useCallback(() => setOpen(true), []);
  const closeLineContact = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openLineContact, closeLineContact }),
    [open, openLineContact, closeLineContact],
  );

  return (
    <LineContactContext.Provider value={value}>
      {children}
      {!pathname?.startsWith("/admin") ? (
        <LineContactModal open={open} onClose={closeLineContact} />
      ) : null}
    </LineContactContext.Provider>
  );
}
