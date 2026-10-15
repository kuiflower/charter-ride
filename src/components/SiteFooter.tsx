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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/threads-icon.png"
        alt=""
        aria-hidden="true"
        className="h-5 w-5 object-contain"
      />
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
            <p className="font-medium text-white">株式会社KOUEKI</p>
            <a href="tel:08011557881" className="hover:text-white">
              080-1155-7881
            </a>
            <a href="mailto:koueki.gojisyou@gmail.com" className="hover:text-white">
              koueki.gojisyou@gmail.com
            </a>
            <p>沖縄県那覇市具志3-25-17</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-sm font-semibold tracking-[0.18em] text-white">FOLLOW US</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
