# מבנה האתר החדש

עברית בלי קידומת. אנגלית תחת `/en`. כל עמוד בעברית יש לו תאום אנגלי עם אותו זנב כתובת.

## תפריט

```
אודות
התוכניות שלנו
  תוכניות
  אקסלרטור
  Pitch Night
  מסלול לתעשייה
כנסים
קהילה
AI
English
```

התפריט זהה לחי. הכתובות בלי `./`.

## מפת כתובות

| עברית | אנגלית | תפקיד |
|---|---|---|
| `/` | `/en` | בית |
| `/about` | `/en/about` | אודות וצוות |
| `/programs` | `/en/programs` | אינדקס 12 התוכניות |
| `/programs/[slug]` | `/en/programs/[slug]` | עמוד תוכנית |
| `/accelerator` | `/en/accelerator` | שער אקסלרטור |
| `/accelerator/momentum` | `/en/accelerator/momentum` | Momentum |
| `/conferences` | `/en/conferences` | אינדקס כנסים |
| `/conferences/[slug]` | `/en/conferences/[slug]` | עמוד כנס |
| `/pitch-night` | `/en/pitch-night` | Pitch Night. בלי עמוד הרשמה בגרסה הזו |
| `/internship` | `/en/internship` | מסלול לתעשייה |
| `/community` | `/en/community` | קהילה. הכתובת הישנה `/alumni` מפנה לכאן. בלי טופס בוגרים |
| `/ai` | `/en/ai` | חדשנות ו-AI |
| `/join/chair` | `/en/join/chair` | ועדת איתור. הסבר בלבד, בלי שליחה |
| `/join/programs` | `/en/join/programs` | ניהול תוכניות. הסבר בלבד |
| `/join/new-program` | `/en/join/new-program` | רעיון למועדון חדש. הסבר בלבד |

`/contact`, `/newsletter` ו-`/pitch-night/apply` לא קיימים. כתובות ישנות שלהם מפנות הביתה.

סלאגים של תוכניות וכנסים נשארים כמו היום, כדי שהפניות יהיו אחד-לאחד:

`artemis` · `defense-tech` · `runispace` · `foodtech` · `greenbiz` · `impact` · `leaders` · `m-club` · `product-hub` · `proptech` · `pulse` · `tech-talk`

`beyondsummit` · `food-tech` · `managers-seminar`

`momentum`

## מה יורד כעמוד עצמאי

- `/pitch-night/startups/registration-completed/` מתמזג לתוך עמוד תודה אחד.
- עמודי `head-team` הבודדים. האדם מופיע באודות, ב-AI, בקהילה או ב-Pitch Night, בלי URL אישי.
- `/./programs/`, `/./accelerator/`, `/./conferences/` הופכים להפניה אל הכתובת הנקייה.

## עומק

שתי רמות לכל היותר: אינדקס, ואז פריט. Pitch Night הוא היוצא מן הכלל, עם עמוד הרשמה מתחתיו.

דף הבית לא מחליף את האינדקסים. הוא שולח אליהם. רשימת 12 התוכניות מופיעה גם בפוטר, כמו היום, כדי שאפשר להגיע לתוכנית בלחיצה אחת.

## שפה

מתג עברית / English שומר על אותו עמוד. בעמוד תוכנית, `/programs/artemis` עובר אל `/en/programs/artemis`.

עברית היא ברירת המחדל של `hreflang`. עמוד בלי תרגום מלא לא מומצא: מציגים את הטקסט העברי עם הערה, עד שיש תרגום. באתר החי לחלק מהתוכניות אין עמוד אנגלי (Runi Space, Tech-Talk).

## טפסים

אין טפסים בגרסה הזו. אין יצירת קשר, אין ניוזלטר, אין הרשמה ל-Pitch Night ואין טופס בוגרים. שלושת עמודי `/join/...` מציגים את תנאי ההצטרפות שכבר היו באתר, בלי כפתור שליחה.
