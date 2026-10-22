import type { Localized } from "@/lib/locale";

export type ItemKind = "program" | "accelerator" | "conference";

export type CatalogItem = {
  slug: string;
  kind: ItemKind;
  name: Localized;
  summary: Localized;
  image: string;
};

export const programs: CatalogItem[] = [
  {
    slug: "artemis",
    kind: "program",
    name: { he: "Artemis", en: "Artemis" },
    image: "/media/artemis.jpg",
    summary: {
      he: "סדנאות פרקטיות ומגוונות מנשות מפתח בתעשייה תוך שימת דגש על כלים לחשיבה יזמית ועל הסוגיות הקשורות בשילוב נשים בתעשייה.",
      en: "The ARTEMIS club activates to promote female entrepreneurship in all its given aspects.",
    },
  },
  {
    slug: "defense-tech",
    kind: "program",
    name: { he: "Defense Tech", en: "Defense Tech" },
    image: "/media/defense.jpg",
    summary: {
      he: "התוכנית תעניק לסטודנטים חשיפה מעמיקה לעולם הביטחוני-טכנולוגי, תוך שיתוף פעולה הדוק עם האקדמיה, הצבא והתעשייה הביטחונית.",
      en: "The program will provide students with in-depth exposure to the technological-security world, fostering close collaboration with academia, the military, and the defense industry.",
    },
  },
  {
    slug: "runispace",
    kind: "program",
    name: { he: "Runi Space" },
    image: "/media/runispace.png",
    summary: {
      he: "חשיפה לתעשיית ה-EdTech בישראל, הרצאות מפי מיטב המומחים בתחום, פיתוח מיזמים העונים על בעיות שונות במערכת החינוך.",
    },
  },
  {
    slug: "foodtech",
    kind: "program",
    name: { he: "FoodTech", en: "FoodTech" },
    image: "/media/foodtech.jpg",
    summary: {
      he: "תוכנית ההכשרה והעשרה הוותיקה, הגדולה והמקצועית ביותר בארץ עבור סטודנטים שרוצים להיחשף ולהשתלב בתעשיית המזון.",
      en: "FoodTech is the oldest, largest and most professional enrichment program in Israel for students who want to be exposed to and integrate into the food and technology industry.",
    },
  },
  {
    slug: "greenbiz",
    kind: "program",
    name: { he: "GreenBiz", en: "GreenBiz" },
    image: "/media/greenbiz.jpg",
    summary: {
      he: "נושמים וחיים את עולמות הקיימות? זה המקום עבור יזמים צעירים שמעוניינים לרכוש כלים בעולמות היזמות והקיימות.",
      en: "The Greenbiz club is a place for young entrepreneurs who are interested in acquiring tools in the worlds of entrepreneurship and sustainability.",
    },
  },
  {
    slug: "impact",
    kind: "program",
    name: { he: "Impact", en: "Impact" },
    image: "/media/impact.jpg",
    summary: {
      he: "חשיבה ואסטרטגיה עסקית-פיננסית, שמראה לעולם שהרצון לעשות טוב ולשגשג כלכלית יכולים להתקיים במקביל.",
      en: "IMPACT is a business-financial thinking and strategy that shows the world that the desire to do good and prosper financially can coexist.",
    },
  },
  {
    slug: "leaders",
    kind: "program",
    name: { he: "Leaders", en: "Leaders" },
    image: "/media/leaders.jpg",
    summary: {
      he: "חשיפה אל תוך סודות העולם התאגידי, פגישות עם מנכ״לים ובכירים בחברות גדולות אשר יספרו על העולם העסקי.",
      en: "The Leaders Club was established to expose selected students to the secrets of the corporate world, meetings with CEOs and executives of large companies (Israeli and international) who will speak about their experiences and view of the business world.",
    },
  },
  {
    slug: "m-club",
    kind: "program",
    name: { he: "M-Club", en: "M-Club" },
    image: "/media/m-club.jpg",
    summary: {
      he: "שיווק נמצא בכל מקום. חיבור הסטודנטים לסיפורי ההצלחה של הגורמים המובילים בתעשיית השיווק, היח״צ והפרסום.",
      en: "The M-Club connects the students to the success stories of the leading factors in the marketing, PR and advertising industry.",
    },
  },
  {
    slug: "product-hub",
    kind: "program",
    name: { he: "Product-Hub", en: "Product-Hub" },
    image: "/media/product-hub.jpg",
    summary: {
      he: "חשיפה והיכרות עם תפקיד מנהל/ת המוצר, מתן השראה למנהלי מוצר עתידיים, וכלים מעשיים ופרקטיים לניהול מוצר.",
      en: "A semester program that gives students knowledge in the world of product management in the high-tech industry.",
    },
  },
  {
    slug: "proptech",
    kind: "program",
    name: { he: "PropTech", en: "PropTech" },
    image: "/media/proptech.jpg",
    summary: {
      he: "שוק הנדל״ן המסורתי כיום הינו מיושן וצמא לשינויים טכנולוגיים. המועדון חושף את הסטודנטים למיזמים חדשניים המשלבים נדל״ן וטכנולוגיה.",
      en: "The Proptech club exposes students to innovative ventures that combine real estate and technology.",
    },
  },
  {
    slug: "pulse",
    kind: "program",
    name: { he: "Pulse", en: "Pulse" },
    image: "/media/pulse.jpg",
    summary: {
      he: "נלמד ונבין כיצד הטכנולוגיה וההזדמנויות של העולם החדש מקדמים את האנושות לרפואה משנת חיים כמו שלא הכרנו אותה עד היום.",
      en: "The development of medical technological innovation is the active center in the world of medicine today.",
    },
  },
  {
    slug: "tech-talk",
    kind: "program",
    name: { he: "Tech-Talk" },
    image: "/media/tech-talk.jpg",
    summary: {
      he: "תוכנית באנגלית המארחת מדי שבוע יזם מתעשייה אחרת המשתף ומספר על הקשיים, ההצלחות והאתגרים שעמדו בדרכו.",
    },
  },
];

export const accelerator: CatalogItem = {
  slug: "momentum",
  kind: "accelerator",
  name: { he: "Momentum" },
  image: "/media/momentum.jpg",
  summary: {
    he: "תוכנית האצה הפועלת מזה כ-11 שנים המוקדשת להעצמה וסיוע לסטארט-אפים בשלבי Seed של סטודנטים ובוגרי האוניברסיטה.",
  },
};

export const conferences: CatalogItem[] = [
  {
    slug: "beyondsummit",
    kind: "conference",
    name: { he: "BEYOND SUMMIT" },
    image: "/media/beyond.jpg",
    summary: {
      he: "כנס הספורט הסטודנטיאלי הגדול בישראל אשר משמש כפסגה המאחדת בין אקדמיה לתעשיית הספורטק בישראל.",
    },
  },
  {
    slug: "food-tech",
    kind: "conference",
    name: { he: "כנס ה-FoodTech" },
    image: "/media/food-tech-conf.jpg",
    summary: {
      he: "הצצה להתפתחויות החדשות, מאיר את הקשיים והאתגרים, מפגיש בין יזמים, מדענים ומשקיעים ונותן טעימה מהאוכל של העתיד.",
    },
  },
  {
    slug: "managers-seminar",
    kind: "conference",
    name: { he: "סמינר מנהלים" },
    image: "/media/managers.jpg",
    summary: {
      he: "סמינרי המנהלים של מועדון היזמות מתקיימים שלוש פעמים במהלך השנה. סמינר פתיחה, אמצע וסוף. בכל אחד מהמפגשים, המנהלים והמטה מקבלים כלים פרקטיים בנושאי הנהגה, שיווק ויזמות, וכן מיומנויות ניהול והעשרה מקצועית.",
    },
  },
];

export function catalogPath(item: CatalogItem): string {
  switch (item.kind) {
    case "program":
      return `/programs/${item.slug}`;
    case "accelerator":
      return "/accelerator/momentum";
    case "conference":
      return `/conferences/${item.slug}`;
    default: {
      const exhaustive: never = item.kind;
      return exhaustive;
    }
  }
}

export function findProgram(slug: string): CatalogItem | undefined {
  return programs.find((item) => item.slug === slug);
}

export function findConference(slug: string): CatalogItem | undefined {
  return conferences.find((item) => item.slug === slug);
}
