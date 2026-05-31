# Axe - Fretboard Trainer

A no-build Progressive Web App for learning fretboard notes, scales, chords, and positions on guitar, bass, ukulele, and custom stringed instruments.

The app is local-first and runs entirely in the browser using plain HTML, modern JavaScript, Web Components, CSS, and `localStorage`.

## Features

- Guitar, bass, ukulele, and custom tuning support
- Editable string tunings
- Saved custom tunings
- Configurable fret count from 1 to 36
- Sharp or flat note display
- Light and dark themes
- Full fretboard note view
- Specific-note highlighting
- Scale highlighting with root emphasis
- Chord-tone highlighting with root emphasis
- Interactive circle of fifths with key signatures, relative minors, diatonic chords, and related-key context
- Simple quiz mode with immediate note reveal and scoring
- Offline support through a service worker
- Installable PWA manifest

## Files

- `index.html` - app shell
- `styles.css` - responsive UI and theme styling
- `app.js` - state, utilities, Web Components, quiz logic
- `manifest.webmanifest` - PWA metadata
- `service-worker.js` - offline app-shell cache

## Run Locally

Serve the folder with any static file server. For example:

```bash
python -m http.server
```

Then open:

```text
http://localhost:8000
```

The app can also be opened directly from `index.html`, but PWA service worker features require serving over `http://localhost` or HTTPS.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository settings.
3. Go to **Pages**.
4. Select the branch and folder containing `index.html`.
5. Save the Pages settings.

No build step, package install, CDN, or server-side code is required.

## Data Storage

User preferences, custom tunings, and quiz stats are stored in browser `localStorage` under:

```text
axe:v1
```

Clearing site data in the browser will reset saved settings.
