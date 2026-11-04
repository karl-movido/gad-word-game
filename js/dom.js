export const uiElements = {
  screens: document.querySelectorAll('.screen'),
  startScreen: document.getElementById('start-screen'),
  gameScreen: document.getElementById('game-screen'),
  resultScreen: document.getElementById('result-screen'),
  startButton: document.getElementById('start-button'),
  submitButton: document.getElementById('submit-button'),
  playAgainButton: document.getElementById('play-again-button'),
  timerText: document.getElementById('timer-display'),
  timerBar: document.getElementById('timer-progress-bar'),
  picturesCont: document.getElementById('picture-container'),
  answerSlots: document.getElementById('answer-slots'),
  feedbackHeader: document.getElementById('feedback-header'),
  feedbackDesc: document.getElementById('feedback-description'),
  modalTimer: document.getElementById('modal-timer-container'),
  modalCountdown: document.getElementById('modal-countdown-number'),
  modalButton: document.getElementById('modal-button'),
  modalTitle: document.getElementById('modal-title'),
  modalMsg: document.getElementById('modal-message'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalTrivia: document.getElementById('modal-trivia'),
  modalTriviaText: document.getElementById('modal-trivia-text'),
  prizeLabel: document.getElementById('prize-label'),
  resultPrize: document.getElementById('result-prize'),
  resultStage: document.getElementById('result-stage'),
  resultAttempts: document.getElementById('result-attempts'),
  resultMistakes: document.getElementById('result-mistakes'),
  resultTitle: document.getElementById('result-title'),
  resultDesc: document.getElementById('result-description'),
};

export function showScreen(screenToShow) {
  uiElements.screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}
