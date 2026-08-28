# Our Space 🌌

A polished, personal website that tells the story of a relationship, built to feel like a private digital world.

## Features
- **Config-Driven**: Every name, date, photo, memory, and message is powered by `src/data/siteConfig.js`. You never have to touch HTML or CSS to update the content.
- **Privacy-First**: No external trackers, no databases, all static.
- **Accessible & Responsive**: Fully responsive from mobile to 4k, accessible semantic HTML, keyboard navigable.
- **Hidden Secrets**: Konami code interactions, hidden canvas elements, and click-counters.

## Editing Content
To change text, photos, or audio, just edit `src/data/siteConfig.js`. 
- Photos go in `assets/images/`
- Audio goes in `assets/audio/`

## Local Development
Since this is a static site (vanilla HTML/CSS/JS) with ES modules, you must serve it over HTTP (opening `index.html` directly in the browser with `file://` will block the JS modules).

Using Node/npm:
```bash
npx serve .
```

## Deployment
This project is built to deploy instantly to **GitHub Pages** with zero configuration.
1. Push to GitHub
2. Go to Repo Settings > Pages
3. Select "Deploy from a branch" and pick your `main` branch.
4. Your site will be live!
