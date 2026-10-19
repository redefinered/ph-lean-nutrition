# 7-day lean recomposition meal plan

A practical weekly meal plan for a 39-year-old, 5'5" (165 cm), 51–53 kg Filipino male with a small appetite. The goal is lean, defined, athletic muscle — not a bulk and not an aggressive cut.

Protein target: **80–95 g/day**. Calories are an estimate near maintenance (**about 1,550–1,750 kcal**), not a number you must force. Breakfast stays small. Rice stays at about 1 cup cooked for lunch and dinner.

No supplements or protein shakes are required.

## Run locally

```bash
npm install
npm run dev -- --port 43147
```

Open [http://127.0.0.1:43147](http://127.0.0.1:43147).

## Install it on your phone

The site is a PWA, so it installs to a home screen and works without a connection.

- **iPhone / iPad:** open the site in Safari, tap the Share button, then **Add to Home Screen**.
- **Android / desktop Chrome:** use the **Install** button in the banner, or the install icon in the address bar.

Once installed it opens full screen with no browser chrome, and the last version you loaded stays readable offline.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.

## Icons

App icons are generated from the vector mark in `scripts/generate-icons.mjs`. Edit the artwork there and re-run:

```bash
npm run icons
```

That rewrites the manifest icons in `public/icons/`, plus `favicon.ico`, `icon.png`, `icon.svg`, and `apple-icon.png` in `src/app/`.

## GitHub Pages

The site is a static export served from the `gh-pages` branch at
[redefinered.github.io/ph-lean-nutrition](https://redefinered.github.io/ph-lean-nutrition/).
`BASE_PATH` tells Next.js which subdirectory it will be served from; the manifest and the
service worker build their URLs from it too, so it has to be set for a subdirectory deploy.

```bash
BASE_PATH=/ph-lean-nutrition npm run build
```

Then publish `out/` to `gh-pages` (keep the `.nojekyll` file, or Pages will drop the `_next` directory).
