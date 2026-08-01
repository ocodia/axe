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
- Triad practice mode with full-neck string-set focus and interval labels
- Arpeggio practice mode for triads and seventh chords with focused fret ranges
- Chord shape identifier for clicked fretboard shapes, open strings, and muted strings
- Position mode for CAGED shapes, pentatonic boxes, scale positions, and focused fret ranges
- Interval labels for position-focused fretboard learning
- Interactive circle of fifths with key signatures, relative minors, diatonic chords, and related-key context
- Chord progression helper with Roman numerals, chord functions, mood filters, and practice-scale suggestions
- Simple quiz mode with immediate note reveal and scoring
- Microphone tuner mode with automatic and manual string tuning
- Karplus–Strong playback for notes, open strings, guitar chords, arpeggios, and strums
- Offline support through a service worker
- Installable PWA manifest

## Files

- `index.html` - app shell
- `styles.css` - responsive UI and theme styling
- `app.js` - state, utilities, Web Components, quiz logic
- `feature-registry.js` - authoritative capability and mode registry
- `storage.js` - safe local-storage boundary and id generation
- `tuner-service.js` - microphone session and YIN pitch detection
- `docs/ARCHITECTURE.md` - extension and state architecture for agents
- `docs/TESTING.md` - no-build browser testing workflow
- `tests/` - dependency-free browser smoke tests
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

User preferences, custom tunings, chord identifier shapes, and quiz stats are stored in browser `localStorage` under:

```text
axe:v1
```

Clearing site data in the browser will reset saved settings.

## Extending Axe

Feature navigation and control rendering are driven by `feature-registry.js`. New capabilities must register there, own their state validation, emit intent events to the store, add browser smoke coverage, and update the service-worker app shell. See `docs/ARCHITECTURE.md` for the complete workflow.

## Position Learning

Use Positions mode to choose a root note, CAGED shape, pentatonic box, or major/natural minor scale position. The fretboard can focus on the active fret range, emphasise roots, and switch note labels to interval labels so you can practise playable chord tones and scale shapes rather than only full-neck note sets.

## Triads And Arpeggios

Use Triads mode to choose a root, quality, and string set across the full neck. Use Arpeggios mode to choose a root, quality, inversion, string set, and fret range. Both modes can switch note labels to interval labels such as R, b3, 3, 5, b7, and 7.
