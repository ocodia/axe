const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_DISPLAY = { "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb" };
const NOTE_ALIASES = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#", "E#": "F", "B#": "C", Cb: "B", Fb: "E" };
const STORAGE_KEY = "axe:v1";
const FRET_OPTIONS = [12, 15, 17, 20, 22, 24];
const MODES = ["all", "notes", "scales", "chords", "identifier", "circle", "helper", "progression", "positions", "quiz"];
const MODE_LABELS = {
  all: "All",
  notes: "Notes",
  scales: "Scales",
  chords: "Chords",
  identifier: "Identifier",
  circle: "Circle",
  helper: "Helper",
  progression: "Progression",
  positions: "Positions",
  quiz: "Quiz",
};
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
  "vii\u00f87": "dominant",
  "ii\u00f87": "predominant",
  bIII: "colour/borrowed",
  bVI: "colour/borrowed",
  bVII: "colour/borrowed",
};
const CHORD_PROGRESSIONS = [
  {
    numerals: ["I", "V", "vi", "IV"],
    tonalities: ["major"],
    styles: ["Pop", "Uplifting", "Folk"],
    complexity: "Simple",
    description: "Very common pop movement. Strong, familiar, emotional but stable.",
    scale: "major / relative minor pentatonic",
    genres: ["pop", "country", "worship"],
  },
  {
    numerals: ["I", "IV", "V"],
    tonalities: ["major"],
    styles: ["Rock", "Blues", "Folk", "Uplifting"],
    complexity: "Simple",
    description: "Direct and grounded. It moves away from home, builds tension, then resolves clearly.",
    scale: "major pentatonic / major blues",
    genres: ["rock", "blues", "folk"],
  },
  {
    numerals: ["I", "vi", "IV", "V"],
    tonalities: ["major"],
    styles: ["Pop", "Folk", "Melancholic"],
    complexity: "Simple",
    description: "Classic warm progression with a nostalgic turn through the relative minor.",
    scale: "major / relative minor pentatonic",
    genres: ["doo-wop", "pop", "folk"],
  },
  {
    numerals: ["vi", "IV", "I", "V"],
    tonalities: ["major"],
    styles: ["Pop", "Rock", "Melancholic"],
    complexity: "Simple",
    description: "Starts on emotional contrast, then opens into a broad major-key resolution.",
    scale: "major / relative minor pentatonic",
    genres: ["pop rock", "indie"],
  },
  {
    numerals: ["I", "V", "IV", "I"],
    tonalities: ["major"],
    styles: ["Rock", "Folk"],
    complexity: "Simple",
    description: "Plain-spoken and sturdy. The IV before I gives a relaxed, rootsy landing.",
    scale: "major pentatonic",
    genres: ["rock", "folk rock"],
  },
  {
    numerals: ["I", "iii", "IV", "V"],
    tonalities: ["major"],
    styles: ["Melancholic", "Ambient", "Pop"],
    complexity: "Medium",
    description: "Gentler and more wistful. The iii chord shades the tonic before the IV-V lift.",
    scale: "major",
    genres: ["ballads", "ambient pop"],
  },
  {
    numerals: ["ii", "V", "I"],
    tonalities: ["major"],
    styles: ["Jazz", "Funk"],
    complexity: "Medium",
    description: "The standard jazz cadence: setup, tension, resolution.",
    scale: "major / mixolydian on V",
    genres: ["jazz", "soul", "funk"],
  },
  {
    numerals: ["I", "IV", "vi", "V"],
    tonalities: ["major"],
    styles: ["Pop", "Uplifting"],
    complexity: "Simple",
    description: "Bright and forward-moving, with the vi adding lift before the dominant resolves.",
    scale: "major",
    genres: ["pop", "indie pop"],
  },
  {
    numerals: ["I7", "IV7", "V7"],
    tonalities: ["major"],
    styles: ["Blues"],
    complexity: "Medium",
    description: "Dominant sevenths make the key feel bluesy and restless without leaving the form.",
    scale: "major blues / minor blues",
    genres: ["blues", "rock and roll"],
  },
  {
    numerals: ["Imaj7", "vi7", "ii7", "V7"],
    tonalities: ["major"],
    styles: ["Jazz"],
    complexity: "Advanced",
    description: "A smooth turnaround with color tones and a clear dominant pull back to I.",
    scale: "major / arpeggios",
    genres: ["jazz", "neo-soul"],
  },
  {
    numerals: ["ii7", "V7", "Imaj7", "vi7"],
    tonalities: ["major"],
    styles: ["Jazz"],
    complexity: "Advanced",
    description: "Extends the ii-V-I into a loop by using vi as a soft restart.",
    scale: "major / chord tones",
    genres: ["jazz", "city pop"],
  },
  {
    numerals: ["i", "VI", "III", "VII"],
    tonalities: ["minor"],
    styles: ["Dark", "Melancholic", "Ambient"],
    complexity: "Simple",
    description: "Cinematic minor movement with a wide, dramatic lift through the major chords.",
    scale: "natural minor / minor pentatonic",
    genres: ["rock", "film", "ambient"],
  },
  {
    numerals: ["i", "iv", "v"],
    tonalities: ["minor"],
    styles: ["Blues", "Dark", "Folk"],
    complexity: "Simple",
    description: "Natural minor, direct and moody. It avoids the bright dominant pull.",
    scale: "natural minor / minor pentatonic",
    genres: ["minor blues", "folk"],
  },
  {
    numerals: ["i", "iv", "V"],
    tonalities: ["minor"],
    styles: ["Blues", "Dark", "Jazz"],
    complexity: "Medium",
    description: "The major V borrows from harmonic minor to create a stronger resolution to i.",
    scale: "harmonic minor over V",
    genres: ["classical", "jazz", "metal"],
  },
  {
    numerals: ["i", "VII", "VI", "VII"],
    tonalities: ["minor"],
    styles: ["Dark"],
    complexity: "Simple",
    description: "Descending minor color that circles back without fully resolving until i returns.",
    scale: "natural minor",
    genres: ["goth", "metal", "soundtrack"],
  },
  {
    numerals: ["i", "VI", "VII"],
    tonalities: ["minor"],
    styles: ["Dark", "Uplifting"],
    complexity: "Simple",
    description: "Compact and anthemic. The VI-VII rise gives a strong push back to the tonic.",
    scale: "natural minor / minor pentatonic",
    genres: ["rock", "metal"],
  },
  {
    numerals: ["i", "III", "VII", "VI"],
    tonalities: ["minor"],
    styles: ["Ambient", "Melancholic"],
    complexity: "Medium",
    description: "Open and reflective, with major chords softening the minor tonic.",
    scale: "natural minor",
    genres: ["ambient", "post-rock"],
  },
  {
    numerals: ["i", "v", "VI", "iv"],
    tonalities: ["minor"],
    styles: ["Dark"],
    complexity: "Medium",
    description: "Keeps the harmony shadowed by using minor v and iv around the brighter VI.",
    scale: "natural minor",
    genres: ["dark pop", "metal"],
  },
  {
    numerals: ["ii\u00b0", "V", "i"],
    tonalities: ["minor"],
    styles: ["Jazz", "Dark"],
    complexity: "Advanced",
    description: "Minor-key cadence with a diminished setup and a strong harmonic-minor dominant.",
    scale: "harmonic minor / chord tones",
    genres: ["jazz", "classical"],
  },
  {
    numerals: ["ii\u00f87", "V7", "i"],
    tonalities: ["minor"],
    styles: ["Jazz"],
    complexity: "Advanced",
    description: "A jazz minor ii-V-i. The half-diminished ii and dominant V7 aim tightly at tonic.",
    scale: "harmonic minor / melodic minor colors",
    genres: ["jazz"],
  },
];

const PROGRESSION_NUMERALS = {
  major: ["I", "ii", "iii", "IV", "V", "vi", "vii\u00b0", "Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "vii\u00f87", "bIII", "iv", "bVI", "bVII"],
  minor: ["i", "ii\u00b0", "III", "iv", "v", "V", "VI", "VII", "i7", "ii\u00f87", "IIImaj7", "iv7", "v7", "V7", "VImaj7", "VII7"],
};

const PROGRESSION_ROMAN_DETAILS = {
  major: {
    I: { interval: 0, type: "Major" },
    ii: { interval: 2, type: "Minor" },
    iii: { interval: 4, type: "Minor" },
    IV: { interval: 5, type: "Major" },
    V: { interval: 7, type: "Major" },
    vi: { interval: 9, type: "Minor" },
    "vii\u00b0": { interval: 11, type: "Diminished" },
    Imaj7: { interval: 0, type: "Major 7" },
    ii7: { interval: 2, type: "Minor 7" },
    iii7: { interval: 4, type: "Minor 7" },
    IVmaj7: { interval: 5, type: "Major 7" },
    V7: { interval: 7, type: "Dominant 7" },
    vi7: { interval: 9, type: "Minor 7" },
    "vii\u00f87": { interval: 11, type: "Half-Diminished" },
    bIII: { interval: 3, type: "Major", function: "colour/borrowed" },
    iv: { interval: 5, type: "Minor", function: "colour/borrowed" },
    bVI: { interval: 8, type: "Major", function: "colour/borrowed" },
    bVII: { interval: 10, type: "Major", function: "colour/borrowed" },
  },
  minor: {
    i: { interval: 0, type: "Minor" },
    "ii\u00b0": { interval: 2, type: "Diminished" },
    III: { interval: 3, type: "Major" },
    iv: { interval: 5, type: "Minor" },
    v: { interval: 7, type: "Minor" },
    V: { interval: 7, type: "Major" },
    VI: { interval: 8, type: "Major" },
    VII: { interval: 10, type: "Major" },
    i7: { interval: 0, type: "Minor 7" },
    "ii\u00f87": { interval: 2, type: "Half-Diminished" },
    IIImaj7: { interval: 3, type: "Major 7" },
    iv7: { interval: 5, type: "Minor 7" },
    v7: { interval: 7, type: "Minor 7" },
    V7: { interval: 7, type: "Dominant 7" },
    VImaj7: { interval: 8, type: "Major 7" },
    VII7: { interval: 10, type: "Dominant 7" },
  },
};

const NEXT_CHORD_SUGGESTIONS = {
  major: {
    I: ["IV", "V", "vi", "ii"],
    ii: ["V", "vii\u00b0", "IV"],
    IV: ["V", "I", "ii", "iv"],
    V: ["I", "vi"],
    vi: ["IV", "ii", "V"],
    iv: ["I", "V", "bVII"],
    bVII: ["I", "IV"],
  },
  minor: {
    i: ["iv", "VI", "VII", "V"],
    iv: ["V", "v", "VII"],
    V: ["i", "VI"],
    VI: ["III", "VII", "iv"],
    VII: ["i", "III"],
    v: ["i", "VI"],
  },
};

const CHORDS = {
  Major: [0, 4, 7],
  Minor: [0, 3, 7],
  "Dominant 7": [0, 4, 7, 10],
  "Major 7": [0, 4, 7, 11],
  "Minor 7": [0, 3, 7, 10],
  Diminished: [0, 3, 6],
  "Diminished 7": [0, 3, 6, 9],
  "Half-Diminished": [0, 3, 6, 10],
  Sus2: [0, 2, 7],
  Sus4: [0, 5, 7],
  "Power Chord": [0, 7],
};

const CHORD_FORMULAS = {
  5: [0, 7],
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  6: [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  mMaj7: [0, 3, 7, 11],
  dim7: [0, 3, 6, 9],
  m7b5: [0, 3, 6, 10],
  add9: [0, 4, 7, 14],
  madd9: [0, 3, 7, 14],
  9: [0, 4, 7, 10, 14],
  maj9: [0, 4, 7, 11, 14],
  m9: [0, 3, 7, 10, 14],
  11: [0, 4, 7, 10, 14, 17],
  13: [0, 4, 7, 10, 14, 21],
};

const NORMALIZED_CHORD_FORMULAS = Object.fromEntries(
  Object.entries(CHORD_FORMULAS).map(([name, intervals]) => [
    name,
    [...new Set(intervals.map((interval) => ((interval % 12) + 12) % 12))].sort((a, b) => a - b),
  ]),
);
const CHORD_FORMULA_COMPLEXITY = {
  5: 1,
  major: 2,
  minor: 2,
  dim: 2,
  aug: 2,
  sus2: 2,
  sus4: 2,
  6: 3,
  m6: 3,
  7: 3,
  maj7: 3,
  m7: 3,
  mMaj7: 4,
  dim7: 3,
  m7b5: 3,
  add9: 4,
  madd9: 4,
  9: 5,
  maj9: 5,
  m9: 5,
  11: 6,
  13: 6,
};
const INTERVAL_LABELS = {
  0: "1",
  1: "b2",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "b5",
  7: "5",
  8: "#5",
  9: "6",
  10: "b7",
  11: "7",
};

const POSITION_SYSTEMS = {
  caged: {
    label: "CAGED",
    group: "caged",
    description: "CAGED connects chord shapes across the neck, helping you find chord tones, triads and nearby melody notes.",
  },
  "major-pentatonic": {
    label: "Major pentatonic",
    group: "pentatonic",
    intervals: [0, 2, 4, 7, 9],
    intervalLabels: ["R", "2", "3", "5", "6"],
    description: "Major pentatonic gives a brighter sound for country, folk, pop and open-sounding melodies.",
  },
  "minor-pentatonic": {
    label: "Minor pentatonic",
    group: "pentatonic",
    intervals: [0, 3, 5, 7, 10],
    intervalLabels: ["R", "b3", "4", "5", "b7"],
    description: "Minor pentatonic maps reliable soloing positions for rock, blues and many pop contexts.",
  },
  "major-scale": {
    label: "Major scale",
    group: "scale",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    intervalLabels: ["R", "2", "3", "4", "5", "6", "7"],
    description: "Major scale positions connect the full diatonic key across the neck for melody writing.",
  },
  "natural-minor": {
    label: "Natural minor",
    group: "scale",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    intervalLabels: ["R", "2", "b3", "4", "5", "b6", "b7"],
    description: "Natural minor positions give you the complete minor-key note set for darker melodies and riffs.",
  },
};

const CAGED_SHAPES = {
  C: {
    id: "C",
    label: "C shape",
    anchorString: 1,
    span: [-3, 1],
    fallbackRange: [0, 4],
    description: "The C shape keeps the familiar open C outline and moves it to a new root.",
    usage: "Useful for chord tones and triads around adjacent strings.",
    tryThis: "Play only the root, third and fifth first, then add one nearby passing note.",
  },
  A: {
    id: "A",
    label: "A shape",
    anchorString: 1,
    span: [0, 3],
    fallbackRange: [3, 5],
    description: "The A shape is a practical movable barre form around the middle strings.",
    usage: "Strong for rhythm parts, compact triads and middle-register lead lines.",
    tryThis: "Find the nearest chord voicing inside this shape and answer it with a short melody.",
  },
  G: {
    id: "G",
    label: "G shape",
    anchorString: 0,
    span: [-2, 2],
    fallbackRange: [5, 8],
    description: "The G shape links lower and higher CAGED areas with a wider chord-tone spread.",
    usage: "Good for seeing how chord tones continue across strings.",
    tryThis: "Move from this shape to the next CAGED shape without stopping.",
  },
  E: {
    id: "E",
    label: "E shape",
    anchorString: 0,
    span: [0, 3],
    fallbackRange: [7, 10],
    description: "The E shape is the classic movable barre form rooted on the low string.",
    usage: "Useful for strong rhythm playing and obvious root-note landing points.",
    tryThis: "Write a two-bar melody using only three notes from this shape.",
  },
  D: {
    id: "D",
    label: "D shape",
    anchorString: 3,
    span: [-2, 2],
    fallbackRange: [9, 12],
    description: "The D shape gives a compact upper-string chord area for bright voicings.",
    usage: "Great for triads, double-stops and melodic fragments on higher strings.",
    tryThis: "Slide into one chord tone, then land on the nearest root.",
  },
};

const POSITION_BOXES = {
  box1: {
    id: "box1",
    label: "Box 1",
    positionLabel: "Position 1",
    span: [0, 3],
    fallbackRange: [5, 8],
    description: "The home position with roots that are easy to hear and return to.",
    usage: "Use the root notes as landing points when improvising.",
    tryThis: "Play a short phrase, pause on the root, then answer it from another string.",
  },
  box2: {
    id: "box2",
    label: "Box 2",
    positionLabel: "Position 2",
    span: [2, 5],
    fallbackRange: [7, 10],
    description: "A connected position just above the home box.",
    usage: "Useful for climbing phrases and brighter upper notes.",
    tryThis: "Move from this box back to Box 1 without breaking time.",
  },
  box3: {
    id: "box3",
    label: "Box 3",
    positionLabel: "Position 3",
    span: [4, 7],
    fallbackRange: [9, 12],
    description: "A middle-neck position that helps connect lower and higher areas.",
    usage: "Good for linking melodies across the neck.",
    tryThis: "Write a two-bar melody using only three notes from this position.",
  },
  box4: {
    id: "box4",
    label: "Box 4",
    positionLabel: "Position 4",
    span: [7, 10],
    fallbackRange: [12, 15],
    description: "A higher position that opens up singing lead lines.",
    usage: "Useful for bends, slides and repeated melodic hooks.",
    tryThis: "Slide into the third, then resolve to the nearest root.",
  },
  box5: {
    id: "box5",
    label: "Box 5",
    positionLabel: "Position 5",
    span: [-2, 1],
    fallbackRange: [3, 6],
    description: "The wraparound position that leads back into Box 1.",
    usage: "Good for learning how the pattern repeats across octaves.",
    tryThis: "Connect this position into Box 1 without stopping.",
  },
};

const FOCUS_RANGES = {
  open: [0, 4],
  low: [3, 7],
  middle: [5, 12],
  high: [10, 17],
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
    root: normalizeNote(note),
    type: DIATONIC_SUFFIXES[index] === "m" ? "Minor" : DIATONIC_SUFFIXES[index] === "dim" ? "Diminished" : "Major",
  }));
}

function getCloselyRelatedKeys(keyName) {
  return getCloselyRelatedKeyChords(keyName)
    .map((chord) => chord.label)
    .join(", ");
}

function getCloselyRelatedKeyChords(keyName) {
  const index = CIRCLE_MAJOR_KEYS.indexOf(normalizeCircleKey(keyName));
  const key = CIRCLE_KEYS[index] || CIRCLE_KEYS[0];
  const previous = CIRCLE_KEYS[(index + CIRCLE_KEYS.length - 1) % CIRCLE_KEYS.length];
  const next = CIRCLE_KEYS[(index + 1) % CIRCLE_KEYS.length];
  return [
    { label: previous.major, root: normalizeNote(previous.major), type: "Major" },
    { label: next.major, root: normalizeNote(next.major), type: "Major" },
    { label: key.minor, root: normalizeNote(key.scale[5]), type: "Minor" },
  ];
}

function getBorrowedOptions(key) {
  return getBorrowedChordOptions(key)
    .map((chord) => `${chord.degree}: ${chord.label}`)
    .join(", ");
}

function getBorrowedChordOptions(key) {
  const root = normalizeNote(key.major);
  const accidental = key.type === "sharps" ? "sharps" : "flats";
  return BORROWED_INTERVALS.map(([degree, interval, quality]) => {
    const note = displayNote(transpose(root, interval), accidental);
    return {
      degree,
      label: `${note}${quality}`,
      root: normalizeNote(note),
      type: quality === "m" ? "Minor" : "Major",
    };
  });
}

function complexityIndex(value) {
  return Math.max(0, CHORD_HELPER_COMPLEXITIES.indexOf(value));
}

function normalizeTonality(value) {
  return value === "minor" ? "minor" : "major";
}

function sanitizePositionLearning(positionLearning = {}) {
  const system = POSITION_SYSTEMS[positionLearning.system] ? positionLearning.system : "caged";
  const selectedShape = CAGED_SHAPES[positionLearning.selectedShape] ? positionLearning.selectedShape : "C";
  const selectedBox = POSITION_BOXES[positionLearning.selectedBox] ? positionLearning.selectedBox : "box1";
  const focusRange = ["auto", "open", "low", "middle", "high", "full"].includes(positionLearning.focusRange) ? positionLearning.focusRange : "auto";
  return {
    ...defaultState.positionLearning,
    ...positionLearning,
    rootNote: normalizeNote(positionLearning.rootNote || defaultState.positionLearning.rootNote),
    tonality: normalizeTonality(positionLearning.tonality),
    system,
    selectedShape,
    selectedBox,
    focusRange,
    showOnlyPosition: positionLearning.showOnlyPosition === undefined ? true : Boolean(positionLearning.showOnlyPosition),
    showRoots: positionLearning.showRoots === undefined ? true : Boolean(positionLearning.showRoots),
    showIntervals: positionLearning.showIntervals === undefined ? true : Boolean(positionLearning.showIntervals),
  };
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
  const match = token.match(/^(bIII|bVI|bVII|ii\u00f8|ii\u00b0|vii\u00f8|vii\u00b0|[ivIV]+)(maj7|dim7|7)?$/);
  return match ? { degree: match[1], extension: match[2] || "" } : { degree: token, extension: "" };
}

function chordSuffixForType(type) {
  if (type === "Minor") return "m";
  if (type === "Dominant 7") return "7";
  if (type === "Major 7") return "maj7";
  if (type === "Minor 7") return "m7";
  if (type === "Diminished") return "dim";
  if (type === "Diminished 7") return "dim7";
  if (type === "Half-Diminished") return "m7b5";
  return "";
}

function getRomanDetail(token, tonality) {
  return PROGRESSION_ROMAN_DETAILS[normalizeTonality(tonality)]?.[token] || null;
}

function chordNameForRoman(token, scale, tonality, accidental = "sharps") {
  const detail = getRomanDetail(token, tonality);
  if (detail) {
    const root = displayNote(transpose(scale[0], detail.interval), accidental);
    return `${root}${chordSuffixForType(detail.type)}`;
  }
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

function chordTypeForRoman(token, tonality) {
  const detail = getRomanDetail(token, tonality);
  if (detail) return detail.type;
  const { degree, extension } = splitRomanToken(token);
  if (extension === "maj7") return "Major 7";
  if (extension === "dim7") return "Diminished 7";
  if (degree.includes("\u00f8")) return "Half-Diminished";
  if (extension === "7" && degree.includes("\u00b0")) return "Diminished 7";
  if (extension === "7" && degree === degree.toLowerCase()) return "Minor 7";
  if (extension === "7") return "Dominant 7";
  if (degree.includes("\u00b0")) return "Diminished";
  if (degree === degree.toLowerCase()) return "Minor";
  if (tonality === "minor" && degree === "V") return "Major";
  return "Major";
}

function chordInfoForRoman(token, scale, tonality, accidental = "sharps") {
  const detail = getRomanDetail(token, tonality);
  const rootLabel = detail ? displayNote(transpose(scale[0], detail.interval), accidental) : chordRootForDegree(scale, splitRomanToken(token).degree);
  return {
    label: chordNameForRoman(token, scale, tonality, accidental),
    root: normalizeNote(rootLabel),
    type: chordTypeForRoman(token, tonality),
  };
}

function sanitizeFocusChord(focusChord) {
  if (!focusChord || !CHORDS[focusChord.type]) return null;
  const root = normalizeNote(focusChord.root);
  return {
    label: focusChord.label || `${displayNote(root)} ${focusChord.type}`,
    root,
    type: focusChord.type,
  };
}

function getChordFunction(token) {
  const detail = getRomanDetail(token, "major") || getRomanDetail(token, "minor");
  if (detail?.function) return detail.function;
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
  return suggestion.scale
    .replace("major", `${root} major`)
    .replace("relative minor", relativeMinor)
    .replace("natural minor", `${root} natural minor`)
    .replace("harmonic minor", `${root} harmonic minor`);
}

function supportedNumeralsForTonality(tonality) {
  return PROGRESSION_NUMERALS[normalizeTonality(tonality)];
}

function sanitizeProgressionBuilder(builder = {}, accidental = "sharps") {
  const key = normalizeCircleKey(builder.key || "C", accidental);
  const tonality = normalizeTonality(builder.tonality);
  const supported = supportedNumeralsForTonality(tonality);
  const numerals = Array.isArray(builder.numerals) ? builder.numerals.filter((token) => supported.includes(token)) : [];
  const fallbackNumerals = tonality === "minor" ? ["i", "VI", "VII", "i"] : defaultState.progressionBuilder.numerals;
  const safeNumerals = numerals.length ? numerals : [...fallbackNumerals];
  const focusedIndex = Math.max(0, Math.min(safeNumerals.length - 1, Number(builder.focusedIndex) || 0));
  const savedProgressions = Array.isArray(builder.savedProgressions)
    ? builder.savedProgressions
        .filter((item) => item && Array.isArray(item.numerals))
        .map((item) => {
          const savedTonality = normalizeTonality(item.tonality);
          const savedSupported = supportedNumeralsForTonality(savedTonality);
          const savedNumerals = item.numerals.filter((token) => savedSupported.includes(token));
          return {
            id: item.id || uid(),
            name: item.name || progressionName(item.key || "C", savedTonality, savedNumerals),
            key: normalizeCircleKey(item.key || "C", accidental),
            tonality: savedTonality,
            numerals: savedNumerals.length ? savedNumerals : savedTonality === "minor" ? ["i", "VI", "VII"] : ["I", "V", "vi", "IV"],
            createdAt: item.createdAt || new Date().toISOString(),
          };
        })
    : [];
  return { key, tonality, numerals: safeNumerals, focusedIndex, savedProgressions };
}

function progressionName(key, tonality, numerals) {
  return `${normalizeCircleKey(key)} ${normalizeTonality(tonality)} \u00b7 ${numerals.join(" - ")}`;
}

function getProgressionContext(builder) {
  const key = getCircleKeyData(builder.key);
  const keyAccidental = key.type === "flats" ? "flats" : "sharps";
  const scale = getScaleForTonality(key.major, builder.tonality, keyAccidental);
  const accidental = scale.some((note) => note.includes("b")) ? "flats" : keyAccidental;
  const chords = builder.numerals.map((token) => chordInfoForRoman(token, scale, builder.tonality, accidental));
  const focusedIndex = Math.max(0, Math.min(chords.length - 1, builder.focusedIndex || 0));
  const focusedNumeral = builder.numerals[focusedIndex];
  const focusedChord = chords[focusedIndex];
  return { key, accidental, scale, chords, focusedIndex, focusedNumeral, focusedChord };
}

function getPositionDefinition(positionLearning) {
  const system = POSITION_SYSTEMS[positionLearning.system] || POSITION_SYSTEMS.caged;
  const shape = CAGED_SHAPES[positionLearning.selectedShape] || CAGED_SHAPES.C;
  const box = POSITION_BOXES[positionLearning.selectedBox] || POSITION_BOXES.box1;
  return {
    system,
    shape,
    box,
    active: system.group === "caged" ? shape : box,
  };
}

function getPositionIntervals(positionLearning) {
  const { system } = getPositionDefinition(positionLearning);
  if (system.group === "caged") {
    return positionLearning.tonality === "minor"
      ? { intervals: [0, 3, 7], labels: ["R", "b3", "5"] }
      : { intervals: [0, 4, 7], labels: ["R", "3", "5"] };
  }
  return { intervals: system.intervals, labels: system.intervalLabels };
}

function getPositionNotes(positionLearning) {
  return notesFromPattern(positionLearning.rootNote, getPositionIntervals(positionLearning).intervals);
}

function fretForNoteOnString(rootNote, openNote, frets) {
  const openIndex = NOTES.indexOf(normalizeNote(openNote));
  const rootIndex = NOTES.indexOf(normalizeNote(rootNote));
  const first = (rootIndex - openIndex + 12) % 12;
  for (let fret = first; fret <= frets; fret += 12) {
    if (fret >= 0) return fret;
  }
  return null;
}

function clampRange(range, frets) {
  const start = Math.max(0, Math.min(frets, Math.round(range[0])));
  const end = Math.max(start, Math.min(frets, Math.round(range[1])));
  return { start, end };
}

function getPositionFretRange(positionLearning, tuning, frets) {
  if (positionLearning.focusRange === "full") return { start: 0, end: frets };
  if (FOCUS_RANGES[positionLearning.focusRange]) return clampRange(FOCUS_RANGES[positionLearning.focusRange], frets);
  const { system, active } = getPositionDefinition(positionLearning);
  const anchorString = Math.min(tuning.strings.length - 1, active.anchorString ?? 0);
  const openNote = tuning.strings[anchorString] || tuning.strings[0] || "E";
  const rootFret = fretForNoteOnString(positionLearning.rootNote, openNote, frets);
  const span = active.span || [0, 3];
  if (rootFret !== null) return clampRange([rootFret + span[0], rootFret + span[1]], frets);
  return clampRange(active.fallbackRange || (system.group === "caged" ? [3, 7] : [5, 8]), frets);
}

function isInPositionRange(positionLearning, tuning, frets, fret) {
  const range = getPositionFretRange(positionLearning, tuning, frets);
  return fret >= range.start && fret <= range.end;
}

function getPositionMarker(positionLearning, note, stringIndex, fret, tuning, frets) {
  const notes = getPositionNotes(positionLearning);
  const noteIndex = notes.indexOf(note);
  const inSystem = noteIndex !== -1;
  const range = getPositionFretRange(positionLearning, tuning, frets);
  const inRange = fret >= range.start && fret <= range.end;
  const root = note === positionLearning.rootNote;
  const interval = inSystem ? getPositionIntervals(positionLearning).labels[noteIndex] : "";
  return {
    inSystem,
    inRange,
    root,
    interval,
    boundary: inRange && (fret === range.start || fret === range.end),
  };
}

function getPositionSummary(state, tuning = store.tuning) {
  const positionLearning = state.positionLearning;
  const { system, shape, box } = getPositionDefinition(positionLearning);
  const formula = getPositionIntervals(positionLearning).labels.join(" ");
  const range = getPositionFretRange(positionLearning, tuning, state.frets);
  const root = displayNote(positionLearning.rootNote, state.accidental);
  const shapeLabel = system.group === "caged" ? shape.label : system.group === "scale" ? box.positionLabel : box.label;
  const title =
    system.group === "caged"
      ? `${system.label} \u00b7 ${root} ${positionLearning.tonality} \u00b7 ${shape.label}`
      : `${system.label} \u00b7 ${root} \u00b7 ${shapeLabel}`;
  const detail = `Formula: ${formula} \u00b7 Focus: frets ${range.start}-${range.end}`;
  return { title, detail, formula, range, root, shapeLabel };
}

function progressionExplanation(builder) {
  const { scale, focusedNumeral, focusedChord } = getProgressionContext(builder);
  const functionName = getChordFunction(focusedNumeral);
  const chordTones = notesFromPattern(focusedChord.root, CHORDS[focusedChord.type] || CHORDS.Major);
  const keyNotes = scale.map(normalizeNote);
  const passing = keyNotes.filter((note) => !chordTones.includes(note)).slice(0, 4);
  const arc = builder.numerals.join("-");
  const overview =
    arc === "I-V-vi-IV"
      ? "This starts at home, moves to dominant tension, shifts to the relative minor, then lands on the IV chord for a broad, familiar pop sound."
      : `This progression moves through ${[...new Set(builder.numerals.map(getChordFunction))].join(", ")} functions, giving you a clear harmonic path to write over.`;
  const focus =
    functionName === "dominant"
      ? `The focused chord is ${focusedNumeral}, which creates tension and usually wants to resolve back to I.`
      : functionName === "tonic"
        ? `The focused chord is ${focusedNumeral}, which feels settled and anchors the key.`
        : functionName === "relative"
          ? `The focused chord is ${focusedNumeral}, which brings relative-minor colour while staying close to home.`
          : functionName === "colour/borrowed"
            ? `The focused chord is ${focusedNumeral}, which adds borrowed colour outside the plain diatonic set.`
            : `The focused chord is ${focusedNumeral}, which sets up motion towards stronger resolution points.`;
  return {
    overview,
    focus,
    melody: `Suggested melody notes over this chord: ${chordTones.join(", ")}.`,
    passing: `Good passing notes from the key: ${(passing.length ? passing : keyNotes).join(", ")}.`,
  };
}

function nextChordSuggestions(builder) {
  const current = builder.numerals[builder.focusedIndex] || builder.numerals[0];
  const { degree } = splitRomanToken(current);
  const supported = supportedNumeralsForTonality(builder.tonality);
  const direct = NEXT_CHORD_SUGGESTIONS[builder.tonality]?.[current] || NEXT_CHORD_SUGGESTIONS[builder.tonality]?.[degree] || [];
  return direct.filter((token) => supported.includes(token));
}

function sanitizeChordIdentifier(identifier = {}, tuning, frets) {
  const incoming = Array.isArray(identifier.selectedShape) ? identifier.selectedShape : [];
  const byString = new Map(incoming.map((item) => [Number(item.stringIndex), item]));
  const selectedShape = tuning.strings.map((_, stringIndex) => {
    const item = byString.get(stringIndex);
    const muted = item ? Boolean(item.muted) : true;
    const fret = muted ? null : Math.max(0, Math.min(frets, Number(item.fret) || 0));
    return { stringIndex, fret, muted };
  });
  const savedShapes = Array.isArray(identifier.savedShapes)
    ? identifier.savedShapes
        .filter((item) => item && Array.isArray(item.strings))
        .map((item) => ({
          id: item.id || uid(),
          name: item.name || "Saved chord shape",
          tuningId: item.tuningId || tuning.id,
          strings: item.strings
            .filter((entry) => Number.isInteger(Number(entry.stringIndex)))
            .map((entry) => ({
              stringIndex: Number(entry.stringIndex),
              fret: entry.muted ? null : Math.max(0, Number(entry.fret) || 0),
              muted: Boolean(entry.muted),
            })),
          createdAt: item.createdAt || new Date().toISOString(),
        }))
    : [];
  return {
    selectedShape,
    showLabels: identifier.showLabels === undefined ? true : Boolean(identifier.showLabels),
    savedShapes,
  };
}

function getSelectedNotes(shape, tuning) {
  return shape
    .filter((string) => !string.muted && string.fret !== null)
    .sort((a, b) => a.stringIndex - b.stringIndex)
    .map((string) => ({
      stringIndex: string.stringIndex,
      fret: string.fret,
      note: noteAt(tuning.strings[string.stringIndex] || "C", string.fret),
    }));
}

function getUniquePitchClasses(notes) {
  const seen = new Set();
  return notes
    .map((item) => normalizeNote(item.note || item))
    .filter((note) => {
      if (seen.has(note)) return false;
      seen.add(note);
      return true;
    });
}

function getIntervalsFromRoot(pitchClasses, root) {
  const rootIndex = NOTES.indexOf(normalizeNote(root));
  return pitchClasses.map((note) => (NOTES.indexOf(normalizeNote(note)) - rootIndex + 12) % 12).sort((a, b) => a - b);
}

function sameIntervalSet(left, right) {
  return left.length === right.length && left.every((interval, index) => interval === right[index]);
}

function matchChordFormulas(intervals) {
  return Object.entries(NORMALIZED_CHORD_FORMULAS)
    .map(([name, formula]) => {
      const selected = new Set(intervals);
      const formulaSet = new Set(formula);
      const shared = formula.filter((interval) => selected.has(interval));
      const missing = formula.filter((interval) => !selected.has(interval));
      const extra = intervals.filter((interval) => !formulaSet.has(interval));
      return {
        formulaName: name,
        formula,
        exact: sameIntervalSet(intervals, formula),
        shared,
        missing,
        extra,
      };
    })
    .filter((match) => match.shared.length);
}

function formatChordName(root, formulaName, bassNote, accidental = "sharps") {
  const suffix = formulaName === "major" ? "" : formulaName === "minor" ? "m" : formulaName === "madd9" ? "madd9" : formulaName;
  const rootLabel = displayNote(root, accidental);
  const base = `${rootLabel}${suffix}`;
  return bassNote && normalizeNote(bassNote) !== normalizeNote(root) ? `${base}/${displayNote(bassNote, accidental)}` : base;
}

function rankChordMatches(matches, selectedNotes, bassNote) {
  const rootNotes = new Set(selectedNotes.map((item) => item.note));
  return matches.sort((a, b) => {
    if (a.exact !== b.exact) return a.exact ? -1 : 1;
    if (a.extra.length !== b.extra.length) return a.extra.length - b.extra.length;
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    const aRootPresent = rootNotes.has(a.root);
    const bRootPresent = rootNotes.has(b.root);
    if (aRootPresent !== bRootPresent) return aRootPresent ? -1 : 1;
    const aBassRoot = normalizeNote(a.root) === normalizeNote(bassNote);
    const bBassRoot = normalizeNote(b.root) === normalizeNote(bassNote);
    if (aBassRoot !== bBassRoot) return aBassRoot ? -1 : 1;
    const aComplexity = CHORD_FORMULA_COMPLEXITY[a.formulaName] || 9;
    const bComplexity = CHORD_FORMULA_COMPLEXITY[b.formulaName] || 9;
    if (aComplexity !== bComplexity) return aComplexity - bComplexity;
    return a.formula.length - b.formula.length;
  });
}

function chordTonesForMatch(match, accidental = "sharps") {
  return match.formula.map((interval) => displayNote(transpose(match.root, interval), accidental));
}

function intervalLabelsForMatch(match) {
  return match.formula.map((interval) => INTERVAL_LABELS[interval] || String(interval));
}

function detectChord(shape, tuning, accidental = "sharps") {
  const selectedNotes = getSelectedNotes(shape, tuning);
  const pitchClasses = getUniquePitchClasses(selectedNotes);
  const bassNote = selectedNotes[0]?.note || null;
  if (!pitchClasses.length) {
    return {
      selectedNotes,
      pitchClasses,
      bassNote,
      exact: false,
      best: null,
      alternatives: [],
      title: "Select notes to identify a chord",
      explanation: "Choose open strings or fretted notes to build a shape.",
    };
  }
  const candidates = pitchClasses.flatMap((root) => {
    const intervals = getIntervalsFromRoot(pitchClasses, root);
    return matchChordFormulas(intervals).map((match) => ({
      ...match,
      root,
      intervals,
      label: formatChordName(root, match.formulaName, bassNote, accidental),
    }));
  });
  const ranked = rankChordMatches(candidates, selectedNotes, bassNote);
  const exact = ranked.filter((match) => match.exact);
  const usable = exact.length ? exact : ranked.slice(0, 5);
  const best = usable[0] || null;
  if (!best) {
    return {
      selectedNotes,
      pitchClasses,
      bassNote,
      exact: false,
      best: null,
      alternatives: [],
      title: "No exact match found",
      explanation: "Try adding or removing a note.",
    };
  }
  const alternatives = usable.filter((match) => match !== best).slice(0, 5);
  const bassText = bassNote ? displayNote(bassNote, accidental) : "";
  const explanation = best.exact
    ? normalizeNote(best.root) === normalizeNote(bassNote)
      ? `This is a ${formatChordName(best.root, best.formulaName, null, accidental)} chord with ${bassText} as the lowest sounding note.`
      : `This is a ${formatChordName(best.root, best.formulaName, null, accidental)} chord with ${bassText} as the lowest sounding note.`
    : `No exact match found. Closest matches share ${best.shared.length} chord tone${best.shared.length === 1 ? "" : "s"} with your shape.`;
  return {
    selectedNotes,
    pitchClasses,
    bassNote,
    exact: Boolean(exact.length),
    best,
    alternatives,
    title: exact.length ? best.label : "No exact match found",
    explanation,
  };
}

function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.append(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("Clipboard unavailable"));
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
  circleFocusChord: null,
  selectedScale: "Major",
  selectedChord: "Major",
  selectedNotes: ["C"],
  chordIdentifier: {
    selectedShape: [],
    showLabels: true,
    savedShapes: [],
  },
  chordHelper: {
    key: "C",
    tonality: "major",
    style: "Pop",
    complexity: "Simple",
    focusChord: null,
  },
  progressionBuilder: {
    key: "C",
    tonality: "major",
    numerals: ["I", "V", "vi", "IV"],
    focusedIndex: 0,
    savedProgressions: [],
  },
  positionLearning: {
    rootNote: "C",
    tonality: "major",
    system: "caged",
    selectedShape: "C",
    selectedBox: "box1",
    focusRange: "auto",
    showOnlyPosition: true,
    showRoots: true,
    showIntervals: true,
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
      mode: MODES.includes(state.mode) ? state.mode : "all",
      accidental: state.accidental === "flats" ? "flats" : "sharps",
      theme: state.theme === "dark" ? "dark" : "light",
      rootNote: normalizeNote(state.rootNote),
      circleKey: normalizeCircleKey(state.circleKey || state.rootNote, state.accidental),
      circleFocusChord: sanitizeFocusChord(state.circleFocusChord),
      selectedNotes: Array.isArray(state.selectedNotes) && state.selectedNotes.length ? [...new Set(state.selectedNotes.map(normalizeNote))] : ["C"],
      selectedScale: SCALES[state.selectedScale] ? state.selectedScale : "Major",
      selectedChord: CHORDS[state.selectedChord] ? state.selectedChord : "Major",
      chordIdentifier: sanitizeChordIdentifier(state.chordIdentifier, tuning, clampFrets(state.frets || tuning.defaultFrets || 22)),
      chordHelper: {
        ...defaultState.chordHelper,
        ...(state.chordHelper || {}),
        key: normalizeCircleKey(state.chordHelper?.key || state.circleKey || state.rootNote, state.accidental),
        tonality: normalizeTonality(state.chordHelper?.tonality),
        style: normalizeHelperStyle(state.chordHelper?.style),
        complexity: normalizeHelperComplexity(state.chordHelper?.complexity),
        focusChord: sanitizeFocusChord(state.chordHelper?.focusChord),
      },
      progressionBuilder: sanitizeProgressionBuilder(state.progressionBuilder, state.accidental),
      positionLearning: sanitizePositionLearning(state.positionLearning),
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
    this.navOpen = false;
    super.connectedCallback();
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    }
    this.addEventListener("app-update", (event) => {
      this.navOpen = false;
      store.update(event.detail);
    });
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
    this.addEventListener("identifier-action", (event) => handleIdentifierAction(event.detail.action, event.detail));
  }

  render() {
    const { theme, accidental, mode } = store.state;
    const modeLabel = MODE_LABELS[mode] || "Axe";
    this.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand" aria-label="Axe">
            <span class="brand-mark" aria-hidden="true">🎸</span>
            <span class="brand-name brand-name-desktop">Axe</span>
            <span class="brand-name brand-name-mobile">${escapeHtml(modeLabel)}</span>
          </div>
          <button class="menu-toggle" type="button" data-action="toggle-menu" aria-label="${this.navOpen ? "Close menu" : "Open menu"}" aria-controls="primary-menu" aria-expanded="${this.navOpen}">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div id="primary-menu" class="top-menu ${this.navOpen ? "is-open" : ""}">
            <mode-selector></mode-selector>
            <div class="top-actions">
              <button type="button" data-action="settings" aria-haspopup="dialog">Settings</button>
            </div>
          </div>
        </header>
        <main class="content">
          <section class="controls" aria-label="Fretboard controls">
            <note-filter></note-filter>
            <scale-panel></scale-panel>
            <chord-panel></chord-panel>
            <chord-identifier-panel></chord-identifier-panel>
            <circle-of-fifths-panel></circle-of-fifths-panel>
            <chord-helper-panel></chord-helper-panel>
            <progression-builder-panel></progression-builder-panel>
            <position-panel></position-panel>
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
    this.querySelector("[data-action='toggle-menu']").addEventListener("click", () => {
      this.navOpen = !this.navOpen;
      this.render();
    });
    this.querySelector("[data-action='settings']").addEventListener("click", () => {
      this.navOpen = false;
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
    const modes = MODES.map((mode) => [mode, MODE_LABELS[mode]]);
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
      </section>
    `;
    this.querySelector("[name='root']").addEventListener("change", (event) => this.emit("app-update", { rootNote: event.target.value }));
    this.querySelector("[name='chord']").addEventListener("change", (event) => this.emit("app-update", { selectedChord: event.target.value }));
  }
}

class ChordIdentifierPanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "identifier") {
      this.innerHTML = "";
      return;
    }
    const tuning = store.tuning;
    const identifier = state.chordIdentifier;
    const detection = detectChord(identifier.selectedShape, tuning, state.accidental);
    const selectedNoteLabels = detection.selectedNotes.map((item) => displayNote(item.note, state.accidental));
    const best = detection.best;
    this.innerHTML = `
      <section class="panel chord-identifier-panel">
        <h2>Chord Identifier</h2>
        <div class="identifier-results">
          <div class="summary-block">
            <span>${detection.exact ? "Best match" : "Result"}</span>
            <strong>${escapeHtml(detection.title)}</strong>
            <p>${escapeHtml(detection.explanation)}</p>
          </div>
          <div class="identifier-facts">
            <div class="summary-block">
              <span>Notes</span>
              <strong>${selectedNoteLabels.length ? escapeHtml(selectedNoteLabels.join(", ")) : "None"}</strong>
            </div>
            <div class="summary-block">
              <span>Bass note</span>
              <strong>${detection.bassNote ? escapeHtml(displayNote(detection.bassNote, state.accidental)) : "None"}</strong>
            </div>
            <div class="summary-block">
              <span>Chord tones</span>
              <strong>${best ? escapeHtml(chordTonesForMatch(best, state.accidental).join(", ")) : "None"}</strong>
            </div>
            <div class="summary-block">
              <span>Intervals</span>
              <strong>${best ? escapeHtml(intervalLabelsForMatch(best).join(", ")) : "None"}</strong>
            </div>
          </div>
          ${
            detection.alternatives.length
              ? `
                <div class="identifier-alternatives">
                  <strong>Possible matches</strong>
                  <ol>
                    ${detection.alternatives.map((match) => `<li>${escapeHtml(match.label)}</li>`).join("")}
                  </ol>
                </div>
              `
              : ""
          }
          ${
            !detection.exact && best
              ? `
                <div class="identifier-alternatives">
                  <strong>Closest possibility detail</strong>
                  <p>Missing: ${escapeHtml(best.missing.map((interval) => INTERVAL_LABELS[interval] || String(interval)).join(", ") || "none")}. Extra: ${escapeHtml(best.extra.map((interval) => INTERVAL_LABELS[interval] || String(interval)).join(", ") || "none")}.</p>
                </div>
              `
              : ""
          }
        </div>
        <div class="builder-actions identifier-actions">
          <button type="button" data-action="toggle-labels" aria-pressed="${identifier.showLabels}">Show labels</button>
          <button type="button" data-action="clear-shape">Clear shape</button>
          <button type="button" class="primary" data-action="save-shape" ${detection.selectedNotes.length ? "" : "disabled"}>Save shape</button>
        </div>
        <div class="saved-progressions identifier-saved">
          <strong>Saved shapes</strong>
          ${
            identifier.savedShapes.length
              ? `<div class="saved-list">
                  ${identifier.savedShapes
                    .map(
                      (shape) => `
                        <div class="saved-progression">
                          <div>
                            <b>${escapeHtml(shape.name)}</b>
                            <span>${escapeHtml(shape.tuningId === tuning.id ? labelForTuning(tuning) : shape.tuningId)}</span>
                          </div>
                          <div class="button-row">
                            <button type="button" data-load-shape="${escapeHtml(shape.id)}">Load</button>
                            <button type="button" class="danger" data-delete-shape="${escapeHtml(shape.id)}">Delete</button>
                          </div>
                        </div>
                      `,
                    )
                    .join("")}
                </div>`
              : `<p>No saved shapes yet.</p>`
          }
        </div>
      </section>
    `;
    this.querySelector("[data-action='toggle-labels']").addEventListener("click", () => this.emit("identifier-action", { action: "toggle-labels" }));
    this.querySelector("[data-action='clear-shape']").addEventListener("click", () => this.emit("identifier-action", { action: "clear" }));
    this.querySelector("[data-action='save-shape']").addEventListener("click", () => this.emit("identifier-action", { action: "save" }));
    this.querySelectorAll("[data-load-shape]").forEach((button) => {
      button.addEventListener("click", () => this.emit("identifier-action", { action: "load", id: button.dataset.loadShape }));
    });
    this.querySelectorAll("[data-delete-shape]").forEach((button) => {
      button.addEventListener("click", () => this.emit("identifier-action", { action: "delete", id: button.dataset.deleteShape }));
    });
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
    const relativeMinor = { label: selectedKey.minor, root: normalizeNote(selectedKey.scale[5]), type: "Minor" };
    const relatedChords = getCloselyRelatedKeyChords(selectedKey.major);
    const borrowedChords = getBorrowedChordOptions(selectedKey);
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
                <div class="summary-chords">${this.renderCircleChordButton(relativeMinor)}</div>
              </div>
              <div class="summary-block">
                <span>Accidentals</span>
                <strong>${escapeHtml(accidentalLabel(selectedKey))}</strong>
              </div>
              <div class="summary-block wide">
                <span>Closely related</span>
                <div class="summary-chords">${relatedChords.map((chord) => this.renderCircleChordButton(chord)).join("")}</div>
              </div>
            </div>
            <div class="summary-block">
              <span>Diatonic chords</span>
              <div class="chord-grid">
                ${chords.map((item) => this.renderCircleChordButton({ label: item.chord, root: item.root, type: item.type, degree: item.degree })).join("")}
              </div>
            </div>
            <div class="summary-block">
              <span>Borrowed/modal color</span>
              <div class="summary-chords">${borrowedChords.map((chord) => this.renderCircleChordButton(chord)).join("")}</div>
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
          circleFocusChord: null,
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
    this.querySelectorAll("[data-circle-chord-root]").forEach((button) => {
      button.addEventListener("click", () => {
        const focusChord = {
          label: button.dataset.circleChordLabel,
          root: button.dataset.circleChordRoot,
          type: button.dataset.circleChordType,
        };
        this.emit("app-update", {
          circleFocusChord: focusChord,
          rootNote: focusChord.root,
          selectedChord: focusChord.type,
        });
      });
    });
  }

  renderCircleChordButton(chord) {
    const focused = store.state.circleFocusChord;
    return `
      <button type="button" data-circle-chord-root="${escapeHtml(chord.root)}" data-circle-chord-type="${escapeHtml(chord.type)}" data-circle-chord-label="${escapeHtml(chord.label)}" aria-pressed="${focused?.root === chord.root && focused?.type === chord.type}">
        ${chord.degree ? `<b>${escapeHtml(chord.degree)}</b>` : ""}
        <span>${escapeHtml(chord.label)}</span>
      </button>
    `;
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
          ${Object.values(CHORD_FUNCTIONS)
            .map((text) => `<span>${escapeHtml(text)}</span>`)
            .join("")}
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
    const focused = store.state.chordHelper.focusChord;
    const chords = suggestion.numerals.map((token) => chordInfoForRoman(token, scale, tonality, key.type === "flats" ? "flats" : "sharps"));
    return `
      <article class="progression-card">
        <div class="progression-head">
          <strong>${suggestion.numerals.map(escapeHtml).join(" - ")}</strong>
          <span>${escapeHtml(suggestion.complexity)}</span>
        </div>
        <div class="progression-chords">${chords
          .map(
            (chord) => `
          <button type="button" data-helper-chord-root="${escapeHtml(chord.root)}" data-helper-chord-type="${escapeHtml(chord.type)}" data-helper-chord-label="${escapeHtml(chord.label)}" aria-pressed="${focused?.root === chord.root && focused?.type === chord.type}">
            ${escapeHtml(chord.label)}
          </button>
        `,
          )
          .join("")}</div>
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
      chordHelper: { ...nextHelper, focusChord: null },
      rootNote: normalizeNote(key.major),
      selectedScale: nextHelper.tonality === "minor" ? "Natural Minor" : "Major",
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", (event) => {
      const button = event.target.closest("[data-helper-chord-root]");
      if (!button) return;
      const focusChord = {
        label: button.dataset.helperChordLabel,
        root: button.dataset.helperChordRoot,
        type: button.dataset.helperChordType,
      };
      this.emit("app-update", {
        chordHelper: { ...store.state.chordHelper, focusChord },
        rootNote: focusChord.root,
        selectedChord: focusChord.type,
      });
    });
  }
}

class ProgressionBuilderPanel extends BaseElement {
  constructor() {
    super();
    this.copyStatus = "";
  }

  render() {
    const state = store.state;
    if (state.mode !== "progression") {
      this.innerHTML = "";
      return;
    }
    const builder = state.progressionBuilder;
    const context = getProgressionContext(builder);
    const explanation = progressionExplanation(builder);
    const supported = supportedNumeralsForTonality(builder.tonality);
    const suggestions = nextChordSuggestions(builder);
    this.innerHTML = `
      <section class="panel progression-builder-panel">
        <h2>Progression Builder</h2>
        <div class="compact-grid progression-controls">
          <label>Key
            <select name="progressionKey">
              ${CIRCLE_KEYS.map((item) => `<option value="${escapeHtml(item.major)}" ${item.major === context.key.major ? "selected" : ""}>${escapeHtml(item.major)}</option>`).join("")}
            </select>
          </label>
          <label>Tonality
            <select name="progressionTonality">
              <option value="major" ${builder.tonality === "major" ? "selected" : ""}>Major</option>
              <option value="minor" ${builder.tonality === "minor" ? "selected" : ""}>Minor</option>
            </select>
          </label>
        </div>
        <div class="builder-chord-row" aria-label="Current progression">
          ${builder.numerals.map((token, index) => this.renderChordCard(token, context.chords[index], index, builder.focusedIndex)).join("")}
        </div>
        <div class="builder-actions">
          <label>Add chord
            <select name="addNumeral">
              ${supported.map((token) => `<option value="${escapeHtml(token)}">${escapeHtml(token)}</option>`).join("")}
            </select>
          </label>
          <button type="button" data-action="add-chord" class="primary">Add chord</button>
          <button type="button" data-action="remove-chord" class="danger" ${builder.numerals.length <= 1 ? "disabled" : ""}>Remove focused chord</button>
          <button type="button" data-action="move-left" ${builder.focusedIndex <= 0 ? "disabled" : ""}>Move left</button>
          <button type="button" data-action="move-right" ${builder.focusedIndex >= builder.numerals.length - 1 ? "disabled" : ""}>Move right</button>
          <button type="button" data-action="reset-common">Reset to common progression</button>
          <button type="button" data-action="save-progression">Save progression</button>
          <button type="button" data-action="copy-progression">Copy progression</button>
        </div>
        <div class="suggestion-row" aria-label="Suggested next chords">
          <strong>Suggested next chords</strong>
          <div class="chip-row">
            ${suggestions.length ? suggestions.map((token) => `<button type="button" data-suggest="${escapeHtml(token)}">${escapeHtml(token)}</button>`).join("") : `<span class="info-chip">Try I or V</span>`}
          </div>
        </div>
        <div class="explanation-grid">
          <article class="summary-block wide">
            <span>Why it works</span>
            <p>${escapeHtml(explanation.overview)}</p>
            <p>${escapeHtml(explanation.focus)}</p>
            <p>${escapeHtml(explanation.melody)}</p>
            <p>${escapeHtml(explanation.passing)}</p>
          </article>
          <article class="summary-block">
            <span>Resolved chords</span>
            <strong>${context.chords.map((chord) => escapeHtml(chord.label)).join(" - ")}</strong>
          </article>
          <article class="summary-block">
            <span>Focused chord tones</span>
            <strong>${notesFromPattern(context.focusedChord.root, CHORDS[context.focusedChord.type] || CHORDS.Major)
              .map((note) => escapeHtml(displayNote(note, context.accidental)))
              .join(" ")}</strong>
          </article>
        </div>
        <div class="saved-progressions">
          <div class="progression-head">
            <strong>Saved progressions</strong>
            <span aria-live="polite">${escapeHtml(this.copyStatus)}</span>
          </div>
          ${
            builder.savedProgressions.length
              ? `<div class="saved-list">${builder.savedProgressions.map((item) => this.renderSavedProgression(item)).join("")}</div>`
              : `<p>No saved progressions yet.</p>`
          }
        </div>
      </section>
    `;
    this.bindEvents();
  }

  renderChordCard(token, chord, index, focusedIndex) {
    const focused = index === focusedIndex;
    const functionName = getChordFunction(token);
    return `
      <button type="button" class="builder-chord-card" data-focus-index="${index}" aria-current="${focused ? "true" : "false"}" aria-label="Focus ${escapeHtml(token)} ${escapeHtml(chord.label)}">
        <b>${escapeHtml(token)}</b>
        <span>${escapeHtml(chord.label)}</span>
        <small>${escapeHtml(functionName)}</small>
      </button>
    `;
  }

  renderSavedProgression(item) {
    return `
      <article class="saved-progression">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.numerals.join(" - "))}</span>
        </div>
        <div class="button-row">
          <button type="button" data-load-saved="${escapeHtml(item.id)}">Load</button>
          <button type="button" class="danger" data-delete-saved="${escapeHtml(item.id)}">Delete</button>
        </div>
      </article>
    `;
  }

  bindEvents() {
    this.querySelector("[name='progressionKey']").addEventListener("change", (event) => this.updateBuilder({ key: event.target.value }));
    this.querySelector("[name='progressionTonality']").addEventListener("change", (event) => {
      const tonality = normalizeTonality(event.target.value);
      const numerals = tonality === "minor" ? ["i", "VI", "VII", "i"] : ["I", "V", "vi", "IV"];
      this.updateBuilder({ tonality, numerals, focusedIndex: 0 });
    });
    this.querySelector("[data-action='add-chord']").addEventListener("click", () => {
      const token = this.querySelector("[name='addNumeral']").value;
      const builder = store.state.progressionBuilder;
      this.updateBuilder({ numerals: [...builder.numerals, token], focusedIndex: builder.numerals.length });
    });
    this.querySelector("[data-action='remove-chord']").addEventListener("click", () => this.removeFocusedChord());
    this.querySelector("[data-action='move-left']").addEventListener("click", () => this.moveFocusedChord(-1));
    this.querySelector("[data-action='move-right']").addEventListener("click", () => this.moveFocusedChord(1));
    this.querySelector("[data-action='reset-common']").addEventListener("click", () => {
      const builder = store.state.progressionBuilder;
      this.updateBuilder({ numerals: builder.tonality === "minor" ? ["i", "VI", "VII", "i"] : ["I", "V", "vi", "IV"], focusedIndex: 0 });
    });
    this.querySelector("[data-action='save-progression']").addEventListener("click", () => this.saveProgression());
    this.querySelector("[data-action='copy-progression']").addEventListener("click", () => this.copyProgression());
    this.querySelectorAll("[data-focus-index]").forEach((button) => {
      button.addEventListener("click", () => this.updateBuilder({ focusedIndex: Number(button.dataset.focusIndex) }));
    });
    this.querySelectorAll("[data-suggest]").forEach((button) => {
      button.addEventListener("click", () => this.insertSuggestion(button.dataset.suggest));
    });
    this.querySelectorAll("[data-load-saved]").forEach((button) => {
      button.addEventListener("click", () => this.loadSaved(button.dataset.loadSaved));
    });
    this.querySelectorAll("[data-delete-saved]").forEach((button) => {
      button.addEventListener("click", () => this.deleteSaved(button.dataset.deleteSaved));
    });
  }

  updateBuilder(patch) {
    const next = { ...store.state.progressionBuilder, ...patch };
    store.update({ progressionBuilder: next });
  }

  removeFocusedChord() {
    const builder = store.state.progressionBuilder;
    if (builder.numerals.length <= 1) return;
    const numerals = builder.numerals.filter((_, index) => index !== builder.focusedIndex);
    this.updateBuilder({ numerals, focusedIndex: Math.max(0, builder.focusedIndex - 1) });
  }

  moveFocusedChord(direction) {
    const builder = store.state.progressionBuilder;
    const target = builder.focusedIndex + direction;
    if (target < 0 || target >= builder.numerals.length) return;
    const numerals = [...builder.numerals];
    [numerals[builder.focusedIndex], numerals[target]] = [numerals[target], numerals[builder.focusedIndex]];
    this.updateBuilder({ numerals, focusedIndex: target });
  }

  insertSuggestion(token) {
    const builder = store.state.progressionBuilder;
    const numerals = [...builder.numerals];
    numerals.splice(builder.focusedIndex + 1, 0, token);
    this.updateBuilder({ numerals, focusedIndex: builder.focusedIndex + 1 });
  }

  saveProgression() {
    const builder = store.state.progressionBuilder;
    const saved = {
      id: uid(),
      name: progressionName(builder.key, builder.tonality, builder.numerals),
      key: builder.key,
      tonality: builder.tonality,
      numerals: [...builder.numerals],
      createdAt: new Date().toISOString(),
    };
    this.updateBuilder({ savedProgressions: [saved, ...builder.savedProgressions] });
  }

  loadSaved(id) {
    const item = store.state.progressionBuilder.savedProgressions.find((saved) => saved.id === id);
    if (!item) return;
    this.updateBuilder({ key: item.key, tonality: item.tonality, numerals: [...item.numerals], focusedIndex: 0 });
  }

  deleteSaved(id) {
    const builder = store.state.progressionBuilder;
    this.updateBuilder({ savedProgressions: builder.savedProgressions.filter((item) => item.id !== id) });
  }

  copyProgression() {
    const builder = store.state.progressionBuilder;
    const context = getProgressionContext(builder);
    const text = `${context.key.major} ${builder.tonality}\n${builder.numerals.join(" - ")}\n${context.chords.map((chord) => chord.label).join(" - ")}`;
    copyTextToClipboard(text)
      .then(() => {
        this.copyStatus = "Copied";
        this.render();
      })
      .catch(() => {
        this.copyStatus = "Copy unavailable";
        this.render();
      });
  }
}

class PositionPanel extends BaseElement {
  render() {
    const state = store.state;
    if (state.mode !== "positions") {
      this.innerHTML = "";
      return;
    }
    const positionLearning = state.positionLearning;
    const { system, shape, box, active } = getPositionDefinition(positionLearning);
    const isCaged = system.group === "caged";
    const isScale = system.group === "scale";
    const summary = getPositionSummary(state);
    this.innerHTML = `
      <section class="panel position-panel">
        <h2>Positions</h2>
        <div class="compact-grid position-controls">
          <label>Root
            <select name="positionRoot">${NOTES.map((note) => `<option value="${note}" ${note === positionLearning.rootNote ? "selected" : ""}>${escapeHtml(displayNote(note, state.accidental))}</option>`).join("")}</select>
          </label>
          <label>System
            <select name="positionSystem">
              ${Object.entries(POSITION_SYSTEMS)
                .map(
                  ([value, item]) =>
                    `<option value="${value}" ${value === positionLearning.system ? "selected" : ""}>${escapeHtml(item.label)}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label>Tonality
            <select name="positionTonality" ${isCaged ? "" : "disabled"}>
              <option value="major" ${positionLearning.tonality === "major" ? "selected" : ""}>Major</option>
              <option value="minor" ${positionLearning.tonality === "minor" ? "selected" : ""}>Minor</option>
            </select>
          </label>
          ${
            isCaged
              ? `<label>Shape
                  <select name="positionShape">
                    ${Object.values(CAGED_SHAPES)
                      .map(
                        (item) =>
                          `<option value="${item.id}" ${item.id === positionLearning.selectedShape ? "selected" : ""}>${escapeHtml(item.label)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>`
              : `<label>${isScale ? "Position" : "Box"}
                  <select name="positionBox">
                    ${Object.values(POSITION_BOXES)
                      .map(
                        (item) =>
                          `<option value="${item.id}" ${item.id === positionLearning.selectedBox ? "selected" : ""}>${escapeHtml(isScale ? item.positionLabel : item.label)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>`
          }
          <label>Focus range
            <select name="positionFocusRange">
              <option value="auto" ${positionLearning.focusRange === "auto" ? "selected" : ""}>Auto</option>
              <option value="open" ${positionLearning.focusRange === "open" ? "selected" : ""}>Open</option>
              <option value="low" ${positionLearning.focusRange === "low" ? "selected" : ""}>Low frets</option>
              <option value="middle" ${positionLearning.focusRange === "middle" ? "selected" : ""}>Middle frets</option>
              <option value="high" ${positionLearning.focusRange === "high" ? "selected" : ""}>High frets</option>
              <option value="full" ${positionLearning.focusRange === "full" ? "selected" : ""}>Full neck</option>
            </select>
          </label>
        </div>
        <div class="button-row position-toggle-row" role="group" aria-label="Position display options">
          <button type="button" data-toggle="showOnlyPosition" aria-pressed="${positionLearning.showOnlyPosition}">Show only this position</button>
          <button type="button" data-toggle="showRoots" aria-pressed="${positionLearning.showRoots}">Show roots</button>
          <button type="button" data-toggle="showIntervals" aria-pressed="${positionLearning.showIntervals}">Show intervals</button>
        </div>
        <div class="explanation-grid position-explanation">
          <div class="summary-block">
            <span>${escapeHtml(summary.title)}</span>
            <p>${escapeHtml(system.description)} ${escapeHtml(active.description)}</p>
          </div>
          <div class="summary-block">
            <span>Try this</span>
            <p>${escapeHtml(active.tryThis)}</p>
          </div>
          <div class="summary-block wide">
            <span>Formula and focus</span>
            <p>${escapeHtml(summary.detail)}. ${escapeHtml(active.usage)}</p>
          </div>
        </div>
      </section>
    `;
    this.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", (event) => {
        const next = { ...store.state.positionLearning };
        if (event.target.name === "positionRoot") next.rootNote = event.target.value;
        if (event.target.name === "positionSystem") next.system = event.target.value;
        if (event.target.name === "positionTonality") next.tonality = event.target.value;
        if (event.target.name === "positionShape") next.selectedShape = event.target.value;
        if (event.target.name === "positionBox") next.selectedBox = event.target.value;
        if (event.target.name === "positionFocusRange") next.focusRange = event.target.value;
        this.emit("app-update", { positionLearning: next });
      });
    });
    this.querySelectorAll("[data-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.toggle;
        this.emit("app-update", { positionLearning: { ...store.state.positionLearning, [key]: !store.state.positionLearning[key] } });
      });
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
    const subtitle = getModeLabel(state, tuning);
    const positionSummary = state.mode === "positions" ? getPositionSummary(state, tuning) : null;
    const frets = Array.from({ length: state.frets }, (_, index) => index + 1);
    this.innerHTML = `
      <div class="fretboard-card">
        <div class="fretboard-toolbar">
          <div>
            <strong>${escapeHtml(labelForTuning(tuning))}</strong>
            <span>${tuning.strings.length} strings, ${state.frets} frets</span>
          </div>
          <span>${escapeHtml(subtitle)}</span>
          ${positionSummary ? `<span>${escapeHtml(positionSummary.detail)}</span>` : ""}
        </div>
        <div class="fretboard-scroll" tabindex="0" aria-label="Scrollable fretboard">
          <div class="fretboard" style="--fret-count: ${state.frets}; --fret-columns: ${state.frets}; --string-count: ${tuning.strings.length};">
            <span></span>
            ${frets.map((fret) => `<div class="fret-number">${fret}</div>`).join("")}
            ${rows
              .map((row) => {
                const identifierString =
                  state.mode === "identifier" ? state.chordIdentifier.selectedShape.find((string) => string.stringIndex === row.stringIndex) : null;
                const openSelected = identifierString && !identifierString.muted && identifierString.fret === 0;
                const mutedSelected = identifierString?.muted;
                const stringLabel = mutedSelected ? "x" : displayNote(row.openNote, state.accidental);
                const stringState = mutedSelected
                  ? "muted"
                  : openSelected
                    ? "open"
                    : identifierString && !identifierString.muted
                      ? "fretted"
                      : "idle";
                const stringAria =
                  state.mode === "identifier"
                    ? `String ${row.stringIndex + 1}, ${displayNote(row.openNote, state.accidental)}, ${stringState}. Activate to ${openSelected ? "mute this string" : "make this string open"}.`
                    : `String ${row.stringIndex + 1}, open ${displayNote(row.openNote, state.accidental)}`;
                return `
              ${
                state.mode === "identifier"
                  ? `<button type="button" class="string-name identifier-headstock ${openSelected ? "open-selected" : ""} ${mutedSelected ? "muted-selected" : ""}" data-identifier-string="${row.stringIndex}" aria-label="${escapeHtml(stringAria)}" aria-pressed="${openSelected || mutedSelected}">${escapeHtml(stringLabel)}</button>`
                  : `<div class="string-name">${escapeHtml(displayNote(row.openNote, state.accidental))}</div>`
              }
              ${row.frets
                .slice(1)
                .map((pos) => this.renderPosition(pos, visible, state, tuning))
                .join("")}
            `;
              })
              .join("")}
            <span></span>
            ${frets.map((fret) => `<div class="marker-cell ${MARKER_FRETS.has(fret) ? (DOUBLE_MARKERS.has(fret) ? "double" : "single") : ""}" aria-hidden="true"></div>`).join("")}
          </div>
        </div>
      </div>
    `;
    this.querySelectorAll("[data-position]").forEach((button) => {
      button.addEventListener("click", () => {
        if (store.state.mode === "identifier") {
          this.emit("identifier-action", { action: "select", position: button.dataset.position });
          return;
        }
        this.emit("quiz-action", { action: "select", position: button.dataset.position });
      });
    });
    this.querySelectorAll("[data-identifier-string]").forEach((button) => {
      button.addEventListener("click", () =>
        this.emit("identifier-action", { action: "toggle-string", stringIndex: Number(button.dataset.identifierString) }),
      );
    });
  }

  renderPosition(pos, visible, state, tuning) {
    const key = `${pos.stringIndex}:${pos.fret}`;
    const quiz = state.mode === "quiz" ? state.quiz : null;
    const identifierString =
      state.mode === "identifier" ? state.chordIdentifier.selectedShape.find((string) => string.stringIndex === pos.stringIndex) : null;
    const identifierSelected = identifierString && !identifierString.muted && identifierString.fret === pos.fret;
    const positionMarker =
      state.mode === "positions" ? getPositionMarker(state.positionLearning, pos.note, pos.stringIndex, pos.fret, tuning, state.frets) : null;
    const isPositionVisible = positionMarker?.inSystem && (positionMarker.inRange || !state.positionLearning.showOnlyPosition);
    const isVisible =
      state.mode === "positions"
        ? isPositionVisible
        : state.mode === "identifier"
          ? true
          : state.mode === "all" || visible.has(pos.note) || state.mode === "quiz";
    const progressionFocus = state.mode === "progression" ? getProgressionContext(state.progressionBuilder).focusedChord : null;
    const focusedRoot =
      state.mode === "helper" ? state.chordHelper.focusChord?.root : state.mode === "circle" ? state.circleFocusChord?.root : progressionFocus?.root;
    const isRoot =
      (state.mode === "positions" && state.positionLearning.showRoots && positionMarker?.root) ||
      ((state.mode === "scales" || state.mode === "chords") && pos.note === state.rootNote) ||
      (focusedRoot && pos.note === focusedRoot);
    const selected = state.mode === "identifier" ? identifierSelected : quiz?.selected.includes(key);
    const correctAnswer = quiz && pos.note === quiz.questionNote;
    const completed = quiz?.completed;
    const classes = [
      !isVisible ? "empty" : "",
      pos.fret === 0 ? "open" : "",
      positionMarker?.inRange ? "position-in-range" : "",
      positionMarker?.inSystem && !positionMarker.inRange ? "position-out-of-range" : "",
      positionMarker?.boundary ? "position-boundary" : "",
      state.mode === "positions" && !positionMarker?.inSystem ? "position-muted" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const buttonClasses = [
      state.mode === "quiz" && !selected ? "hidden-note" : "",
      isRoot ? "root" : "",
      state.mode === "positions" && isRoot ? "position-root" : "",
      state.mode === "positions" && state.positionLearning.showIntervals && positionMarker?.inSystem ? "position-interval" : "",
      state.mode === "positions" && positionMarker?.inSystem && !positionMarker.inRange ? "position-muted" : "",
      selected ? "selected" : "",
      selected && correctAnswer ? "correct" : "",
      selected && !correctAnswer ? "incorrect" : "",
      completed && !selected && correctAnswer ? "missed" : "",
      identifierSelected ? "identifier-selected" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const label =
      state.mode === "positions" && state.positionLearning.showIntervals && positionMarker?.interval
        ? positionMarker.interval
        : state.mode === "identifier" && !state.chordIdentifier.showLabels && !identifierSelected
          ? ""
          : state.mode === "quiz" && !selected
            ? ""
            : displayNote(pos.note, state.accidental);
    const ariaLabel =
      state.mode === "positions" && positionMarker?.interval
        ? `String ${pos.stringIndex + 1}, fret ${pos.fret}, ${displayNote(pos.note, state.accidental)}, interval ${positionMarker.interval}`
        : state.mode === "identifier"
          ? `String ${pos.stringIndex + 1}, fret ${pos.fret}, ${displayNote(pos.note, state.accidental)}${identifierSelected ? ", selected" : ""}`
          : `String ${pos.stringIndex + 1}, fret ${pos.fret}, ${displayNote(pos.note, state.accidental)}`;
    return `
      <div class="position ${classes}" style="--note-color: ${NOTE_COLORS[pos.note]}">
        <button type="button" class="${buttonClasses}" data-position="${key}" aria-label="${escapeHtml(ariaLabel)}" ${state.mode === "quiz" && quiz?.active ? "" : state.mode === "quiz" ? "disabled" : ""} aria-pressed="${state.mode === "identifier" ? Boolean(identifierSelected) : "false"}">${escapeHtml(label)}</button>
      </div>
    `;
  }
}

function getVisibleNotes(state) {
  if (state.mode === "notes") return new Set(state.selectedNotes);
  if (state.mode === "scales") return new Set(notesFromPattern(state.rootNote, SCALES[state.selectedScale]));
  if (state.mode === "chords") return new Set(notesFromPattern(state.rootNote, CHORDS[state.selectedChord]));
  if (state.mode === "identifier") return new Set();
  if (state.mode === "positions") return new Set(getPositionNotes(state.positionLearning));
  if (state.mode === "helper" && state.chordHelper.focusChord) {
    const { root, type } = state.chordHelper.focusChord;
    return new Set(notesFromPattern(root, CHORDS[type] || CHORDS.Major));
  }
  if (state.mode === "circle" && state.circleFocusChord) {
    const { root, type } = state.circleFocusChord;
    return new Set(notesFromPattern(root, CHORDS[type] || CHORDS.Major));
  }
  if (state.mode === "progression") {
    const { focusedChord } = getProgressionContext(state.progressionBuilder);
    return new Set(notesFromPattern(focusedChord.root, CHORDS[focusedChord.type] || CHORDS.Major));
  }
  return new Set(NOTES);
}

function getModeLabel(state, tuning = store.tuning) {
  if (state.mode === "notes") return `Showing ${state.selectedNotes.map((note) => displayNote(note, state.accidental)).join(", ")}`;
  if (state.mode === "scales") return `${displayNote(state.rootNote, state.accidental)} ${state.selectedScale}`;
  if (state.mode === "chords") return `${displayNote(state.rootNote, state.accidental)} ${state.selectedChord}`;
  if (state.mode === "identifier") {
    const detection = detectChord(state.chordIdentifier.selectedShape, tuning, state.accidental);
    return detection.best ? `Identifying ${detection.best.label}` : "Build a chord shape";
  }
  if (state.mode === "circle")
    return state.circleFocusChord ? `Showing ${state.circleFocusChord.label}` : `${getCircleKeyData(state.circleKey).major} major context`;
  if (state.mode === "helper") {
    const focus = state.chordHelper.focusChord;
    return focus ? `Showing ${focus.label}` : `${state.chordHelper.key} ${state.chordHelper.tonality} progressions`;
  }
  if (state.mode === "progression") {
    const { key, focusedNumeral, focusedChord, accidental } = getProgressionContext(state.progressionBuilder);
    const tones = notesFromPattern(focusedChord.root, CHORDS[focusedChord.type] || CHORDS.Major)
      .map((note) => displayNote(note, accidental))
      .join(" ");
    return `${key.major} ${state.progressionBuilder.tonality} progression \u00b7 ${focusedNumeral} = ${focusedChord.label}. Chord tones: ${tones}`;
  }
  if (state.mode === "positions") return getPositionSummary(state, tuning).title;
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

function updateIdentifierShape(state, updater) {
  const nextShape = state.chordIdentifier.selectedShape.map((string) => ({ ...string }));
  updater(nextShape);
  return {
    ...state.chordIdentifier,
    selectedShape: nextShape.sort((a, b) => a.stringIndex - b.stringIndex),
  };
}

function handleIdentifierAction(action, detail = {}) {
  const state = store.state;
  const tuning = store.tuning;
  if (action === "select" && detail.position) {
    const [stringValue, fretValue] = String(detail.position).split(":");
    const stringIndex = Number(stringValue);
    const fret = Number(fretValue);
    store.update((current) => ({
      ...current,
      chordIdentifier: updateIdentifierShape(current, (shape) => {
        const target = shape.find((string) => string.stringIndex === stringIndex);
        if (!target) return;
        if (!target.muted && target.fret === fret) {
          target.fret = null;
          target.muted = true;
          return;
        }
        target.fret = fret;
        target.muted = false;
      }),
    }));
    return;
  }
  if (action === "open") {
    store.update((current) => ({
      ...current,
      chordIdentifier: updateIdentifierShape(current, (shape) => {
        const target = shape.find((string) => string.stringIndex === detail.stringIndex);
        if (!target) return;
        target.fret = 0;
        target.muted = false;
      }),
    }));
    return;
  }
  if (action === "mute") {
    store.update((current) => ({
      ...current,
      chordIdentifier: updateIdentifierShape(current, (shape) => {
        const target = shape.find((string) => string.stringIndex === detail.stringIndex);
        if (!target) return;
        target.fret = null;
        target.muted = true;
      }),
    }));
    return;
  }
  if (action === "toggle-string") {
    store.update((current) => ({
      ...current,
      chordIdentifier: updateIdentifierShape(current, (shape) => {
        const target = shape.find((string) => string.stringIndex === detail.stringIndex);
        if (!target) return;
        if (!target.muted && target.fret === 0) {
          target.fret = null;
          target.muted = true;
          return;
        }
        target.fret = 0;
        target.muted = false;
      }),
    }));
    return;
  }
  if (action === "clear") {
    store.update((current) => ({
      ...current,
      chordIdentifier: {
        ...current.chordIdentifier,
        selectedShape: tuning.strings.map((_, stringIndex) => ({ stringIndex, fret: null, muted: true })),
      },
    }));
    return;
  }
  if (action === "toggle-labels") {
    store.update((current) => ({
      ...current,
      chordIdentifier: {
        ...current.chordIdentifier,
        showLabels: !current.chordIdentifier.showLabels,
      },
    }));
    return;
  }
  if (action === "save") {
    const detection = detectChord(state.chordIdentifier.selectedShape, tuning, state.accidental);
    if (!detection.selectedNotes.length) return;
    const saved = {
      id: uid(),
      name: `${detection.best?.label || "Unknown chord"} shape`,
      tuningId: tuning.id,
      strings: state.chordIdentifier.selectedShape.map((string) => ({ ...string })),
      createdAt: new Date().toISOString(),
    };
    store.update((current) => ({
      ...current,
      chordIdentifier: {
        ...current.chordIdentifier,
        savedShapes: [saved, ...current.chordIdentifier.savedShapes].slice(0, 24),
      },
    }));
    return;
  }
  if (action === "load") {
    const saved = state.chordIdentifier.savedShapes.find((shape) => shape.id === detail.id);
    if (!saved) return;
    store.update((current) => ({
      ...current,
      selectedTuningId: saved.tuningId,
      mode: "identifier",
      chordIdentifier: {
        ...current.chordIdentifier,
        selectedShape: saved.strings.map((string) => ({ ...string })),
      },
    }));
    return;
  }
  if (action === "delete") {
    store.update((current) => ({
      ...current,
      chordIdentifier: {
        ...current.chordIdentifier,
        savedShapes: current.chordIdentifier.savedShapes.filter((shape) => shape.id !== detail.id),
      },
    }));
  }
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
customElements.define("chord-identifier-panel", ChordIdentifierPanel);
customElements.define("circle-of-fifths-panel", CircleOfFifthsPanel);
customElements.define("chord-helper-panel", ChordHelperPanel);
customElements.define("progression-builder-panel", ProgressionBuilderPanel);
customElements.define("position-panel", PositionPanel);
customElements.define("quiz-panel", QuizPanel);
