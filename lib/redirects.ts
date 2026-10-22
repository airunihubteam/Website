type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

const pairs: [string, string][] = [
  ["/alumni", "/community"],
  ["/en/alumni", "/en/community"],
  ["/contact", "/"],
  ["/en/contact", "/en"],
  ["/join-newsletter", "/"],
  ["/en/join-newsletter", "/en"],
  ["/newsletter", "/"],
  ["/en/newsletter", "/en"],
  ["/pitch-night/startups", "/pitch-night"],
  ["/pitch-night/startups/thanks", "/pitch-night"],
  ["/pitch-night/startups/registration-completed", "/pitch-night"],
  ["/en/pitch-night/startups", "/en/pitch-night"],
  ["/en/pitch-night/startups/thanks", "/en/pitch-night"],
  ["/en/pitch-night/startups/registration-completed", "/en/pitch-night"],
  ["/forms/committee", "/join/chair"],
  ["/forms/join-us", "/join/programs"],
  ["/forms/new-program", "/join/new-program"],
  ["/en/forms/committee", "/join/chair"],
  ["/en/forms/join-us", "/join/programs"],
  ["/en/forms/new-program", "/join/new-program"],
  ["/./programs", "/programs"],
  ["/./accelerator", "/accelerator"],
  ["/./conferences", "/conferences"],
  ["/en/./programs", "/en/programs"],
  ["/en/./accelerator", "/en/accelerator"],
  ["/en/./conferences", "/en/conferences"],
];

export const legacyRedirects: LegacyRedirect[] = pairs.map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}));
