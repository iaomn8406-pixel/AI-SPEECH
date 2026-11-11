# نُـطْـق | AI Speech & Child Development Platform

> **منصة ذكاء اصطناعي متكاملة لتأهيل الأطفال، معالجة تأخر الكلام، تصحيح مخارج الحروف، علاج عسر القراءة، وتنمية المهارات الاجتماعية والسلوكية.**

---

## 🌟 مميزات المنصة الرئيسية

1. **المحرك الاستشاري المركزي (AI Central Agent)**:
   - تحليل متقدم لحالة كل طفل وربط المحادثة الاستكشافية بسجل الجلسات والنتائج.
   - ذاكرة مستقلة لكل طفل تحتفظ بنقاط القوة والمهارات التي تحتاج إلى تدريب.

2. **الجلسات الصوتية التفاعلية المباشرة (Realtime Voice)**:
   - شخصية تفاعلية ودودة ("سمسم") تتحدث بصوت طبيعي وتستمع إلى نطق الطفل.
   - دعم كامل لخاصية المقاطعة الذكية (**Barge-in**)، حيث يتوقف المعلم الذكي فور نطق الطفل.
   - تقييم صوتي وفونولوجي دقيق يشجع الطفل بلطف ولا يصدر أحكاماً سلبية.

3. **منهج ومحتوى تأهيلي غني وجاهز (Prebuilt Curriculum)**:
   - **5 تخصصات رئيسية**:
     1. تأخر الكلام ونمو اللغة (Speech & Language Development).
     2. مخارج الحروف وتصحيح اللدغات (Pronunciation & Articulation).
     3. عسر القراءة وصعوبات التعلم (Dyslexia & Reading).
     4. مهارات التواصل الاجتماعي وتبادل الأدوار (Social Communication Skills).
     5. المهارات السلوكية والتنظيم الذاتي (Behavioral & Emotional Skills).
   - مسارات ومراحل وجلسات مليئة بالأنشطة (Listen & Repeat, Pick Image, Complete Sentence, Social Scenarios, Phonemic Awareness).

4. **لوحات تحكم متخصصة ومتوافقة بالكامل مع جميع الأجهزة (Ultra Responsive)**:
   - **لوحة ولي الأمر (Parent Dashboard)**: إدارة أكثر من طفل، تقارير التقدم، الأهداف التأهيلية، والشات الاستشاري.
   - **لوحة الأخصائي (Specialist Dashboard)**: مراجعة الخطط السريرية واعتماد الأهداف وتدوين الملاحظات.
   - **لوحة الإدارة (Admin Dashboard)**: إدارة مفاتيح ومزودي AI، ترشيحات الموديلات، وتتبع التكلفة.

---

## 🚀 دليل الربط والنشر على Vercel و Supabase

### 1. إعداد قاعدة البيانات في Supabase (خطوة واحدة فقط!)
1. سجل حساباً مجانياً على [Supabase](https://supabase.com) وأنشئ مشروعاً جديداً.
2. توجه إلى قسم **SQL Editor** في لوحة تحكم Supabase.
3. انسخ محتويات ملف `supabase/schema.sql` الموجود في هذا المشروع والصقه في المحرر ثم اضغط **Run**.
4. سيتم إنشاء جميع الجداول، العلاقات، الفهارس، وسياسات الأمان (Row Level Security) تلقائياً!

### 2. جلب مفاتيح Supabase
من لوحة تحكم مشروعك في Supabase:
- اذهب إلى **Project Settings** (أيقونة الترس في الأسفل) ➔ **API**.
- ستجد:
  - **Project URL** ➔ يوضع في المتغير `NEXT_PUBLIC_SUPABASE_URL`
  - **anon (public key)** ➔ يوضع في المتغير `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **service_role (secret key)** ➔ يوضع في المتغير `SUPABASE_SERVICE_ROLE_KEY`

### 3. جلب مفتاح Google Gemini (مجاني)
- ادخل على [Google AI Studio](https://aistudio.google.com).
- اضغط على **Get API Key** ثم **Create API key**.
- انسخ المفتاح وضعه في المتغير `GEMINI_API_KEY`.

---

## 🔑 قائمة متغيرات البيئة (Environment Variables) لـ Vercel

عند ربط مستودع GitHub في موقع [Vercel](https://vercel.com)، توجه إلى **Settings** ➔ **Environment Variables** وأضف المتغيرات التالية:

| اسم المتغير (Variable Name) | القيمة وطريقة الحصول عليه | الحالة |
|-----------------------------|---------------------------|--------|
| `NEXT_PUBLIC_APP_NAME` | `نطق \| AI Speech` | **جاهز معك (انسخ مباشرة)** |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `ar` | **جاهز معك (انسخ مباشرة)** |
| `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروعك من Supabase (مثال: `https://xyzcompany.supabase.co`) | من Supabase API Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام `anon` المشفر بـ JWT | من Supabase API Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | المفتاح السري `service_role` للعمليات الآمنة بالخلفية | من Supabase API Settings |
| `GEMINI_API_KEY` | مفتاح Google Gemini (يبدأ بـ `AIzaSy...`) | من Google AI Studio (مجاني) |
| `OPENAI_API_KEY` | اختياري (يبدأ بـ `sk-...`) | من OpenAI Platform |

---

## 🛠️ التشغيل والتطوير المحلي

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# فحص وبناء المشروع للإنتاج
npm run build
```

---

## 🔒 حماية وخصوصية بيانات الأطفال
- المنصة متوافقة مع إرشادات خصوصية الأطفال العالمية (COPPA/GDPR-K).
- لا يتم تخزين التسجيلات الصوتية دون موافقة صريحة.
- عزل تام لسجلات كل طفل ومنع تداخل المحادثات أو البيانات بين الحسابات.
