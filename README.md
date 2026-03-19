# 🏥 أساسيات التمريض العملي 1 — v3

## رفع على GitHub Pages

```bash
git init
git add .
git commit -m "Nursing PWA v3"
git remote add origin https://github.com/USERNAME/nursing-app.git
git push -u origin main
```
ثم: Settings → Pages → Source: main → Save

**الرابط:** `https://USERNAME.github.io/nursing-app/`

## الملفات
```
index.html      ← الصفحة الرئيسية
manifest.json   ← PWA
sw.js           ← Service Worker (offline)
css/main.css    ← التصميم الكامل
js/session.js   ← إدارة الجلسات
js/content.js   ← كل محتوى الكتاب
js/app.js       ← منطق التطبيق
icons/          ← أيقونات PWA
```
