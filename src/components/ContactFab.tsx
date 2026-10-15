"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { LINE_CONTACT } from "@/lib/contact-channels";

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
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOpen(false);
    setCopied(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarGap = window.innerWidth - documentElement.clientWidth;

    body.classList.add("line-modal-open");
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      body.classList.remove("line-modal-open");
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (pathname?.startsWith("/admin")) return null;

  const copyAccountId = async () => {
    try {
      await navigator.clipboard.writeText(LINE_CONTACT.accountId);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 md:bottom-8 md:right-6">
        <button
          type="button"
          aria-label="開啟 LINE 客服"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-[0_12px_28px_rgba(15,33,51,0.3)] transition hover:scale-105 hover:brightness-110"
        >
          <LineAppIcon className="h-full w-full" />
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          style={{
            paddingTop: "max(0.75rem, env(safe-area-inset-top))",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
            paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          }}
        >
          <button
            type="button"
            aria-label="關閉"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            style={{ touchAction: "none" }}
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[61] flex w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,33,51,0.28)]"
            style={{
              maxHeight: "min(78dvh, calc(100dvh - 5.5rem))",
              overscrollBehavior: "contain",
            }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 bg-[#06C755] px-5 py-4 text-white">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-white/85">官方客服</p>
                <h2 id={titleId} className="mt-0.5 text-lg font-semibold">
                  加入 LINE，預約更方便
                </h2>
              </div>
              <button
                type="button"
                aria-label="關閉視窗"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-[2.4]" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <p className="text-sm leading-relaxed text-ink/70">
                加入「{LINE_CONTACT.displayName}」官方帳號後，直接傳日期、人數與接送地點，我們會盡快回覆報價。
              </p>

              <ol className="space-y-2.5 text-sm text-ink/80">
                {[
                  "用下方按鈕開啟 LINE，或掃描二維碼加入好友",
                  "傳送：預訂日期、人數、接送地點／行程需求",
                  "專人回覆報價與確認細節",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#06C755]/15 text-[11px] font-semibold text-[#06C755]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col items-center rounded-2xl border border-line bg-mist/60 px-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LINE_CONTACT.qrImage}
                  alt="遇見沖繩包車 LINE 官方帳號二維碼"
                  className="h-40 w-40 rounded-xl bg-white object-contain p-2 shadow-sm"
                />
                <p className="mt-3 text-center text-xs text-ink/55">
                  手機請用 LINE 掃描；電腦可請客人掃碼，或點下方按鈕在手機開啟
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2.5">
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
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#06C755] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
              >
                <LineAppIcon className="h-7 w-7 rounded-full" />
                開啟 LINE 加入好友
              </a>

              <p className="pb-1 text-center text-[11px] leading-relaxed text-ink/45">
                搜尋不到時，可先複製帳號 ID，到 LINE「加入好友」→「搜尋 ID」貼上。
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
