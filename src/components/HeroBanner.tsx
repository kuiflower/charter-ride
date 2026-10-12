"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    src: "/hero/hiace.jpg?v=jdm2",
    alt: "豐田海獅團體包車",
  },
  {
    src: "/hero/alphard.jpg?v=1",
    alt: "豐田阿爾法豪華包車",
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
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="animate-drift h-full w-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/50 to-ink/80" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.22),transparent_45%)]" />

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
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
