import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "後台管理",
    template: "遇見沖繩包車 | %s",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
