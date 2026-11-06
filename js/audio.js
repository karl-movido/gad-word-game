const SOUNDS = {
  click: new Audio('assets/audio/select.ogg'),
  blocked: new Audio('assets/audio/blocked.ogg'),
  error: new Audio('assets/audio/invalid-drop.ogg'),
  close: new Audio('assets/audio/close.ogg'),
  reward: new Audio('assets/audio/reward.ogg'),
  typing: new Audio('assets/audio/typing.ogg'),
  backspace: new Audio('assets/audio/hover.ogg'),
  open: new Audio('assets/audio/open.ogg'),
  timer: new Audio('assets/audio/progress-step.ogg'),
  warning: new Audio('assets/audio/warning.ogg'),
  stageUp: new Audio('assets/audio/skip-next.ogg'),
};

Object.values(SOUNDS).forEach(sound => {
  sound.volume = 0.2;
});

export function playSound(key) {
  const sound = SOUNDS[key];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

export function stopSound(key) {
  const sound = SOUNDS[key];
  if (!sound) return;

  sound.pause();
  sound.currentTime = 0;
}
