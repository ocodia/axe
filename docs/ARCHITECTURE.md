# Axe architecture

Axe is a no-build, local-first PWA. The browser loads native ES modules directly from the static server; there is no package manager, bundler, generated code, or server-side runtime.

## Boundaries

- `app.js` is the composition root. It wires the store, shared helpers, Web Components, and feature registry together.
- `feature-registry.js` is the capability contract. Mode navigation and control visibility must derive from it rather than maintaining parallel lists.
- `storage.js` owns the `axe:v1` persistence boundary and must tolerate unavailable or malformed storage.
- `tuner-service.js` contains microphone/audio and pitch-detection code only. It must remain usable without rendering code.
- Feature logic should be kept pure where possible. New calculations belong in a small module with exported functions; UI components should translate state into DOM and emit intent events.
- `styles.css` is shared presentation. Feature-specific selectors should be namespaced by the component or feature class.

## Adding a feature

1. Add one descriptor to `FEATURE_REGISTRY` with a stable `id`, user-facing `label`, and either `controlTag` or `workspaceTag`.
2. Add the feature's state defaults and sanitizer to the store boundary.
3. Implement its component and emit semantic events (`app-update`, or a feature-specific action event for non-trivial workflows).
4. Register the custom element near the other definitions in `app.js`.
5. Add a browser smoke test and update the capability list in `README.md`.
6. Add every new static module to `service-worker.js` and bump `CACHE_NAME`.

Do not add a second mode list, mutate state directly from a component, or persist unsanitized user input.

## State and persistence

`Store` is the only application state writer. Components emit intent; the store sanitizes, persists, and broadcasts the resulting state. New persisted fields need defaults, validation, and a migration-compatible fallback. Removed fields should be ignored rather than breaking older saved state.

## Verification

Run a static server from the repository root, open `tests/index.html`, and run the browser smoke suite. The suite uses native modules and a small local assertion harness. Manual acceptance should include the initial view, every registered mode, settings, custom tuning, quiz, identifier, responsive layout, offline reload, and tuner UI without granting microphone access.
