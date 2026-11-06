import { uiElements, showScreen } from "./dom.js";
import { Game } from "./game.js";
import { STATUS } from "./data.js";
import { playSound } from "./audio.js";

const { startButton, submitButton, modalButton, playAgainButton, resultScreen } = uiElements;

const game = new Game(uiElements);

startButton.addEventListener('click', () => {
  playSound('click');
  game.start();
});

submitButton.addEventListener('click', () => {
  game.checkAnswer();
});

playAgainButton.addEventListener('click', () => {
  playSound('click');
  showScreen(game.ui.startScreen);
});

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  if (game.gameStatus !== STATUS.PLAYING) {
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

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
