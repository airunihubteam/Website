import { routes, type Redirect, type VercelConfig } from "@vercel/config/v1";
import { legacyRedirects } from "./lib/redirects";

export const config: VercelConfig = {
  framework: "nextjs",
  redirects: legacyRedirects.map(
    (rule) => routes.redirect(rule.source, rule.destination, { permanent: true, statusCode: 308 }) as Redirect,
  ),
};
