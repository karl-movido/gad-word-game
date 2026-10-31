// Screen transitions
const screens = document.querySelectorAll('.screen');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');

const timerText = document.getElementById('timer-display');
const timerBar = document.getElementById('timer-progress-bar');

const picturesCont = document.getElementById('picture-container');

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}

const STAGE_TIMES = [25, 20, 15, 10];

const QUESTIONS = [
  { answer: "EQUALITY", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "RESPECT",  images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "CONSENT",  images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "EMPOWER",  images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "SAFETY",   images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "SUPPORT",  images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] }
];

class Game {
  constructor() {
    this.currentQuestion = null;
    this.remainingQuestions = [];
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
    this.currentQuestion = this.pickQuestion();
    this.updatePictures();
    this.startTimer();

    console.log(this.currentQuestion.answer, this.remainingQuestions.length);
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
    this.updatePictures();
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.startTimer();
  }

  updateTimerDisplay() {
    timerText.textContent = this.remainingTime;
    timerBar.style.width = (this.remainingTime / STAGE_TIMES[this.currentStage -1]) * 100 + "%";
  }

  pickQuestion() {
    if (this.remainingQuestions.length <= 0) {
      this.remainingQuestions = [...QUESTIONS];
    }
  
    let index = Math.floor(Math.random() * this.remainingQuestions.length);

    return this.remainingQuestions.splice(index, 1)[0];
  }

  updatePictures() {
    picturesCont.innerHTML = '';

    const visiblePictures = this.currentQuestion.images.slice(0, this.currentStage);

    visiblePictures.forEach((picture) => {
      const div = document.createElement("div");
      div.textContent = picture;
      div.className = 'picture-item';

      picturesCont.appendChild(div);
    });
  }
}

const game = new Game();

startButton.addEventListener('click', () => {
  game.start();
});
