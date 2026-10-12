import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { ContactFab } from "@/components/ContactFab";
import "./globals.css";

const sans = Noto_Sans_SC({
  variable: "--font-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const display = Noto_Serif_SC({
  variable: "--font-display-sc",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "遇見沖繩包車 | 舒適專屬出行",
    template: "遇見沖繩包車 | %s",
  },
  description: "沖繩包車服務：機場接送、景點行程與深度遊，手機也能輕鬆預約。",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <ContactFab />
      </body>
    </html>
  );
}
