import type { Localized } from "@/lib/locale";

export type PersonGroup = "management" | "advisory" | "community" | "ai" | "pitch";

export type Person = {
  id: string;
  name: Localized;
  role?: Localized;
  bio?: Localized;
  group: PersonGroup;
};

export const people: Person[] = [
  {
    id: "omer-biran",
    name: { he: "עומר בירן", en: "Omer Biran" },
    role: { he: "יו״ר המועדון", en: "Chair" },
    group: "management",
  },
  {
    id: "shir-shani",
    name: { he: "שיר שני", en: "Shir Shani" },
    bio: {
      he: "סטודנטית למדעי המחשב ויזמות בתכנית המצטיינים של בית הספר ליזמות. במהלך לימודיי שימשתי כחונכת ורכזת בשבוע ההיכרות, ניהלתי את אקסלרטור Up-Rise, השתתפתי בתכנית המנהיגות הופמן קופמן והתנדבתי בעמותת Queen B. בנוסף עבדתי כמתכנתת בVoltify, ובעברי הייתי מייסדת שותפה בשני מיזמים, ׳Gymy׳ ובמיזם חברתי בשם ׳עובי הקורה׳. בצבא שירתתי כקצינת תכנון באג״ת והיום משרתת במילואים כקמב״צית באמ״ץ. יש לי הזכות השנה להוביל את מועדון היזמות.",
      en: "I am a Computer Science and Entrepreneurship student in the Honors Program of the Adelson School of Entrepreneurship. Throughout my studies, I have served as a mentor and coordinator during Orientation Week, managed the Up-Rise accelerator, participated in the Hoffman-Koofman Leadership Program, and volunteered with the Queen B organization. In addition, I worked as a software developer at Voltify, and in the past, I co-founded two ventures: Gymy and a social initiative called Ovi HaKora. In the army, I served as a Planning Officer in the IDF Operations Directorate, and today I continue to serve in the reserves as an Operations NCO in the IDF Operations Division. This year, I have the privilege of leading the Entrepreneurship Club.",
    },
    group: "management",
  },
  {
    id: "shani-aharon",
    name: { he: "שני אהרון", en: "Shani Aharon" },
    role: { he: "סיו״ר המועדון", en: "Vice Chairman" },
    group: "management",
  },
  {
    id: "gal-atzmon",
    name: { he: "גל עצמון", en: "Gal Atzmon" },
    role: { he: "מנהל התוכניות", en: "Programs Manager" },
    bio: {
      he: "סטודנט שנה ב לממשל, דיפלומטיה ואסטרטגיה, נולדתי וגדלתי בקיבוץ משמר העמק וכיום גר בתל אביב. אני עובד בחברת Unleash, ומעבר לעבודה וללימודים אני חובב ספורט מושבע – בין אם זה לשחק, להתאמן או לצפות. השנה יש לי את הזכות להיות חלק ממפעל אקדמי איכותי וייחודי כמו המועדון. אני משתדל להביא את התשוקה שלי לעשייה, ולהביא ערך לכל מה שאני נוגע בו.",
      en: "I am a second-year student of Government, Diplomacy, and Strategy. I was born and raised on Kibbutz Mishmar HaEmek and currently live in Tel Aviv. I work at Unleash, and beyond work and studies, I’m an avid sports fan — whether playing, training, or watching. This year, I have the privilege of being part of a high-quality and unique academic initiative like the Entrepreneurship Club. I strive to bring my passion for action and to add value to everything I take part in.",
    },
    group: "management",
  },
  {
    id: "michal-shoris",
    name: { he: "מיכל שוריס", en: "Michal Shoris" },
    role: { he: "מנהלת מותג", en: "Head of Brand Team" },
    bio: {
      he: "אחראית על ניהול מדיה חברתית, יצירת תוכן, ניתוח נתונים, ותכנון אסטרטגיות שיווק דיגיטלי. כסטודנטית לתקשורת, אני משלבת את התשוקה שלי לשיווק ולאסטרטגיה בתפקידי בצוות השיווק. עובדת כמנהלת מכירות בחברה ללימודי אנגלית. אני מאמינה בחשיבות של הרחבת אופקים. ונהנית מטיולים בארץ ובעולם המעשירים את נקודת המבט שלי ומזינים את היצירתיות שלי בתחום השיווק. העבודה בצוות השיווק של המועדון מחברת בין התשוקה שלי לשיווק והרצון שלי להיות חלק מסביבת עבודה מאתגרת. כל יום מביא איתו אתגרים חדשים והזדמנות לצמוח מקצועית ואישית.",
      en: "I am responsible for managing social media, creating content, analyzing data, and planning digital marketing strategies. As a Communication student, I combine my passion for marketing and strategy within my role on the marketing team. I work as a Sales Manager at an English-learning company, and I strongly believe in the importance of broadening one’s horizons. I enjoy traveling in Israel and around the world, which enriches my perspective and fuels my creativity in the field of marketing. Working on the club’s marketing team connects my passion for marketing with my desire to be part of a dynamic and challenging environment. Each day brings new challenges and opportunities for both professional and personal growth.",
    },
    group: "management",
  },
  {
    id: "noa-paster",
    name: { he: "נעה פסטר", en: "Noa Paster" },
    role: { he: "מנהלת אתר", en: "Website Manager" },
    bio: {
      he: "סטודנטית שנה ג׳ למנהל עסקים עם התמחות בחדשנות דיגיטלית. בשנה א׳ ניהלתי את התקציב בתחרות הסטארטאפים Pitch Night תחת מועדון היזמות, ובשנה ב׳ המשכתי כראש צוות השיווק. השנה לקחתי על עצמי לנהל את אתר המועדון עם המשך ליווי צמוד של רון האגדי. אני חיה ונושמת אינסטגרם, טיקטוק ורשתות חברתיות, ותמיד מחפשת דרכים יצירתיות לספר סיפור דרך תוכן.",
      en: "I’m a third-year Business Administration student specializing in Digital Innovation. In my first year, I managed the budget for the Pitch Night startup competition under the Entrepreneurship Club, and in my second year, I continued as Head of Marketing. This year, I’ve taken on the role of managing the club’s website, with the continued guidance of the legendary Ron. I live and breathe Instagram, TikTok, and social media, and I’m always looking for creative ways to tell a story through content.",
    },
    group: "management",
  },
  {
    id: "shiri-izhaki",
    name: { he: "שירי יצחקי", en: "Shiri Izhaki" },
    role: { he: "צוות שיווק ומיתוג", en: "Brand Team" },
    group: "management",
  },
  {
    id: "daniel-pinkasovich",
    name: { he: "דניאל פינקסוביץ", en: "Daniel Pinkasovich" },
    role: { he: "צוות שיווק ומיתוג", en: "Brand Team" },
    bio: {
      he: "בת 27, סטודנטית שנה ב לתקשורת בהתמחות השיווקית. לאחר השתתפותי במועדון ה m-club בשנה שעברה, השנה אני מתרגשת לקחת חלק מצוות ניהול המותג של מטה יזמות. מאז ומתמיד אהבתי את תחום הצילום, הפרסום וניהול סושיאל. בזמני הפנוי נהנית לטייל בעולם, לרקוד ולשחק טניס. מצפה ומתרגשת לשנה הקרובה.",
      en: "I’m 27 years old and a second-year Communication student specializing in marketing. After participating in the M-Club last year, this year I’m excited to join the Brand Management Team of the Entrepreneurship Club. I’ve always loved photography, advertising, and social media management. In my free time, I enjoy traveling the world, dancing, and playing tennis. I’m looking forward to an exciting year ahead.",
    },
    group: "management",
  },
  {
    id: "nir-frost",
    name: { he: "ניר פרוסט", en: "Nir Frost" },
    role: { he: "ראש צוות חדשנות ו-AI", en: "Head of Innovation & AI Team" },
    bio: {
      he: "סטודנט לכלכלה ויזמות תחת תוכניות המצטיינים של שתי הפקולטות, בעברו עבד כיד ימינו של המנכ״ל של קבוצת המסעדות של מלגו ומלבר ועשה התמחות כמומחה AI בסטרטאפ בברלין. היום עובד בסטרטאפ בשם Mebook בתפקיד של פיתוח עסקי. במקביל, המייסד והמנהל של ארגון ההתנדבות הישראלי \"בדרכו של עידו\" בקהילת בני המאיה בגוואטמלה. מילואימניק ובוגר מכינת גליל עליון.",
      en: "I am an Economics and Entrepreneurship student in the honors programs of both faculties. In the past, I worked as the right-hand to the CEO of the Malgo & Malbar restaurant group and completed an internship as an AI specialist at a startup in Berlin. Today, I work at a startup called Mebook in a business development role. In parallel, I am the founder and director of the Israeli volunteer organization “In Ido’s Path,” supporting the Maya communities in Guatemala. I serve in the IDF reserves and am a graduate of the Galil Elyon pre-military academy.",
    },
    group: "ai",
  },
  {
    id: "shay-taub",
    name: { he: "שי טאוב", en: "Shay Taub" },
    role: { he: "מומחה אוטומציות", en: "Innovation & AI Team" },
    group: "ai",
  },
  {
    id: "yarin-layani",
    name: { he: "ירין ליאני", en: "Yarin Layani" },
    role: { he: "צוות חדשנות ו-AI", en: "Innovation & AI Team" },
    bio: {
      he: "סטודנט לכלכלה ויזמות שנה ג׳, ברמן ומומחה עמידות ידיים. אני מאמין גדול בכוח של בינה מלאכותית ומיישם אותה בפרויקטים שונים בשנים האחרונות, בעל ניסיון ישיר בבניית מערכות המלצה ליזמים, פיתוח כלי אוטומציה לייעול תהליכי קבלת החלטות ויצירת דאטאות לניתוח נתונים.",
      en: "I’m a third-year Economics and Entrepreneurship student, a bartender, and a handstand enthusiast. I’m a strong believer in the power of artificial intelligence and have been applying it to various projects in recent years. I have hands-on experience building recommendation systems for entrepreneurs, developing automation tools to streamline decision-making processes, and creating datasets for data analysis.",
    },
    group: "ai",
  },
  {
    id: "tal-frankenthal",
    name: { he: "טל פרנקנטל", en: "Tal Frankenthal" },
    role: { he: "צוות חדשנות ו-AI", en: "Innovation & AI Team" },
    bio: {
      he: "אני סטודנט שנה שלישית למדעי המחשב ויזמות. מעבר ללימודים, עולם הבינה המלאכותית מסקרן אותי במיוחד, אני אוהב לחקור כלים חדשים, להתנסות בטכנולוגיות מתקדמות ולבחון את הגבולות והיכולות של ה-AI שכבר משנה את חיינו. בנוסף לטכנולוגיה, אני חובב ספורט אקסטרים, ובמיוחד צלילה. יצא לי לצלול במקומות רבים בעולם, והחלום הגדול שלי הוא לצלול עם לוויתנים.",
      en: "I’m a third-year student of Computer Science and Entrepreneurship. Beyond my studies, I’m especially fascinated by the world of artificial intelligence – I love exploring new tools, experimenting with advanced technologies, and pushing the limits of AI that is already transforming our lives. In addition to technology, I’m a fan of extreme sports, especially diving. I’ve had the chance to dive in many places around the world, and my biggest dream is to dive with whales.",
    },
    group: "ai",
  },
  {
    id: "tomer-epstein",
    name: { he: "תומר אפשטיין" },
    role: { he: "ראש צוות אופרציה" },
    bio: {
      he: "סטודנט שנה ב’ במסלול כלכלה ומנהל עסקים. עובד כ-Operations Specialist בחברת Monto – סטארטאפ בתחום הפינטק. החלטתי לקחת על עצמי את התפקיד במטה המועדון כי אני מאמין שמועדון היזמות נותן הזדמנות חד פעמית לסטודנטים להיחשף ולהיכנס לעולם היזמות.",
    },
    group: "management",
  },
  {
    id: "gili",
    name: { he: "גילי יורקביץ", en: "Gili Yorkevich" },
    role: { he: "צוות אופרציה", en: "Operations Team" },
    bio: {
      he: "אני גילי סטונדטית לפסיכולוגיה תואר ראשון ומתחילה את השנה האחרונה לתואר. אני בת 26, גרה בהרצליה ואוהבת מאוד מאוד לרקוד, להפיק אירועים ולהיות עם חברות. זאת זכות גדולה לקחת חלק במטה של מועדון היזמות ובטח בתפקיד שאני מאוד אוהבת לעשות. מחכה לנו שנה מדהימה והכי חשוב מאחלת שכל החטופים יחזרו הביתה.",
      en: "I’m Gili, a psychology undergraduate student entering my final year. I’m 26 years old, live in Herzliya, and I absolutely love dancing, producing events, and spending time with my friends. It’s a great privilege to be part of the Entrepreneurship Club’s headquarters, especially in a role I truly enjoy. We have an amazing year ahead, and most importantly, I hope for the safe return of all the hostages.",
    },
    group: "management",
  },
  {
    id: "noam-bar",
    name: { he: "נעם בר" },
    role: { he: "צוות אופרציה" },
    bio: {
      he: "נעם בת 25, סטודנטית למנהל עסקים ויזמות שנה שנייה. לוקחת חלק במטה מועדון היזמות בצוות האופרציה ונציגת מסלול. בתחילת השנה תפקדתי גם כחונכת בשבוע ההיכרות. אני זמרת, צלמת קולינרית ובעלת עסק קטן לקינוחים. אוהבת מאוד לטייל, לעשות סקי, לאכול טוב ולבשל.",
    },
    group: "management",
  },
  {
    id: "shir-dayan",
    name: { he: "שיר דיין", en: "Shir Dayan" },
    role: { he: "מנהלת צוות קהילה", en: "Community Manager" },
    bio: {
      he: "סטודנטים מצטיינת למנהל עסקים ויזמות בבית ספר הבינלאומי, ובעבר מנהלת מועדון הTechTalk. חלק מצוות ההקמה של הFuture Summit, כנס הטק הגלובלי הגדול והאקסקלוסיבי ביותר בארץ. כיום מתמחה בקרן הון סיכון Remagine Ventures.",
    },
    group: "community",
  },
  {
    id: "shir-rubin",
    name: { he: "שיר רובין", en: "Shir Rubin" },
    role: { he: "צוות קהילה", en: "Community Team" },
    bio: {
      he: "היי אני שיר, סטודנטית שנה ג' למדעי המחשב ויזמות, אחרי שנה במועדון ארטמיס שמחתי להצטרף השנה גם לצוות הקהילה. אני אוהבת לקחת חלק ביוזמות חדשות ומאתגרות, ותמיד עובדת על פרויקט חדש שמחבר בין טכנולוגיה, יצירתיות ויזמות. בזמני הפנוי אני מתאמנת בטיסו (אקרובטיקה אווירית), אוהבת ללמוד דברים חדשים ולמצוא דרכים לעזור לאחרים ולהשפיע לטובה בקהילה סביבי.",
    },
    group: "community",
  },
  {
    id: "maya-ron",
    name: { he: "מאיה רון", en: "Maya Ron" },
    role: { he: "צוות קהילה", en: "Community Team" },
    bio: {
      he: "בת 25 מתל אביב, סטודנטית שנה ד׳ למדעי המחשב ויזמות. עובדת כמתכנתת באמזון במשרת סטודנט ומשרתת במילואים כקצינת מבצעים בבור. השתתפה בחילופי סטודנטים בגרמניה. אוהבת פילאטיס מכשירים, לטייל לאכול ולהיות בים.",
      en: "25 years old from Tel Aviv, a fourth-year Computer Science and Entrepreneurship student. She works as a student software developer at Amazon and serves in the reserves as an Operations Officer in the IDF command center. She participated in a student exchange program in Germany. She loves reformer Pilates, traveling, good food, and spending time at the beach.",
    },
    group: "community",
  },
  {
    id: "dana-dabash",
    name: { he: "דנה דבש" },
    role: { he: "צוות כספים וחסויות" },
    bio: {
      he: "אני דנה דבש, סטודנטית לכלכלה, יזמות וניתוח נתונים באוניברסיטת רייכמן. בצוות הכספים והחסויות של מועדון היזמות אני מתעסקת בניהול תקציבים, גיוס חסויות ויצירת שיתופי פעולה עם חברות. מעבר ללימודים אני אוהבת מוזיקה ומנגנת על פסנתר.",
    },
    group: "management",
  },
  {
    id: "shahar",
    name: { he: "שחר שנידמן שינקמן" },
    role: { he: "צוות כספים וחסויות" },
    bio: {
      he: "סטודנטית שנה ג' למשפטים במסלול הישיר ל MBA. עובדת במשרת טרום התמחות במשרד עו״ד מיתר. עוזרת מחקר בתוכנית \"המתמחים-ESG\" פרופ' יואב יאיר. עבדתי כ-7 שנים במשרד הביטחון ושירתתי כלוחמת איסוף בגבול מצרים-ירדן.",
    },
    group: "management",
  },
  {
    id: "lior-aidan",
    name: { he: "ליאור אעידן", en: "Lior Aidan" },
    role: { he: "יועצת ארגונית", en: "Organizational Consultant" },
    bio: {
      he: "בוגרת התואר השני בהתנהגות ופיתוח ארגוני באוניברסיטה, יועצת לניהול ומנחת קבוצות בקבוצת NGG, עוזרת הוראה בקמפוס.",
      en: "Holds a master’s degree in Organizational Behavior and Development, Organizational Management Consultant and Group Facilitator at NGG Group, and Teaching Assistant on campus.",
    },
    group: "advisory",
  },
  {
    id: "ofir-mor",
    name: { he: "אופיר מור", en: "Ofir Mor" },
    role: { he: "יועץ אסטרטגי", en: "Strategic Consultant" },
    bio: {
      he: "בוגר תואר ראשון במדעי המחשב ויזמות בבית הספר הבינלאומי ועובד בתור AI Solution Engineer ומנהל הפיתוח בחברת מדיה. שימשתי בשנה האחרונה בתור Head of Programs של מועדון היזמות ובתור מנהל תכנית המתמחים בשיתוף חברת NICE, והשנה אקח חלק בפעילות הארגון כיועץ אסטרטגי. אחרי שירות ביחידה מיוחדת בחיל המודיעין ובעל רקע בניהול צוותים, פרויקטים ותהליכים במגוון תפקידים ומסגרות.",
      en: "I hold a bachelor’s degree in Computer Science and Entrepreneurship from the International School, and I work as an AI Solution Engineer and Head of Development at a media company. Over the past year, I served as the Head of Programs of the Entrepreneurship Club and as the Director of the Internship Program in collaboration with NICE. This year, I will continue contributing to the organization as a Strategic Consultant. After serving in a special unit in the Intelligence Corps, I bring experience in team, project, and process management across various roles and environments.",
    },
    group: "advisory",
  },
  {
    id: "yossi",
    name: { he: "ד״ר יוסי מערבי", en: "Dr. Yossi Maaravi" },
    role: {
      he: "דיקן בי״ס אדלסון ליזמות ומייסד משותף",
      en: "Dean of the Adelson School of Entrepreneurship & Co-Founder",
    },
    bio: {
      he: "דיקן בית ספר אדלסון ליזמות באוניברסיטת רייכמן, מייסד שותף של קרן הון סיכון Runi Ventures.",
      en: "Dean of the Adelson School of Entrepreneurship at Reichman University, co-founder of the venture capital fund Runi Ventures.",
    },
    group: "advisory",
  },
  {
    id: "ofir-richman",
    name: { he: "אופיר רייכמן", en: "Ofir Richman" },
    role: { he: "מנהל ASE HUB ותוכניות בינלאומיות", en: "Manager of ASE HUB & International Programs" },
    bio: {
      he: "חבר סגל באוניברסיטת רייכמן, מנהל אקדמי בבית הספר הטכנולוגי של גוגל רייכמן, ויועץ מיתוג אסטרטגי בכיר ושיווקי.",
      en: "Faculty member at Reichman University, academic director at the Google Reichman Tech School, and senior strategic branding and marketing consultant.",
    },
    group: "advisory",
  },
];

export const pitchTeam: Person[] = [
  { id: "shelly", name: { he: "Shelly Reinisch", en: "Shelly Reinisch" }, role: { he: "Pitch Night Director", en: "Pitch Night Director" }, group: "pitch" },
  { id: "yonatan", name: { he: "Yonatan Gutman", en: "Yonatan Gutman" }, role: { he: "Head of Startups Relations & Judging", en: "Head of Startups Relations & Judging" }, group: "pitch" },
  { id: "orine", name: { he: "Orine Bason", en: "Orine Bason" }, role: { he: "Startup Relations & Judging", en: "Startup Relations & Judging" }, group: "pitch" },
  { id: "yair", name: { he: "Yair Janbar", en: "Yair Janbar" }, role: { he: "Startup Relations & Judging", en: "Startup Relations & Judging" }, group: "pitch" },
  { id: "shaindy", name: { he: "Shaindy Stamler", en: "Shaindy Stamler" }, role: { he: "Startup Relations & Judging", en: "Startup Relations & Judging" }, group: "pitch" },
  { id: "afik", name: { he: "Afik Peleg", en: "Afik Peleg" }, role: { he: "Head of Operations & Collaboration Team", en: "Head of Operations & Collaboration Team" }, group: "pitch" },
  { id: "yam", name: { he: "Yam Meir", en: "Yam Meir" }, role: { he: "Operations & Collaboration Team", en: "Operations & Collaboration Team" }, group: "pitch" },
  { id: "ofri", name: { he: "Ofri Bloomenfeld", en: "Ofri Bloomenfeld" }, role: { he: "Operations & Collaboration Team", en: "Operations & Collaboration Team" }, group: "pitch" },
  { id: "noy", name: { he: "noy lodzki", en: "noy lodzki" }, role: { he: "Head of Finance & Legal & Registration Manager", en: "Head of Finance & Legal & Registration Manager" }, group: "pitch" },
  { id: "gal-k", name: { he: "Gal Kalderon", en: "Gal Kalderon" }, role: { he: "Head of Community and Alumni Relations", en: "Head of Community and Alumni Relations" }, group: "pitch" },
  { id: "ron", name: { he: "Ron Brener", en: "Ron Brener" }, role: { he: "Head of marketing & Social media Team", en: "Head of marketing & Social media Team" }, group: "pitch" },
  { id: "dina", name: { he: "Dina Niborski", en: "Dina Niborski" }, role: { he: "Marketing & Social Media Team", en: "Marketing & Social Media Team" }, group: "pitch" },
  { id: "noa-d", name: { he: "Noa Davidovich", en: "Noa Davidovich" }, role: { he: "Marketing & Social Media Team", en: "Marketing & Social Media Team" }, group: "pitch" },
];

export function peopleIn(group: PersonGroup): Person[] {
  return people.filter((person) => person.group === group);
}

const aboutIds = [
  "omer-biran",
  "shir-shani",
  "shani-aharon",
  "gal-atzmon",
  "michal-shoris",
  "noa-paster",
  "shiri-izhaki",
  "daniel-pinkasovich",
  "nir-frost",
  "shay-taub",
  "yarin-layani",
  "tal-frankenthal",
  "tomer-epstein",
  "gili",
  "noam-bar",
  "shir-dayan",
  "shir-rubin",
  "maya-ron",
  "dana-dabash",
  "shahar",
  "lior-aidan",
  "ofir-mor",
];

export function peopleByIds(ids: string[]): Person[] {
  return ids.flatMap((id) => {
    const person = people.find((item) => item.id === id);
    return person ? [person] : [];
  });
}

export function aboutTeam(): Person[] {
  return peopleByIds(aboutIds);
}

// The About page's team, in the order and groups it shows them.
export const aboutGroups: { key: string; label: Localized; ids: string[] }[] = [
  { key: "lead", label: { he: "הנהלה", en: "Leadership" }, ids: ["omer-biran", "shir-shani", "shani-aharon", "gal-atzmon"] },
  { key: "ai", label: { he: "חדשנות ו-AI", en: "Innovation & AI" }, ids: ["nir-frost", "shay-taub", "yarin-layani", "tal-frankenthal"] },
  { key: "brand", label: { he: "מותג ושיווק", en: "Brand & Marketing" }, ids: ["michal-shoris", "noa-paster", "shiri-izhaki", "daniel-pinkasovich"] },
  { key: "operations", label: { he: "אופרציה", en: "Operations" }, ids: ["tomer-epstein", "gili", "noam-bar"] },
  { key: "community", label: { he: "קהילה", en: "Community" }, ids: ["shir-dayan", "shir-rubin", "maya-ron"] },
  { key: "finance", label: { he: "כספים וחסויות", en: "Finance & Sponsorships" }, ids: ["dana-dabash", "shahar"] },
  { key: "consulting", label: { he: "ייעוץ", en: "Consulting" }, ids: ["lior-aidan", "ofir-mor"] },
];

// Portraits and LinkedIn profiles as published on the old site's About page (ruec.co.il/about),
// compressed into public/media/team. `position` is the photo's focal point when it is cropped.
// Gal Atzmon's profile link there pointed at someone else, so it is left out.
export const personMedia: Record<string, { photo: string; position?: string; linkedin?: string }> = {
  "shir-shani": { photo: "/media/team/shir-shani.webp", linkedin: "https://www.linkedin.com/in/shir--shani/" },
  "shani-aharon": { photo: "/media/team/shani-aharon.webp" },
  "gal-atzmon": { photo: "/media/team/gal-atzmon.webp" },
  "michal-shoris": { photo: "/media/team/michal-shoris.webp", position: "55% 30%", linkedin: "https://www.linkedin.com/in/michal-shoris-5204262a5/" },
  "noa-paster": { photo: "/media/team/noa-paster.webp", linkedin: "https://www.linkedin.com/in/noa-paster" },
  "shiri-izhaki": { photo: "/media/team/shiri-izhaki.webp" },
  "daniel-pinkasovich": { photo: "/media/team/daniel-pinkasovich.webp" },
  "nir-frost": { photo: "/media/team/nir-frost.webp", position: "38% 30%", linkedin: "https://www.linkedin.com/in/nir-frost" },
  "shay-taub": { photo: "/media/team/shay-taub.webp", linkedin: "https://www.linkedin.com/in/shay-taub-25bb6a2ba/" },
  "yarin-layani": { photo: "/media/team/yarin-layani.webp", linkedin: "https://www.linkedin.com/in/yarin--layani" },
  "tal-frankenthal": { photo: "/media/team/tal-frankenthal.webp", linkedin: "https://www.linkedin.com/in/tal-frankenthal" },
  "tomer-epstein": { photo: "/media/team/tomer-epstein.webp", linkedin: "https://www.linkedin.com/in/tomer-epstein-435a05234" },
  gili: { photo: "/media/team/gili.webp" },
  "noam-bar": { photo: "/media/team/noam-bar.webp", linkedin: "https://www.linkedin.com/in/noam-bar-686290340" },
  "shir-dayan": { photo: "/media/team/shir-dayan.webp", linkedin: "https://www.linkedin.com/in/shirdayan/" },
  "shir-rubin": { photo: "/media/team/shir-rubin.webp", linkedin: "https://www.linkedin.com/in/shir-rubin-a97a44199/" },
  "maya-ron": { photo: "/media/team/maya-ron.webp", linkedin: "https://www.linkedin.com/in/maya--ron/" },
  "dana-dabash": { photo: "/media/team/dana-dabash.webp", position: "68% 30%", linkedin: "https://www.linkedin.com/in/danadvash/" },
  shahar: { photo: "/media/team/shahar.webp", linkedin: "https://www.linkedin.com/in/shachar-shnaidman-05a4b4332" },
  "lior-aidan": { photo: "/media/team/lior-aidan.webp", linkedin: "https://www.linkedin.com/in/lior-aidan-631090241" },
  "ofir-mor": { photo: "/media/team/ofir-mor.webp", linkedin: "https://www.linkedin.com/in/ofir-mor/" },
  yossi: { photo: "/media/team/yossi.webp", linkedin: "https://www.linkedin.com/in/yossimaaravi/" },
  "ofir-richman": { photo: "/media/team/ofir-richman.webp", linkedin: "https://www.linkedin.com/in/ofirrichman/" },
};

export function advisoryTeam(): Person[] {
  return peopleIn("advisory").filter((person) => person.id === "yossi" || person.id === "ofir-richman");
}
