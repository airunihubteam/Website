import type { Localized } from "@/lib/locale";

export const brandName: Localized = {
  he: "מועדון היזמות",
  en: "Entrepreneurship Club",
};

export const universityName: Localized = {
  he: "אוניברסיטת רייכמן",
  en: "Reichman University",
};

export const stats = [
  { value: "13", label: { he: "תוכניות", en: "Programs" } },
  { value: "60", label: { he: "מנהלים", en: "Managers" } },
  { value: "1500", label: { he: "סטודנטים", en: "Students" }, suffix: "+" },
  { value: "1", label: { he: "אקסלרטור", en: "Accelerator" } },
] as const;

export const reichmanQuote: Localized = {
  he: "פרופ׳ אוריאל רייכמן, הנשיא המייסד ויו״ר דירקטוריון אוניברסיטת רייכמן אמר: ״מיום היווסדו, המרכז הבינתחומי, לימים אוניברסיטת רייכמן, פועל להכשרת מנהיגות העתיד של החברה הישראלית ושל העם היהודי. ישראל זקוקה היום למנהיגות גדולה, שתחדש חזון ותביא למימושו. הכל תלוי בדור הבא של המדינה.״",
  en: "Professor Oriel Reichman, the founding president and chairman of the board of directors of Reichman University said: “Since its founding, the Interdisciplinary Center, Reichman University, has been working to train the future leadership of Israeli society and the Jewish people. Israel needs great leaders today, who will renew vision and bring it to fruition. Everything depends on the next generation of the country.”",
};

export const chairLine: Localized = {
  he: "עומר בירן, יו״ר מועדון היזמות, אוניברסיטת רייכמן",
  en: "Omer Biran, Chair of the Entrepreneurship Club, Reichman University",
};

export const aboutParagraphs: Localized[] = [
  {
    he: "מועדון היזמות של אוניברסיטת רייכמן הינו אחד ממועדוני היזמות הסטודנטיאלים הגדולים בעולם ושימש כאבן דרך משמעותית להקמת בית הספר אדלסון ליזמות.",
    en: "The Entrepreneurship Club of Reichman University is one of the largest student entrepreneurship clubs in the world and serves as a significant milestone for the establishment of the Adelson School of Entrepreneurship.",
  },
  {
    he: "המועדון מאגד תחתיו חמישה מוקדי עיסוק עיקריים: תוכניות, כנסים, Meetups, אקסלרטור ומסלול הדגל של המועדון – הפיץ׳ נייט.",
    en: "The club consists of five main activity centers: Programs, conferences, meetups, accelerator, and the spotlight of the club – The pitch night.",
  },
  {
    he: "החזון שלנו הוא להוות פלטפורמה חדשנית לעידוד למידה ויזמות בקרב הסטודנטים והסטודנטיות לצד הלימודים האקדמאים – להשפיע, לפתח ולקדם הזדמנויות, חדשנות ויוזמה בקרב המשתתפים.",
    en: "Our vision is to provide an innovative platform that encourages learning of entrepreneurship among students, alongside their academic studies – to influence, develop, create and promote opportunities, innovation, and initiative amidst the participants.",
  },
  {
    he: "אנו מחויבים לאפשר סביבה תומכת ומעוררת השראה, המספקת משאבים וכלים לפיתוח היזמות, באמצעות מפגשים שבועיים, כנסים, אירועים, הרצאות, סמינרים ומתן הזדמנויות לשיתוף פעולה עם חברות מובילות ואנשי מפתח בתעשייה.",
    en: "We are committed to providing a supportive and inspiring environment that delivers resources and tools for the development of entrepreneurship, through weekly meetings, conferences, events, lectures, seminars and opportunities for collaboration with leading companies and key figures in the industry.",
  },
  {
    he: "מועדון היזמות מהווה מקום מרכזי לחיבור ושיתוף פעולה בין סטודנטים, בוגרים ותעשייה.",
    en: "The entrepreneurship club is a central place for network and cooperation between students, graduates and the industry.",
  },
  {
    he: "התוכניות של מועדון היזמות מאפשרות לכלל הסטודנטים מהתארים השונים, להרחיב את הידע והניסיון שלהם בנושאים שמסקרנים אותם מעבר לשעות האקדמיות. מדי שנה אלפי סטודנטים וסטודנטיות מגישים את מועמדותם לתוכניות השונות.",
    en: "The programs of the Entrepreneurship Club allow all students from various degrees to expand their knowledge and experience in subjects that intrigue them beyond their academic hours. Every year thousands of male and female students apply for the numerous programs.",
  },
  {
    he: "מועדון היזמות הוקם על ידי סטודנטים למען סטודנטים.",
    en: "The entrepreneurship club was established by students for students.",
  },
];

export const homeAboutCount = 4;

export const pitchIntro: Localized = {
  he: "Pitch Night is the largest student startup competition in Israel and the flagship program of the Entrepreneurship Club. It attracts early-stage startups founded by students from academic institutions across Israel. Throughout the competition, these startups participate in various events that offer professional content, networking opportunities, and selection rounds, culminating in a Pitch Night where 10-15 selected startups compete for the top prize.",
  en: "Pitch Night is the largest student startup competition in Israel and the flagship program of the Entrepreneurship Club. It attracts early-stage startups founded by students from academic institutions across Israel. Throughout the competition, these startups participate in various events that offer professional content, networking opportunities, and selection rounds, culminating in a Pitch Night where 10-15 selected startups compete for the top prize.",
};

export const pitchStages: { title: string; body: string }[] = [
  {
    title: "Kick-off Meeting",
    body: "Your journey starts here. A Zoom meeting where the accepted startups will receive all the information they require about the stages of the competition and the relevant requirements.",
  },
  {
    title: "Bootcamp",
    body: "How to do it right. A face-to-face meeting where you will acquire tools and skills for entrepreneurs that will serve you in the competition and help you on your entrepreneurial journey.",
  },
  {
    title: "Screening Session",
    body: "An investors committee led by the sponsors of the competition. A screening session where only the 15 best startups will receive an entry ticket to the peak event.",
  },
  {
    title: "Mentoring Evening",
    body: "An exclusive mentoring and networking event for the 15 selected finalist startups. The event connects founders with experienced industry leaders for meaningful conversations, practical guidance, and valuable insights designed to help startups refine their journey ahead of Pitch Night.",
  },
  {
    title: "The Pitch Night",
    body: "Consists of two main parts. During the first part, each startup will have to showcase their venture to the guests of honor, who will include hundreds of industry leaders such as venture capitalists, CEOs of high-tech companies, and private investors. The audience will rank the startups, and the top four will move on to the finals to present their pitch on the main stage. During the second part of the event, a panel of top judges will evaluate the finalists and award prizes to the top three startups.",
  },
];

export const internshipHe = {
  kicker: "מועדון היזמות NICE X",
  data: "14 סטודנטים · תכנית שנתית · 8 שעות שבועיות",
  body: [
    "מטרת התוכנית היא שילוב מעשי ופרקטי של סטודנטים.ות של מועדון היזמות בתעשייה. מתן הזדמנות לקבלת כלים שימושיים בשוק העבודה.",
    "התוכנית הינה שנתית ומתקיימת פעמיים בשבוע בהיקף של 8 שעות שבועיות במשרדי החברה כמפורט למטה.",
    "הסטודנטים יצטרפו למגוון הצוותים הקיימים בחברה ויעבדו על הפרויקטים שיינתנו להם במסגרת השעות שעליהן התחייבו תחת ליווי והנחייה של עובדי ומנהלי החברה.",
    "הסטודנטים שיתקבלו לתוכנית יזכו להזדמנות חד-פעמית להיות חלק מקהילת מועדון היזמות, ולקבל הרצאות מעשירות על מגוון תחומים בעולם הטכנולוגיה במסגרת תוכניות המועדון.",
  ],
  requirementsTitle: "דרישות התוכנית",
  requirements: [
    "התוכנית מיועדת לסטודנטים.ות של מועדון היזמות בלבד.",
    "התוכנית מיועדת לסטודנטים.ות למדעי המחשב בלבד (מכלל המסלולים).",
    "הסטודנטים יתחייבו לעמוד ב-8 השעות השבועיות במשרדי חברת NICE.",
    "יתרון לבעלי ממוצע ציונים של 85 ומעלה.",
    "יתרון לבעלי ציון עובר בקורס תכנות מתקדם.",
    "יתרון לבעלי ניסיון קודם בפיתוח.",
  ],
  moreTitle: "פרטים נוספים",
  more: [
    "סטודנט שיעמוד בכל הדרישות יקבל מלגה של 2,000 ₪ מטעם מועדון היזמות.",
    "מתווה קבלת הסטודנטים וההתנהלות מולם יקבע בהמשך בשיתוף חברת NICE ומועדון היזמות.",
  ],
  manager: "מנהל התוכנית: אופיר מור, מנהל תכנית המתמחים בשיתוף חברת NICE.",
  quotesTitle: "בוגרי התוכנית מספרים",
  quotes: [
    {
      quote:
        "ההתמחות שלי בNICE הייתה חוויה מעשירה שאפשרה לי ליישם את הידע שרכשתי בלימודי מדעי המחשב בפרויקטים אמיתיים בתעשייה. כחלק מצוות פיתוח התמודדתי עם אתגרי תכנות וסביבות עבודה מורכבות, תוך חיזוק יכולות כתיבת קוד ופתרון בעיות. העבודה לצד מפתחים מנוסים העניקה לי הזדמנות ללמוד טכנולוגיות חדשות, להכיר מתודולוגיות עבודה מתקדמות, ולפתח מיומנויות עבודה בצוות. במהלך התקופה זכיתי להכיר אנשים נפלאים, שתמכו ולימדו אותי כיצד פועל צוות יעיל. לאחר סיום ההתמחות, הייתה לי הזכות להמשיך בנייס בתור סטודנטית, ואני ממשיכה לצמוח ולהתפתח מול אתגרים חדשים בתהליכי הפיתוח היומיומיים.",
      by: "הילה אשכנזי, מדעי המחשב חד חוגי שנה ג', נשארה לעבוד ב-NICE",
    },
    {
      quote:
        "במסגרת ניהול תוכנית ההתמחות של חברת NICE בשיתוף פעולה עם מועדון היזמות של אוניברסיטת רייכמן, ניהלתי את כל תהליך המיון והייתי הציר המקשר בין צרכי המתמחים לבין המנהלים שלהם לאורך כל התוכנית. בנוסף לניהול, הייתי גם מתמחה בעצמי. במהלך ההתמחות למדתי רבות על התנהלות בתוך ארגון, השתלבות בצוות קיים, והעבודה המעשית של מפתחי תוכנה בעולם ההייטק. התוכנית הזו סיפקה לסטודנטים, שלרוב אין להם ניסיון מעשי בתחום, הזדמנות נדירה להיחשף לעולם ההייטק.",
      by: "עמרי אמידי, מדעי המחשב יזמות, נשאר לעבוד ב-NICE",
    },
    {
      quote:
        "התוכנית עזרה לי לקבל ניסיון של ממש בחברה גדולה, להבין איך היום יום עובד, לעשות משימות אמיתיות של הצוות, לראות איך הצוות מתנהל ואיך פותרים משימות. בסופו של דבר המנהל מNICE היה אחד הממליצים והתחלתי לעבוד בתור מפתח בצ׳ק פוינט, וזה הרבה בזכות הניסיון וההמלצה מNICE.",
      by: "בר יעקובוביץ', בוגר מדעי המחשב בינלאומי, כיום עובד כמפתח בצ'ק פוינט",
    },
  ],
};

export const internshipEn = {
  kicker: "Industry Track – NICE X Entrepreneurship Club",
  data: "6-8 Students · 6hrs/week",
  body: [
    "The purpose of the program is to combine theoretical and practical skills of students of the entrepreneurship club in the industry. Providing an opportunity to obtain useful tools in the market.",
    "The program is semester-long and lasts 10 weeks with 6 hours per week as detailed below. The students will receive an applied project related to the company’s tasks. They will carry out the project within the hours they committed to under the lead and guidance of the company’s employees and managers.",
  ],
  requirementsTitle: "Program requirements",
  requirements: [
    "The program is intended for students of the entrepreneurship club only.",
    "The program is intended for students from the entrepreneurship track – computer science only.",
    "GPA of 80 or higher.",
    "The students will commit to the 6 weekly hours.",
    "4 hours – in offices/hybrid. The decision will be by NICE.",
    "2 hours – ongoing independent practical tasks.",
    "Regular participation of at least 80% in the activities of the entrepreneurship club.",
  ],
  moreTitle: "More details",
  more: [
    "A student who meets all the requirements will receive a scholarship of 1,000 shekels on behalf of the Entrepreneurship Club.",
    "The outline of accepting the students and dealing with them will be determined later on during the cooperation with NICE and the Entrepreneurship Club.",
  ],
};

export const communityHe = {
  title: "קהילת מועדון היזמות",
  intro: [
    "כאן נמצא דור המנהיגים הבא של ישראל.",
    "סטודנטים בתחילת דרכם ובוגרים מובילים בתעשייה – כולם שותפים לחדשנות ולעשייה משמעותית.",
    "אנחנו מחברים בין חברי הקהילה, יוצרים הזדמנויות לשיתוף פעולה ומספקים השראה להמשך הדרך.",
    "צומחים יחד, מנצחים אתגרים ומובילים להצלחה.",
  ],
  studentsTitle: "קהילת הסטודנטים",
  students: [
    "הקהילה מורכבת מסטודנטים עם רעיונות פורצי דרך, שמחפשים להעשיר את הידע שלהם, להרחיב את הקשרים המקצועיים ולבצע את הצעד הראשון לעבר הצלחה.",
    "באמצעות תוכניות המועדון, הרצאות השראה, תחרויות ואירועים ייחודיים, אנו מספקים להם את הכלים הדרושים להתפתחות מקצועית ואישית, כל אחד בתחום העניין שלו.",
    "מטרת הקהילה היא ליצור סביבה יזמית תומכת, לחשוף את הסטודנטים לעולם התעשייה ולפתוח בפניהם הזדמנויות לשיתופי פעולה שיבנו בסיס חזק להצלחה.",
  ],
  alumniTitle: "קהילת הבוגרים",
  alumni: [
    "קהילת הבוגרים של מועדון היזמות מורכבת ממנהלי עבר של תוכניות המועדון – סטודנטים לשעבר שלקחו על עצמם אחריות גדולה, ומאז תחילת דרכם מובילים ומשפיעים.",
    "הבוגרים שלנו התברגו בעמדות מפתח בתעשייה, ממשיכים להוביל וליצור שינוי גם אחרי סיום הלימודים.",
    "מטרת הקהילה היא לחבר בין הבוגרים, ליצור קשרים מקצועיים חזקים ולפתוח הזדמנויות לשיתופי פעולה, העברת משרות ועזרה הדדית. הקהילה משמשת מקור השראה עבור הסטודנטים, דוחפת אותם לקחת על עצמם תפקידי ניהול ומספקת תמיכה והכוונה למי שמעוניין להמשיך להוביל ולצמוח בעולם היזמות.",
    "קהילת הבוגרים מספקת תמיכה למנהלי התוכניות העכשוויים, ובכך מבטיחה את המשך הצלחת מועדון היזמות ותורמת לצמיחה ולהתפתחות של דור היזמים הבא.",
  ],
};

export const communityEn = {
  title: "RUEC Community",
  intro: [
    "Here lies the next generation of Israel’s leaders.",
    "Students at the beginning of their journey and industry-leading alumni – all united by innovation and meaningful impact.",
    "We connect members of our community, create opportunities for collaboration, and provide inspiration for the road ahead.",
    "Growing together, overcoming challenges, and leading the way to success.",
  ],
  studentsTitle: "Student Community",
  students: [
    "The community is made up of students with breakthrough ideas who seek to enrich their knowledge, expand their professional network, and take their first step toward success.",
    "Through the club’s programs, inspirational lectures, competitions, and unique events, we provide them with the tools they need for both professional and personal development, each in their own area of interest.",
    "The goal of the community is to create a supportive entrepreneurial environment, expose students to the industry, and open doors to collaboration opportunities that lay a strong foundation for their future success.",
  ],
  alumniTitle: "Alumni Community",
  alumni: [
    "The Alumni Community of the Entrepreneurship Club is made up of former program managers – graduates who took on significant responsibility during their studies and have continued to lead and make an impact ever since.",
    "Our alumni have integrated into key positions across the industry, continuing to innovate and drive change even after completing their degrees.",
    "The purpose of the community is to connect alumni, foster strong professional relationships, and create opportunities for collaboration, job sharing, and mutual support. The community serves as a source of inspiration for current students, encouraging them to take on leadership roles and providing guidance for those who wish to continue growing in the world of entrepreneurship.",
    "The Alumni Community also supports current program managers, ensuring the continued success of the Entrepreneurship Club and contributing to the growth and development of the next generation of entrepreneurs.",
  ],
};

export const aiHe = {
  intro:
    "מדור החדשנות וה-AI נועד לשמש כמרכז הידע של תחום ה-AI והחדשנות במועדון היזמות. הוא משמש כגורם מייעץ, מטמיע בינה מלאכותית ומערכות חדשות לשיפור תהליכים במטה וחושף את הסטודנטים לעולמות הבינה המלאכותית בצורה המשכית, נגישה ופרקטית.",
  blocks: [
    {
      title: "מיקוד בתחומי המועדונים",
      body: "חושפים את הסטודנטים ליישומי בינה מלאכותית בתחום ההתמקצעות שלהם, בדגש על שיטות וכלים הנהוגים בתעשייה, באמצעות אירוע בשיתוף פעולה עם מומחי בינה מלאכותית מהתעשייה. המטרה היא לתרגם ידע ליישום מיידי.",
    },
    {
      title: "התייעלות והתנהלות פנימית",
      body: "הטמעת מערכות, אוטומציות וכלי AI על מנת להאיץ את תהליכי העבודה ולהגביר את הפרודקטיביות של המטה ומנהלי התוכניות.",
    },
    {
      title: "הדרכות, סדנאות והנגשת כלים",
      body: "חשיפה מתמשכת לכלים, תחומים מרכזיים ומתודולוגיות ב-AI באמצעות הדרכות פרקטיות רחבות והנגשה שוטפת של תכנים, כלים ועדכונים מהתעשייה במהלך השנה.",
    },
  ],
};

export const aiEn = {
  intro:
    "The Innovation & AI Division serves as the knowledge hub for AI and innovation within the Entrepreneurship Club. It also acts as a consulting body, implementing AI and new systems to improve internal processes, while continuously exposing students to the world of artificial intelligence in an accessible, practical, and ongoing way.",
  blocks: [
    {
      title: "Focusing on the club’s core domains",
      body: "We teach domain-specific AI for the clubs, with an emphasis on industry-standard methods and tools, through an event held in collaboration with an AI expert from the field. The goal is to translate knowledge into immediate application.",
    },
    {
      title: "Internal efficiency and operations",
      body: "Implementing systems, automations, and AI tools to accelerate workflows and enhance the productivity of the core team and program managers.",
    },
    {
      title: "Training, workshops, and accessible tools",
      body: "Ongoing exposure to key AI tools, core domains, and methodologies through extensive practical training sessions, along with continuous access to content, tools, and industry updates throughout the year.",
    },
  ],
};

export const joins = {
  chair: {
    title: { he: "הרשמה לוועדת האיתור לבחירת יו״ר" },
    paragraphs: [
      "נפתחה ההרשמה ליו״ר הבא של מועדון היזמות. זו ההזדמנות שלכם לחוות מה זה לנהל ארגון עם תקציב של מאות אלפי שקלים, להשפיע על יותר מ־1,500 סטודנטים, לעבוד עם עשרות אנשי צוות מוכשרים, לפגוש מקרוב את מובילי ההייטק הישראלי, לקחת חלק בכנסים בתעשייה ולהיות חלק מאחד הגופים הכי עוצמתיים בקמפוס.",
      "הליך הבחירה מובנה במתכונת של ועדת איתור. מועמדים המבקשים שמועמדותם תידון בפני הוועדה נדרשים לעמוד בדרישות סף כחלק מהליך מיון מקדמי.",
      "ניסיון ניהולי בתוכנית או בתפקיד מטה של מועדון היזמות: ניהול תכנית במסגרת מועדון היזמות בשנה״ל הנוכחית, או הקודמת, או כהונה כחבר/ת מטה (כולל מטה אירוע ה-Pitch Night השנתי) בשנה״ל הנוכחית.",
      "מועמדים שיעברו לשלב השני בתהליך יידרשו להציג 2 המלצות כתובות. עדיפות תינתן להמלצות מאת חברי סגל אקדמי או מנהלים בכיר בקמפוס, אך ניתן להגיש גם המלצות מגורמים מקצועיים נוספים. לא ניתן להגיש המלצות מחברים בוועדת האיתור.",
    ],
  },
  programs: {
    title: { he: "הצטרפות לניהול תוכניות" },
    paragraphs: [
      "טופס ההצטרפות לניהול תוכניות של מועדון היזמות פתוח כהסבר על המסלול. ההרשמה אינה מהווה אישור קבלה.",
    ],
  },
  "new-program": {
    title: { he: "פתיחת מועדון חדש" },
    paragraphs: [
      "קול קורא להגשת רעיון לתוכנית חדשה במועדון היזמות של אוניברסיטת רייכמן.",
      "יש לכם רעיון לתוכנית חדשה שתפעל במסגרת מועדון היזמות? נשמח לשמוע.",
    ],
  },
} as const;

export type JoinSlug = keyof typeof joins;

export type JoinDetails = {
  lead: string;
  more?: string;
  stepsIntro?: string;
  steps?: { title: string; body: string; items?: { title: string; body: string }[] }[];
  // Staff teams one can apply to join; the programs come from the catalog.
  teams?: string[];
  team?: string;
  // What the sign-up form asks for, so people can get it ready. Temporary: once the redesign is
  // done the club will build real sign-up forms, which replace this list.
  prepare: string[];
};

// What each join page shows beyond its title, from the old site's sign-up forms
// (ruec.co.il/forms/committee, /join-us and /new-program). The forms themselves are not part of
// this site yet, so for now the pages explain the track and list what an application needs.
export const joinDetails: Record<JoinSlug, JoinDetails> = {
  chair: {
    lead: "נפתחה ההרשמה ליו״ר הבא של מועדון היזמות!",
    more: "זו ההזדמנות שלכם לחוות מה זה לנהל ארגון עם תקציב של מאות אלפי שקלים, להשפיע על יותר מ־1,500 סטודנטים, לעבוד עם עשרות אנשי צוות מוכשרים, לפגוש מקרוב את מובילי ההייטק הישראלי, לקחת חלק בכנסים בתעשייה ולהיות חלק מרכזי מאחד הגופים הכי עוצמתיים בקמפוס. להיות יו״ר מועדון היזמות זו לא עוד שורה בקורות החיים – זו חוויה שתשנה אתכם.",
    stepsIntro: "הליך הבחירה מובנה במתכונת של ועדת איתור. מועמדים המבקשים שמועמדותם תידון בפני הוועדה נדרשים לעמוד בדרישות סף כחלק מהליך מיון מקדמי.",
    steps: [
      {
        title: "שלב המיון המקדמי",
        body: "על סטודנטים המבקשים להביא את מועמדותם בפני ועדת האיתור לעמוד בכל התנאים הבאים, גם יחד:",
        items: [
          {
            title: "ניסיון ניהולי בתוכנית או בתפקיד מטה של מועדון היזמות",
            body: "ניהול תכנית במסגרת מועדון היזמות בשנה״ל הנוכחית או הקודמת, או כהונה כחבר/ת מטה (כולל מטה אירוע ה-Pitch Night השנתי) בשנה״ל הנוכחית.",
          },
          {
            title: "שתי המלצות כתובות",
            body: "מועמדים שיעברו לשלב השני יידרשו להציג 2 המלצות כתובות. עדיפות תינתן להמלצות מאת חברי סגל אקדמי או מנהלים בכירים בקמפוס, אך ניתן להגיש גם המלצות מגורמים מקצועיים נוספים. לא ניתן להגיש המלצות מחברים בוועדת האיתור.",
          },
        ],
      },
      {
        title: "שלב ועדת האיתור",
        body: "מועמדים שעמדו בתנאי שלב המיון הראשוני יוזמנו להציג את הרקע, הניסיון והתוכניות לפעילות העתידית של המועדון בפני ועדת האיתור.",
      },
    ],
    prepare: ["שם מלא", "טלפון", "דוא״ל", "מסלול לימודים ושנה", "תפקיד ניהולי קודם במועדון היזמות, אם היה", "קורות חיים בקובץ PDF"],
  },
  programs: {
    lead: "מועדון היזמות הוקם על ידי סטודנטים למען סטודנטים.",
    more: "אפשר להגיש מועמדות לניהול אחת מתוכניות המועדון או להצטרף לאחד מצוותי המטה.",
    teams: ["צוות מותג (שיווק)", "צוות AI וחדשנות", "צוות אופרציה", "צוות כספים", "צוות קהילה"],
    team: "אפשר להגיש מועמדות אישית או כחלק מצוות. בהגשה כצוות מפרטים את שמות חברי הצוות ואת תפקידו של כל אחד מהם.",
    prepare: [
      "שם מלא",
      "טלפון",
      "דוא״ל",
      "מסלול לימודים ושנה",
      "איזו תוכנית תרצו לנהל",
      "האם לקחתם חלק במועדון היזמות בשנים האחרונות, ובאיזה תפקיד",
      "למה אתם מתאימים לתפקיד",
      "קורות חיים",
      "הגשה אישית או כחלק מצוות",
    ],
  },
  "new-program": {
    lead: "יש לכם רעיון לתוכנית חדשה שתפעל במסגרת מועדון היזמות? נשמח לשמוע!",
    more: "קול קורא להגשת רעיון לתוכנית חדשה במועדון היזמות של אוניברסיטת רייכמן. מגישים את הפרטים ומצרפים מצגת קצרה שמציגה את הרעיון.",
    prepare: ["שם מלא", "טלפון", "דוא״ל", "מסלול לימודים ושנה (בשנה הבאה)", "תחום המועדון", "מצגת קצרה שמציגה את הרעיון"],
  },
};

export const joinNote = "ההרשמה אינה מהווה אישור קבלה. במידה ותעברו שלב תקבלו מייל עם הרשמה לראיונות.";
