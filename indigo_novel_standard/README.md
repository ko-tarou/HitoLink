# INDIGO Novel STANDARD

A high-end, stylish landing page for the select shop "INDIGO Novel STANDARD" in Toyama, Japan.

> **"New value become the STANDARD"** — A lifestyle proposal shop not bound by categories.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (transitions, parallax, scroll triggers)
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Fonts:** Inter (sans-serif) + Cormorant Garamond (serif)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── globals.css   # Tailwind + custom theme
│   ├── layout.tsx    # Root layout with fonts
│   └── page.tsx      # Landing page
├── components/
│   ├── Header.tsx    # Fixed nav with scroll effects
│   ├── Hero.tsx      # Full-screen hero with blur-in logo
│   ├── About.tsx     # Mask-reveal text, asymmetrical grid
│   ├── BrandMarquee.tsx  # Infinite scroll brands
│   ├── Collection.tsx    # Bento grid categories
│   └── Footer.tsx    # Access info + magnetic CTA
└── providers/
    └── LenisProvider.tsx # Smooth scroll
```

## Customization

- **Hero background:** Replace the SVG texture in `Hero.tsx` with a video or image for road trip/denim visuals
- **Brand palette:** Edit CSS variables in `globals.css` (`--indigo-deep`, `--wood`, etc.)
- **Online Store link:** Update the `href` in `Footer.tsx` CTA button

## Performance

Optimized for Lighthouse score > 90:

- Static generation where possible
- Font optimization via `next/font`
- Minimal client-side JavaScript
