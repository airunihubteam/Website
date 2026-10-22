# ארכיטקטורה

אתר Next.js (App Router) על Vercel. TypeScript. Tailwind שממפה את הטוקנים מ-`brand.css`, בלי להעתיק ערכים למקום שני בלי שם הטוקן.

## למה בלי וורדפרס

האתר הוא קטלוג. עמודים מעטים, עדכון כמה פעמים בשנה, טפסים שנשלחים למטה. אלמנטור הוא מה שהופך אותו לכבד ולשבור בכתובות. תוכן בקוד נותן תצוגה מקדימה ב-Git, בלי מסד ובלי תוסף.

כשהצוות יצטרך לערוך בלי מפתח, אפשר לחבר CMS אחר כך. לא בגרסה הראשונה.

## מבנה תיקיות

```
app/
  layout.tsx              עברית, RTL, פונטים, Header, Footer
  page.tsx                בית
  about/page.tsx
  programs/page.tsx
  programs/[slug]/page.tsx
  accelerator/page.tsx
  accelerator/momentum/page.tsx
  conferences/page.tsx
  conferences/[slug]/page.tsx
  pitch-night/page.tsx
  internship/page.tsx
  community/page.tsx
  ai/page.tsx
  join/chair/page.tsx
  join/programs/page.tsx
  join/new-program/page.tsx
  en/...                  אותו עץ, dir=ltr
  api/forms/[form]/route.ts
content/
  he.ts
  en.ts
  programs.ts
  people.ts
  navigation.ts
components/
public/brand/             לוגו מהסקיל
public/media/             תמונות שכבר באתר, אחרי בחירה
```

`content/programs.ts` הוא המקור לרשת ולעמוד. סלאג לא מוקלד פעמיים.

## רינדור

עמודים סטטיים (`generateStaticParams` על הסלאגים). בלי קריאת שרת בזמן גלישה. תמונות דרך `next/image`.

השדה `lang` ו-`dir` נקבעים ב-layout של `/` וב-layout של `/en`. אין ספריית i18n בגרסה הראשונה: שני עצי נתיב ושני קבצי תוכן. זה מספיק לשתי שפות עם אותם סלאגים.

## טפסים

אין Route של טפסים בגרסה הזו. אין יצירת קשר ואין ניוזלטר.

## SEO

- `metadata` לכל עמוד: הכותרת הקיימת ("Pitch Night - מועדון היזמות - אוניברסיטת רייכמן") והתיאור הקיים
- `alternates.languages` עם `he` ו-`en` כשיש שני עמודים
- `app/sitemap.ts` ו-`app/robots.ts`
- תמונת OG: תמונת הנושא של העמוד, אחרת תמונת הבניין הקיימת
- כותרות ב-URL בעברית לא נוצרות. סלאגים באנגלית כמו היום

## נגישות

בלי ווידג'ט Enable. במקומו:

- קישור "דלג לתוכן"
- ניגודיות AA לטקסט גוף (ראו [04-design-system.md](04-design-system.md))
- פוקוס נראה
- `alt` אמיתי לדיוקן (שם האדם) ולתמונת תוכנית (שם התוכנית). תמונת רקע דקורטיבית עם `alt=""`
- תפריט שנפתח במקלדת

## תצורה

`vercel.ts` עם `@vercel/config`, לא `vercel.json`, לפי ההגדרה הנוכחית של הפלטפורמה. הפניות מהכתובות הישנות יושבות שם. הפירוט ב-[07-migration.md](07-migration.md).

Node.js ברירת המחדל של Vercel. בלי `runtime = 'edge'`.

## מה במכוון לא נכנס

- CMS, מסד, עגלת קניות
- אנימציית מונה
- פופאפ ניוזלטר ועוגיות צד שלישי. עוגיות רק אם ייכנס אנליטיקס, ואז באנר קצר בעברית
- פיקסל פייסבוק. אם המטה צריך אותו, מוסיפים אותו אחרי השקה, עם הסכמה
