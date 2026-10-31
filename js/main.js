// Screen transitions
const screens = document.querySelectorAll('.screen');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');

const timerText = document.getElementById('timer-display');
const timerBar = document.getElementById('timer-progress-bar');

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}

const STAGE_TIMES = [25, 20, 15, 10];

class Game {
  constructor() {
    this.currentQuestion = null;
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.gameStatus = "waiting";
    this.selectedAnswer = "";
    this.timerId = null;
  }

  start() {
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.selectedAnswer = "";
    this.gameStatus = "playing";

    showScreen(gameScreen);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerId);
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.remainingTime -= 1;
      this.updateTimerDisplay();

      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);
        this.nextStage();
      }
    }, 1000);
  }

  nextStage() {
    if (this.currentStage === STAGE_TIMES.length) {
      this.gameStatus = "done";
      showScreen(resultScreen);
      return;
    }

    this.currentStage += 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.startTimer();
  }

  updateTimerDisplay() {
    timerText.textContent = this.remainingTime;
    timerBar.style.width = (this.remainingTime / STAGE_TIMES[this.currentStage -1]) * 100 + "%";
  }
}

const game = new Game();

startButton.addEventListener('click', () => {
  game.start();
});
