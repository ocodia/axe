const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_DISPLAY = { "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb" };
const NOTE_ALIASES = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
const STORAGE_KEY = "fretboardTrainer:v1";
const FRET_OPTIONS = [12, 15, 17, 20, 22, 24];
const MARKER_FRETS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const DOUBLE_MARKERS = new Set([12, 24]);
const NOTE_COLORS = {
  C: "var(--note-c)",
  "C#": "var(--note-cs)",
  D: "var(--note-d)",
  "D#": "var(--note-ds)",
  E: "var(--note-e)",
  F: "var(--note-f)",
  "F#": "var(--note-fs)",
  G: "var(--note-g)",
  "G#": "var(--note-gs)",
  A: "var(--note-a)",
  "A#": "var(--note-as)",
  B: "var(--note-b)"
};

const SCALES = {
  "Major": [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  "Blues": [0, 3, 5, 6, 7, 10],
  "Dorian": [0, 2, 3, 5, 7, 9, 10],
  "Mixolydian": [0, 2, 4, 5, 7, 9, 10],
  "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11]
};

const CHORDS = {
  "Major": [0, 4, 7],
  "Minor": [0, 3, 7],
  "Dominant 7": [0, 4, 7, 10],
  "Major 7": [0, 4, 7, 11],
  "Minor 7": [0, 3, 7, 10],
  "Diminished": [0, 3, 6],
  "Sus2": [0, 2, 7],
  "Sus4": [0, 5, 7],
  "Power Chord": [0, 7]
};

const PRESET_TUNINGS = [
  { id: "guitar-standard", instrument: "Guitar", name: "Standard", strings: ["E", "A", "D", "G", "B", "E"], defaultFrets: 22 },
  { id: "guitar-drop-d", instrument: "Guitar", name: "Drop D", strings: ["D", "A", "D", "G", "B", "E"], defaultFrets: 22 },
  { id: "guitar-dadgad", instrument: "Guitar", name: "DADGAD", strings: ["D", "A", "D", "G", "A", "D"], defaultFrets: 22 },
  { id: "guitar-open-g", instrument: "Guitar", name: "Open G", strings: ["D", "G", "D", "G", "B", "D"], defaultFrets: 22 },
  { id: "guitar-open-d", instrument: "Guitar", name: "Open D", strings: ["D", "A", "D", "F#", "A", "D"], defaultFrets: 22 },
  { id: "guitar-half-step-down", instrument: "Guitar", name: "Half-step down", strings: ["Eb", "Ab", "Db", "Gb", "Bb", "Eb"], defaultFrets: 22 },
  { id: "bass-4-standard", instrument: "Bass", name: "4-string standard", strings: ["E", "A", "D", "G"], defaultFrets: 20 },
  { id: "bass-5-standard", instrument: "Bass", name: "5-string standard", strings: ["B", "E", "A", "D", "G"], defaultFrets: 20 },
  { id: "bass-drop-d", instrument: "Bass", name: "Drop D bass", strings: ["D", "A", "D", "G"], defaultFrets: 20 },
  { id: "ukulele-standard", instrument: "Ukulele", name: "Standard re-entrant", strings: ["G", "C", "E", "A"], defaultFrets: 15 },
  { id: "ukulele-low-g", instrument: "Ukulele", name: "Low G", strings: ["G", "C", "E", "A"], defaultFrets: 15 },
  { id: "ukulele-baritone", instrument: "Ukulele", name: "Baritone", strings: ["D", "G", "B", "E"], defaultFrets: 15 }
].map((tuning) => ({ ...tuning, strings: tuning.strings.map((note) => normalizeNote(note)) }));

function normalizeNote(value) {
  const raw = String(value || "").trim();
  if (!raw) return "C";
  const cleaned = raw.charAt(0).toUpperCase() + raw.slice(1).replace("♭", "b").replace("♯", "#");
  const normalized = NOTE_ALIASES[cleaned] || cleaned;
  return NOTES.includes(normalized) ? normalized : "C";
}

function displayNote(note, accidental = "sharps") {
  const normalized = normalizeNote(note);
  return accidental === "flats" ? FLAT_DISPLAY[normalized] || normalized : normalized;
}

function transpose(note, semitones) {
  const index = NOTES.indexOf(normalizeNote(note));
  return NOTES[(index + semitones + 1200) % NOTES.length];
}

function noteAt(openNote, fret) {
  return transpose(openNote, Number(fret));
}

function generateFretboardMatrix(strings, frets) {
  return strings.map((openNote, stringIndex) => ({
    stringIndex,
    openNote,
    frets: Array.from({ length: frets + 1 }, (_, fret) => ({
      stringIndex,
      fret,
      note: noteAt(openNote, fret)
    }))
  }));
}

function notesFromPattern(root, pattern) {
  return pattern.map((interval) => transpose(root, interval));
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function uid() {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function clampFrets(value) {
  return Math.max(1, Math.min(36, Number(value) || 1));
}

function labelForTuning(tuning) {
  return `${tuning.instrument}: ${tuning.name}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function groupedTunings(customTunings) {
  return [...PRESET_TUNINGS, ...customTunings];
}

const defaultState = {
  selectedTuningId: "guitar-standard",
  customTunings: [],
  frets: 22,
  theme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  accidental: "sharps",
  mode: "all",
  rootNote: "C",
  selectedScale: "Major",
  selectedChord: "Major",
  selectedNotes: ["C"],
  quiz: {
    active: false,
    questionNote: "C",
    selected: [],
    checked: false,
    revealed: false,
    scoreText: "",
    stats: { started: 0, checked: 0, correctSelections: 0, incorrectSelections: 0, missed: 0 }
  }
};

class Store extends EventTarget {
  constructor() {
    super();
    this.state = this.sanitize({ ...defaultState, ...loadState() });
    this.persist();
  }

  sanitize(state) {
    const customTunings = Array.isArray(state.customTunings) ? state.customTunings.map((tuning) => ({
      id: tuning.id || uid(),
      instrument: tuning.instrument || "Custom",
      name: tuning.name || "Untitled",
      strings: Array.isArray(tuning.strings) && tuning.strings.length ? tuning.strings.map(normalizeNote) : ["E", "A", "D", "G", "B", "E"]
    })) : [];
    const tuning = groupedTunings(customTunings).find((item) => item.id === state.selectedTuningId) || PRESET_TUNINGS[0];
    return {
      ...defaultState,
      ...state,
      selectedTuningId: tuning.id,
      customTunings,
      frets: clampFrets(state.frets || tuning.defaultFrets || 22),
      accidental: state.accidental === "flats" ? "flats" : "sharps",
      theme: state.theme === "dark" ? "dark" : "light",
      rootNote: normalizeNote(state.rootNote),
      selectedNotes: Array.isArray(state.selectedNotes) && state.selectedNotes.length ? [...new Set(state.selectedNotes.map(normalizeNote))] : ["C"],
      selectedScale: SCALES[state.selectedScale] ? state.selectedScale : "Major",
      selectedChord: CHORDS[state.selectedChord] ? state.selectedChord : "Major",
      quiz: {
        ...defaultState.quiz,
        ...(state.quiz || {}),
        questionNote: normalizeNote(state.quiz?.questionNote || "C"),
        selected: Array.isArray(state.quiz?.selected) ? state.quiz.selected : [],
        stats: { ...defaultState.quiz.stats, ...(state.quiz?.stats || {}) }
      }
    };
  }

  get tuning() {
    return groupedTunings(this.state.customTunings).find((tuning) => tuning.id === this.state.selectedTuningId) || PRESET_TUNINGS[0];
  }

  update(patch) {
    const next = typeof patch === "function" ? patch(this.state) : { ...this.state, ...patch };
    this.state = this.sanitize(next);
    this.persist();
    this.dispatchEvent(new CustomEvent("state-change", { detail: this.state }));
  }

  persist() {
    saveState(this.state);
    document.documentElement.dataset.theme = this.state.theme;
  }
}

const store = new Store();

class BaseElement extends HTMLElement {
  connectedCallback() {
    this.unsubscribe = () => store.removeEventListener("state-change", this.boundRender);
    this.boundRender = () => this.render();
    store.addEventListener("state-change", this.boundRender);
    this.render();
  }

  disconnectedCallback() {
    if (this.boundRender) store.removeEventListener("state-change", this.boundRender);
  }

  emit(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }
}

class FretboardApp extends BaseElement {
  connectedCallback() {
    this.settingsOpen = false;
    super.connectedCallback();
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    }
    this.addEventListener("app-update", (event) => store.update(event.detail));
    this.addEventListener("tuning-save", (event) => {
      const tuning = {
        id: uid(),
        instrument: "Custom",
        name: event.detail.name || "Custom tuning",
        strings: event.detail.strings.map(normalizeNote)
      };
      store.update((state) => ({
        ...state,
        customTunings: [...state.customTunings, tuning],
        selectedTuningId: tuning.id
      }));
    });
    this.addEventListener("tuning-delete", (event) => {
      store.update((state) => ({
        ...state,
        customTunings: state.customTunings.filter((tuning) => tuning.id !== event.detail.id),
        selectedTuningId: state.selectedTuningId === event.detail.id ? "guitar-standard" : state.selectedTuningId
      }));
    });
    this.addEventListener("quiz-action", (event) => handleQuizAction(event.detail.action, event.detail.position));
  }

  render() {
    const { theme, accidental } = store.state;
    this.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand">
            <h1>Fretboard Trainer</h1>
            <p>Notes, scales, chords, and position practice</p>
          </div>
          <div class="top-actions">
            <button type="button" data-action="settings" aria-haspopup="dialog">Settings</button>
          </div>
        </header>
        <main class="content">
          <section class="controls" aria-label="Fretboard controls">
            <mode-selector></mode-selector>
            <note-filter></note-filter>
            <scale-panel></scale-panel>
            <chord-panel></chord-panel>
            <quiz-panel></quiz-panel>
          </section>
          <section class="workspace" aria-label="Fretboard">
            <fretboard-view></fretboard-view>
          </section>
        </main>
        ${this.settingsOpen ? `
          <div class="modal-backdrop" data-action="close-settings">
            <section class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
              <div class="modal-header">
                <h2 id="settings-title">Settings</h2>
                <button type="button" data-action="close-settings" aria-label="Close settings">Close</button>
              </div>
              <div class="display-settings">
                <button type="button" aria-pressed="${accidental === "flats"}" data-action="accidental">${accidental === "flats" ? "Flats" : "Sharps"}</button>
                <button type="button" aria-pressed="${theme === "dark"}" data-action="theme">${theme === "dark" ? "Dark mode" : "Light mode"}</button>
              </div>
              <tuning-panel></tuning-panel>
            </section>
          </div>
        ` : ""}
      </div>
    `;
    this.querySelector("[data-action='settings']").addEventListener("click", () => {
      this.settingsOpen = true;
      this.render();
      this.querySelector(".settings-modal button")?.focus();
    });
    this.querySelectorAll("[data-action='close-settings']").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target !== element && element.classList.contains("modal-backdrop")) return;
        this.settingsOpen = false;
        this.render();
      });
    });
    this.querySelector("[data-action='theme']")?.addEventListener("click", () => this.emit("app-update", { theme: theme === "dark" ? "light" : "dark" }));
    this.querySelector("[data-action='accidental']")?.addEventListener("click", () => this.emit("app-update", { accidental: accidental === "flats" ? "sharps" : "flats" }));
  }
}

class TuningPanel extends BaseElement {
  render() {
    const state = store.state;
    const tuning = store.tuning;
    const allTunings = groupedTunings(state.customTunings);
    const canDelete = state.customTunings.some((item) => item.id === tuning.id);
    this.innerHTML = `
      <section class="panel">
        <h2>Tuning</h2>
        <div class="compact-grid">
          <label>Preset
            <select name="selectedTuningId">
              ${allTunings.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === tuning.id ? "selected" : ""}>${escapeHtml(labelForTuning(item))}</option>`).join("")}
            </select>
          </label>
          <label>Frets
            <select name="fretsPreset">
              ${FRET_OPTIONS.map((count) => `<option value="${count}" ${count === state.frets ? "selected" : ""}>${count}</option>`).join("")}
              <option value="custom" ${FRET_OPTIONS.includes(state.frets) ? "" : "selected"}>Custom</option>
            </select>
          </label>
          <label>Custom frets
            <input name="customFrets" type="number" min="1" max="36" value="${state.frets}">
          </label>
          <label>Custom name
            <input name="customName" type="text" maxlength="40" value="${escapeHtml(tuning.name)}">
          </label>
        </div>
        <div class="strings-editor">
          ${tuning.strings.map((note, index) => `
            <div class="string-row">
              <span>String ${index + 1}</span>
              <label class="sr-only" for="string-${index}">String ${index + 1} note</label>
              <input id="string-${index}" data-string-index="${index}" type="text" value="${escapeHtml(displayNote(note, state.accidental))}" maxlength="2">
              <button type="button" class="danger" data-remove-string="${index}" aria-label="Remove string ${index + 1}">Remove</button>
            </div>
          `).join("")}
        </div>
        <div class="button-row" style="margin-top: .75rem;">
          <button type="button" data-action="add-string">Add string</button>
          <button type="button" class="primary" data-action="save-custom">Save custom</button>
          <button type="button" class="danger" data-action="delete-custom" ${canDelete ? "" : "disabled"}>Delete custom</button>
        </div>
      </section>
    `;
    this.querySelector("[name='selectedTuningId']").addEventListener("change", (event) => {
      const next = allTunings.find((item) => item.id === event.target.value);
      this.emit("app-update", { selectedTuningId: event.target.value, frets: next?.defaultFrets || state.frets });
    });
    this.querySelector("[name='fretsPreset']").addEventListener("change", (event) => {
      if (event.target.value !== "custom") this.emit("app-update", { frets: clampFrets(event.target.value) });
    });
    this.querySelector("[name='customFrets']").addEventListener("change", (event) => this.emit("app-update", { frets: clampFrets(event.target.value) }));
    this.querySelectorAll("[data-string-index]").forEach((input) => {
      input.addEventListener("change", (event) => {
        const strings = [...tuning.strings];
        strings[Number(event.target.dataset.stringIndex)] = normalizeNote(event.target.value);
        this.saveEditedTuning(strings);
      });
    });
    this.querySelector("[data-action='add-string']").addEventListener("click", () => this.saveEditedTuning([...tuning.strings, "C"]));
    this.querySelectorAll("[data-remove-string]").forEach((button) => {
      button.addEventListener("click", () => {
        if (tuning.strings.length <= 1) return;
        this.saveEditedTuning(tuning.strings.filter((_, index) => index !== Number(button.dataset.removeString)));
      });
    });
    this.querySelector("[data-action='save-custom']").addEventListener("click", () => {
      this.emit("tuning-save", { name: this.querySelector("[name='customName']").value.trim() || "Custom tuning", strings: tuning.strings });
    });
    this.querySelector("[data-action='delete-custom']").addEventListener("click", () => this.emit("tuning-delete", { id: tuning.id }));
  }

  saveEditedTuning(strings) {
    const tuning = store.tuning;
    if (store.state.customTunings.some((item) => item.id === tuning.id)) {
      store.update((state) => ({
        ...state,
        customTunings: state.customTunings.map((item) => item.id === tuning.id ? { ...item, strings } : item)
      }));
    } else {
      const custom = { id: uid(), instrument: "Custom", name: `${tuning.name} edit`, strings };
      store.update((state) => ({ ...state, customTunings: [...state.customTunings, custom], selectedTuningId: custom.id }));
    }
  }
}

class ModeSelector extends BaseElement {
  render() {
    const modes = [
      ["all", "All"],
      ["notes", "Notes"],
      ["scales", "Scales"],
      ["chords", "Chords"],
      ["quiz", "Quiz"]
    ];
    this.innerHTML = `
      <section class="panel">
        <h2>Mode</h2>
        <div class="segmented" role="group" aria-label="Display mode">
          ${modes.map(([value, label]) => `<button type="button" data-mode="${value}" aria-pressed="${store.state.mode === value}">${label}</button>`).join("")}
        </div>
      </section>
    `;
    this.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => this.emit("app-update", { mode: button.dataset.mode }));
    });
  }
}

class NoteFilter extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "notes") {
      this.innerHTML = "";
      return;
    }
    this.innerHTML = `
      <section class="panel">
        <h2>Specific Notes</h2>
        <div class="note-grid">
          ${NOTES.map((note) => `<button type="button" class="note-chip" style="--note-color: ${NOTE_COLORS[note]}" data-note="${note}" aria-pressed="${state.selectedNotes.includes(note)}">${escapeHtml(displayNote(note, state.accidental))}</button>`).join("")}
        </div>
      </section>
    `;
    this.querySelectorAll("[data-note]").forEach((button) => {
      button.addEventListener("click", () => {
        const note = button.dataset.note;
        const selected = new Set(store.state.selectedNotes);
        selected.has(note) ? selected.delete(note) : selected.add(note);
        this.emit("app-update", { selectedNotes: selected.size ? [...selected] : [note] });
      });
    });
  }
}

class ScalePanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "scales") {
      this.innerHTML = "";
      return;
    }
    this.innerHTML = `
      <section class="panel">
        <h2>Scale</h2>
        <div class="compact-grid">
          <label>Root
            <select name="root">${NOTES.map((note) => `<option value="${note}" ${note === state.rootNote ? "selected" : ""}>${escapeHtml(displayNote(note, state.accidental))}</option>`).join("")}</select>
          </label>
          <label>Type
            <select name="scale">${Object.keys(SCALES).map((name) => `<option value="${escapeHtml(name)}" ${name === state.selectedScale ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}</select>
          </label>
        </div>
      </section>
    `;
    this.querySelector("[name='root']").addEventListener("change", (event) => this.emit("app-update", { rootNote: event.target.value }));
    this.querySelector("[name='scale']").addEventListener("change", (event) => this.emit("app-update", { selectedScale: event.target.value }));
  }
}

class ChordPanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "chords") {
      this.innerHTML = "";
      return;
    }
    this.innerHTML = `
      <section class="panel">
        <h2>Chord</h2>
        <div class="compact-grid">
          <label>Root
            <select name="root">${NOTES.map((note) => `<option value="${note}" ${note === state.rootNote ? "selected" : ""}>${escapeHtml(displayNote(note, state.accidental))}</option>`).join("")}</select>
          </label>
          <label>Type
            <select name="chord">${Object.keys(CHORDS).map((name) => `<option value="${escapeHtml(name)}" ${name === state.selectedChord ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}</select>
          </label>
        </div>
      </section>
    `;
    this.querySelector("[name='root']").addEventListener("change", (event) => this.emit("app-update", { rootNote: event.target.value }));
    this.querySelector("[name='chord']").addEventListener("change", (event) => this.emit("app-update", { selectedChord: event.target.value }));
  }
}

class QuizPanel extends BaseElement {
  render() {
    const { mode, accidental, quiz } = store.state;
    if (mode !== "quiz") {
      this.innerHTML = "";
      return;
    }
    const stats = quiz.stats;
    this.innerHTML = `
      <section class="panel">
        <h2>Quiz</h2>
        <div class="quiz-status" aria-live="polite">
          <strong>${quiz.active ? `Find all ${escapeHtml(displayNote(quiz.questionNote, accidental))} notes` : "Start a note-finding quiz"}</strong>
          <span class="score">${escapeHtml(quiz.scoreText || "Tap positions to reveal notes, then check your answer.")}</span>
          <div class="stat-grid">
            <span class="stat"><b>${stats.started}</b>Started</span>
            <span class="stat"><b>${stats.checked}</b>Checked</span>
            <span class="stat"><b>${stats.correctSelections}</b>Correct</span>
          </div>
        </div>
        <div class="button-row" style="margin-top: .75rem;">
          <button type="button" class="primary" data-quiz="start">Start quiz</button>
          <button type="button" data-quiz="check" ${quiz.active ? "" : "disabled"}>Check answer</button>
          <button type="button" data-quiz="show" ${quiz.active ? "" : "disabled"}>Show answer</button>
          <button type="button" data-quiz="next" ${quiz.active ? "" : "disabled"}>Next question</button>
        </div>
      </section>
    `;
    this.querySelectorAll("[data-quiz]").forEach((button) => {
      button.addEventListener("click", () => this.emit("quiz-action", { action: button.dataset.quiz }));
    });
  }
}

class FretboardView extends BaseElement {
  render() {
    const state = store.state;
    const tuning = store.tuning;
    const rows = generateFretboardMatrix(tuning.strings, state.frets).slice().reverse();
    const visible = getVisibleNotes(state);
    const subtitle = getModeLabel(state);
    const frets = Array.from({ length: state.frets }, (_, index) => index + 1);
    this.innerHTML = `
      <div class="fretboard-card">
        <div class="fretboard-toolbar">
          <div>
            <strong>${escapeHtml(labelForTuning(tuning))}</strong>
            <span>${tuning.strings.length} strings, ${state.frets} frets</span>
          </div>
          <span>${escapeHtml(subtitle)}</span>
        </div>
        <div class="fretboard-scroll" tabindex="0" aria-label="Scrollable fretboard">
          <div class="fretboard" style="--fret-count: ${state.frets}; --fret-columns: ${state.frets}; --string-count: ${tuning.strings.length};">
            <span></span>
            ${frets.map((fret) => `<div class="fret-number">${fret}</div>`).join("")}
            ${rows.map((row) => `
              <div class="string-name">${escapeHtml(displayNote(row.openNote, state.accidental))}</div>
              ${row.frets.slice(1).map((pos) => this.renderPosition(pos, visible, state)).join("")}
            `).join("")}
            <span></span>
            ${frets.map((fret) => `<div class="marker-cell ${MARKER_FRETS.has(fret) ? DOUBLE_MARKERS.has(fret) ? "double" : "single" : ""}" aria-hidden="true"></div>`).join("")}
          </div>
        </div>
      </div>
    `;
    this.querySelectorAll("[data-position]").forEach((button) => {
      button.addEventListener("click", () => this.emit("quiz-action", { action: "select", position: button.dataset.position }));
    });
  }

  renderPosition(pos, visible, state) {
    const key = `${pos.stringIndex}:${pos.fret}`;
    const quiz = state.mode === "quiz" ? state.quiz : null;
    const isVisible = state.mode === "all" || visible.has(pos.note) || state.mode === "quiz";
    const isRoot = (state.mode === "scales" || state.mode === "chords") && pos.note === state.rootNote;
    const selected = quiz?.selected.includes(key);
    const correctAnswer = quiz && pos.note === quiz.questionNote;
    const checked = quiz?.checked || quiz?.revealed;
    const classes = [
      !isVisible ? "empty" : "",
      pos.fret === 0 ? "open" : ""
    ].filter(Boolean).join(" ");
    const buttonClasses = [
      state.mode === "quiz" && !checked && !selected ? "hidden-note" : "",
      isRoot ? "root" : "",
      selected ? "selected" : "",
      checked && selected && correctAnswer ? "correct" : "",
      checked && selected && !correctAnswer ? "incorrect" : "",
      checked && !selected && correctAnswer ? "missed" : ""
    ].filter(Boolean).join(" ");
    const label = state.mode === "quiz" && !checked && !selected ? "" : displayNote(pos.note, state.accidental);
    return `
      <div class="position ${classes}" style="--note-color: ${NOTE_COLORS[pos.note]}">
        <button type="button" class="${buttonClasses}" data-position="${key}" aria-label="String ${pos.stringIndex + 1}, fret ${pos.fret}, ${escapeHtml(displayNote(pos.note, state.accidental))}" ${state.mode === "quiz" && quiz?.active ? "" : state.mode === "quiz" ? "disabled" : ""}>${escapeHtml(label)}</button>
      </div>
    `;
  }
}

function getVisibleNotes(state) {
  if (state.mode === "notes") return new Set(state.selectedNotes);
  if (state.mode === "scales") return new Set(notesFromPattern(state.rootNote, SCALES[state.selectedScale]));
  if (state.mode === "chords") return new Set(notesFromPattern(state.rootNote, CHORDS[state.selectedChord]));
  return new Set(NOTES);
}

function getModeLabel(state) {
  if (state.mode === "notes") return `Showing ${state.selectedNotes.map((note) => displayNote(note, state.accidental)).join(", ")}`;
  if (state.mode === "scales") return `${displayNote(state.rootNote, state.accidental)} ${state.selectedScale}`;
  if (state.mode === "chords") return `${displayNote(state.rootNote, state.accidental)} ${state.selectedChord}`;
  if (state.mode === "quiz") return state.quiz.active ? `Find ${displayNote(state.quiz.questionNote, state.accidental)}` : "Quiz ready";
  return "All notes";
}

function handleQuizAction(action, position) {
  const state = store.state;
  if (action === "start" || action === "next") {
    const questionNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    store.update({
      mode: "quiz",
      quiz: {
        ...state.quiz,
        active: true,
        questionNote,
        selected: [],
        checked: false,
        revealed: false,
        scoreText: "",
        stats: { ...state.quiz.stats, started: state.quiz.stats.started + 1 }
      }
    });
    return;
  }
  if (!state.quiz.active) return;
  if (action === "select" && position) {
    if (state.quiz.checked || state.quiz.revealed) return;
    const selected = new Set(state.quiz.selected);
    selected.has(position) ? selected.delete(position) : selected.add(position);
    store.update({ quiz: { ...state.quiz, selected: [...selected] } });
    return;
  }
  const answerKeys = getAnswerKeys(state);
  const selected = new Set(state.quiz.selected);
  const correct = [...selected].filter((key) => answerKeys.has(key)).length;
  const incorrect = [...selected].filter((key) => !answerKeys.has(key)).length;
  const missed = [...answerKeys].filter((key) => !selected.has(key)).length;
  if (action === "check") {
    store.update({
      quiz: {
        ...state.quiz,
        checked: true,
        scoreText: `${correct}/${answerKeys.size} correct, ${incorrect} incorrect, ${missed} missed`,
        stats: {
          ...state.quiz.stats,
          checked: state.quiz.stats.checked + 1,
          correctSelections: state.quiz.stats.correctSelections + correct,
          incorrectSelections: state.quiz.stats.incorrectSelections + incorrect,
          missed: state.quiz.stats.missed + missed
        }
      }
    });
  }
  if (action === "show") {
    store.update({ quiz: { ...state.quiz, checked: true, revealed: true, scoreText: `${answerKeys.size} ${displayNote(state.quiz.questionNote, state.accidental)} positions shown` } });
  }
}

function getAnswerKeys(state) {
  const matrix = generateFretboardMatrix(store.tuning.strings, state.frets);
  const keys = new Set();
  matrix.forEach((row) => row.frets.forEach((pos) => {
    if (pos.fret > 0 && pos.note === state.quiz.questionNote) keys.add(`${pos.stringIndex}:${pos.fret}`);
  }));
  return keys;
}

customElements.define("fretboard-app", FretboardApp);
customElements.define("fretboard-view", FretboardView);
customElements.define("tuning-panel", TuningPanel);
customElements.define("mode-selector", ModeSelector);
customElements.define("note-filter", NoteFilter);
customElements.define("scale-panel", ScalePanel);
customElements.define("chord-panel", ChordPanel);
customElements.define("quiz-panel", QuizPanel);
