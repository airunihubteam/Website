import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocaleDocument } from "@/components/locale-document";
import { PageEnter, TapFeedback } from "@/components/tap-feedback";
import type { Locale } from "@/lib/locale";

export function SiteFrame({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const lang = locale === "en" ? "en" : "he";

  return (
    <div dir={dir} lang={lang} className="relative flex min-h-full flex-1 flex-col bg-white text-ink">
      <LocaleDocument locale={locale} />
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:z-40 focus:m-3 focus:bg-white focus:px-3 focus:py-2 focus:text-club">
        {locale === "en" ? "Skip to content" : "דלג לתוכן"}
      </a>
      <Header locale={locale} />
      <TapFeedback />
      <main id="content" className="relative z-10 flex-1 pt-[4.5rem]">
        <PageEnter>{children}</PageEnter>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
