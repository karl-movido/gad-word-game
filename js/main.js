// Screen transitions
const screens = document.querySelectorAll('.screen');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}


class Game {
  constructor() {
    this.currentQuestion = null;
    this.currentStage = 1;
    this.remainingTime = 25;
    this.gameStatus = "waiting";
    this.selectedAnswer = "";
    this.timerId = null;
  }
}

const game = new Game();


startButton.addEventListener('click', () => {
  showScreen(gameScreen);
})
