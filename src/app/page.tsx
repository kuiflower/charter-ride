import { HeroBanner } from "@/components/HeroBanner";
import { HeroCtaButtons } from "@/components/HeroCtaButtons";
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
    title: "聯繫客服",
    text: "加入官方 LINE／WhatsApp，告知旅遊日期、人數與需求。",
  },
  {
    title: "確認預約",
    text: "確認行程細節與報價，預付訂金即可鎖定。",
  },
  {
    title: "開始行程",
    text: "專屬接駕，司機準時抵達，行程靈活調整。",
  },
];

export default async function HomePage() {
  const products = await listProducts({ publishedOnly: true });

  return (
    <div className="bg-mist text-ink">
      <section className="relative bg-ink md:min-h-[100svh] md:overflow-hidden">
        {/* 手機：按 3:2 完整展示車輛；桌面：鋪滿視窗 */}
        <div className="relative aspect-[3/2] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
          <HeroBanner />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink to-transparent md:hidden" />
        </div>

        <SiteHeader />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-5 pb-10 pt-6 md:min-h-[100svh] md:justify-center md:px-8 md:pb-24 md:pt-20">
          <p className="animate-fade font-display text-4xl text-white md:text-6xl lg:text-7xl">
            遇見沖繩包車
          </p>
          <h1 className="animate-rise delay-1 mt-4 max-w-2xl text-2xl font-medium leading-snug text-white md:mt-5 md:text-4xl">
            沖繩旅遊、郵輪靠港、接送機與無障礙包車
          </h1>
          <p className="animate-rise delay-2 mt-3 max-w-xl text-base text-white/80 md:mt-4 md:text-lg">
            四大服務板塊，專屬司機陪同，手機也能輕鬆挑選套餐並預約。
          </p>
          <HeroCtaButtons />
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-jade-deep md:text-sm">Booking</p>
        <h2 className="mt-2 font-display text-2xl md:mt-3 md:text-5xl">預訂流程</h2>
        <p className="mt-1.5 max-w-xl text-sm text-ink/70 md:mt-3 md:text-base">
          三步完成預約，流程簡單清楚。
        </p>
        <div className="mt-5 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="border-t border-line pt-3 md:pt-5">
              <p className="text-xs text-jade-deep md:text-sm">0{index + 1}</p>
              <h3 className="mt-1 font-display text-lg md:mt-2 md:text-2xl">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/70 md:mt-2 md:text-sm">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {PRODUCT_CATEGORIES.map((category, sectionIndex) => {
        const items = products.filter((product) => product.category === category.id);
        return (
          <section
            key={category.id}
            id={category.anchor}
            className={
              sectionIndex % 2 === 0
                ? "bg-foam/70 py-10 md:py-24"
                : "py-10 md:py-24"
            }
          >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jade-deep md:text-sm">
                  {category.shortLabel}
                </p>
                <h2 className="mt-2 font-display text-2xl md:mt-3 md:text-5xl">
                  {category.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-ink/70 md:mt-3 md:text-base">
                  {category.summary}
                </p>
              </div>

              {items.length === 0 ? (
                <div className="mt-10 rounded-[1.5rem] border border-dashed border-line bg-white/70 px-6 py-14 text-center">
                  <p className="font-display text-2xl">此板塊暫無產品</p>
                  <p className="mt-2 text-sm text-ink/60">請稍後再查看，或聯絡我們諮詢行程。</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
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
