"use client";

import { useState } from "react";

type Props = {
  name: string;
  coverUrl: string;
  detailImages: string[];
};

export function ProductGallery({ name, coverUrl, detailImages }: Props) {
  const images = [coverUrl, ...detailImages].filter(
    (url, index, list) => Boolean(url) && list.indexOf(url) === index,
  );
  const [active, setActive] = useState(images[0] ?? coverUrl);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.75rem] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active}
          alt={name}
          className="aspect-[16/11] w-full object-cover transition duration-500"
        />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
          {images.map((url, index) => {
            const selected = url === active;
            return (
              <button
                key={`${url}-${index}`}
                type="button"
                onClick={() => setActive(url)}
                className={`overflow-hidden rounded-xl border-2 transition ${
                  selected
                    ? "border-jade shadow-[0_0_0_2px_rgba(45,138,106,0.2)]"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${name} 圖片 ${index + 1}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
