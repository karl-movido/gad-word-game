import { EASY_QUESTIONS, HARD_QUESTIONS, QUESTIONS_POOL } from "./questions.js";
import { STATUS, MODES, MODE_CONFIG, FEEDBACKS, MODALS, RESULTS, LOSS_PRIZE } from "./data.js";
import { showScreen } from "./dom.js";
import { playSound, stopSound } from "./audio.js";

export class Game {
  constructor(ui, assets) {
    this.ui = ui;
    this.assets = assets;
    this.remainingQuestions = [];
    this.currentQuestion = null;
    this.mode = MODES.NORMAL;
    this.lastQuestionId = null;
    this.usedLetterButton = [];
    this.reset();
  }

  start(mode = MODES.NORMAL) {

    this.mode = mode;
    this.lastQuestionId = null;
    this.remainingQuestions = [];
    this.reset();
    this.gameStatus = STATUS.PLAYING;

    this.hideModal();
    showScreen(this.ui.gameScreen);
    this.clearFeedback()

    this.currentQuestion = this.pickQuestion();
    this.buildAnswerSlots();
    this.buildLetterBank();

    const config = MODE_CONFIG[this.mode];
    this.totalTime = config.stageDuration;
    this.remainingTime = this.totalTime;

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
    this.lastQuestionId = null;
  }

  startTimer() {
    clearInterval(this.timerId);
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.remainingTime--;
      this.updateTimerDisplay();

      if (this.remainingTime <= 3 && this.remainingTime > 0) {
        playSound('warning');
      }

      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);
        const config = MODE_CONFIG[this.mode];

        if (this.currentStage >= config.numberOfStages) {
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
    }, 1000);
  }

  nextStage() {
    this.currentStage += 1;
    this.gameStatus = STATUS.PLAYING;
    playSound('stageUp');
    this.updatePictures();

    const config = MODE_CONFIG[this.mode];
    this.totalTime = config.stageDuration;
    this.remainingTime = this.totalTime;
    this.startTimer();

    if (this.mode === "progressive") {
      this.shuffleLetterBank();
    }
  }

  updateTimerDisplay() {
    this.ui.timerText.textContent = this.remainingTime;
    this.ui.timerBar.style.width = `${(this.remainingTime / this.totalTime) * 100}%`;
  }

  pickQuestion() {
    const currentPool = QUESTIONS_POOL[this.mode];
    const seenIds = this.getSeenQuestionIds();

    let available = currentPool.filter(q => !seenIds.includes(q.id));

    if (available.length === 0) {
      this.clearSeenQuestions();
      available = [...currentPool];
    }

    let candidatePool = available.filter(q => q.id !== this.lastQuestionId);
    if (candidatePool.length === 0) {
      candidatePool = available;
    }

    const index = Math.floor(Math.random() * candidatePool.length);
    const selected = candidatePool[index];

    return selected;
  }

  updatePictures() {
    this.ui.picturesCont.innerHTML = "";
    const config = MODE_CONFIG[this.mode];

    const visibleCount = this.currentStage * config.imagesPerStage;
    const visiblePaths = this.currentQuestion.images.slice(0, visibleCount);

    visiblePaths.forEach((path, index) => {
      const div = document.createElement("div");
      div.className = "picture-item";

      const preloadedImg = this.assets.images[path];
      let img;

      if (preloadedImg) {
        img = preloadedImg.cloneNode(true);
      } else {
        img = document.createElement("img");
        img.src = path;
      }

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
    this.usedLetterButton = [];

    const config = MODE_CONFIG[this.mode];
    const answerChars = this.currentQuestion.answer.split("");
    const bankSize = Math.max(config.letterBankSize, answerChars.length);
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
      btn.dataset.letter = letter;

      btn.addEventListener("click", () => {
        this.handleLetterInput(letter, btn);
      });
      this.ui.letterBank.appendChild(btn);
    });
  }

  shuffleLetterBank() {
    const buttons = Array.from(this.ui.letterBank.children);

    for (let i = buttons.length - 1; i > 0; i-- ) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }

    buttons.forEach(btn => this.ui.letterBank.appendChild(btn));
  }

  handleLetterInput(letter, btnElement = null) {
    if (this.gameStatus !== STATUS.PLAYING) return;
    if (this.currentGuess.length < this.currentQuestion.answer.length) {
      const targetBtn = btnElement || Array.from(this.ui.letterBank.children).find(btn =>
        btn.dataset.letter === letter && !btn.classList.contains("used"));

      if (targetBtn) {
        this.currentGuess += letter;
        targetBtn.classList.add('used');
        this.usedLetterButton.push(targetBtn);

        this.updateAnswerSlots();
      }
    }
  }

  handleBackspace() {
    if (this.gameStatus !== STATUS.PLAYING) return;

    if (this.currentGuess.length > 0) {
      this.currentGuess = this.currentGuess.slice(0, -1);

      const lastBtn = this.usedLetterButton.pop();
      if (lastBtn) {
        lastBtn.classList.remove('used');
      }

      this.updateAnswerSlots();
    }
  }

  updateAnswerSlots() {
    this.slotElements.forEach((c, i) => {
      c.textContent = this.currentGuess[i] || "";
    });
  }

  checkAnswer() {
    if (this.gameStatus !== STATUS.PLAYING) return;

    if (this.currentGuess.length <= 0) {
      playSound('blocked');
      this.showFeedback("empty");
      return;
    }

    if (this.currentGuess.length < this.currentQuestion.answer.length) {
      playSound('error');
      this.showFeedback("incomplete");
      return;
    }

    this.totalAttempts++;

    if (this.currentGuess === this.currentQuestion.answer) {
      this.markQuestionAsSeen(this.currentQuestion.id);
      stopSound('timer');
      clearInterval(this.timerId);
      this.gameStatus = STATUS.WON;
      this.showModal("victory", () => {
        showScreen(this.ui.resultScreen);
        this.showResult(STATUS.WON);
      });
    } else {
      playSound('error');
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

    if (config.sound) {
      playSound(config.sound);
    }

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
        playSound('close');
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

      if (seconds > 0) {
        playSound('timer');
      }
      this.ui.modalCountdown.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(this.modalTimerId);
        onDone?.();
      }
    }, 1000);
  }

  hideModal() {
    if (!this.ui.modalOverlay.hidden) {
      playSound('close');
    }

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
      const winPrize = MODE_CONFIG[this.mode].prize;
      prize = typeof winPrize === "object" ? winPrize.reward : winPrize;
    }

    this.ui.prizeLabel.hidden = !prize;
    this.ui.resultPrize.hidden = !prize;
    this.ui.prizeLabel.textContent = result.prizeLabel;
    this.ui.resultPrize.textContent = prize || "";
    this.ui.resultStage.textContent = this.mode === MODES.NORMAL
      ? "Normal Mode"
      : `Stage ${this.currentStage} of ${MODE_CONFIG[MODES.PROGRESSIVE].numberOfStages}`;

    this.ui.resultAttempts.textContent = this.totalAttempts;
    this.ui.resultMistakes.textContent = this.wrongGuesses;
  }

  getStorageKey() {
    return `seen_question_${this.mode}`;
  }

  getSeenQuestionIds() {
    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : [];
  }

  markQuestionAsSeen(id) {
    const seen = this.getSeenQuestionIds();
    if (!seen.includes(id)) {
      seen.push(id);
      const key = this.getStorageKey();
      localStorage.setItem(key, JSON.stringify(seen));
    }
  }

  clearSeenQuestions() {
    const key = this.getStorageKey();
    localStorage.removeItem(key);
  }


}
