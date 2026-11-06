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

  if (/^[a-z]$/i.test(event.key)) {
    if (game.currentGuess.length < game.currentQuestion.answer.length) {
      playSound('typing');
      game.currentGuess += event.key.toUpperCase();
      game.updateAnswerSlots();
    } else {
      playSound('blocked');
    }
    return;
  }

  if (event.key === "Backspace") {
    if (game.currentGuess.length > 0) {
      playSound('backspace');
      game.currentGuess = game.currentGuess.slice(0, -1);
      game.updateAnswerSlots();
    }
    return;
  }

  if (event.key === "Enter") {
    game.checkAnswer();
  }
}
