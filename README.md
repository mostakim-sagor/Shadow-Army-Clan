# SHADOW - ARMY !

## Project overview

The official clan website for **SHADOW - ARMY !**, a Clash of Clans clan. It's a single, premium, 3D-styled landing page that shows the clan emblem and tag, and connects the community to Telegram, Messenger, and Discord.

Clan tag: **#2CG0GJCCC**

---

## Features

- Premium, dark, 3D-inspired UI — glassmorphism, layered depth, floating emblem, pointer-driven tilt, ambient particles
- Fully responsive, from 360px phones up to large desktop monitors
- One-tap clan tag copy with an animated confirmation toast
- Telegram, Messenger, and Discord buttons that open a 3D profile-preview modal before linking out
- All clan info (name, tag, social URLs) lives in one file — `information.js`
- All UI/behavior toggles (particles, parallax, animation timing) live in one file — `src/settings.js`
- Keyboard-accessible modal (ESC to close, click-outside to close, focus is returned on close)
- Respects `prefers-reduced-motion`
- **Zero dependencies** — runs with plain Node.js, no `npm install`, no Express, no build step

---

## Project structure

```
SHADOW-ARMY/
│
├── index.js            # Dependency-free Node.js static server
├── information.js      # Single source of truth for clan info & links
├── vercel.json          # Vercel routing config
├── netlify.toml         # Netlify routing config
├── README.md
│
└── src/
    ├── index.html       # Page structure + interactive behavior
    ├── style.css        # All styling, animation, responsive rules
    ├── settings.js       # UI/behavior configuration
    └── shadow.png        # Clan logo / emblem
```

---

## Installation & running locally

No `npm install` is required — the project has **no external dependencies**, only Node.js's built-in modules. Simply run:

```bash
node index.js
```

Then open:

```
http://localhost:3000
```

The port can be overridden with the `PORT` environment variable, e.g. `PORT=8080 node index.js`.

---

## Updating clan information

Everything shown on the site — clan name, clan tag, Telegram/Messenger/Discord links — comes from a single file:

```js
// information.js
module.exports = {
  CLAN_NAME: "SHADOW - ARMY !",
  CLAN_TAG: "#2CG0GJCCC",

  MESSENGER: "https://m.me/j/Q6xQOD7inbrQvJz1/?send_source=gc%3Acopy_invite_link_t",
  TELEGRAM: "https://t.me/SHADOW_ARMY_COC",
  DISCORD: "https://discord.gg/jbZRG6MtWN"
};
```

Edit only this file — the header, hero, clan-tag pill, footer copyright, and the three social profile modals all update automatically. Nothing else in the project needs to change.

## Updating UI behavior

Animation and interaction toggles live in `src/settings.js` (particles on/off, parallax tilt strength, how long the "copied" toast stays visible, whether clicking outside the modal closes it, etc.). Change a value there instead of editing `index.html` or `style.css` directly.

## About the logo (`src/shadow.png`)

The repository ships with a placeholder emblem in `src/shadow.png` so the site works out of the box. **Replace this file with your real clan crest** — keep the filename exactly `shadow.png` in the `src/` folder, ideally a square image (512×512px or larger works well) with a transparent or dark background, and everything else (header logo, floating hero emblem, favicon, Open Graph image) will pick it up automatically.

---

## Vercel deployment guide

This project is a static site with no build step, which Vercel supports directly (the included `vercel.json` maps clean URLs like `/style.css` to their real files under `src/`).

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New → Project** and import your GitHub repository.
4. In the project configuration screen:
   - **Framework Preset:** "Other" (no framework detected — that's expected)
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (the repository root)
5. Click **Deploy**.
6. Once the build finishes, open the generated `*.vercel.app` domain to view the live site.
7. **To update the site:** commit and push changes to your GitHub repository — Vercel automatically redeploys on every push to the connected branch.

## Netlify deployment guide

The included `netlify.toml` sets the publish directory to the project root and redirects the site's short asset URLs (`/`, `/style.css`, `/settings.js`, `/shadow.png`) to their real files under `src/`. `information.js` needs no redirect since it already lives at the root.

1. Push this project to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) and sign in.
3. Click **Add new site → Import an existing project**, then choose your GitHub repository.
4. Build settings are already defined in `netlify.toml`, so you can leave the **Build command** field empty and the **Publish directory** as detected.
5. Click **Deploy site**.
6. Once deployment finishes, open the generated `*.netlify.app` domain to view the live site.
7. **To update the site:** commit and push changes to your GitHub repository — Netlify automatically redeploys on every push to the connected branch.

---

## Notes

- No API keys, database credentials, passwords, or private tokens are used anywhere in this project.
- The Telegram, Messenger, and Discord URLs in `information.js` are public invite links and are safe to keep in source control.
- The frontend is static. Vercel and Netlify serve the files directly and do not require a persistent Node.js server or a build step. `index.js` exists for local development and optional Node-based hosting.
