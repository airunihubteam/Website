"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/locale";

export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "he";
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
  }, [locale]);

  return null;
}
