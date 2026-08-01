const DEFAULT_DURATION = 3.2;
const DEFAULT_DECAY = 0.9985;

export function midiToFrequency(midi) {
  return 440 * 2 ** ((Number(midi) - 69) / 12);
}

export function createKarplusStrongBuffer(audioContext, frequency, duration = DEFAULT_DURATION, decay = DEFAULT_DECAY) {
  if (!audioContext || !Number.isFinite(frequency) || frequency <= 0) throw new Error("invalid synthesis input");
  const sampleRate = audioContext.sampleRate || 44100;
  const length = Math.max(1, Math.ceil(sampleRate * Math.max(0.08, duration)));
  const delayLength = Math.max(2, Math.round(sampleRate / frequency));
  const delay = new Float32Array(delayLength);
  let excitation = 0;
  for (let index = 0; index < delay.length; index += 1) {
    // A guitar pick is brighter than a pure impulse, but not white noise. A
    // small low-pass filter gives the initial burst a more string-like shape.
    excitation = excitation * 0.62 + (Math.random() * 2 - 1) * 0.38;
    delay[index] = excitation;
  }

  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const output = buffer.getChannelData(0);
  let delayIndex = 0;
  let body = 0;
  for (let index = 0; index < output.length; index += 1) {
    const sample = delay[delayIndex];
    const nextIndex = (delayIndex + 1) % delay.length;
    const filtered = 0.5 * (delay[delayIndex] + delay[nextIndex]);
    delay[delayIndex] = decay * filtered;
    delayIndex = nextIndex;
    body += (sample - body) * 0.12;
    const attack = 1 - Math.exp(-index / Math.max(1, sampleRate * 0.0012));
    const tailFade = index > output.length - sampleRate * 0.06 ? Math.max(0, (output.length - index) / (sampleRate * 0.06)) : 1;
    output[index] = (sample * 0.82 + body * 0.18) * attack * tailFade * 0.72;
  }
  return buffer;
}

export class PluckedStringAudioService {
  constructor(AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext) {
    this.AudioContextClass = AudioContextClass;
    this.audioContext = null;
    this.masterGain = null;
  }

  async ensureReady() {
    if (!this.AudioContextClass) throw new Error("audio unsupported");
    if (!this.audioContext) {
      this.audioContext = new this.AudioContextClass();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === "suspended") await this.audioContext.resume();
    return this.audioContext;
  }

  async playNote(midi, when = 0, options = {}) {
    const context = await this.ensureReady();
    const source = context.createBufferSource();
    source.buffer = createKarplusStrongBuffer(context, midiToFrequency(midi), options.duration || DEFAULT_DURATION, options.decay || DEFAULT_DECAY);
    const gain = context.createGain();
    gain.gain.value = options.gain ?? 0.7;
    source.connect(gain);
    gain.connect(this.masterGain);
    const startAt = Math.max(context.currentTime, context.currentTime + Math.max(0, when));
    source.start(startAt);
    return startAt;
  }

  async playVoicing(voicing, mode = "chord") {
    const notes = (voicing || []).filter((note) => note && !note.muted && Number.isFinite(note.midi));
    if (!notes.length) return [];
    const ordered = mode === "up-strum" || mode === "arpeggio-up" ? [...notes].reverse() : [...notes];
    const spread = mode === "chord" ? 0 : mode === "arpeggio" ? 0.09 : 0.045;
    const starts = [];
    for (let index = 0; index < ordered.length; index += 1) {
      starts.push(await this.playNote(ordered[index].midi, index * spread, { gain: mode === "chord" ? 0.48 : 0.56 }));
    }
    return starts;
  }
}
