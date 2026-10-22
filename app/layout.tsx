import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Assistant, Heebo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["600", "700", "800"],
  variable: "--font-assistant",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400"],
  variable: "--font-heebo",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ruec.co.il"),
  icons: { icon: "/brand/symbol-navy.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className={`${assistant.variable} ${heebo.variable} ${plex.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
