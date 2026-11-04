// Screen transitions


const game = new Game();

startButton.addEventListener('click', () => {
  game.start();
});

submitButton.addEventListener('click', () => {
  game.checkAnswer();
});

modalButton.addEventListener('click', () => {
  game.hideModal();
  game.showResult(game.gameStatus);
  showScreen(resultScreen);
});

playAgainButton.addEventListener('click', () => {
  game.start();
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
      game.currentGuess += event.key.toUpperCase();
      game.updateAnswerSlots();
    }
    return;
  }

  if (event.key === "Backspace") {
    game.currentGuess = game.currentGuess.slice(0, -1);
    game.updateAnswerSlots();
    return;
  }

  if (event.key === "Enter") {
    game.checkAnswer();
  }
}
