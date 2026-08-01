const DEFAULT_MIN_FREQUENCY = 35;
const DEFAULT_MAX_FREQUENCY = 1000;

export const midiFrequency = (midi, referencePitch = 440) => referencePitch * 2 ** ((midi - 69) / 12);

export function frequencyToNote(frequency, referencePitch = 440) {
  const midi = Math.round(69 + 12 * Math.log2(frequency / referencePitch));
  const noteIndex = ((midi % 12) + 12) % 12;
  return {
    midi,
    noteIndex,
    octave: Math.floor(midi / 12) - 1,
    frequency: midiFrequency(midi, referencePitch),
  };
}

export const centsBetween = (frequency, targetFrequency) => 1200 * Math.log2(frequency / targetFrequency);

export class YinPitchDetector {
  constructor({ sampleRate, bufferSize = 4096, threshold = 0.12, minFrequency = DEFAULT_MIN_FREQUENCY, maxFrequency = DEFAULT_MAX_FREQUENCY } = {}) {
    this.sampleRate = sampleRate;
    this.bufferSize = bufferSize;
    this.threshold = threshold;
    this.minTau = Math.max(2, Math.floor(sampleRate / maxFrequency));
    this.maxTau = Math.min(bufferSize - 2, Math.ceil(sampleRate / minFrequency));
    this.difference = new Float32Array(Math.floor(bufferSize / 2));
    this.cmnd = new Float32Array(Math.floor(bufferSize / 2));
  }

  detect(buffer) {
    let sum = 0;
    for (let index = 0; index < buffer.length; index += 1) sum += buffer[index] * buffer[index];
    const rms = Math.sqrt(sum / buffer.length);
    if (rms < 0.008) return null;

    const limit = Math.min(this.maxTau, this.difference.length - 1, buffer.length - 2);
    this.difference[0] = 0;
    this.cmnd[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau <= limit; tau += 1) {
      let difference = 0;
      for (let index = 0; index < buffer.length - tau; index += 1) {
        const delta = buffer[index] - buffer[index + tau];
        difference += delta * delta;
      }
      this.difference[tau] = difference;
      runningSum += difference;
      this.cmnd[tau] = runningSum ? (difference * tau) / runningSum : 1;
    }

    let tau = -1;
    for (let candidate = this.minTau; candidate <= limit; candidate += 1) {
      if (this.cmnd[candidate] < this.threshold) {
        while (candidate + 1 <= limit && this.cmnd[candidate + 1] < this.cmnd[candidate]) candidate += 1;
        tau = candidate;
        break;
      }
    }
    if (tau === -1) return null;

    const previous = this.cmnd[tau - 1] ?? this.cmnd[tau];
    const current = this.cmnd[tau];
    const next = this.cmnd[tau + 1] ?? current;
    const denominator = previous - 2 * current + next;
    const adjustment = denominator ? 0.5 * (previous - next) / denominator : 0;
    const period = tau + adjustment;
    const frequency = this.sampleRate / period;
    const confidence = Math.max(0, Math.min(1, 1 - current));
    if (!Number.isFinite(frequency) || frequency < DEFAULT_MIN_FREQUENCY || frequency > DEFAULT_MAX_FREQUENCY || confidence < 0.72) {
      return null;
    }
    return { frequency, confidence, rms };
  }
}

export class TunerAudioSession {
  constructor(onPitch) {
    this.onPitch = onPitch;
    this.buffer = null;
    this.running = false;
    this.hidden = false;
    this.lastProcess = 0;
    this.processInterval = 1000 / 24;
    this.handleVisibility = () => {
      this.hidden = document.hidden;
      if (this.hidden) {
        this.audioContext?.suspend().catch(() => {});
      } else if (this.running) {
        this.audioContext?.resume().catch(() => {});
      }
    };
  }

  async start() {
    if (this.running) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!navigator.mediaDevices?.getUserMedia || !AudioContextClass) throw new Error("unsupported");
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false } });
    this.audioContext = new AudioContextClass();
    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.smoothingTimeConstant = 0;
    this.buffer = new Float32Array(this.analyser.fftSize);
    this.detector = new YinPitchDetector({ sampleRate: this.audioContext.sampleRate, bufferSize: this.analyser.fftSize });
    this.source.connect(this.analyser);
    this.running = true;
    document.addEventListener("visibilitychange", this.handleVisibility);
    this.tick(0);
  }

  tick(timestamp) {
    if (!this.running) return;
    this.frame = requestAnimationFrame((nextTimestamp) => this.tick(nextTimestamp));
    if (this.hidden || timestamp - this.lastProcess < this.processInterval) return;
    this.lastProcess = timestamp;
    this.analyser.getFloatTimeDomainData(this.buffer);
    const pitch = this.detector.detect(this.buffer);
    if (pitch) this.onPitch(pitch);
  }

  stop() {
    this.running = false;
    if (this.frame) cancelAnimationFrame(this.frame);
    document.removeEventListener("visibilitychange", this.handleVisibility);
    this.source?.disconnect();
    this.analyser?.disconnect();
    this.stream?.getTracks().forEach((track) => track.stop());
    this.audioContext?.close().catch(() => {});
    this.frame = null;
    this.source = null;
    this.analyser = null;
    this.stream = null;
    this.audioContext = null;
  }
}
