// Screen transitions
const screens = document.querySelectorAll('.screen');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');

const submitButton = document.getElementById('submit-button');

const timerText = document.getElementById('timer-display');
const timerBar = document.getElementById('timer-progress-bar');

const picturesCont = document.getElementById('picture-container');

const answerSlots = document.getElementById('answer-slots');

const feedbackHeader = document.getElementById('feedback-header');
const feedbackDesc = document.getElementById('feedback-description');

const modalTimer = document.getElementById('modal-timer-container');
const modalCountdown = document.getElementById('modal-countdown-number');
const modalButton = document.getElementById('modal-button');

const modalTitle = document.getElementById('modal-title');
const modalMsg = document.getElementById('modal-message');

const modalOverlay = document.getElementById('modal-overlay');

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}

const STAGE_TIMES = [25, 20, 15, 10];

const QUESTIONS = [
  { answer: "EQUALITY", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "RESPECT", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "CONSENT", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "EMPOWER", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "SAFETY", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] },
  { answer: "SUPPORT", images: ["Picture 1", "Picture 2", "Picture 3", "Picture 4"] }
];

const FEEDBACKS = {
  empty: ["Oops!", "You haven't entered an answer yet. Type something before submitting!"],
  incorrect: ["Not quite!", "That's not the right word. Try again!"],
  incomplete: ["Almost there!", "Fill in all the letters before submitting."],
};

const MODALS = {
  nextRound: {
    title: "Time's up!",
    desc: "Get ready for the next round",
    hasCountdown: true,
    countdown: 3,
    buttonText: null
  },
  victory: {
    title: "Correct!",
    desc: "Great job! You guessed the word",
    hasCountdown: false,
    buttonText: "View results"
  },
  gameOver: {
    title: "Game Over",
    desc: "You ran out of chances. Better luck next time!",
    hasCountdown: false,
    buttonText: "View Results"
  }
};

class Game {
  constructor() {
    this.currentQuestion = null;
    this.remainingQuestions = [];
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.gameStatus = "waiting";
    this.currentGuess = "";
    this.timerId = null;
    this.timeoutId = null;
    this.modalTimerId = null;
  }

  start() {
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.currentGuess = "";
    this.gameStatus = "playing";

    this.hideModal();
    showScreen(gameScreen);
    this.clearFeedback();
    this.currentQuestion = this.pickQuestion();
    this.buildAnswerSlots();
    this.updatePictures();
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerId);
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.remainingTime--;
      this.updateTimerDisplay();

      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);

        if (this.currentStage === STAGE_TIMES.length) {
          this.gameStatus = "lost"; 
          this.showModal("gameOver");
        } else {
          this.gameStatus = "transition";
          this.showModal("nextRound");
        }
      }
    }, 1000);
  }

  nextStage() {
    this.currentStage += 1;
    this.updatePictures();
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.startTimer();
  }

  updateTimerDisplay() {
    timerText.textContent = this.remainingTime;
    timerBar.style.width = (this.remainingTime / STAGE_TIMES[this.currentStage - 1]) * 100 + "%";
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

  buildAnswerSlots() {
    const slots = this.currentQuestion.answer.split("").map(() => {
      return `<div class="answer-slot"></div>`
    });

    answerSlots.innerHTML = slots.join("");
  }

  updateAnswerSlots() {
    const slots = document.querySelectorAll('.answer-slot');
    slots.forEach((slot, index) => {
      slot.textContent = this.currentGuess[index] || "";
    })
  }

  checkAnswer() {
    if (this.gameStatus !== "playing") return;

    if (this.currentGuess.length <= 0) {
      this.showFeedback("empty");
      return;
    }

    if (this.currentGuess.length < this.currentQuestion.answer.length) {
      this.showFeedback("incomplete");
      return;
    }

    if (this.currentGuess === this.currentQuestion.answer) {
      clearInterval(this.timerId);
      this.gameStatus = "won";
      this.showModal("victory");
    } else {
      this.showFeedback("incorrect");
      return;
    }
  }

  showFeedback(state) {
    const [header, desc] = FEEDBACKS[state] || ["", ""];

    feedbackHeader.textContent = header;
    feedbackDesc.textContent = desc;

    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      feedbackHeader.textContent = "";
      feedbackDesc.textContent = "";
    }, 3000);
  }

  clearFeedback() {
    feedbackHeader.textContent = "";
    feedbackDesc.textContent = "";
  }

  showModal(type) {

    const config = MODALS[type];

    if (!config) {
      return;
    }

    modalOverlay.hidden = false;

    const title = config.title;
    const desc = config.desc;

    modalTitle.textContent = title;
    modalMsg.textContent = desc;

    modalTimer.hidden = !config.hasCountdown;
    modalButton.hidden = !config.buttonText;

    if (config.hasCountdown) {
      let remaining = config.countdown;
      modalCountdown.textContent = remaining;

      clearInterval(this.modalTimerId);

      this.modalTimerId = setInterval(() => {
        remaining--;
        modalCountdown.textContent = remaining;

        if (remaining <= 0) {
          clearInterval(this.modalTimerId);
          this.gameStatus = "playing";
          this.hideModal();
          this.nextStage();
        }
      }, 1000);
    }

    modalButton.textContent = config.buttonText;
  }

  hideModal() {
    modalOverlay.hidden = true;
    clearInterval(this.modalTimerId);
  }
}

const game = new Game();

startButton.addEventListener('click', () => {
  game.start();
});

submitButton.addEventListener('click', () => {
  game.checkAnswer();
});

modalButton.addEventListener('click', () => {
  game.hideModal();
  showScreen(resultScreen);
});

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  if (game.gameStatus !== "playing") {
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
