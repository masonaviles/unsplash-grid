# 🖼️ Unsplash Grid

A dynamic, responsive image gallery built with **Next.js 15**, **Tailwind CSS**, and the **Unsplash API**. Search, shuffle, and view full-screen photos—beautifully.

## 🚀 Features

- 🔍 **Search** by hashtag using the Unsplash API
- 🔄 **Shuffle** to refresh random images
- 🧠 **Local caching** and placeholder fallback
- 📷 **Fullscreen modal** with zoom animation
- 🏷️ **Image tags** displayed on hover
- 🔒 **Rate limit awareness** with cookie-based timers (shared across Netlify/local)
- 🧪 Built with `app/` directory and React 19's new features

## 📦 Stack

- [Next.js 15](https://nextjs.org)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) – for smooth animations

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/unsplash-grid.git
cd unsplash-grid
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create an .env.local file
```env
UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```
🔑 You can get a free access key from Unsplash Developers

### 4. Start the development server
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 in your browser.

---

## 🧠 How It Works
/api/random-photos hits the Unsplash API and enriches images with tags

Image data is cached locally in localStorage (for faster shuffles)

Rate limit failures are tracked using a cookie timer (unsplashLastFailure) so users see consistent fallback behavior even across deployments

Fallback images come from https://picsum.photos

---

## 📁 Project Structure
````
app/
  api/               → Server functions (fetches Unsplash images)
  components/        → UI components (cards, modals, controls)
  globals.css        → Tailwind styles + theme tokens
  page.tsx           → Home page logic (querying, caching, rate-limit)
public/              → Static assets (icons, placeholders)
.env.local           → API keys (not committed)
````

---

## 📦 Deployment
You can deploy this on:

Vercel

Netlify

Just make sure to set the UNSPLASH_ACCESS_KEY as an environment variable in the platform.

---

## 🧾 License
MIT © [Your Name or Company]

---

## 🙌 Acknowledgments
Unsplash for the free photo API

Framer Motion for making animations easy

Picsum for placeholder fallbacks

---

Made with ❤️ by [Your Name]