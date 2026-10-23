import type { MetadataRoute } from "next";
import { accelerator, catalogPath, conferences, programs } from "@/content/catalog";
import { withLocale } from "@/lib/locale";

const hebrewPaths = [
  "/",
  "/about",
  "/programs",
  "/accelerator",
  "/conferences",
  "/pitch-night",
  "/internship",
  "/community",
  "/ai",
  "/join/chair",
  "/join/programs",
  "/join/new-program",
  ...programs.map(catalogPath),
  catalogPath(accelerator),
  ...conferences.map(catalogPath),
];

const englishPaths = [
  "/",
  "/about",
  "/programs",
  "/accelerator",
  "/conferences",
  "/pitch-night",
  "/internship",
  "/community",
  "/ai",
  ...programs.filter((item) => item.summary.en).map(catalogPath),
  catalogPath(accelerator),
  ...conferences.filter((item) => item.summary.en).map(catalogPath),
].map((path) => withLocale(path, "en"));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...hebrewPaths, ...englishPaths].map((path) => ({
    url: path === "/" ? "https://ruec.co.il/" : `https://ruec.co.il${path}`,
    lastModified: new Date("2026-10-22"),
  }));
}
