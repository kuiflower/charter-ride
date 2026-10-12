import Link from "next/link";

type Props = {
  href?: string;
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
};

export function BrandLogo({
  href = "/",
  variant = "dark",
  showText = true,
  className = "",
}: Props) {
  const textClass =
    variant === "light"
      ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
      : "text-ink";

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.png"
        alt="遇見沖繩"
        className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
      />
      {showText ? (
        <span className={`font-display text-xl font-semibold tracking-wide md:text-2xl ${textClass}`}>
          遇見沖繩包車
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
