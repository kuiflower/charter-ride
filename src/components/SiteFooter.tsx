import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const socialLinks = [
  {
    name: "Facebook",
    href: "",
    label: "Facebook（即將開放）",
    className: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-white">
        <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.3C12.3 3 11 4.5 11 6.7v1.8H9v2.8h2V21h3.5v-9.7h2.4l.6-2.8h-3Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yuanhang5666/",
    label: "Instagram",
    className:
      "bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-white stroke-[1.8]">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.7" cy="7.3" r="0.9" fill="white" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "",
    label: "Threads（即將開放）",
    className: "bg-white",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-ink">
        <path d="M12.1 4.2c-2.8 0-5 1.7-5 4.7 0 2.2 1.3 3.7 3.5 4.3-.4.3-.8.8-.8 1.5 0 .9.7 1.5 1.7 1.5 1.6 0 2.7-1.2 2.7-3.1V9.8c0-1.5.7-2.3 1.9-2.3.8 0 1.4.4 1.7 1 .5-.2 1.1-.5 1.6-.8-.5-1.3-1.7-2.5-3.5-2.5-1.5 0-2.5.8-2.9 2-.5-1.2-1.6-2-3-2zm.1 9.2c-1.2-.3-2-1.1-2-2.5 0-1.8 1.2-2.9 3-2.9.5 0 1 .1 1.4.3v2.7c0 1.1-.5 1.9-1.4 2.2-.3.1-.7.2-1 .2z" />
      </svg>
    ),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-foam">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <BrandLogo variant="light" href="/" />
            <p className="mt-3 max-w-md text-sm text-foam/70">
              專業司機、靈活行程，涵蓋旅遊包車、郵輪靠港、接送機與無障礙服務。
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-foam/75">
            <a href="tel:4008001234" className="hover:text-white">
              客服熱線 400-800-1234
            </a>
            <a href="mailto:hello@meet-okinawa.local" className="hover:text-white">
              hello@meet-okinawa.local
            </a>
            <Link href="/admin" className="hover:text-white">
              管理後台
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-sm font-semibold tracking-[0.18em] text-white">FOLLOW US</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((item) =>
              item.href ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-105 hover:brightness-110 ${item.className}`}
                >
                  {item.icon}
                </a>
              ) : (
                <span
                  key={item.name}
                  title={item.label}
                  aria-label={item.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full opacity-45 ${item.className}`}
                >
                  {item.icon}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
