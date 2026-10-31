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

  start() {
    this.currentStage = 1;
    this.remainingTime = 25;
    this.selectedAnswer = "";
    this.gameStatus = "playing";

    showScreen(gameScreen);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      this.remainingTime -= 1;

      console.log(this.remainingTime);

      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);
      }
    }, 1000);
  }
}

const game = new Game();

startButton.addEventListener('click', () => {
  game.start();
});
