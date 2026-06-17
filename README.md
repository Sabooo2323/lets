# QAZAQ DÜNIESI 🦅

An interactive, gamified website for learning beginner Kazakh, guided by the mascot **Sulu**.
Plain **HTML + CSS + JavaScript** — no framework, no build step, no server needed. Perfect for GitHub Pages.

🌤️ *Learn the language of the eternal blue sky — one warm phrase at a time.*

---

## 🗂️ Project structure

```
qazaq-duniesi/
├── index.html          ← the page (open this)
├── css/
│   └── styles.css      ← "Celestial Steppe" design system
├── js/
│   ├── data.js         ← all content (lessons, proverbs, titles, sound-check)
│   └── app.js          ← all logic (onboarding, flashcards, quiz, celebration)
├── assets/
│   ├── font/ZeroCool.otf      ← brand font (Latin + Kazakh Cyrillic)
│   ├── celebration.mp3        ← dombyra song (victory screen)
│   ├── img/
│   │   ├── logo.jpg           ← holographic Tengri-bird logo
│   │   ├── sulu_raw.jpg       ← Sulu character (original)
│   │   └── sulu_avatar.png    ← Sulu cropped to a circular chat avatar
│   ├── right/   ← 6 "correct answer" GIFs
│   └── wrong/   ← 4 "wrong answer" GIFs
├── .gitignore
└── README.md
```

The files are **shared/linked** the normal web way: `index.html` pulls in `css/styles.css`,
`js/data.js`, and `js/app.js`, and every asset is referenced by a **relative path**, so it works
both at a root domain and a project sub-path.

---

## ▶️ Run it locally

**Easiest:** double-click `index.html`.

**Recommended (most reliable for the font + song + GIFs):** run a tiny local server, then open the URL it prints:

```bash
# from inside the project folder
python3 -m http.server 8000
# visit http://localhost:8000
```

---

## 🚀 Publish on GitHub Pages

1. **Create a repo** on GitHub (e.g. `qazaq-duniesi`).
2. **Upload these files.** Either drag the whole folder's contents into the repo's web uploader, or use git:
   ```bash
   cd qazaq-duniesi
   git init
   git add .
   git commit -m "Qazaq Dünиesi — Kazakh learning site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/qazaq-duniesi.git
   git push -u origin main
   ```
   > Make sure `index.html` sits at the **root** of the repo (not inside a subfolder), so GitHub serves it.
3. On GitHub, open the repo → **Settings → Pages**.
4. Under **Build and deployment → Source**, pick **Deploy from a branch**.
5. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait ~1 minute. Your site goes live at:
   `https://<your-username>.github.io/qazaq-duniesi/`

That's it — share the link and anyone can learn Kazakh with Sulu. 🎉

---

## ✨ What's inside

- **WhatsApp-style onboarding** — chat with Sulu, enter your name + gender, branching dialogue.
- **Module 0 — Sound Check** — the 9 letters foreigners trip on, tappable with phonetic hacks (uses the browser's kk-KZ voice).
- **5 culture modules** — Tanysu · Jol · Tamaq · Densaulyq · Kündelikti — flip-flashcards then a quiz.
- **Wisdom Mirror** — a wrong answer shows a real Kazakh proverb instead of scolding.
- **Suyunshi celebration** — finishing a module fires a holographic banner, the dombyra song, confetti, a title upgrade, and a share button.
- **Title ladder** — climb 7 gender-aware ranks, from *bala/qyz* to *batyr jyrau / batyrhanşa jyrau*.
- **Progress saves automatically** in the browser (localStorage).

## 🎨 Design

"Celestial Steppe" — warm cream/felt daylight UI for learning, with the **Kök Tengri** (eternal blue sky)
holographic motif from the logo on the hero, progress, and celebration screens.

## 📝 Note on fonts

English UI headings load **Baloo 2 + Nunito** from Google Fonts (needs internet — always available on
GitHub Pages). Offline, the browser falls back to a system font; everything still works. The **ZeroCool**
brand font is bundled locally and always loads.

---

*Sәlemetsiz be!* — made with care for the steppe. 🐎
