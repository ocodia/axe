import { FEATURE_REGISTRY, MODES, MODE_LABELS, getFeatureControlTags } from "../feature-registry.js";
import { loadStoredState, makeId, saveStoredState, STORAGE_KEY } from "../storage.js";
import { centsBetween, frequencyToNote, midiFrequency } from "../tuner-service.js";
import { createKarplusStrongBuffer, midiToFrequency } from "../audio-service.js";
import { getGuitarVoicing } from "../voicing-service.js";

const results = document.querySelector("#results");
const summary = document.querySelector("#summary");
let passed = 0;
let failed = 0;
const testCases = [];

function test(name, callback) {
  testCases.push({ name, callback });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

test("feature registry has unique, labelled modes", () => {
  const ids = FEATURE_REGISTRY.map(({ id }) => id);
  assert(new Set(ids).size === ids.length, "duplicate feature id");
  assert(MODES[0] === "all", "all mode must be first");
  assert(MODES.length === ids.length + 1, "mode list is out of sync");
  ids.forEach((id) => assert(MODE_LABELS[id], `missing label for ${id}`));
});

test("registry derives controls without a parallel mode switch", () => {
  assert(getFeatureControlTags("all").length === FEATURE_REGISTRY.filter(({ controlTag }) => controlTag).length, "all controls mismatch");
  assert(getFeatureControlTags("tuner").length === 0, "tuner must own the workspace, not a control panel");
  assert(getFeatureControlTags("not-a-mode").length === 0, "unknown mode should have no controls");
});

test("storage boundary tolerates malformed data and round-trips valid data", () => {
  const values = new Map([[STORAGE_KEY, "not json"]]);
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  assert(Object.keys(loadStoredState(storage)).length === 0, "malformed storage should reset to empty state");
  assert(saveStoredState({ mode: "all" }, storage), "storage write should report success");
  assert(loadStoredState(storage).mode === "all", "stored state did not round-trip");
});

test("generated ids are prefixed and non-empty", () => {
  assert(makeId("test").startsWith("test-"), "id prefix missing");
});

test("pitch helpers agree at concert A", () => {
  assert(midiFrequency(69) === 440, "A4 frequency mismatch");
  const note = frequencyToNote(440);
  assert(note.midi === 69 && note.noteIndex === 9 && note.octave === 4, "A4 note mismatch");
  assert(Math.abs(centsBetween(440, 440)) < 0.0001, "zero cents mismatch");
});

test("playback synthesis and voicing helpers are deterministic enough to validate", () => {
  assert(midiToFrequency(69) === 440, "playback A4 frequency mismatch");
  const buffers = [];
  const context = {
    sampleRate: 44100,
    createBuffer: (_channels, length, sampleRate) => {
      const data = new Float32Array(length);
      const buffer = { sampleRate, getChannelData: () => data };
      buffers.push(buffer);
      return buffer;
    },
  };
  const buffer = createKarplusStrongBuffer(context, 110, 0.1);
  assert(buffers.length === 1 && buffer.getChannelData().some((sample) => Number.isFinite(sample) && sample !== 0), "empty pluck buffer");
  const sustainedBuffer = createKarplusStrongBuffer(context, 110);
  assert(sustainedBuffer.getChannelData().length >= context.sampleRate * 3, "default pluck sustain is too short");
  const voicing = getGuitarVoicing({
    targetMidis: [40, 45, 50, 55, 59, 64],
    rootMidi: 48,
    intervals: [0, 4, 7],
    type: "Major",
  });
  assert(voicing.length === 6, "guitar voicing string count mismatch");
  assert(voicing.every((note) => note.muted || note.midi >= 40), "invalid voicing MIDI");
  assert(voicing.some((note) => note.midi === 48), "voicing root missing");
});

test("app shell files are available from the static server", async () => {
  const response = await fetch("../index.html", { cache: "no-store" });
  assert(response.ok, "index.html is not reachable");
  const html = await response.text();
  assert(html.includes('src="app.js?v=16"'), "index does not reference the current app version");
});

for (const { name, callback } of testCases) {
  const item = document.createElement("li");
  try {
    await callback();
    item.className = "pass";
    item.textContent = `PASS — ${name}`;
    passed += 1;
  } catch (error) {
    item.className = "fail";
    item.textContent = `FAIL — ${name}: ${error.message}`;
    failed += 1;
  }
  results.append(item);
}
summary.textContent = `${passed} passed, ${failed} failed`;
summary.className = failed ? "fail" : "pass";
