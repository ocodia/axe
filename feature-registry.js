/**
 * The app's capability registry is deliberately data-only.  Feature UI modules
 * can be split out or lazy-loaded later without changing navigation contracts.
 */
export const FEATURE_REGISTRY = Object.freeze([
  { id: "notes", label: "Notes", controlTag: "note-filter" },
  { id: "scales", label: "Scales", controlTag: "scale-panel" },
  { id: "chords", label: "Chords", controlTag: "chord-panel" },
  { id: "triads", label: "Triads", controlTag: "triad-panel" },
  { id: "arpeggios", label: "Arpeggios", controlTag: "arpeggio-panel" },
  { id: "palette", label: "Palette", controlTag: "chord-palette-panel" },
  { id: "identifier", label: "Identifier", controlTag: "chord-identifier-panel" },
  { id: "circle", label: "Circle", controlTag: "circle-of-fifths-panel" },
  { id: "helper", label: "Helper", controlTag: "chord-helper-panel" },
  { id: "positions", label: "Positions", controlTag: "position-panel" },
  { id: "quiz", label: "Quiz", controlTag: "quiz-panel" },
  { id: "tuner", label: "Tuner", workspaceTag: "tuner-panel" },
]);

export const MODES = Object.freeze(["all", ...FEATURE_REGISTRY.map(({ id }) => id)]);
export const MODE_LABELS = Object.freeze({ all: "All", ...Object.fromEntries(FEATURE_REGISTRY.map(({ id, label }) => [id, label])) });

export function getFeature(mode) {
  return FEATURE_REGISTRY.find((feature) => feature.id === mode) || null;
}

export function getFeatureControlTags(mode) {
  if (mode === "all") return FEATURE_REGISTRY.map(({ controlTag }) => controlTag).filter(Boolean);
  const feature = getFeature(mode);
  return feature?.controlTag ? [feature.controlTag] : [];
}

export function isFeatureMode(mode) {
  return MODES.includes(mode);
}
