import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1CCBbKM7yk/?mibextid=wwXIfr",
    label: "Facebook",
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
    href: "https://www.threads.com/@yuanhang5666?igshid=NTc4MTIwNjQ2YQ==",
    label: "Threads",
    className: "bg-white",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-ink">
        <path d="M16.5 9.48c-.3-1.79-1.48-2.96-3.57-3.16-2.52-.24-4.35 1.4-4.35 3.95 0 2.53 1.64 4.2 4.21 4.2 1.55 0 2.72-.48 3.58-1.34v1.54c-.87.67-2.17 1.14-3.73 1.14-3.55 0-5.98-2.41-5.98-5.62 0-3.26 2.51-5.68 6.07-5.68 3.14 0 5.28 1.8 5.59 4.61.07.66.03 1.28-.1 1.85h-1.85c.1-.45.16-.93.13-1.49zm-3.44 3.37c-1.62 0-2.64-1.06-2.64-2.61s1.02-2.61 2.64-2.61c1.55 0 2.56 1.08 2.56 2.61s-1.01 2.61-2.56 2.61z" />
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
