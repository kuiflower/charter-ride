import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-foam">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl">遇見沖繩包車</p>
          <p className="mt-2 max-w-md text-sm text-foam/70">
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
    </footer>
  );
}
