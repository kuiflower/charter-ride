import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { AccessiblePriceTable } from "@/components/AccessiblePriceTable";
import { AirportBusPriceTable } from "@/components/AirportBusPriceTable";
import { AirportCarPriceTable } from "@/components/AirportCarPriceTable";
import { BusCharterPriceGraphic } from "@/components/BusCharterPriceGraphic";
import { BusPriceTable } from "@/components/BusPriceTable";
import { ProductBookingPanel } from "@/components/ProductBookingPanel";
import { ProductGallery } from "@/components/ProductGallery";
import { SiteFooter } from "@/components/SiteFooter";
import { getCategoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import {
  COMMON_PRODUCT_TEMPLATES,
  getProductSpecificDetailImages,
} from "@/lib/product-templates";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product || !product.published) notFound();

  const specificImages = getProductSpecificDetailImages(product.detailImages).filter(
    (url) => !url.includes("/04-price."),
  );
  const showBusPriceTable = product.category === "bus";
  const showAirportBusPriceTable = product.id === "seed-airport-bus";
  const showAirportCarPriceTable = product.id === "seed-airport-car";
  const showAccessiblePriceTable = product.category === "accessible";
  const showBusCharterPriceGraphic = product.id === "seed-airport-bus";
  const commonBlocks = COMMON_PRODUCT_TEMPLATES.map((url) =>
    showBusCharterPriceGraphic && url.includes("/04-price.")
      ? ({ kind: "bus-charter-price" } as const)
      : ({ kind: "image", url } as const),
  );

  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="border-b border-line bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <BrandLogo variant="dark" />
          <Link href={`/#${product.category}`} className="text-sm text-jade-deep">
            返回{getCategoryLabel(product.category)}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <ProductGallery name={product.name} coverUrl={product.imageUrl} />

          <div className="flex flex-col justify-center">
            <p className="text-sm text-jade-deep">
              {getCategoryLabel(product.category)} · {product.vehicleType} · 可乘{" "}
              {product.capacity} 人
            </p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-ink/70">{product.summary}</p>
            <p className="mt-6 text-3xl font-semibold text-jade-deep">
              {product.showPrice !== false ? (
                <>
                  ¥{formatPrice(product.price)}
                  <span className="ml-2 text-base font-normal text-ink/60">
                    {product.priceUnit}
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium text-ink/55">價格請洽詢</span>
              )}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <li key={feature} className="rounded-full bg-foam px-3 py-1.5 text-sm">
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#product-booking"
                className="inline-flex rounded-full bg-jade px-6 py-3 text-sm font-semibold text-white transition hover:bg-jade-deep"
              >
                前往預約
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl">套餐說明</h2>
          <p className="mt-3 max-w-3xl whitespace-pre-wrap leading-relaxed text-ink/75">
            {product.description}
          </p>
        </div>

        {specificImages.length > 0 ||
        showBusPriceTable ||
        showAirportBusPriceTable ||
        showAirportCarPriceTable ||
        showAccessiblePriceTable ||
        commonBlocks.length > 0 ? (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-2">
            {specificImages.map((url, index) => (
              <div
                key={`specific-${url}-${index}`}
                className="overflow-hidden rounded-xl border border-line/80 bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${product.name} 詳情圖 ${index + 1}`}
                  className="block h-auto w-full"
                />
              </div>
            ))}

            {showBusPriceTable ? <BusPriceTable /> : null}
            {showAirportBusPriceTable ? <AirportBusPriceTable /> : null}
            {showAirportCarPriceTable ? <AirportCarPriceTable /> : null}
            {showAccessiblePriceTable ? <AccessiblePriceTable /> : null}

            {commonBlocks.map((block, index) =>
              block.kind === "bus-charter-price" ? (
                <div
                  key={`common-bus-charter-price-${index}`}
                  className="overflow-hidden rounded-xl border border-line/80 bg-white"
                >
                  <BusCharterPriceGraphic />
                </div>
              ) : (
                <div
                  key={`common-${block.url}-${index}`}
                  className="overflow-hidden rounded-xl border border-line/80 bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={`${product.name} 說明圖 ${index + 1}`}
                    className="block h-auto w-full"
                  />
                </div>
              ),
            )}
          </div>
        ) : null}

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-3xl">預約此套餐</h2>
          <p className="mt-2 text-sm text-ink/60">
            填寫下方預約留言，我們會盡快與您聯繫。
          </p>
          <div className="mt-6">
            <ProductBookingPanel productId={product.id} productName={product.name} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
