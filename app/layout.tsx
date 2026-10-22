import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ruec.co.il"),
  icons: { icon: "/brand/symbol-navy.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className={`${noto.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
