# Testing without a build

Start any static server in the repository root, for example:

```text
python -m http.server 8765
```

Open `http://127.0.0.1:8765/tests/`. The page runs deterministic module tests and a small app-shell smoke check. It intentionally has no external dependencies.

When adding a feature, test its pure calculations first, then its visible mode registration and one representative interaction. Keep microphone permission out of automated tests; the tuner UI and pure pitch helpers are testable without a device.
