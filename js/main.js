import { uiElements } from "./dom.js";
import { Game } from "./game.js";
import { STATUS, MODES, AUDIO_PATHS } from "./data.js";
import { loadAllAssets } from "./assetLoader.js";
import { ALL_QUESTIONS_IMAGES } from "./questions.js";
import { setAudioAssets } from "./audio.js";

const ASSET_MANIFEST = {
  images: ALL_QUESTIONS_IMAGES,
  audio: Object.values(AUDIO_PATHS)
};
2
const { startNormalBtn, startHardBtn, submitButton, playAgainButton } = uiElements;

let game = null;

async function initApp() {
  startNormalBtn.disabled = true;
  startHardBtn.disabled = true;

  try {
    const loadedAssets = await loadAllAssets(ASSET_MANIFEST);
    setAudioAssets(loadedAssets);

    game = new Game(uiElements, loadedAssets);

    startNormalBtn.disabled = false;
    startHardBtn.disabled = false;
  } catch (error) {
    console.error("Failed to preload game assets:", error);
  }
}

startNormalBtn.addEventListener("click", () => {
  game.start(MODES.NORMAL);
});

startHardBtn.addEventListener("click", () => {
  game.start(MODES.PROGRESSIVE);
});

submitButton.addEventListener("click", () => {
  game.checkAnswer();
});

playAgainButton.addEventListener("click", () => {
  game.start(game.mode);
});

window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (game.gameStatus !== STATUS.PLAYING) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const key = event.key.toUpperCase();

  if (/^[a-z]$/i.test(key)) {
    game.handleLetterInput(key);
    return;
  }

  if (event.key === 'Backspace') {
    game.handleBackspace();
  }
  if (event.key === "Enter") {
    game.checkAnswer();
  }
}

initApp();
