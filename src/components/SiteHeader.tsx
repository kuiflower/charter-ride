"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ...PRODUCT_CATEGORIES.map((category) => ({
      href: `#${category.anchor}`,
      label: category.shortLabel,
    })),
    { href: "#about", label: "關於我們" },
    { href: "#compare", label: "用車對比" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <BrandLogo variant="light" />

        <nav className="hidden items-center gap-5 text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/95 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="rounded-full bg-amber px-4 py-2 font-medium text-ink shadow-md transition hover:brightness-110"
          >
            立即預約
          </a>
        </nav>

        <button
          type="button"
          aria-label="開啟選單"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-ink/35 text-white backdrop-blur-sm lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="mx-5 rounded-2xl border border-white/15 bg-ink/90 p-4 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3 text-white">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="rounded-full bg-amber px-4 py-2 text-center font-medium text-ink"
            >
              立即預約
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
