import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getCategoryLabel } from "@/lib/categories";

const delayClass = ["delay-1", "delay-2", "delay-3"] as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const delay = delayClass[Math.min(index, 2)];
  return (
    <article
      className={`group animate-rise overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_50px_rgba(15,41,34,0.08)] ${delay}`}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs text-white backdrop-blur">
            {getCategoryLabel(product.category)}
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
            {product.vehicleType} · {product.capacity} 人
          </span>
        </div>
        <div className="space-y-3 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl text-ink">{product.name}</h3>
            {product.showPrice !== false ? (
              <p className="shrink-0 text-right text-sm text-ink-soft">
                <span className="block text-lg font-semibold text-jade-deep">
                  ¥{formatPrice(product.price)}
                </span>
                {product.priceUnit}
              </p>
            ) : (
              <p className="shrink-0 text-sm font-medium text-ink/50">價格請洽詢</p>
            )}
          </div>
          <p className="text-sm leading-relaxed text-ink/70">{product.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature) => (
              <li
                key={feature}
                className="rounded-full bg-foam px-3 py-1 text-xs text-ink-soft"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
