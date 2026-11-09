export const uiElements = {
  startScreen: document.getElementById("start-screen"),
  gameScreen: document.getElementById("game-screen"),
  resultScreen: document.getElementById("result-screen"),
  
  startNormalBtn: document.getElementById("start-normal-btn"),
  startHardBtn: document.getElementById("start-hard-btn"),
  
  timerText: document.getElementById("timer-display"),
  timerBar: document.getElementById("timer-progress-bar"),
  picturesCont: document.getElementById("picture-container"),
  answerSlots: document.getElementById("answer-slots"),
  letterBank: document.getElementById("letter-bank"),
  submitButton: document.getElementById("submit-button"),
  
  feedbackHeader: document.getElementById("feedback-header"),
  feedbackDesc: document.getElementById("feedback-description"),
  
  modalOverlay: document.getElementById("modal-overlay"),
  modalTitle: document.getElementById("modal-title"),
  modalMsg: document.getElementById("modal-message"),
  modalTrivia: document.getElementById("modal-trivia"),
  modalTriviaText: document.getElementById("modal-trivia-text"),
  modalTimer: document.getElementById("modal-timer-container"),
  modalCountdown: document.getElementById("modal-countdown-number"),
  modalButton: document.getElementById("modal-button"),
  
  resultTitle: document.getElementById("result-title"),
  resultDesc: document.getElementById("result-description"),
  prizeLabel: document.getElementById("prize-label"),
  resultPrize: document.getElementById("result-prize"),
  resultStage: document.getElementById("result-stage"),
  resultAttempts: document.getElementById("result-attempts"),
  resultMistakes: document.getElementById("result-mistakes"),
  playAgainButton: document.getElementById("play-again-button"),
};

export function showScreen(screen) {
  const screens = [uiElements.startScreen, uiElements.gameScreen, uiElements.resultScreen];
  screens.forEach(s => s.hidden = s !== screen);
}
