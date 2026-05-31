const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_DISPLAY = { "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb" };
const NOTE_ALIASES = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#", "E#": "F", "B#": "C", Cb: "B", Fb: "E" };
const STORAGE_KEY = "axe:v1";
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
  B: "var(--note-b)",
};

const SCALES = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  Blues: [0, 3, 5, 6, 7, 10],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
};

const CIRCLE_KEYS = [
  { major: "C", minor: "Am", accidentals: 0, type: "natural", scale: ["C", "D", "E", "F", "G", "A", "B"] },
  { major: "G", minor: "Em", accidentals: 1, type: "sharps", scale: ["G", "A", "B", "C", "D", "E", "F#"] },
  { major: "D", minor: "Bm", accidentals: 2, type: "sharps", scale: ["D", "E", "F#", "G", "A", "B", "C#"] },
  { major: "A", minor: "F#m", accidentals: 3, type: "sharps", scale: ["A", "B", "C#", "D", "E", "F#", "G#"] },
  { major: "E", minor: "C#m", accidentals: 4, type: "sharps", scale: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
  { major: "B", minor: "G#m", accidentals: 5, type: "sharps", scale: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
  { major: "F#", minor: "D#m/Ebm", accidentals: 6, type: "sharps", scale: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
  { major: "Db", minor: "Bbm", accidentals: 5, type: "flats", scale: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
  { major: "Ab", minor: "Fm", accidentals: 4, type: "flats", scale: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
  { major: "Eb", minor: "Cm", accidentals: 3, type: "flats", scale: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
  { major: "Bb", minor: "Gm", accidentals: 2, type: "flats", scale: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
  { major: "F", minor: "Dm", accidentals: 1, type: "flats", scale: ["F", "G", "A", "Bb", "C", "D", "E"] },
];
const CIRCLE_MAJOR_KEYS = CIRCLE_KEYS.map((key) => key.major);
const ROMAN_DEGREES = ["I", "ii", "iii", "IV", "V", "vi", "vii\u00b0"];
const DIATONIC_SUFFIXES = ["", "m", "m", "", "", "m", "dim"];
const BORROWED_INTERVALS = [
  ["iv", 5, "m"],
  ["bIII", 3, ""],
  ["bVI", 8, ""],
  ["bVII", 10, ""],
];
const CHORD_HELPER_STYLES = ["Pop", "Rock", "Blues", "Folk", "Funk", "Jazz", "Ambient", "Dark", "Uplifting", "Melancholic"];
const CHORD_HELPER_COMPLEXITIES = ["Simple", "Medium", "Advanced"];
const CHORD_FUNCTIONS = {
  tonic: "Tonic: feels like home.",
  predominant: "Predominant: creates movement away from home.",
  dominant: "Dominant: creates tension and wants to resolve.",
  relative: "Relative minor: shares notes with the major key and adds emotional contrast.",
};
const CHORD_FUNCTION_BY_ROMAN = {
  I: "tonic",
  i: "tonic",
  iii: "tonic",
  III: "tonic",
  vi: "relative",
  VI: "predominant",
  ii: "predominant",
  "ii\u00b0": "predominant",
  IV: "predominant",
  iv: "predominant",
  V: "dominant",
  v: "dominant",
  V7: "dominant",
  VII: "dominant",
  "vii\u00b0": "dominant",
};
const CHORD_PROGRESSIONS = [
  { numerals: ["I", "V", "vi", "IV"], tonalities: ["major"], styles: ["Pop", "Uplifting", "Folk"], complexity: "Simple", description: "Very common pop movement. Strong, familiar, emotional but stable.", scale: "major / relative minor pentatonic", genres: ["pop", "country", "worship"] },
  { numerals: ["I", "IV", "V"], tonalities: ["major"], styles: ["Rock", "Blues", "Folk", "Uplifting"], complexity: "Simple", description: "Direct and grounded. It moves away from home, builds tension, then resolves clearly.", scale: "major pentatonic / major blues", genres: ["rock", "blues", "folk"] },
  { numerals: ["I", "vi", "IV", "V"], tonalities: ["major"], styles: ["Pop", "Folk", "Melancholic"], complexity: "Simple", description: "Classic warm progression with a nostalgic turn through the relative minor.", scale: "major / relative minor pentatonic", genres: ["doo-wop", "pop", "folk"] },
  { numerals: ["vi", "IV", "I", "V"], tonalities: ["major"], styles: ["Pop", "Rock", "Melancholic"], complexity: "Simple", description: "Starts on emotional contrast, then opens into a broad major-key resolution.", scale: "major / relative minor pentatonic", genres: ["pop rock", "indie"] },
  { numerals: ["I", "V", "IV", "I"], tonalities: ["major"], styles: ["Rock", "Folk"], complexity: "Simple", description: "Plain-spoken and sturdy. The IV before I gives a relaxed, rootsy landing.", scale: "major pentatonic", genres: ["rock", "folk rock"] },
  { numerals: ["I", "iii", "IV", "V"], tonalities: ["major"], styles: ["Melancholic", "Ambient", "Pop"], complexity: "Medium", description: "Gentler and more wistful. The iii chord shades the tonic before the IV-V lift.", scale: "major", genres: ["ballads", "ambient pop"] },
  { numerals: ["ii", "V", "I"], tonalities: ["major"], styles: ["Jazz", "Funk"], complexity: "Medium", description: "The standard jazz cadence: setup, tension, resolution.", scale: "major / mixolydian on V", genres: ["jazz", "soul", "funk"] },
  { numerals: ["I", "IV", "vi", "V"], tonalities: ["major"], styles: ["Pop", "Uplifting"], complexity: "Simple", description: "Bright and forward-moving, with the vi adding lift before the dominant resolves.", scale: "major", genres: ["pop", "indie pop"] },
  { numerals: ["I7", "IV7", "V7"], tonalities: ["major"], styles: ["Blues"], complexity: "Medium", description: "Dominant sevenths make the key feel bluesy and restless without leaving the form.", scale: "major blues / minor blues", genres: ["blues", "rock and roll"] },
  { numerals: ["Imaj7", "vi7", "ii7", "V7"], tonalities: ["major"], styles: ["Jazz"], complexity: "Advanced", description: "A smooth turnaround with color tones and a clear dominant pull back to I.", scale: "major / arpeggios", genres: ["jazz", "neo-soul"] },
  { numerals: ["ii7", "V7", "Imaj7", "vi7"], tonalities: ["major"], styles: ["Jazz"], complexity: "Advanced", description: "Extends the ii-V-I into a loop by using vi as a soft restart.", scale: "major / chord tones", genres: ["jazz", "city pop"] },
  { numerals: ["i", "VI", "III", "VII"], tonalities: ["minor"], styles: ["Dark", "Melancholic", "Ambient"], complexity: "Simple", description: "Cinematic minor movement with a wide, dramatic lift through the major chords.", scale: "natural minor / minor pentatonic", genres: ["rock", "film", "ambient"] },
  { numerals: ["i", "iv", "v"], tonalities: ["minor"], styles: ["Blues", "Dark", "Folk"], complexity: "Simple", description: "Natural minor, direct and moody. It avoids the bright dominant pull.", scale: "natural minor / minor pentatonic", genres: ["minor blues", "folk"] },
  { numerals: ["i", "iv", "V"], tonalities: ["minor"], styles: ["Blues", "Dark", "Jazz"], complexity: "Medium", description: "The major V borrows from harmonic minor to create a stronger resolution to i.", scale: "harmonic minor over V", genres: ["classical", "jazz", "metal"] },
  { numerals: ["i", "VII", "VI", "VII"], tonalities: ["minor"], styles: ["Dark"], complexity: "Simple", description: "Descending minor color that circles back without fully resolving until i returns.", scale: "natural minor", genres: ["goth", "metal", "soundtrack"] },
  { numerals: ["i", "VI", "VII"], tonalities: ["minor"], styles: ["Dark", "Uplifting"], complexity: "Simple", description: "Compact and anthemic. The VI-VII rise gives a strong push back to the tonic.", scale: "natural minor / minor pentatonic", genres: ["rock", "metal"] },
  { numerals: ["i", "III", "VII", "VI"], tonalities: ["minor"], styles: ["Ambient", "Melancholic"], complexity: "Medium", description: "Open and reflective, with major chords softening the minor tonic.", scale: "natural minor", genres: ["ambient", "post-rock"] },
  { numerals: ["i", "v", "VI", "iv"], tonalities: ["minor"], styles: ["Dark"], complexity: "Medium", description: "Keeps the harmony shadowed by using minor v and iv around the brighter VI.", scale: "natural minor", genres: ["dark pop", "metal"] },
  { numerals: ["ii\u00b0", "V", "i"], tonalities: ["minor"], styles: ["Jazz", "Dark"], complexity: "Advanced", description: "Minor-key cadence with a diminished setup and a strong harmonic-minor dominant.", scale: "harmonic minor / chord tones", genres: ["jazz", "classical"] },
  { numerals: ["ii\u00f87", "V7", "i"], tonalities: ["minor"], styles: ["Jazz"], complexity: "Advanced", description: "A jazz minor ii-V-i. The half-diminished ii and dominant V7 aim tightly at tonic.", scale: "harmonic minor / melodic minor colors", genres: ["jazz"] },
];

const CHORDS = {
  Major: [0, 4, 7],
  Minor: [0, 3, 7],
  "Dominant 7": [0, 4, 7, 10],
  "Major 7": [0, 4, 7, 11],
  "Minor 7": [0, 3, 7, 10],
  Diminished: [0, 3, 6],
  Sus2: [0, 2, 7],
  Sus4: [0, 5, 7],
  "Power Chord": [0, 7],
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
  { id: "ukulele-baritone", instrument: "Ukulele", name: "Baritone", strings: ["D", "G", "B", "E"], defaultFrets: 15 },
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
      note: noteAt(openNote, fret),
    })),
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
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function groupedTunings(customTunings) {
  return [...PRESET_TUNINGS, ...customTunings];
}

function normalizeCircleKey(value, accidental = "sharps") {
  if (CIRCLE_MAJOR_KEYS.includes(value)) return value;
  const root = normalizeNote(value);
  const matches = CIRCLE_KEYS.filter((key) => normalizeNote(key.major) === root);
  if (!matches.length) return "C";
  return (matches.find((key) => key.type === accidental) || matches[0]).major;
}

function getCircleKeyData(keyName) {
  return CIRCLE_KEYS.find((key) => key.major === normalizeCircleKey(keyName)) || CIRCLE_KEYS[0];
}

function accidentalLabel(key) {
  if (!key.accidentals) return "No sharps or flats";
  return `${key.accidentals} ${key.type === "flats" ? "flat" : "sharp"}${key.accidentals === 1 ? "" : "s"}`;
}

function getDiatonicChords(key) {
  return key.scale.map((note, index) => ({
    degree: ROMAN_DEGREES[index],
    chord: `${note}${DIATONIC_SUFFIXES[index]}`,
  }));
}

function getCloselyRelatedKeys(keyName) {
  const index = CIRCLE_MAJOR_KEYS.indexOf(normalizeCircleKey(keyName));
  const key = CIRCLE_KEYS[index] || CIRCLE_KEYS[0];
  const previous = CIRCLE_KEYS[(index + CIRCLE_KEYS.length - 1) % CIRCLE_KEYS.length].major;
  const next = CIRCLE_KEYS[(index + 1) % CIRCLE_KEYS.length].major;
  return [previous, next, key.minor].join(", ");
}

function getBorrowedOptions(key) {
  const root = normalizeNote(key.major);
  const accidental = key.type === "sharps" ? "sharps" : "flats";
  return BORROWED_INTERVALS.map(([degree, interval, quality]) => `${degree}: ${displayNote(transpose(root, interval), accidental)}${quality}`).join(", ");
}

function complexityIndex(value) {
  return Math.max(0, CHORD_HELPER_COMPLEXITIES.indexOf(value));
}

function normalizeTonality(value) {
  return value === "minor" ? "minor" : "major";
}

function normalizeHelperStyle(value) {
  return CHORD_HELPER_STYLES.includes(value) ? value : "Pop";
}

function normalizeHelperComplexity(value) {
  return CHORD_HELPER_COMPLEXITIES.includes(value) ? value : "Simple";
}

function getMajorScaleForRoot(root, accidental = "sharps") {
  const keyName = normalizeCircleKey(root, accidental);
  return getCircleKeyData(keyName).scale;
}

function getMinorScaleForRoot(root, accidental = "flats") {
  const relativeMajorRoot = transpose(root, 3);
  const majorKey = getCircleKeyData(normalizeCircleKey(relativeMajorRoot, accidental));
  const scale = majorKey.scale;
  const tonic = normalizeNote(root);
  const start = scale.findIndex((note) => normalizeNote(note) === tonic);
  if (start === -1) return notesFromPattern(root, SCALES["Natural Minor"]).map((note) => displayNote(note, accidental));
  return [...scale.slice(start), ...scale.slice(0, start)];
}

function getScaleForTonality(keyName, tonality, accidental) {
  const root = normalizeNote(keyName);
  return tonality === "minor" ? getMinorScaleForRoot(root, accidental) : getMajorScaleForRoot(root, accidental);
}

function chordRootForDegree(scale, degree) {
  const roots = {
    I: 0,
    i: 0,
    ii: 1,
    "ii\u00b0": 1,
    "ii\u00f8": 1,
    iii: 2,
    III: 2,
    IV: 3,
    iv: 3,
    V: 4,
    v: 4,
    VI: 5,
    vi: 5,
    VII: 6,
    "vii\u00b0": 6,
  };
  return scale[roots[degree] ?? 0];
}

function splitRomanToken(token) {
  const match = token.match(/^(ii\u00f8|ii\u00b0|vii\u00b0|[ivIV]+)(maj7|dim7|7)?$/);
  return match ? { degree: match[1], extension: match[2] || "" } : { degree: token, extension: "" };
}

function chordNameForRoman(token, scale, tonality) {
  const { degree, extension } = splitRomanToken(token);
  const root = chordRootForDegree(scale, degree);
  if (extension === "maj7") return `${root}maj7`;
  if (extension === "dim7") return `${root}dim7`;
  if (degree.includes("\u00f8")) return `${root}m7b5`;
  if (extension === "7" && degree.includes("\u00b0")) return `${root}dim7`;
  if (extension === "7" && degree === degree.toLowerCase()) return `${root}m7`;
  if (extension === "7") return `${root}7`;
  if (degree.includes("\u00b0")) return `${root}dim`;
  if (degree === degree.toLowerCase()) return `${root}m`;
  if (tonality === "minor" && degree === "V") return root;
  return root;
}

function getChordFunction(token) {
  const { degree, extension } = splitRomanToken(token);
  return CHORD_FUNCTION_BY_ROMAN[`${degree}${extension}`] || CHORD_FUNCTION_BY_ROMAN[degree] || "tonic";
}

function getWhyProgressionWorks(progression) {
  const seen = [...new Set(progression.numerals.map(getChordFunction))];
  const explanations = seen.map((key) => CHORD_FUNCTIONS[key]).filter(Boolean);
  return explanations.join(" ");
}

function getChordHelperSuggestions(helper) {
  const style = normalizeHelperStyle(helper.style);
  const tonality = normalizeTonality(helper.tonality);
  const maxComplexity = complexityIndex(normalizeHelperComplexity(helper.complexity));
  const direct = CHORD_PROGRESSIONS.filter(
    (item) => item.tonalities.includes(tonality) && item.styles.includes(style) && complexityIndex(item.complexity) <= maxComplexity,
  );
  const fallback = CHORD_PROGRESSIONS.filter((item) => item.tonalities.includes(tonality) && complexityIndex(item.complexity) <= maxComplexity);
  return (direct.length ? direct : fallback).slice(0, 6);
}

function practiceScaleLabel(keyName, tonality, suggestion) {
  const root = getCircleKeyData(keyName).major;
  const relativeMinor = getCircleKeyData(keyName).minor;
  if (!suggestion.scale) return "";
  return suggestion.scale.replace("major", `${root} major`).replace("relative minor", relativeMinor).replace("natural minor", `${root} natural minor`).replace("harmonic minor", `${root} harmonic minor`);
}

const defaultState = {
  selectedTuningId: "guitar-standard",
  customTunings: [],
  frets: 22,
  theme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  accidental: "sharps",
  mode: "all",
  rootNote: "C",
  circleKey: "C",
  selectedScale: "Major",
  selectedChord: "Major",
  selectedNotes: ["C"],
  chordHelper: {
    key: "C",
    tonality: "major",
    style: "Pop",
    complexity: "Simple",
  },
  quiz: {
    active: false,
    questionNote: "C",
    selected: [],
    completed: false,
    guesses: { correct: 0, incorrect: 0 },
    scoreText: "",
    keyAware: false,
    stats: { gamesStarted: 0, gamesCompleted: 0, correctGuesses: 0, incorrectGuesses: 0 },
  },
};

class Store extends EventTarget {
  constructor() {
    super();
    this.state = this.sanitize({ ...defaultState, ...loadState() });
    this.persist();
  }

  sanitize(state) {
    const customTunings = Array.isArray(state.customTunings)
      ? state.customTunings.map((tuning) => ({
          id: tuning.id || uid(),
          instrument: tuning.instrument || "Custom",
          name: tuning.name || "Untitled",
          strings: Array.isArray(tuning.strings) && tuning.strings.length ? tuning.strings.map(normalizeNote) : ["E", "A", "D", "G", "B", "E"],
        }))
      : [];
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
      circleKey: normalizeCircleKey(state.circleKey || state.rootNote, state.accidental),
      selectedNotes: Array.isArray(state.selectedNotes) && state.selectedNotes.length ? [...new Set(state.selectedNotes.map(normalizeNote))] : ["C"],
      selectedScale: SCALES[state.selectedScale] ? state.selectedScale : "Major",
      selectedChord: CHORDS[state.selectedChord] ? state.selectedChord : "Major",
      chordHelper: {
        ...defaultState.chordHelper,
        ...(state.chordHelper || {}),
        key: normalizeCircleKey(state.chordHelper?.key || state.circleKey || state.rootNote, state.accidental),
        tonality: normalizeTonality(state.chordHelper?.tonality),
        style: normalizeHelperStyle(state.chordHelper?.style),
        complexity: normalizeHelperComplexity(state.chordHelper?.complexity),
      },
      quiz: {
        ...defaultState.quiz,
        ...(state.quiz || {}),
        questionNote: normalizeNote(state.quiz?.questionNote || "C"),
        selected: Array.isArray(state.quiz?.selected) ? state.quiz.selected : [],
        completed: Boolean(state.quiz?.completed),
        guesses: { ...defaultState.quiz.guesses, ...(state.quiz?.guesses || {}) },
        keyAware: Boolean(state.quiz?.keyAware),
        stats: { ...defaultState.quiz.stats, ...(state.quiz?.stats || {}) },
      },
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
        strings: event.detail.strings.map(normalizeNote),
      };
      store.update((state) => ({
        ...state,
        customTunings: [...state.customTunings, tuning],
        selectedTuningId: tuning.id,
      }));
    });
    this.addEventListener("tuning-delete", (event) => {
      store.update((state) => ({
        ...state,
        customTunings: state.customTunings.filter((tuning) => tuning.id !== event.detail.id),
        selectedTuningId: state.selectedTuningId === event.detail.id ? "guitar-standard" : state.selectedTuningId,
      }));
    });
    this.addEventListener("quiz-action", (event) => handleQuizAction(event.detail.action, event.detail.position));
  }

  render() {
    const { theme, accidental } = store.state;
    this.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <mode-selector></mode-selector>
          <div class="top-actions">
            <button type="button" data-action="settings" aria-haspopup="dialog">Settings</button>
          </div>
        </header>
        <main class="content">
          <section class="controls" aria-label="Fretboard controls">
            <note-filter></note-filter>
            <scale-panel></scale-panel>
            <chord-panel></chord-panel>
            <circle-of-fifths-panel></circle-of-fifths-panel>
            <chord-helper-panel></chord-helper-panel>
            <quiz-panel></quiz-panel>
          </section>
          <section class="workspace" aria-label="Fretboard">
            <fretboard-view></fretboard-view>
          </section>
        </main>
        ${
          this.settingsOpen
            ? `
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
        `
            : ""
        }
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
    this.querySelector("[data-action='theme']")?.addEventListener("click", () =>
      this.emit("app-update", { theme: theme === "dark" ? "light" : "dark" }),
    );
    this.querySelector("[data-action='accidental']")?.addEventListener("click", () =>
      this.emit("app-update", { accidental: accidental === "flats" ? "sharps" : "flats" }),
    );
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
          ${tuning.strings
            .map(
              (note, index) => `
            <div class="string-row">
              <span>String ${index + 1}</span>
              <label class="sr-only" for="string-${index}">String ${index + 1} note</label>
              <input id="string-${index}" data-string-index="${index}" type="text" value="${escapeHtml(displayNote(note, state.accidental))}" maxlength="2">
              <button type="button" class="danger" data-remove-string="${index}" aria-label="Remove string ${index + 1}">Remove</button>
            </div>
          `,
            )
            .join("")}
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
    this.querySelector("[name='customFrets']").addEventListener("change", (event) =>
      this.emit("app-update", { frets: clampFrets(event.target.value) }),
    );
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
        customTunings: state.customTunings.map((item) => (item.id === tuning.id ? { ...item, strings } : item)),
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
      ["circle", "Circle"],
      ["helper", "Helper"],
      ["quiz", "Quiz"],
    ];
    this.innerHTML = `
      <div class="segmented" role="group" aria-label="Display mode">
        ${modes.map(([value, label]) => `<button type="button" data-mode="${value}" aria-pressed="${store.state.mode === value}">${label}</button>`).join("")}
      </div>
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
            <select name="scale">${Object.keys(SCALES)
              .map((name) => `<option value="${escapeHtml(name)}" ${name === state.selectedScale ? "selected" : ""}>${escapeHtml(name)}</option>`)
              .join("")}</select>
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
    const key = getCircleKeyData(state.circleKey);
    const diatonic = getDiatonicChords(key);
    this.innerHTML = `
      <section class="panel">
        <h2>Chord</h2>
        <div class="compact-grid">
          <label>Root
            <select name="root">${NOTES.map((note) => `<option value="${note}" ${note === state.rootNote ? "selected" : ""}>${escapeHtml(displayNote(note, state.accidental))}</option>`).join("")}</select>
          </label>
          <label>Type
            <select name="chord">${Object.keys(CHORDS)
              .map((name) => `<option value="${escapeHtml(name)}" ${name === state.selectedChord ? "selected" : ""}>${escapeHtml(name)}</option>`)
              .join("")}</select>
          </label>
        </div>
        <div class="helper-list" aria-label="Chords in selected key">
          <strong>${escapeHtml(key.major)} major chords</strong>
          <div class="chip-row">
            ${diatonic.map((item) => `<span class="info-chip">${escapeHtml(item.degree)}: ${escapeHtml(item.chord)}</span>`).join("")}
          </div>
        </div>
      </section>
    `;
    this.querySelector("[name='root']").addEventListener("change", (event) => this.emit("app-update", { rootNote: event.target.value }));
    this.querySelector("[name='chord']").addEventListener("change", (event) => this.emit("app-update", { selectedChord: event.target.value }));
  }
}

class CircleOfFifthsPanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "circle") {
      this.innerHTML = "";
      return;
    }
    const selectedKey = getCircleKeyData(state.circleKey);
    const chords = getDiatonicChords(selectedKey);
    this.innerHTML = `
      <section class="panel circle-panel">
        <h2>Circle of Fifths</h2>
        <div class="circle-layout">
          <svg class="circle-diagram" viewBox="0 0 320 320" role="group" aria-label="Interactive circle of fifths">
            <circle class="circle-ring" cx="160" cy="160" r="139"></circle>
            <circle class="circle-inner-ring" cx="160" cy="160" r="91"></circle>
            ${CIRCLE_KEYS.map((key, index) => this.renderKeyNode(key, index, selectedKey.major)).join("")}
            <text class="circle-center-title" x="160" y="151" text-anchor="middle">Key</text>
            <text class="circle-center-key" x="160" y="178" text-anchor="middle">${escapeHtml(selectedKey.major)}</text>
          </svg>
          <div class="key-summary">
            <div class="summary-block">
              <span>Major scale</span>
              <strong>${selectedKey.scale.map((note) => escapeHtml(note)).join(" ")}</strong>
            </div>
            <div class="summary-grid">
              <div class="summary-block">
                <span>Relative minor</span>
                <strong>${escapeHtml(selectedKey.minor)}</strong>
              </div>
              <div class="summary-block">
                <span>Accidentals</span>
                <strong>${escapeHtml(accidentalLabel(selectedKey))}</strong>
              </div>
              <div class="summary-block wide">
                <span>Closely related</span>
                <strong>${escapeHtml(getCloselyRelatedKeys(selectedKey.major))}</strong>
              </div>
            </div>
            <div class="summary-block">
              <span>Diatonic chords</span>
              <div class="chord-grid">
                ${chords.map((item) => `<span><b>${escapeHtml(item.degree)}</b>${escapeHtml(item.chord)}</span>`).join("")}
              </div>
            </div>
            <div class="summary-block">
              <span>Borrowed/modal color</span>
              <strong>${escapeHtml(getBorrowedOptions(selectedKey))}</strong>
            </div>
          </div>
        </div>
      </section>
    `;
    this.querySelectorAll("[data-circle-key]").forEach((node) => {
      const selectKey = () => {
        const key = getCircleKeyData(node.dataset.circleKey);
        this.emit("app-update", {
          circleKey: key.major,
          rootNote: normalizeNote(key.major),
          accidental: key.type === "flats" ? "flats" : "sharps",
          selectedScale: "Major",
          chordHelper: { ...store.state.chordHelper, key: key.major },
        });
      };
      node.addEventListener("click", selectKey);
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectKey();
        }
      });
    });
  }

  renderKeyNode(key, index, selectedMajor) {
    const angle = index * 30 - 90;
    const radians = (angle * Math.PI) / 180;
    const outer = this.pointOnCircle(160, 160, 119, radians);
    const inner = this.pointOnCircle(160, 160, 75, radians);
    const selected = key.major === selectedMajor;
    return `
      <g class="circle-key ${selected ? "selected" : ""}" data-circle-key="${escapeHtml(key.major)}" role="button" tabindex="0" aria-label="${escapeHtml(key.major)} major, relative minor ${escapeHtml(key.minor)}">
        <circle cx="${outer.x}" cy="${outer.y}" r="24"></circle>
        <text x="${outer.x}" y="${outer.y + 5}" text-anchor="middle">${escapeHtml(key.major)}</text>
        <circle class="minor-node" cx="${inner.x}" cy="${inner.y}" r="18"></circle>
        <text class="minor-label" x="${inner.x}" y="${inner.y + 4}" text-anchor="middle">${escapeHtml(key.minor)}</text>
      </g>
    `;
  }

  pointOnCircle(centerX, centerY, radius, radians) {
    return {
      x: Number((centerX + Math.cos(radians) * radius).toFixed(2)),
      y: Number((centerY + Math.sin(radians) * radius).toFixed(2)),
    };
  }
}

class ChordHelperPanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "helper") {
      this.innerHTML = "";
      return;
    }
    const helper = state.chordHelper;
    const key = getCircleKeyData(helper.key);
    const accidental = key.type === "flats" ? "flats" : "sharps";
    const scale = getScaleForTonality(key.major, helper.tonality, accidental);
    const suggestions = getChordHelperSuggestions(helper);
    this.innerHTML = `
      <section class="panel chord-helper-panel">
        <h2>Chord Progression Helper</h2>
        <div class="compact-grid helper-controls">
          <label>Key
            <select name="helperKey">
              ${CIRCLE_KEYS.map((item) => `<option value="${escapeHtml(item.major)}" ${item.major === key.major ? "selected" : ""}>${escapeHtml(item.major)}</option>`).join("")}
            </select>
          </label>
          <label>Tonality
            <select name="helperTonality">
              <option value="major" ${helper.tonality === "major" ? "selected" : ""}>Major</option>
              <option value="minor" ${helper.tonality === "minor" ? "selected" : ""}>Minor</option>
            </select>
          </label>
          <label>Style/mood
            <select name="helperStyle">
              ${CHORD_HELPER_STYLES.map((style) => `<option value="${escapeHtml(style)}" ${style === helper.style ? "selected" : ""}>${escapeHtml(style)}</option>`).join("")}
            </select>
          </label>
          <label>Complexity
            <select name="helperComplexity">
              ${CHORD_HELPER_COMPLEXITIES.map((level) => `<option value="${escapeHtml(level)}" ${level === helper.complexity ? "selected" : ""}>${escapeHtml(level)}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="function-strip" aria-label="Chord function guide">
          ${Object.values(CHORD_FUNCTIONS).map((text) => `<span>${escapeHtml(text)}</span>`).join("")}
        </div>
        <div class="progression-list">
          ${suggestions.map((suggestion) => this.renderSuggestion(suggestion, key, scale, helper.tonality)).join("")}
        </div>
      </section>
    `;
    this.querySelector("[name='helperKey']").addEventListener("change", (event) => this.updateHelper({ key: event.target.value }));
    this.querySelector("[name='helperTonality']").addEventListener("change", (event) => this.updateHelper({ tonality: event.target.value }));
    this.querySelector("[name='helperStyle']").addEventListener("change", (event) => this.updateHelper({ style: event.target.value }));
    this.querySelector("[name='helperComplexity']").addEventListener("change", (event) => this.updateHelper({ complexity: event.target.value }));
  }

  renderSuggestion(suggestion, key, scale, tonality) {
    const chords = suggestion.numerals.map((token) => chordNameForRoman(token, scale, tonality));
    return `
      <article class="progression-card">
        <div class="progression-head">
          <strong>${suggestion.numerals.map(escapeHtml).join(" - ")}</strong>
          <span>${escapeHtml(suggestion.complexity)}</span>
        </div>
        <div class="progression-chords">${chords.map((chord) => `<span>${escapeHtml(chord)}</span>`).join("")}</div>
        <p>${escapeHtml(suggestion.description)}</p>
        <dl class="progression-meta">
          <div>
            <dt>Practice scale</dt>
            <dd>${escapeHtml(practiceScaleLabel(key.major, tonality, suggestion))}</dd>
          </div>
          <div>
            <dt>Common genres</dt>
            <dd>${escapeHtml(suggestion.genres.join(", "))}</dd>
          </div>
          <div>
            <dt>Why this works</dt>
            <dd>${escapeHtml(getWhyProgressionWorks(suggestion))}</dd>
          </div>
        </dl>
      </article>
    `;
  }

  updateHelper(patch) {
    const nextHelper = { ...store.state.chordHelper, ...patch };
    const key = getCircleKeyData(nextHelper.key);
    this.emit("app-update", {
      chordHelper: nextHelper,
      rootNote: normalizeNote(key.major),
      selectedScale: nextHelper.tonality === "minor" ? "Natural Minor" : "Major",
    });
  }
}

class QuizPanel extends BaseElement {
  render() {
    const { mode, accidental, quiz, circleKey } = store.state;
    if (mode !== "quiz") {
      this.innerHTML = "";
      return;
    }
    const key = getCircleKeyData(circleKey);
    const answerTotal = getAnswerKeys(store.state).size;
    const found = quiz.selected.filter((key) => getAnswerKeys(store.state).has(key)).length;
    const buttonLabel = quiz.active ? "Stop quiz" : "Start quiz";
    this.innerHTML = `
      <section class="panel">
        <h2>Quiz</h2>
        <div class="quiz-status" aria-live="polite">
          <strong>${quiz.active ? `Find all ${escapeHtml(displayNote(quiz.questionNote, accidental))} notes` : "Quiz stopped"}</strong>
          <span class="score">${escapeHtml(quiz.scoreText || (quiz.active ? `${found}/${answerTotal} found. Correct ${quiz.guesses.correct}, incorrect ${quiz.guesses.incorrect}.` : "Press Start quiz when you want a new round."))}</span>
        </div>
        <label class="toggle-row">
          <input type="checkbox" name="keyAware" ${quiz.keyAware ? "checked" : ""}>
          Ask notes from ${escapeHtml(key.major)} major
        </label>
        <div class="button-row" style="margin-top: .75rem;">
          <button type="button" class="${quiz.active ? "danger" : "primary"}" data-quiz="${quiz.active ? "stop" : "start"}">${buttonLabel}</button>
        </div>
      </section>
    `;
    this.querySelector("[name='keyAware']").addEventListener("change", (event) => {
      this.emit("app-update", { quiz: { ...store.state.quiz, keyAware: event.target.checked } });
    });
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
            ${rows
              .map(
                (row) => `
              <div class="string-name">${escapeHtml(displayNote(row.openNote, state.accidental))}</div>
              ${row.frets
                .slice(1)
                .map((pos) => this.renderPosition(pos, visible, state))
                .join("")}
            `,
              )
              .join("")}
            <span></span>
            ${frets.map((fret) => `<div class="marker-cell ${MARKER_FRETS.has(fret) ? (DOUBLE_MARKERS.has(fret) ? "double" : "single") : ""}" aria-hidden="true"></div>`).join("")}
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
    const completed = quiz?.completed;
    const classes = [!isVisible ? "empty" : "", pos.fret === 0 ? "open" : ""].filter(Boolean).join(" ");
    const buttonClasses = [
      state.mode === "quiz" && !selected ? "hidden-note" : "",
      isRoot ? "root" : "",
      selected ? "selected" : "",
      selected && correctAnswer ? "correct" : "",
      selected && !correctAnswer ? "incorrect" : "",
      completed && !selected && correctAnswer ? "missed" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const label = state.mode === "quiz" && !selected ? "" : displayNote(pos.note, state.accidental);
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
  if (state.mode === "circle") return `${getCircleKeyData(state.circleKey).major} major context`;
  if (state.mode === "helper") return `${state.chordHelper.key} ${state.chordHelper.tonality} progressions`;
  if (state.mode === "quiz") return state.quiz.active ? `Find ${displayNote(state.quiz.questionNote, state.accidental)}` : "Quiz stopped";
  return "All notes";
}

function handleQuizAction(action, position) {
  const state = store.state;
  if (action === "start") {
    const questionPool = state.quiz.keyAware ? getCircleKeyData(state.circleKey).scale.map(normalizeNote) : NOTES;
    const questionNote = questionPool[Math.floor(Math.random() * questionPool.length)];
    store.update({
      mode: "quiz",
      quiz: {
        ...state.quiz,
        active: true,
        questionNote,
        selected: [],
        completed: false,
        guesses: { correct: 0, incorrect: 0 },
        scoreText: "",
        stats: { ...state.quiz.stats, gamesStarted: state.quiz.stats.gamesStarted + 1 },
      },
    });
    return;
  }
  if (action === "stop") {
    finishQuiz(state, "Stopped");
    return;
  }
  if (!state.quiz.active) return;
  if (action === "select" && position) {
    if (state.quiz.selected.includes(position)) return;
    const selected = new Set(state.quiz.selected);
    selected.add(position);
    const answerKeys = getAnswerKeys(state);
    const isCorrect = answerKeys.has(position);
    const nextQuiz = {
      ...state.quiz,
      selected: [...selected],
      guesses: {
        correct: state.quiz.guesses.correct + (isCorrect ? 1 : 0),
        incorrect: state.quiz.guesses.incorrect + (isCorrect ? 0 : 1),
      },
    };
    const foundAll = [...answerKeys].every((key) => selected.has(key));
    if (foundAll) {
      const completedQuiz = {
        ...nextQuiz,
        active: false,
        completed: true,
        scoreText: scoreTextForQuiz(nextQuiz, answerKeys.size, "Complete"),
        stats: {
          ...state.quiz.stats,
          gamesCompleted: state.quiz.stats.gamesCompleted + 1,
          correctGuesses: state.quiz.stats.correctGuesses + nextQuiz.guesses.correct,
          incorrectGuesses: state.quiz.stats.incorrectGuesses + nextQuiz.guesses.incorrect,
        },
      };
      store.update({ quiz: completedQuiz });
      return;
    }
    store.update({ quiz: nextQuiz });
    return;
  }
}

function finishQuiz(state, reason) {
  if (!state.quiz.active) return;
  const answerKeys = getAnswerKeys(state);
  store.update({
    quiz: {
      ...state.quiz,
      active: false,
      completed: true,
      scoreText: scoreTextForQuiz(state.quiz, answerKeys.size, reason),
      stats: {
        ...state.quiz.stats,
        gamesCompleted: state.quiz.stats.gamesCompleted + 1,
        correctGuesses: state.quiz.stats.correctGuesses + state.quiz.guesses.correct,
        incorrectGuesses: state.quiz.stats.incorrectGuesses + state.quiz.guesses.incorrect,
      },
    },
  });
}

function scoreTextForQuiz(quiz, total, prefix) {
  return `${prefix}. Found ${quiz.guesses.correct}/${total}; incorrect guesses ${quiz.guesses.incorrect}.`;
}

function getAnswerKeys(state) {
  const matrix = generateFretboardMatrix(store.tuning.strings, state.frets);
  const keys = new Set();
  matrix.forEach((row) =>
    row.frets.forEach((pos) => {
      if (pos.fret > 0 && pos.note === state.quiz.questionNote) keys.add(`${pos.stringIndex}:${pos.fret}`);
    }),
  );
  return keys;
}

customElements.define("fretboard-app", FretboardApp);
customElements.define("fretboard-view", FretboardView);
customElements.define("tuning-panel", TuningPanel);
customElements.define("mode-selector", ModeSelector);
customElements.define("note-filter", NoteFilter);
customElements.define("scale-panel", ScalePanel);
customElements.define("chord-panel", ChordPanel);
customElements.define("circle-of-fifths-panel", CircleOfFifthsPanel);
customElements.define("chord-helper-panel", ChordHelperPanel);
customElements.define("quiz-panel", QuizPanel);
