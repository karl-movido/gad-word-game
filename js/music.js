/**
 * Background music.
 *
 * Separate from audio.js on purpose: sound effects are fire-and-forget one-shots
 * sharing one element per file, while music needs its own element, its own
 * volume, looping, crossfade and a random rotation. Mixing the two would make
 * both harder to reason about.
 *
 * Playback can only start after a user gesture (browser autoplay policy), so the
 * mode buttons on the start screen call startMusic().
 */

const TRACKS = [
  // shuffled on load; the same song never plays twice in a row
  "assets/audio/bg-music/djartmusic-best-game-console-301284.mp3",
  "assets/audio/bg-music/djartmusic-i-love-my-8-bit-game-console-301272.mp3",
  "assets/audio/bg-music/djartmusic-the-console-of-my-dreams-301289.mp3",
  "assets/audio/bg-music/nocopyrightsound633-arcade-beat-323176.mp3",
];

const MUSIC_VOLUME = 0.10;
const FADE_MS = 800;

let current = null;      // the <audio> element that is playing
let queue = [];          // remaining tracks in this rotation
let lastTrack = null;
let fadeTimerId = null;
let muted = false;

export function hasMusic() {
  return TRACKS.length > 0;
}

/** Pick a random track, avoiding an immediate repeat of the last one. */
function nextTrack() {
  if (queue.length === 0) {
    queue = [...TRACKS];

    // avoid playing the same song twice in a row across rotations
    if (queue.length > 1 && lastTrack) {
      queue = queue.filter(track => track !== lastTrack);
    }

    // shuffle
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }

  return queue.pop();
}

function createAudio(path) {
  const audio = new Audio(path);
  audio.volume = 0;
  audio.preload = "auto";
  // "ended" only fires for non-looping media, which is what we want here
  audio.addEventListener("ended", () => playNext());
  audio.addEventListener("error", () => {
    console.warn(`Music failed to load: ${path}`);
    playNext();
  });
  return audio;
}

function fadeTo(audio, target, onDone) {
  clearInterval(fadeTimerId);
  const step = (target - audio.volume) / (FADE_MS / 50);

  fadeTimerId = setInterval(() => {
    const next = audio.volume + step;

    if ((step > 0 && next >= target) || (step < 0 && next <= target) || step === 0) {
      audio.volume = target;
      clearInterval(fadeTimerId);
      onDone?.();
      return;
    }

    audio.volume = Math.max(0, Math.min(1, next));
  }, 50);
}

function playNext() {
  if (TRACKS.length === 0) return;

  const path = nextTrack();
  const audio = createAudio(path);
  const previous = current;

  current = audio;
  lastTrack = path;

  audio.play().then(() => {
    if (muted) {
      audio.pause();
      return;
    }
    fadeTo(audio, MUSIC_VOLUME);
  }).catch(error => {
    // a blocked play() must not stop the rotation silently
    console.warn("Music could not start:", error.message);
  });

  if (previous) {
    fadeTo(previous, 0, () => {
      previous.pause();
      previous.src = "";
    });
  }
}

/** Start (or resume) the music. Safe to call on every mode-button press. */
export function startMusic() {
  if (TRACKS.length === 0) return;
  if (current && !current.paused) return;

  if (current && current.src) {
    current.play().then(() => fadeTo(current, MUSIC_VOLUME)).catch(() => playNext());
    return;
  }

  playNext();
}

/** Duck the music down while a result cue or fanfare plays, then bring it back. */
export function duckMusic(duckedVolume = 0.05, holdMs = 900) {
  if (!current || current.paused) return;
  fadeTo(current, duckedVolume);
  setTimeout(() => {
    if (current && !current.paused) fadeTo(current, MUSIC_VOLUME);
  }, holdMs);
}

export function toggleMusic() {
  muted = !muted;

  if (!current) return muted;

  if (muted) {
    fadeTo(current, 0, () => current.pause());
  } else {
    current.play().then(() => fadeTo(current, MUSIC_VOLUME)).catch(() => {});
  }

  return muted;
}

export function isMusicMuted() {
  return muted;
}
