class Game {
  constructor() {
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.currentGuess = "";
    this.totalAttempts = 0;
    this.wrongGuesses = 0;
    this.gameStatus = STATUS.WAITING;

    this.remainingQuestions = [];
    this.currentQuestion = null;
    this.timerId = null;
    this.timeoutId = null;
    this.modalTimerId = null;

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
    this.currentStage = 1;
    this.remainingTime = STAGE_TIMES[this.currentStage - 1];
    this.currentGuess = "";
    this.totalAttempts = 0;
    this.wrongGuesses = 0;
    this.gameStatus = STATUS.WAITING;
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
          this.showModal("gameOver");
        } else {
          this.gameStatus = STATUS.TRANSITION;
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
    const slots = this.currentQuestion.display.split("").map((c) => {
      return c !== " " ? `<div class="answer-slot"></div>` : `<div class="answer-gap"></div>`
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
      this.showModal("victory");

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

  showModal(type) {

    const config = MODALS[type];

    if (!config) {
      return;
    }

    const trivia = (this.currentQuestion.trivia || "").trim();
    const showTrivia = config.hasTrivia && Boolean(trivia);
    modalTrivia.hidden = !showTrivia;
    

    modalOverlay.hidden = false;

    const title = config.title;
    const desc = config.desc;

    modalTitle.textContent = title;
    modalMsg.textContent = desc;

    modalTimer.hidden = !config.hasCountdown;
    modalButton.hidden = !config.buttonText;

    if (showTrivia) {
      modalTriviaText.textContent = trivia;
    }

    if (config.hasCountdown) {
      let remaining = config.countdown;
      modalCountdown.textContent = remaining;

      clearInterval(this.modalTimerId);

      this.modalTimerId = setInterval(() => {
        remaining--;
        modalCountdown.textContent = remaining;

        if (remaining <= 0) {
          clearInterval(this.modalTimerId);
          this.gameStatus = STATUS.PLAYING;
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
