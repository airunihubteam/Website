import type { VercelConfig } from "@vercel/config/v1";
import { legacyRedirects } from "./lib/redirects";

export const config: VercelConfig = {
  framework: "nextjs",
  redirects: legacyRedirects.map((rule) => ({
    source: rule.source,
    destination: rule.destination,
    permanent: true,
  })),
};
