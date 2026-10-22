export type Locale = "he" | "en";

export type Localized = {
  he: string;
  en?: string;
};

export function pick(value: Localized | undefined, locale: Locale): string | undefined {
  if (!value) return undefined;
  if (locale === "en") return value.en;
  return value.he;
}

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

export function withLocale(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "he") return normalized;
  if (normalized === "/") return "/en";
  return `/en${normalized}`;
}
