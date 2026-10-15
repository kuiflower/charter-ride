"use client";

import { useLineContact } from "@/components/LineContactProvider";

type Props = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function OpenLineContactButton({
  children,
  className = "",
  ariaLabel = "客服預約",
}: Props) {
  const { openLineContact } = useLineContact();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={openLineContact}
      className={className}
    >
      {children}
    </button>
  );
}
