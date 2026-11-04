class Game {
  constructor() {
    this.remainingQuestions = [];
    this.currentQuestion = null;

    this.reset();
  }

  start() {
    this.reset();
    this.gameStatus = STATUS.PLAYING;

    this.hideModal();
    showScreen(gameScreen);
    this.clearFeedback();
    this.currentQuestion = this.pickQuestion();
    this.buildAnswerSlots();
    this.updatePictures();
    this.startTimer();
  }

  reset() {
    clearInterval(this.timerId);
    clearTimeout(this.timeoutId);
    clearInterval(this.modalTimerId);
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
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

        if (this.currentStage === STAGE_TIMES.length) {
          this.gameStatus = STATUS.GAME_OVER;
          this.showModal("gameOver", () => {
            showScreen(resultScreen);
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
    picturesCont.className = `stage-${this.currentStage}`;

    const visible = this.currentQuestion.images.slice(0, this.currentStage);

    visible.forEach((path, index) => {
      const div = document.createElement("div");
      div.className = 'picture-item';

      const img = document.createElement("img");
      img.src = `assets/images/${path}`;
      img.alt = `Picture ${index + 1}`;

      div.appendChild(img);
      picturesCont.appendChild(div);
    });
  }

  buildAnswerSlots() {
    answerSlots.innerHTML = "";
    this.slotElements = [];
  
    this.currentQuestion.display.split("").forEach((c) => {
      const slot = document.createElement("div");

      if (c === " ") {
        slot.className = 'answer-gap';
      } else {
        slot.className = 'answer-slot';
        this.slotElements.push(slot);
      }

      answerSlots.appendChild(slot);
    })
  }

  updateAnswerSlots() {
    this.slotElements.forEach((c, i) => {
      c.textContent = this.currentGuess[i] || "";
    })
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
        showScreen(resultScreen)
        this.showResult(STATUS.WON);
      });

    } else {
      this.showFeedback("incorrect");
      this.wrongGuesses++;
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

  showModal(type, onDone) {
    const config = MODALS[type];
    if (!config) return;

    clearInterval(this.modalTimerId);
    this.renderModal(config);
    modalOverlay.hidden = false;

    if (config.hasCountdown) {
      this.startModalTimer(config.countdown, () => {
        this.hideModal();
        onDone?.();
      })
    }
  }

  renderModal(config) {
    if (!config) return;

    const { title, desc, hasCountdown, hasTrivia, buttonText } = config;

    const trivia = (this.currentQuestion.trivia || "").trim();
    const showTrivia = hasTrivia && Boolean(trivia);

    modalTitle.textContent = title;
    modalMsg.textContent = desc;
    modalButton.textContent = buttonText || "";
    
    if (showTrivia) {
      modalTriviaText.textContent = trivia;
    }
    
    modalTrivia.hidden = !showTrivia;
    modalTimer.hidden = !hasCountdown;
    modalButton.hidden = !buttonText;
  }

  startModalTimer(seconds, onDone) {
    modalCountdown.textContent = seconds;

    clearInterval(this.modalTimerId);

    this.modalTimerId = setInterval(() => {
      seconds--;
      modalCountdown.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(this.modalTimerId);
        onDone?.();
      }
    }, 1000);
  }

  hideModal() {
    modalOverlay.hidden = true;
    clearInterval(this.modalTimerId);
  }

  showResult(state) {
    const result = RESULTS[state];

    if (!result) return;

    resultTitle.textContent = result.title;
    resultDesc.textContent = result.description;

    const prize = state === STATUS.WON ? PRIZES[this.currentStage - 1] : LOSS_PRIZE;

    prizeLabel.hidden = !prize;
    resultPrize.hidden = !prize;
    prizeLabel.textContent = result.prizeLabel;
    resultPrize.textContent = prize;
    resultStage.textContent = `Round ${this.currentStage}`;

    resultAttempts.textContent = this.totalAttempts;
    resultMistakes.textContent = this.wrongGuesses;
  }
}
