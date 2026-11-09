import { AUDIO_PATHS } from "./data.js";

/**
 * Per-sound volume. The pack these come from suggests its own levels: key
 * contact and step ticks are meant to sit almost under the music, celebration
 * cues are meant to be loud. One global 0.2 made typing grating over a
 * 16-letter answer and made the win fanfare inaudible across a noisy booth.
 */
const VOLUMES = {
  click: 0.2,
  typing: 0.09,
  backspace: 0.16,
  close: 0.17,
  timer: 0.14,
  warning: 0.22,
  blocked: 0.2,
  error: 0.22,
  stageUp: 0.25,
  reward: 0.24,
  achievement: 0.3,
  finish: 0.26,
  timeUp: 0.24,
  trivia: 0.2,
  bonus: 0.26,
};

const DEFAULT_VOLUME = 0.2;

let assets = null;
const volumeForPath = new Map();

export function setAudioAssets(loadedAssets) {
  assets = loadedAssets;
  if (!assets) return;

  volumeForPath.clear();

  Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
    const volume = VOLUMES[key] ?? DEFAULT_VOLUME;
    volumeForPath.set(path, volume);

    const sound = assets.audio[path];
    if (sound) sound.volume = volume;
  });

  // anything in the manifest that is not in AUDIO_PATHS
  Object.entries(assets.audio).forEach(([path, sound]) => {
    sound.volume = volumeForPath.get(path) ?? DEFAULT_VOLUME;
  });
}

export function playSound(key) {
  if (!assets) return;
  const path = AUDIO_PATHS[key];
  const sound = assets.audio[path];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

export function stopSound(key) {
  if (!assets) return;
  const path = AUDIO_PATHS[key];
  const sound = assets.audio[path];
  if (!sound) return;

  sound.pause();
  sound.currentTime = 0;
}
