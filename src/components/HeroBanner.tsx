"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    desktop: "/hero/alphard.jpg?v=adapt2",
    desktopMd: "/hero/alphard-md.jpg?v=adapt2",
    mobile: "/hero/alphard-mobile.jpg?v=adapt2",
    alt: "豐田阿爾法豪華包車",
  },
  {
    desktop: "/hero/hiace.jpg?v=adapt2",
    desktopMd: "/hero/hiace-md.jpg?v=adapt2",
    mobile: "/hero/hiace-mobile.jpg?v=adapt2",
    alt: "豐田海獅團體包車",
  },
] as const;

const INTERVAL_MS = 6500;

export function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.desktop}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 767px)" srcSet={slide.mobile} />
            <source
              media="(min-width: 768px) and (max-width: 1279px)"
              srcSet={slide.desktopMd}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.desktop}
              alt={slide.alt}
              width={2400}
              height={1600}
              sizes="100vw"
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
              className="hero-banner-img h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      ))}

      {/* 手機減淡遮罩，讓整車更清楚；桌面保留沉浸式暗角 */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink/35 md:from-ink/75 md:via-ink/45 md:to-ink/80" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/55 to-transparent md:h-36 md:from-ink/60" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.18),transparent_45%)] md:block" />

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-10">
        {slides.map((slide, index) => (
          <button
            key={slide.desktop}
            type="button"
            aria-label={`切換至${slide.alt}`}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === active ? "w-8 bg-amber" : "w-1.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </>
  );
}
