import { STATUS, MODES, MODE_CONFIG, FEEDBACKS, MODALS, RESULTS, LOSS_PRIZE } from "./data.js";
import { QUESTIONS } from "./questions.js";
import { showScreen } from "./dom.js";

export class Game {
  constructor(ui) {
    this.ui = ui;
    this.remainingQuestions = [];
    this.currentQuestion = null;
    this.mode = MODES.NORMAL;
    this.reset();
  }

  start(mode = MODES.NORMAL) {
    this.mode = mode;
    this.reset();
    this.gameStatus = STATUS.PLAYING;

    this.hideModal();
    showScreen(this.ui.gameScreen);
    this.clearFeedback();
    
    this.currentQuestion = this.pickQuestion();
    this.buildAnswerSlots();

    if (this.mode === MODES.NORMAL) {
      this.buildLetterBank();
      this.totalTime = MODE_CONFIG[MODES.NORMAL].totalTime;
      this.remainingTime = this.totalTime;
    } else {
      this.ui.letterBank.innerHTML = "";
      this.totalTime = MODE_CONFIG[MODES.PROGRESSIVE].stageTimes[0];
      this.remainingTime = this.totalTime;
    }

    this.updatePictures();
    this.startTimer();
  }

  reset() {
    clearInterval(this.timerId);
    clearTimeout(this.timeoutId);
    clearInterval(this.modalTimerId);
    
    this.currentStage = 1;
    this.currentGuess = "";
    this.slotElements = [];
    this.totalAttempts = 0;
    this.wrongGuesses = 0;
    this.gameStatus = STATUS.WAITING;
    this.timerId = null;
    this.timeoutId = null;
    this.modalTimerId = null;
  }

  startTimer() {
    clearInterval(this.timerId);
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.remainingTime--;
      this.updateTimerDisplay();

      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);

        if (this.mode === MODES.NORMAL) {
          this.gameStatus = STATUS.GAME_OVER;
          this.showModal("gameOver", () => {
            showScreen(this.ui.resultScreen);
            this.showResult(STATUS.GAME_OVER);
          });
        } else {
          const stages = MODE_CONFIG[MODES.PROGRESSIVE].stageTimes;
          if (this.currentStage >= stages.length) {
            this.gameStatus = STATUS.GAME_OVER;
            this.showModal("gameOver", () => {
              showScreen(this.ui.resultScreen);
              this.showResult(STATUS.GAME_OVER);
            });
          } else {
            this.gameStatus = STATUS.TRANSITION;
            this.showModal("nextRound", () => {
              this.gameStatus = STATUS.PLAYING;
              this.nextStage();
            });
          }
        }
      }
    }, 1000);
  }

  nextStage() {
    this.currentStage += 1;
    this.updatePictures();
    const stageTimes = MODE_CONFIG[MODES.PROGRESSIVE].stageTimes;
    this.totalTime = stageTimes[this.currentStage - 1];
    this.remainingTime = this.totalTime;
    this.startTimer();
  }

  updateTimerDisplay() {
    this.ui.timerText.textContent = this.remainingTime;
    this.ui.timerBar.style.width = `${(this.remainingTime / this.totalTime) * 100}%`;
  }

  pickQuestion() {
    if (this.remainingQuestions.length <= 0) {
      this.remainingQuestions = [...QUESTIONS];
    }
    const index = Math.floor(Math.random() * this.remainingQuestions.length);
    return this.remainingQuestions.splice(index, 1)[0];
  }

  updatePictures() {
    this.ui.picturesCont.innerHTML = "";
    
    const visibleCount = this.mode === MODES.NORMAL 
      ? MODE_CONFIG[MODES.NORMAL].visibleImagesCount 
      : this.currentStage;

    this.ui.picturesCont.className = `stage-${visibleCount}`;

    const visible = this.currentQuestion.images.slice(0, visibleCount);
    visible.forEach((path, index) => {
      const div = document.createElement("div");
      div.className = "picture-item";

      const img = document.createElement("img");
      img.src = `assets/images/${path}`;
      img.alt = `Picture ${index + 1}`;

      div.appendChild(img);
      this.ui.picturesCont.appendChild(div);
    });
  }

  buildAnswerSlots() {
    this.ui.answerSlots.innerHTML = "";
    this.slotElements = [];

    this.currentQuestion.display.split("").forEach((c) => {
      const slot = document.createElement("div");
      if (c === " ") {
        slot.className = "answer-gap";
      } else {
        slot.className = "answer-slot";
        this.slotElements.push(slot);
      }
      this.ui.answerSlots.appendChild(slot);
    });
  }

  buildLetterBank() {
    this.ui.letterBank.innerHTML = "";
    const answerChars = this.currentQuestion.answer.split("");
    const bankSize = Math.max(MODE_CONFIG[MODES.NORMAL].letterBankSize, answerChars.length);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const pool = [...answerChars];
    while (pool.length < bankSize) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      pool.push(randomChar);
    }

    pool.sort(() => Math.random() - 0.5);

    pool.forEach((letter) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "letter-btn";
      btn.textContent = letter;
      btn.addEventListener("click", () => {
        if (this.gameStatus !== STATUS.PLAYING) return;
        if (this.currentGuess.length < this.currentQuestion.answer.length) {
          this.currentGuess += letter;
          this.updateAnswerSlots();
        }
      });
      this.ui.letterBank.appendChild(btn);
    });
  }

  updateAnswerSlots() {
    this.slotElements.forEach((c, i) => {
      c.textContent = this.currentGuess[i] || "";
    });
  }

  checkAnswer() {
    if (this.gameStatus !== STATUS.PLAYING) return;

    if (this.currentGuess.length <= 0) {
      this.showFeedback("empty");
      return;
    }

    if (this.currentGuess.length < this.currentQuestion.answer.length) {
      this.showFeedback("incomplete");
      return;
    }

    this.totalAttempts++;

    if (this.currentGuess === this.currentQuestion.answer) {
      clearInterval(this.timerId);
      this.gameStatus = STATUS.WON;
      this.showModal("victory", () => {
        showScreen(this.ui.resultScreen);
        this.showResult(STATUS.WON);
      });
    } else {
      this.showFeedback("incorrect");
      this.wrongGuesses++;
    }
  }

  showFeedback(state) {
    const [header, desc] = FEEDBACKS[state] || ["", ""];
    this.ui.feedbackHeader.textContent = header;
    this.ui.feedbackDesc.textContent = desc;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.ui.feedbackHeader.textContent = "";
      this.ui.feedbackDesc.textContent = "";
    }, 3000);
  }

  clearFeedback() {
    this.ui.feedbackHeader.textContent = "";
    this.ui.feedbackDesc.textContent = "";
  }

  showModal(type, onDone) {
    const config = MODALS[type];
    if (!config) return;

    clearInterval(this.modalTimerId);
    this.renderModal(config);

    if (config.buttonText) {
      this.ui.modalButton.onclick = () => {
        this.hideModal();
        onDone?.();
      };
    }

    this.ui.modalOverlay.hidden = false;

    if (config.hasCountdown) {
      this.startModalTimer(config.countdown, () => {
        this.hideModal();
        onDone?.();
      });
    }
  }

  renderModal(config) {
    const { title, desc, hasCountdown, hasTrivia, buttonText } = config;
    const trivia = (this.currentQuestion.trivia || "").trim();
    const showTrivia = hasTrivia && Boolean(trivia);

    this.ui.modalTitle.textContent = title;
    this.ui.modalMsg.textContent = desc;
    this.ui.modalButton.textContent = buttonText || "";

    if (showTrivia) {
      this.ui.modalTriviaText.textContent = trivia;
    }

    this.ui.modalTrivia.hidden = !showTrivia;
    this.ui.modalTimer.hidden = !hasCountdown;
    this.ui.modalButton.hidden = !buttonText;
  }

  startModalTimer(seconds, onDone) {
    this.ui.modalCountdown.textContent = seconds;
    clearInterval(this.modalTimerId);

    this.modalTimerId = setInterval(() => {
      seconds--;
      this.ui.modalCountdown.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(this.modalTimerId);
        onDone?.();
      }
    }, 1000);
  }

  hideModal() {
    this.ui.modalOverlay.hidden = true;
    clearInterval(this.modalTimerId);
  }

  showResult(state) {
    const result = RESULTS[state];
    if (!result) return;

    this.ui.resultTitle.textContent = result.title;
    this.ui.resultDesc.textContent = result.description;

    let prize = LOSS_PRIZE;

    if (state === STATUS.WON) {
      const modePrizes = MODE_CONFIG[this.mode].prizes;
      if (this.mode === MODES.NORMAL) {
        prize = modePrizes[0]; // Normal mode gives 1 fixed prize
      } else {
        // Progressive mode gives 1 of 4 depending on current stage/pictures shown
        const prizeIndex = Math.min(this.currentStage - 1, modePrizes.length - 1);
        prize = modePrizes[prizeIndex];
      }
    }

    this.ui.prizeLabel.hidden = !prize;
    this.ui.resultPrize.hidden = !prize;
    this.ui.prizeLabel.textContent = result.prizeLabel;
    this.ui.resultPrize.textContent = prize || "";
    this.ui.resultStage.textContent = this.mode === MODES.NORMAL ? "Normal Mode" : `Round ${this.currentStage} (${this.currentStage} Picture/s)`;

    this.ui.resultAttempts.textContent = this.totalAttempts;
    this.ui.resultMistakes.textContent = this.wrongGuesses;
  }
}