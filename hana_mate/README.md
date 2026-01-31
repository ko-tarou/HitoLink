# 花メイト (Hana Mate) — Landing Page

A high-end, animated landing page for **Hana Mate**, a flower shop in Toyama, Japan. Built with Next.js (App Router), Tailwind CSS, Framer Motion, and Lucide React.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (scroll reveals, parallax, hover effects)
- **Icons:** Lucide React
- **Font:** Noto Sans JP (Google Fonts)

## Design

- **Aesthetic:** Sophisticated, organic, modern Japanese (和モダン), ethereal
- **Colors:** Sage green, cream, earthy brown, charcoal
- **UI:** Glassmorphism cards, large typography, smooth scrolling, generous whitespace

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/page.tsx` — Main landing page with parallax divider
- `src/app/layout.tsx` — Root layout (Noto Sans JP, metadata)
- `src/app/globals.css` — Theme (colors, glass utilities)
- `src/components/Hero.tsx` — Hero with floating elements and CTAs
- `src/components/About.tsx` — Company info (Toyama Television Enterprise)
- `src/components/Services.tsx` — Services grid (bouquets, bridal, preserved, orchids, garden)
- `src/components/ShopInfo.tsx` — Location, hours, contact
- `src/components/Footer.tsx` — Links, affiliations, copyright

## Build

```bash
npm run build
npm start
```

---

© Hana Mate / Toyama Television Enterprise Inc.
