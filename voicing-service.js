const STANDARD_TUNING = [40, 45, 50, 55, 59, 64];

const SHAPES = {
  Major: [
    { anchor: 0, base: 40, frets: [0, 2, 2, 1, 0, 0] },
    { anchor: 1, base: 45, frets: [null, 0, 2, 2, 2, 0] },
  ],
  Minor: [
    { anchor: 0, base: 40, frets: [0, 2, 2, 0, 0, 0] },
    { anchor: 1, base: 45, frets: [null, 0, 2, 2, 1, 0] },
  ],
  "Dominant 7": [
    { anchor: 0, base: 40, frets: [0, 2, 0, 1, 0, 0] },
    { anchor: 1, base: 45, frets: [null, 0, 2, 0, 2, 0] },
  ],
  "Major 7": [{ anchor: 0, base: 40, frets: [0, 2, 1, 1, 0, 0] }],
  "Minor 7": [{ anchor: 0, base: 40, frets: [0, 2, 0, 0, 0, 0] }],
  Sus2: [{ anchor: 0, base: 40, frets: [0, 2, 2, 1, 0, 0] }],
  Sus4: [{ anchor: 0, base: 40, frets: [0, 2, 2, 2, 0, 0] }],
  "Power Chord": [{ anchor: 0, base: 40, frets: [0, 2, 2, null, null, null] }],
};

function isStandardTuning(targetMidis) {
  return targetMidis.length === STANDARD_TUNING.length && targetMidis.every((midi, index) => midi === STANDARD_TUNING[index]);
}

function candidateShape(rootMidi, shape) {
  const shift = rootMidi - shape.base;
  const frets = shape.frets.map((fret) => (fret === null ? null : fret + shift));
  if (frets.some((fret) => fret !== null && (fret < 0 || fret > 12))) return null;
  return frets;
}

function fallbackFrets(targetMidis, rootMidi, intervals) {
  const pitchClasses = new Set(intervals.map((interval) => (rootMidi + interval) % 12));
  return targetMidis.map((openMidi, stringIndex) => {
    const candidates = [];
    for (let fret = 0; fret <= 12; fret += 1) {
      if (pitchClasses.has((openMidi + fret) % 12)) candidates.push(fret);
    }
    if (!candidates.length) return null;
    const rootFret = candidates.find((fret) => (openMidi + fret) % 12 === rootMidi % 12);
    return rootFret ?? candidates[0];
  });
}

export function getGuitarVoicing({ targetMidis, rootMidi, intervals, type }) {
  const tuning = targetMidis.map(Number);
  const root = Number(rootMidi);
  const shapeCandidates = isStandardTuning(tuning) ? SHAPES[type] || [] : [];
  const shape = shapeCandidates.map((item) => candidateShape(root, item)).find(Boolean);
  const frets = shape || fallbackFrets(tuning, root, intervals);
  return frets.map((fret, stringIndex) => ({ stringIndex, fret, muted: fret === null, midi: fret === null ? null : tuning[stringIndex] + fret }));
}
