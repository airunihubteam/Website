import type { Localized } from "@/lib/locale";

// What a program page shows beyond its card: the longer description, when it meets, its
// managers, its own social accounts and a few photos. Taken from the old site's program pages
// (ruec.co.il/programs/<slug>), which have no English manager cards, so managers carry Hebrew
// names only and show on the Hebrew pages.
export type ProgramManager = { name: Localized; role: Localized; photo: string; linkedin?: string };

export type ProgramFact = {
  icon: "language" | "calendar" | "clock" | "percent" | "people" | "location" | "mic";
  label: Localized;
  value: Localized;
  detail?: Localized;
};

export type ProgramDetails = {
  about: { he: string[]; en?: string[] };
  // The language the meetings are held in. Programs run for a semester and meet weekly (day 0
  // is Sunday); their three fact cards come from these two.
  language?: "he" | "en";
  meets?: { day: number; time: string };
  // Fact cards of its own, for a page that is not a weekly program (the accelerator).
  facts?: ProgramFact[];
  // A photo for the banner other than the catalog card's.
  banner?: string;
  // A logo for the banner and the card, when it is not one of the club logos (a conference's own).
  logo?: string;
  // An open registration, shown in the banner and under the description (see docs/08-forms.md).
  registration?: { title: Localized; cta: Localized; href: string };
  // Who gets priority, as a checklist under the description.
  priority?: { title: Localized; items: Localized[] };
  managers: ProgramManager[];
  // The managers' heading, when it is not "מנהלי התוכנית".
  managersTitle?: Localized;
  links: { instagram?: string; linkedin?: string; facebook?: string; website?: string };
  gallery: string[];
};

export const programDetails: Record<string, ProgramDetails> = {
  "artemis": {
    about: {
      he: [
        "מועדון ARTEMIS פועל למען קידום יזמות נשית על כל גווניה.",
        "התוכנית הסמסטריאלית כוללת סדנאות פרקטיות ומגוונות מנשות מפתח בתעשייה תוך שימת דגש על כלים לחשיבה יזמית ועל הסוגיות הקשורות בשילוב נשים בתעשייה.",
        "נשאב השראה מהרוח היזמית של אותן נשים מצליחות ונלמד בעצמנו איך עושים זאת בפועל.",
        "זהו המקום לפתח את כישוריכן להתמודד עם הצרכים וההזדמנויות בעולם הזה.",
        "התוכנית פועלת על מנת ליצור עתיד שבו נשים הן שם נרדף לכוח ועצמאות.",
      ],
      en: [
        "The ARTEMIS club activates to promote female entrepreneurship in all its given aspects.",
        "The semester-long program includes practical and diverse workshops led by key women in the industry while emphasizing tools for entrepreneurial thinking and issues related to the integration of women in the industry.",
        "We will draw inspiration from the entrepreneurial spirit of successful women and learn for ourselves how to do it in practice.",
        "This is the place to develop your skills to deal with the needs and opportunities of this world.",
        "The program works to create a future where women are synonymous with strength and independence.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "18:30-20:30" },
    managers: [
      { name: { he: "עמית רדלר" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/artemis/manager-1.webp", linkedin: "https://www.linkedin.com/in/amit-redler-b08430220/" },
      { name: { he: "גל אור" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/artemis/manager-2.webp", linkedin: "https://www.linkedin.com/in/gal-or-/" },
      { name: { he: "תם שבי" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/artemis/manager-3.webp", linkedin: "https://www.linkedin.com/in/tom-shabi/" },
    ],
    links: { instagram: "https://www.instagram.com/artemisclub.ru", linkedin: "https://www.linkedin.com/company/artemis-ru/" },
    gallery: ["/media/programs/artemis/gallery-1.webp", "/media/programs/artemis/gallery-2.webp", "/media/programs/artemis/gallery-3.webp", "/media/programs/artemis/gallery-4.webp"],
  },
  "defense-tech": {
    about: {
      he: [
        "חזון התוכנית הוא להוות ארגון סטודנטים מוביל, המניע חידושים טכנולוגיים מתקדמים בתחום הביטחון הלאומי בישראל. אנו שואפים לעורר השראה בקרב הסטודנטים ולהניע אותם לפעול כדי להיות מנהיגי העתיד בתעשייה, ובכך להשפיע באופן משמעותי, חיובי ואינהרנטי על תחום הביטחון הלאומי.",
        "התוכנית תעניק לסטודנטים חשיפה מעמיקה לעולם הביטחוני-טכנולוגי, תוך שיתוף פעולה הדוק עם האקדמיה, הצבא והתעשייה הביטחונית.",
        "במסגרת המפגשים נארח בכירים, יזמים ומשקיעים מובילים מהתעשייה ומהצבא, אשר יציגו לסטודנטים עולמות תוכן רחבים ומגוונים. התוכנית תספק לסטודנטים ניסיון מעשי במציאת פתרונות יצירתיים ומתקדמים לבעיות קיימות, תוך למידה והכוונה מהטובים ביותר בתחום.",
      ],
      en: [
        "The program’s vision is to serve as a leading student organization that drives advanced technological innovations in the field of national security in Israel. We aim to inspire students and motivate them to act as future leaders in the industry, thereby making a significant, positive, and inherent impact on national security.",
        "The program will provide students with in-depth exposure to the technological-security world, fostering close collaboration with academia, the military, and the defense industry.",
        "As part of the meetings, we will host senior executives, entrepreneurs, and leading investors from the industry and the military, who will present a wide and diverse range of content. The program will offer students practical experience in finding creative and advanced solutions to existing problems, while learning and receiving guidance from the best in the field.",
      ],
    },
    language: "he",
    meets: { day: 3, time: "18:30-21:00" },
    managers: [
      { name: { he: "רותם קליר" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/defense-tech/manager-1.webp", linkedin: "https://www.linkedin.com/in/rotemkalir/" },
      { name: { he: "מתן שוחט" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/defense-tech/manager-2.webp", linkedin: "https://www.linkedin.com/in/mattan-shochat-a18259278/" },
      { name: { he: "עמית איילון" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/defense-tech/manager-3.webp", linkedin: "https://www.linkedin.com/in/amit-ayalon/" },
      { name: { he: "נועם אנקווה" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/defense-tech/manager-4.webp", linkedin: "https://www.linkedin.com/in/noam-ankava/" },
    ],
    links: { instagram: "https://www.instagram.com/defensetechclub.ru", linkedin: "https://www.linkedin.com/company/defensetechclub/" },
    gallery: ["/media/programs/defense-tech/gallery-1.webp", "/media/programs/defense-tech/gallery-2.webp", "/media/programs/defense-tech/gallery-3.webp", "/media/programs/defense-tech/gallery-4.webp", "/media/programs/defense-tech/gallery-5.webp"],
  },
  "runispace": {
    about: {
      he: [
        "תעשיית החלל צפויה להגיע לשווי של 1.8 טריליון דולר, יחד עם פוטנציאל אינסופי של הזדמנויות לכל תחום ולכל מקצוע. מועדון יזמות החלל באוניברסיטת רייכמן הוא הראשון מסוגו בישראל, ונועד לפתוח את דלת הכניסה לתעשייה המרגשת ביותר בעשור הקרוב. במהלך המועדון, נכיר את הבסיס של תעשיית החלל, העתיד והשחקנים המרכזיים, נצלול לתחומים השונים שהחלל לוקח בהם חלק, ונפגש את האנשים שמובילים את זה בישראל- מייסדי החברות המובילות, המומחים המקצועיים ביותר ואנשי המחקר והאקדמיה. אם אתם מחפשים את המועדון שבו תגלו איך אתם יכולים לקחת את מסלול הקריירה שלכם לעולם אחר לגמרי, הגעתם למקום הנכון.",
        "המועדון קם כחלק מ-Space Campus IL: קהילת החלל של הסטודנטים בישראל, ביוזמת משימת \"רקיע\" ובשיתוף סוכנות החלל הישראלית.",
      ],
    },
    language: "he",
    meets: { day: 3, time: "18:30-21:00" },
    managers: [
      { name: { he: "מעין קריסטל" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/runispace/manager-1.webp", linkedin: "https://www.linkedin.com/in/maayan-crystal-28983b2a7/" },
      { name: { he: "כליל קורן" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/runispace/manager-2.webp", linkedin: "https://www.linkedin.com/in/clil-koren/" },
      { name: { he: "רותם לב-רן" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/runispace/manager-3.webp", linkedin: "https://www.linkedin.com/in/rotem-lev-ran-shimoni-045b66303/" },
      { name: { he: "עמית פרומקין" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/runispace/manager-4.webp", linkedin: "https://www.linkedin.com/in/amitfrumkin/" },
    ],
    links: { instagram: "https://www.instagram.com/runispaceclub", linkedin: "https://www.linkedin.com/company/runi-space-club/" },
    gallery: ["/media/programs/runispace/gallery-1.webp", "/media/programs/runispace/gallery-2.webp", "/media/programs/runispace/gallery-3.webp", "/media/programs/runispace/gallery-4.webp", "/media/programs/runispace/gallery-5.webp"],
  },
  "foodtech": {
    about: {
      he: [
        "FoodTech הינה תוכנית ההעשרה הוותיקה, הגדולה והמקצועית ביותר בארץ עבור סטודנטים שרוצים להיחשף ולהשתלב בתעשיית המזון והטכנולוגיה.",
        "במהלך המפגשים, יזכו הסטודנטים לשמוע מטובי המוחות בארץ על תעשיית המזון, סיפורי ההצלחה והכישלונות של היזמים ובעיות נוספות שפגשו במהלך החיים שלהם שהביאו אותם לאיפה שהם היום.",
        "בנוסף להרצאות, הסטודנטים ישתפו פעולה עם המוסדות האקדמיים הטובים בישראל, יקימו מיזמים, ובכך ייצברו ניסיון מעשי ויעשו את הצעד הראשון אל תוך התעשייה.",
        "בשיתוף Food Tech Nation נחבר את בוגרי התוכנית לתעשיית המזון והטכנולוגיה ולעזור בשילובם בתפקידי מפתח מובילים בעולמות המזון.",
      ],
      en: [
        "FoodTech is the oldest, largest and most professional enrichment program in Israel for students who want to be exposed to and integrate into the food and technology industry.",
        "During the meetings, the students will have the opportunity to learn from the top minds in Israel who lead the food industry, the success and failure stories of the entrepreneurs and other problems they encountered during their lives that brought them to where they are today.",
        "In addition to the lectures, the students will collaborate with the best academic institutions in Israel, establish ventures, gain practical experience and take the first steps into the industry.",
        "In cooperation with Food Tech Nation, we will connect the graduates of the program to the food and technology industry and help integrate them into leading key positions in the worlds of food.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "18:30-20:30" },
    managers: [
      { name: { he: "גל קלדרון" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/foodtech/manager-1.webp", linkedin: "https://www.linkedin.com/in/gal-kalderon/" },
      { name: { he: "יאן דוניצה" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/foodtech/manager-2.webp", linkedin: "https://www.linkedin.com/in/yan-donitza-0b8258257/" },
      { name: { he: "אדר פרץ" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/foodtech/manager-3.webp", linkedin: "https://www.linkedin.com/in/adar-peretz/" },
    ],
    links: { instagram: "https://www.instagram.com/foodtech_nation_runi", linkedin: "https://www.linkedin.com/company/foodtech-nation/" },
    gallery: [],
  },
  "greenbiz": {
    about: {
      he: [
        "נושמים וחיים את עולמות הקיימות?",
        "מועדון Greenbiz הינו מקום עבור יזמים צעירים שמעוניינים לרכוש כלים בעולמות היזמות והקיימות.",
        "במהלך הסמסטר ייחשפו המשתתפים לצורך העכשווי הקיים בעולם לפיתוחים חדשניים בתחום הקיימות. במועדון יועברו הרצאות על ידי בכירים מעולמות היזמות הירוקה ובנוסף, הסטודנטים יפתחו ויקדמו סטארט-אפ חדשני שלהם בליווי מקצועי של מנטורים מהתעשייה.",
        "בסוף כל סמסטר יתקיים ערב תחרותי בו יציגו הסטודנטים את המיזמים עליהם עבדו, מול משקיעים בכירים בתעשיית הקיימות.",
      ],
      en: [
        "Breathing and living the world of sustainability?",
        "The Greenbiz club is a place for young entrepreneurs who are interested in acquiring tools in the worlds of entrepreneurship and sustainability.",
        "During the semester, the participants will be exposed to the current need in the world for innovative developments in the field of sustainability. In the club, lectures will be led by senior executives from the worlds of green entrepreneurship, and the students will develop and promote their innovative start-up under the professional guidance of mentors from the industry.",
        "At the end of each semester, there will be a competitive evening where the students will present the ventures they worked on, in front of senior investors in the sustainability industry.",
      ],
    },
    language: "he",
    meets: { day: 0, time: "19:00-21:00" },
    managers: [
      { name: { he: "איתי אהרוני" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/greenbiz/manager-1.webp", linkedin: "https://www.linkedin.com/in/itayaharonihe/" },
      { name: { he: "חי ברמלי" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/greenbiz/manager-2.webp", linkedin: "https://www.linkedin.com/in/hai-bramli-43ab202b5/" },
      { name: { he: "טל פרנק" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/greenbiz/manager-3.webp", linkedin: "https://linkedin.com/in/tal-frank-business-development/" },
    ],
    links: { instagram: "https://www.instagram.com/the_greenbiz_club", linkedin: "https://www.linkedin.com/company/greenbiz/", website: "https://greenbiz.ruec.co.il/" },
    gallery: [],
  },
  "impact": {
    about: {
      he: [
        "IMPACT היא הרבה יותר מחשיבה אסטרטגית עסקית־פיננסית היא חזון גלובלי שמניע אנשים עם רצון לעשות טוב להפוך חלום למציאות, ולבנות עולם שבו עסקים מובילים שינוי אמיתי.",
        "התחום נמצא בחזית היזמות העולמית, משנה מודלים עסקיים, ופותח דרכים חדשות להשפיע על החברה והכלכלה בקנה מידה עצום.",
        "המועדון נבנה כדי להצמיח דור חדש של יזמים עם כלים מעשיים, חיבורים בינלאומיים והזדמנויות אמיתיות לייצר אימפקט. כאן משלבים רווח כלכלי עם ערך חברתי – ויוצרים שינוי עמוק בסביבה, בקהילה ובעולם.",
      ],
      en: [
        "IMPACT is a business-financial thinking and strategy that shows the world that the desire to do good and prosper financially can coexist.",
        "The field is globally awakening and continues to influence and change the business models we have known until today.",
        "The club will provide exposure to the different worlds of impact and will access tools from the world of entrepreneurship to promote action in finding a solution to a real problem, while leaving a financial profit and measuring the impact on the environment and society.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "18:30-21:00" },
    managers: [
      { name: { he: "נוגה יעיש" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/impact/manager-1.webp", linkedin: "https://www.linkedin.com/in/noga-yaish-a085852a2/" },
      { name: { he: "אורי ברגר" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/impact/manager-2.webp", linkedin: "https://www.linkedin.com/in/ori-berger-1b5a5725b/" },
      { name: { he: "טל ארליך" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/impact/manager-3.webp", linkedin: "https://www.linkedin.com/in/tal-erlich-computerscience/" },
      { name: { he: "לילו אלפי" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/impact/manager-4.webp", linkedin: "https://www.linkedin.com/in/leelu-alfi-528292256/" },
    ],
    links: { instagram: "https://www.instagram.com/impact_ru.ec" },
    gallery: [],
  },
  "leaders": {
    about: {
      he: [
        "איך מתמרנים בסביבה מוקפת מתחרים?",
        "איך מכניסים דרקטיבות וחדשנות בארגון עתיק יומין?",
        "יוזמה היא לא סתם מילה יפה, INNOVATION מתמיד הוא מה שיקבע אם עסק ישקע או יתרומם, אבל איך עושים את זה?",
        "מועדון Leaders הוקם לטובת חשיפת סטודנטים נבחרים אל תוך סודות העולם התאגידי, פגישות עם מנכ\"לים ובכירים בחברות גדולות (ישראליות ובינלאומיות) אשר יספרו על חוויותיהם והשקפתם על העולם העסקי.",
        "המועדון הוא סמסטריאלי ויכלול אירוע סיום – האקתון, אשר מנצחיו יזכו בפרס.",
      ],
      en: [
        "How do you maneuver in an environment surrounded by competitors?",
        "How do you introduce directives and innovation in an ancient organization?",
        "Initiative is not just a nice word, constant INNOVATION is what will determine whether a business will sink or rise, but how do you do it?",
        "The Leaders Club was established to expose selected students to the secrets of the corporate world, meetings with CEOs and executives of large companies (Israeli and international) who will speak about their experiences and view of the business world.",
        "The club is semester-long and will include a final event – the hackathon, whose winners will win a prize.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "18:30-20:30" },
    managers: [
      { name: { he: "גלעד בכר" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/leaders/manager-1.webp" },
    ],
    links: { instagram: "https://www.instagram.com/leaders_club_runi", linkedin: "https://www.linkedin.com/in/leaders-club-9449b025a/" },
    gallery: [],
  },
  "m-club": {
    about: {
      he: [
        "שיווק נמצא בכל מקום. הייטק, לואו טק, פוליטיקה, גיימינג והרשימה ממשיכה.",
        "מועדון ה-M-Club מחבר את הסטודנטים לסיפורי ההצלחה של הגורמים המובילים בתעשיית השיווק, היח״צ והפרסום.",
        "במהלך המפגשים יקבלו הסטודנטים כלים פרקטיים ונסיון מעשי בעולמות השיווק השונים.",
        "זוהי הזדמנות חד פעמית להיחשף לתהליכים שמתבצעים בחברות הענק בתעשיית השיווק.",
        "כחלק מפעילות המועדון יתקיימו סיורי חברה, ובסוף כל סמסטר יתקיים מרקתון שיובל על ידי חברת ענק עם פרס.",
      ],
      en: [
        "Marketing is everywhere. High tech, low tech, politics, gaming and the list goes on.",
        "The M-Club connects the students to the success stories of the leading factors in the marketing, PR and advertising industry.",
        "During the meetings, the students will receive practical tools and practical experience in the various worlds of marketing.",
        "This is a unique opportunity to be exposed to the processes that are carried out in the giant companies in the marketing industry.",
        "As part of the club’s activities, there will be company tours, and at the end of each semester there will be a marketathon led by a huge company with a prize.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "19:00-20:00" },
    managers: [
      { name: { he: "יעל שטיין" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/m-club/manager-1.webp", linkedin: "https://www.linkedin.com/in/yael-stein-34b770272/" },
      { name: { he: "לי אגיב" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/m-club/manager-2.webp", linkedin: "https://www.linkedin.com/in/lee-agiv-4a60342a7/" },
    ],
    links: { instagram: "https://www.instagram.com/themclub.runi", linkedin: "https://www.linkedin.com/company/m-club-reichman-university/" },
    gallery: [],
  },
  "product-hub": {
    about: {
      he: [
        "תכנית סמסטריאלית המעניקה לסטודנטים ידע בעולמות ניהול המוצר בתעשיית ההייטק.",
        "מטרת המועדון היא לחשוף ולהכיר לסטודנטים את תפקיד מנהל/ת המוצר, לתת השראה למנהלי מוצר עתידיים, וכלים מעשיים ופרקטיים לניהול מוצר.",
        "התוכנית כוללת הרצאות וסדנאות, מפגשים ותרגול מעשי בהנחיית מנהלי המוצר המובילים בתעשייה.",
        "התוכנית מתהדרת בעובדה שאחוז גבוה מבוגרי המועדון מוצאים את דרכם לתפקידי ניהול המוצר בחברות המובילות.",
      ],
      en: [
        "A semester program that gives students knowledge in the world of product management in the high-tech industry.",
        "The purpose of the club is to expose and introduce students to the role of the product manager, to inspire future product managers, and practical tools for product management.",
        "The program includes lectures and workshops, meetings and practical training led by the leading product managers in the industry.",
        "The program boasts of the fact that a high percentage of the club’s graduates find their way to product management positions in leading companies.",
      ],
    },
    language: "he",
    meets: { day: 3, time: "18:00-21:00" },
    managers: [
      { name: { he: "עדי קורן" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/product-hub/manager-1.webp", linkedin: "https://www.linkedin.com/in/adi--koren/" },
      { name: { he: "עלמה סטריקובסקי" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/product-hub/manager-2.webp", linkedin: "https://www.linkedin.com/in/alma-strikovski-52b6ab339/" },
      { name: { he: "דלפי פסקין" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/product-hub/manager-3.webp", linkedin: "https://www.linkedin.com/in/delphi-peskin/" },
      { name: { he: "דולב מידן" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/product-hub/manager-4.webp", linkedin: "https://www.linkedin.com/in/dolev-meidan-1b432b236/" },
    ],
    links: { instagram: "https://www.instagram.com/product_hub_runi", linkedin: "https://www.linkedin.com/company/product-hub-idc/" },
    gallery: [],
  },
  "proptech": {
    about: {
      he: [
        "שוק הנדל׳׳ן המסורתי כיום הינו מיושן וצמא לשינויים טכנולוגיים.",
        "מועדון ה-Proptech חושף את הסטודנטים למיזמים חדשניים המשלבים נדל״ן וטכנולוגיה.",
        "מדי שבוע, יגיעו למועדון הסטארטאפים המובילים בתעשייה וחברות הנדל״ן המסורתיות המתמודדות מול השינויים ומטמיעות את הטכנולוגיות החדישות.",
        "במהלך הסמסטר יבקרו הסטודנטים בחברות המובילות בתעשייה וישמעו מהבכירים בעולם טכנולוגיית הנדל״ן על האתגרים, השינויים וההזדמנויות שנמצאים בשוק.",
      ],
      en: [
        "The traditional real estate market today is outdated and thirsty for technological changes.",
        "The Proptech club exposes students to innovative ventures that combine real estate and technology.",
        "Every week, the leading startups in the industry and the competing traditional real estate companies will lead the club and expose students to the current technological solutions and changes.",
        "During the semester, the students will visit the leading companies in the industry and hear from leading figures in the world of real estate technology about the challenges, changes and opportunities in the market.",
      ],
    },
    language: "he",
    meets: { day: 2, time: "18:30-21:00" },
    managers: [
      { name: { he: "יוסי ספרן" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/proptech/manager-1.webp", linkedin: "https://www.linkedin.com/in/joseph-safran/" },
      { name: { he: "עידן פפושדו" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/proptech/manager-2.webp", linkedin: "https://www.linkedin.com/in/idan-papouchado-2a8771361/" },
    ],
    links: {  },
    gallery: ["/media/programs/proptech/gallery-1.webp", "/media/programs/proptech/gallery-2.webp", "/media/programs/proptech/gallery-3.webp", "/media/programs/proptech/gallery-4.webp"],
  },
  "pulse": {
    about: {
      he: [
        "פיתוח חדשנות טכנולוגית רפואית היא מרכז העשייה בעולמות הרפואה כיום.",
        "במהלך הסמסטר, נלמד ונבין כיצד הטכנולוגיה וההזדמנויות של העולם החדש מקדמים את האנושות לרפואה משנת חיים כמו שלא הכרנו אותה עד היום.",
        "המועדון חושף את הסטודנטים למיזמי Health-Tech ואנשי מפתח בתעשייה הרפואית המובילים לשינוי וייעול התהליכים הרפואיים.",
        "כידוע, נפתחה ברייכמן הפקולטה לרפואה הפרטית הראשונה בישראל שליבת עיסוקה בקדמה של טכנולוגיה רפואית. התוכנית, תאפשר לכלל הסטודנטים בקמפוס חשיפה לטובי מוחות התעשייה הזו.",
      ],
      en: [
        "The development of medical technological innovation is the active center in the world of medicine today.",
        "During the semester, we will learn and understand how the technology and opportunities of the new world can advance humanity and medicine as we have not known it until today.",
        "The club exposes students to Health-Tech ventures and key figures in the medical industry who lead the change and optimization of medical processes.",
        "As you know, this year for the first time, the first private medical faculty in Israel will be opened in Reichmann University, the core of its business being the advancement of medical technology. The program will allow all students on campus to be exposed to the best minds of this industry.",
      ],
    },
    language: "he",
    meets: { day: 1, time: "19:00-20:00" },
    managers: [
      { name: { he: "עומר רביד" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/pulse/manager-1.webp", linkedin: "https://www.linkedin.com/in/omer-ravid-ab751a337/" },
      { name: { he: "טל גרינברג" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/pulse/manager-2.webp", linkedin: "https://www.linkedin.com/in/tal--grinberg/" },
      { name: { he: "תומר עוזיאל" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/pulse/manager-3.webp", linkedin: "https://www.linkedin.com/in/tomer-uziel-health/" },
    ],
    links: { facebook: "https://www.facebook.com/pulse.ruec", instagram: "https://www.instagram.com/pulse.ruec", linkedin: "https://www.linkedin.com/company/pulse-ruec/" },
    gallery: ["/media/programs/pulse/gallery-1.webp", "/media/programs/pulse/gallery-2.webp", "/media/programs/pulse/gallery-3.webp", "/media/programs/pulse/gallery-4.webp"],
  },
  "tech-talk": {
    about: {
      he: [
        "Israel is a startup nation!",
        "תוכנית TechTalk היא מהתוכניות הבודדות בקמפוס המקבלת סטודנטים הן מבית הספר הישראלי והן מבית הספר הבינלאומי.",
        "התוכנית מתקיימת בשפה האנגלית ומארחת מדי שבוע יזם מתעשייה אחרת אשר במהלך המפגש ישפוך אור על השוק בו הוא נמצא. יספר על הקשיים, ההצלחות והאתגרים שעמדו בדרכו.",
        "המפגשים יתקיימו במתכונת מצומצמת שמטרתה לאפשר שיח אינטימי ומקום פתוח לשאול את כל השאלות הקשות על התחום אותו היזם מייצג.",
      ],
    },
    language: "en",
    meets: { day: 2, time: "18:30-20:00" },
    managers: [
      { name: { he: "דניאל אלעד" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/tech-talk/manager-1.webp", linkedin: "https://www.linkedin.com/in/daniel-elad/" },
      { name: { he: "יעקב אפלשטיין" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/tech-talk/manager-2.webp", linkedin: "https://www.linkedin.com/in/jacob-apelstein/" },
      { name: { he: "עמית פידל" }, role: { he: "מנהל התוכנית", en: "Program Manager" }, photo: "/media/programs/tech-talk/manager-3.webp" },
      { name: { he: "שיינדי סטמלר" }, role: { he: "מנהלת התוכנית", en: "Program Manager" }, photo: "/media/programs/tech-talk/manager-4.webp", linkedin: "https://www.linkedin.com/in/shaindy-stamler/" },
    ],
    links: { instagram: "https://www.instagram.com/techtalkru" },
    gallery: [],
  },
  // Momentum, the club's accelerator, from the old site's page (ruec.co.il/accelerator/momentum).
  // Its figures come from that page's text. The old site had no English Momentum page, so the
  // English here is a translation of the Hebrew.
  momentum: {
    about: {
      he: [
        "מומנטום הוא האקסלרטור הסטודנטיאלי הוותיק והמוביל בישראל, הפועל מאז 2013. התכנית מעניקה ליזמים את הכלים, הידע והקשרים הדרושים כדי להפוך רעיונות למיזמים בעלי השפעה.",
        "אקסלרטור מומנטום (מאיץ) הוא גוף שמטרתו לתמוך בצוותי יזמים של סטודנטים ובוגרים של אוניברסיטת רייכמן, המפתחים פתרונות חדשניים לאתגרים בעולם האמיתי.",
        "התכנית נמשכת כשלושה חודשים וכוללת מפגשים, סדנאות והרצאות שבועיות עם יזמים ומובילי תעשייה, לצד מנטורינג אישי לכל צוות על ידי יזמים מנוסים מהשורה הראשונה. בנוסף, המשתתפים זוכים לגישה ישירה לאנשי מפתח בתעשייה, משקיעים, קרנות הון סיכון, משאבים חיוניים ותחרויות, במטרה לייצר יתרון אסטרטגי ולהאיץ צמיחה.",
        "התכנית אינה גובה אחוזים או אקוויטי ואינה מקבלת אחזקות במיזמים המשתתפים.",
        "התכנית מיועדת לצוותים של שני יזמים או יותר, כאשר לפחות אחד מחברי הצוות הוא סטודנט או בוגר של אוניברסיטת רייכמן. ההרשמה פתוחה לסטודנטים ולבוגרים מכלל המסלולים, בתארים ראשון ושני.",
      ],
      en: [
        "Momentum is Israel's oldest and leading student accelerator, running since 2013. The program gives entrepreneurs the tools, knowledge and connections they need to turn ideas into ventures with impact.",
        "The Momentum accelerator supports teams of Reichman University students and alumni who are developing innovative solutions to real-world challenges.",
        "The program runs for about three months and includes weekly meetings, workshops and lectures with entrepreneurs and industry leaders, alongside personal mentoring for every team by top, experienced entrepreneurs. Participants also get direct access to key industry figures, investors, venture capital funds, essential resources and competitions, to build a strategic edge and accelerate growth.",
        "The program takes no percentage or equity and holds no stake in the participating ventures.",
        "The program is for teams of two or more founders, at least one of whom is a Reichman University student or graduate. Registration is open to students and alumni of all tracks, in bachelor's and master's degrees.",
      ],
    },
    facts: [
      { icon: "calendar", label: { he: "פועל מאז", en: "Running since" }, value: { he: "2013", en: "2013" } },
      { icon: "clock", label: { he: "משך התוכנית", en: "Program length" }, value: { he: "כשלושה חודשים", en: "About three months" } },
      { icon: "percent", label: { he: "אקוויטי", en: "Equity" }, value: { he: "0%", en: "0%" }, detail: { he: "בלי אחוזים ואחזקות", en: "No percentage, no stake" } },
    ],
    banner: "/media/programs/momentum/banner.webp",
    registration: {
      title: { he: "ההרשמה למחזור ה-23 של מומנטום פתוחה!", en: "Registration for Momentum's 23rd batch is open!" },
      cta: { he: "הרשמה לאקסלרטור", en: "Apply" },
      href: "https://docs.google.com/forms/d/e/1FAIpQLSeZ785CL-Hcv76a93gfYU5MpuxnPFL3qBlfrLGFd9uf43bE4g/viewform",
    },
    priority: {
      title: { he: "עדיפות תינתן לצוותים אשר:", en: "Priority goes to teams that:" },
      items: [
        { he: "ביצעו מחקר שוק מעמיק וקיבלו ולידציה מלקוחות או משתמשים פוטנציאליים", en: "Have done in-depth market research and been validated by potential customers or users" },
        { he: "החלו בפיתוח ראשוני כגון MVP או POC ופועלים להוכחת היתכנות", en: "Have started early development, such as an MVP or a POC, and are working to prove feasibility" },
      ],
    },
    managers: [
      { name: { he: "עמרי קינן", en: "Omri Keynan" }, role: { he: "מנהל האקסלרטור", en: "Accelerator Manager" }, photo: "/media/programs/momentum/manager-1.webp", linkedin: "https://www.linkedin.com/in/omri-keynan/" },
      { name: { he: "שחר יזהר", en: "Shahar Izhar" }, role: { he: "מנהל האקסלרטור", en: "Accelerator Manager" }, photo: "/media/programs/momentum/manager-2.webp", linkedin: "https://www.linkedin.com/in/shahar-izhar-prato-backend-developer/" },
    ],
    managersTitle: { he: "מנהלי האקסלרטור", en: "Accelerator Managers" },
    links: {},
    gallery: [2, 3, 4, 5, 1].map((n) => `/media/programs/momentum/gallery-${n}.webp`),
  },
};

// The conference pages use the same template, from the old site's pages
// (ruec.co.il/conferences/<slug>). The old pages list no conference managers, and their
// "הרשמה לכנס" buttons led to a placeholder address (see docs/08-forms.md), so only BEYOND
// SUMMIT, whose registration opens on its own site, shows a way to sign up. The old site had no
// English conference pages, so the English here is a translation of the Hebrew.
export const conferenceDetails: Record<string, ProgramDetails> = {
  beyondsummit: {
    about: {
      he: [
        "BEYOND SUMMIT הוא כנס הסטודנטים הגדול בישראל ואירוע ייחודי ראשון מסוגו, שיתקיים ב-22.03.26 באוניברסיטת רייכמן.",
        "הכנס מציע טעימה מגישת ה-Beyond של רייכמן – גישה של מעבר למה שמוכר, למה שנוח ולמה שקיים, ופתיחת נקודת מבט רחבה וגלובלית על עשייה, יזמות והשפעה.",
        "הכנס מפגיש את השמות הגדולים והמובילים ביותר בתעשייה עם כ-150 סטודנטים נבחרים מכל הפקולטות והאוניברסיטאות בארץ – דור העתיד של היזמות, החדשנות והעשייה בישראל. זהו יום של חשיפה משמעותית, חיבור לאקוסיסטם יזמי רחב, והזדמנות להיות חלק מהרגע שבו דברים מתחילים לקרות – לא אחרי התואר ולא אחרי הטייטל, אלא כבר עכשיו.",
        "BEYOND SUMMIT מרכז ביום אחד את האנשים, הידע והחיבורים שבדרך כלל לוקח שנים לפגוש, ונותן נקודת פתיחה טובה יותר למי שרוצה להיות שם כשדברים מתחילים לקרות.",
      ],
      en: [
        "BEYOND SUMMIT is Israel's largest student conference and a one-of-a-kind event, taking place on March 22, 2026 at Reichman University.",
        "The conference offers a taste of Reichman's Beyond approach – going beyond the familiar, the comfortable and the existing, and opening a broad, global view of action, entrepreneurship and impact.",
        "It brings the biggest names in the industry together with about 150 selected students from every faculty and university in Israel – the next generation of Israeli entrepreneurship, innovation and action. It is a day of real exposure, a connection to a wide entrepreneurial ecosystem, and a chance to be part of the moment things start to happen – not after the degree or the title, but right now.",
        "In a single day, BEYOND SUMMIT brings together the people, the knowledge and the connections that usually take years to meet, and gives a better starting point to anyone who wants to be there when things start to happen.",
      ],
    },
    facts: [
      { icon: "calendar", label: { he: "תאריך", en: "Date" }, value: { he: "22.03.2026", en: "Mar 22, 2026" } },
      { icon: "people", label: { he: "משתתפים", en: "Participants" }, value: { he: "כ-150 סטודנטים", en: "~150 students" }, detail: { he: "מכל האוניברסיטאות", en: "From every university" } },
      { icon: "location", label: { he: "מיקום", en: "Venue" }, value: { he: "אוניברסיטת רייכמן", en: "Reichman University" } },
    ],
    logo: "/media/conferences/beyondsummit/logo.webp",
    registration: {
      title: { he: "ההרשמה תיפתח בקרוב · מספר המקומות מוגבל", en: "Registration opens soon · Limited spots" },
      cta: { he: "לאתר הכנס", en: "Visit Site" },
      href: "https://beyond-summit-runi.com/",
    },
    managers: [],
    links: { instagram: "https://www.instagram.com/beyondsummit.runi/", linkedin: "https://www.linkedin.com/company/beyond-summit-runi/" },
    gallery: [1, 2, 3, 4, 5].map((n) => `/media/conferences/beyondsummit/gallery-${n}.webp`),
  },
  "food-tech": {
    about: {
      he: [
        "כנס הפודטק מתרחש פעמיים בשנה ומאגד את מיטב המומחים והמובילים בתעשיית הפודטק בישראל, ביחד עם סטודנטים המתעניינים בתעשייה ונחשפים אליה דרך הכנס.",
        "הכנס נותן הצצה להתפתחויות החדשות בתחום, מאיר את הקשיים והאתגרים העומדים בפני חברות כיום, מפגיש בין יזמים, מדענים ומשקיעים ונותן טעימה מהאוכל של העתיד.",
        "בכנס מתקיימים פאנלים והרצאות של אנשים פורצי דרך בתחום, והוא שם במרכז את הסוגיות החשובות ביותר בעולם האקלים. הכנס בתמיכת Food Tech Nation.",
        "תעשיית הפודטק הישראלית נענית לאתגר זה ובכנס התקיימו פאנלים והרצאות ששמו דגש על האתגרים, ההצלחות, והצורך הממשי בביטחון מזון, בישראל ובעולם. זאת השנה השביעית בה הכנס נערך באוניברסיטת רייכמן ומובל בשנים האחרונות על ידי מנהלי מועדון הפודטק.",
      ],
      en: [
        "The FoodTech Conference takes place twice a year and brings together the best experts and leaders of Israel's food-tech industry with students who are interested in the industry and get to know it through the conference.",
        "The conference offers a glimpse of the field's new developments, sheds light on the difficulties and challenges companies face today, brings together entrepreneurs, scientists and investors, and gives a taste of the food of the future.",
        "It features panels and talks by groundbreaking people in the field and puts the most important issues of the climate world at its center. The conference is supported by Food Tech Nation.",
        "Israel's food-tech industry is rising to this challenge, and the conference's panels and talks focused on the challenges, the successes and the real need for food security, in Israel and around the world. This is the seventh year the conference is held at Reichman University, led in recent years by the managers of the FoodTech program.",
      ],
    },
    facts: [
      { icon: "calendar", label: { he: "תדירות", en: "Frequency" }, value: { he: "פעמיים בשנה", en: "Twice a year" } },
      { icon: "mic", label: { he: "בכנס", en: "Format" }, value: { he: "פאנלים והרצאות", en: "Panels & talks" } },
      { icon: "location", label: { he: "מיקום", en: "Venue" }, value: { he: "אוניברסיטת רייכמן", en: "Reichman University" }, detail: { he: "זו השנה השביעית", en: "For the seventh year" } },
    ],
    managers: [],
    links: {},
    gallery: [1, 2, 3, 4, 5].map((n) => `/media/conferences/food-tech/gallery-${n}.webp`),
  },
  "managers-seminar": {
    about: {
      he: [
        "סמינרי המנהלים של מועדון היזמות מתקיימים שלוש פעמים במהלך השנה – סמינר פתיחה, אמצע וסוף.",
        "בכל אחד מהמפגשים, המנהלים והמטה מקבלים כלים פרקטיים בנושאי הנהגה, שיווק ויזמות, וכן מיומנויות ניהול והעשרה מקצועית.",
        "הסמינרים מהווים הזדמנות לחשיבה קדימה על פיתוחים עתידיים למועדון, יחד עם בחינה מחודשת של הישגי העבר והפקת לקחים. הסמינרים נועדו להעניק לכל חברי ההנהלה את הכלים הדרושים להובלת התוכניות והפרויקטים השונים במועדון, תוך חיזוק החזון ושיפור הפעילות השוטפת.",
      ],
      en: [
        "The Entrepreneurship Club's managers seminars take place three times a year – an opening, a mid-year and a closing seminar.",
        "In every meeting, the managers and staff receive practical leadership, marketing, and entrepreneurship tools, as well as management skills and professional enrichment.",
        "The seminars are a chance to think ahead about the club's future developments, together with a fresh look at past achievements and lessons learned. They are meant to give every member of the management the tools needed to lead the club's programs and projects, while strengthening the vision and improving day-to-day activity.",
      ],
    },
    facts: [
      { icon: "calendar", label: { he: "תדירות", en: "Frequency" }, value: { he: "שלוש פעמים בשנה", en: "Three times a year" }, detail: { he: "פתיחה, אמצע וסוף", en: "Opening, mid-year, closing" } },
      { icon: "people", label: { he: "משתתפים", en: "Participants" }, value: { he: "המנהלים והמטה", en: "Managers & staff" } },
      { icon: "mic", label: { he: "תכנים", en: "Topics" }, value: { he: "כלים פרקטיים", en: "Practical tools" }, detail: { he: "הנהגה, שיווק ויזמות", en: "Leadership, marketing, entrepreneurship" } },
    ],
    managers: [],
    links: {},
    gallery: [1, 2, 3, 4].map((n) => `/media/conferences/managers-seminar/gallery-${n}.webp`),
  },
};
