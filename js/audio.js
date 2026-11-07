import { AUDIO_PATHS } from "./data.js";

let assets = null;

export function setAudioAssets(loadedAssets) {
  assets = loadedAssets;
  if (assets) {
    Object.values(assets.audio).forEach(sound => {
      sound.volume = 0.2;
    });
  }
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
