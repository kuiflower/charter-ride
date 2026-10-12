"use client";

type Props = {
  name: string;
  coverUrl: string;
};

/** 商品主圖區：僅展示封面／主圖 */
export function ProductGallery({ name, coverUrl }: Props) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_40px_rgba(15,33,51,0.08)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverUrl}
        alt={name}
        className="aspect-[16/11] w-full object-cover"
      />
      <p className="border-t border-line bg-foam/50 px-4 py-2 text-xs text-ink/50">
        商品主圖
      </p>
    </div>
  );
}
