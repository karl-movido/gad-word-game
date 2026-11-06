import { uiElements } from "./dom.js";
import { Game } from "./game.js";
import { STATUS, MODES } from "./data.js";

const { startNormalBtn, startHardBtn, submitButton, playAgainButton } = uiElements;

const game = new Game(uiElements);

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
