# CodeCatalyst — Static Site (Phase 1)

A sleek, dark, neon-glass site to showcase CodeCatalyst, our projects, achievements, and team.

## Quick start

- Open `index.html` directly in your browser. No build step required.
- Optional: serve locally for better caching and security features. On Windows PowerShell:

```powershell
npx serve . --single --listen 5173
```

Then open `http://localhost:5173`.

## Customize content

- Update hero subtitle and badges in `index.html`.
- Replace placeholder projects, achievements, and team entries.
- Update contact email in the form action and the "Open email" link.

## Theme and visuals

- Neon gradient accent colors are defined in `styles.css` under CSS variables.
- Toggle light/dark using the button in the header; preference is stored in `localStorage`.
- Background particles, scroll reveal, and smooth nav are in `script.js`.

## Assets

- Logo lives in `assets/logo.svg`. Swap with your own if desired.

## Deploy

- Host on any static hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Just deploy this folder.

---

Phase 2 ideas: project detail pages, blog/updates, CMS integration, animations per section, and CI for links/lint.


