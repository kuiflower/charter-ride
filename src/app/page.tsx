import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { TrustSections } from "@/components/TrustSections";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "選擇套餐",
    text: "瀏覽車型與行程方案，按人數與場景挑選。",
  },
  {
    title: "確認行程",
    text: "告訴我們時間、上車點與目的地，即可報價。",
  },
  {
    title: "專屬接駕",
    text: "司機準時抵達，全程陪同，行程靈活調整。",
  },
];

export default async function HomePage() {
  const products = await listProducts({ publishedOnly: true });

  return (
    <div className="bg-mist text-ink">
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2400&q=80"
            alt="公路與遠山"
            className="animate-drift h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/50 to-ink/80" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.22),transparent_45%)]" />
        </div>

        <SiteHeader />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-20">
          <p className="animate-fade font-display text-4xl text-white md:text-6xl lg:text-7xl">
            遇見沖繩包車
          </p>
          <h1 className="animate-rise delay-1 mt-5 max-w-2xl text-2xl font-medium leading-snug text-white md:text-4xl">
            沖繩旅遊、郵輪靠港、接送機與無障礙包車
          </h1>
          <p className="animate-rise delay-2 mt-4 max-w-xl text-base text-white/80 md:text-lg">
            四大服務板塊，專屬司機陪同，手機也能輕鬆挑選套餐並預約。
          </p>
          <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              查看服務板塊
            </a>
            <a
              href="#booking"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              諮詢預約
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-jade-deep">How it works</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">三步出發</h2>
        <p className="mt-3 max-w-xl text-ink/70">流程簡單清晰，適合手機快速完成預約。</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="border-t border-line pt-5">
              <p className="text-sm text-jade-deep">0{index + 1}</p>
              <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-jade-deep">Services</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">四大包車板塊</h2>
        <p className="mt-3 max-w-xl text-ink/70">
          依出行需求選擇板塊，每個板塊下都有對應產品套餐。
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <a
              key={category.id}
              href={`#${category.anchor}`}
              className="group border-t border-line pt-5 transition hover:border-jade"
            >
              <p className="text-sm text-jade-deep">0{index + 1}</p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-jade-deep">
                {category.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{category.summary}</p>
            </a>
          ))}
        </div>
      </section>

      {PRODUCT_CATEGORIES.map((category, sectionIndex) => {
        const items = products.filter((product) => product.category === category.id);
        return (
          <section
            key={category.id}
            id={category.anchor}
            className={sectionIndex % 2 === 0 ? "bg-foam/70 py-16 md:py-24" : "py-16 md:py-24"}
          >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-jade-deep">
                    {category.shortLabel}
                  </p>
                  <h2 className="mt-3 font-display text-3xl md:text-5xl">{category.label}</h2>
                  <p className="mt-3 max-w-2xl text-ink/70">{category.summary}</p>
                </div>
                <Link
                  href="/admin"
                  className="text-sm text-jade-deep underline-offset-4 hover:underline"
                >
                  後台新增此板塊產品
                </Link>
              </div>

              {items.length === 0 ? (
                <div className="mt-10 rounded-[1.5rem] border border-dashed border-line bg-white/70 px-6 py-14 text-center">
                  <p className="font-display text-2xl">此板塊暫無已發佈產品</p>
                  <p className="mt-2 text-sm text-ink/60">
                    請到後台新建產品，並選擇「{category.label}」。
                  </p>
                </div>
              ) : (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <TrustSections />

      <section id="booking" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <InquiryForm type="general" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
