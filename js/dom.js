const screens = document.querySelectorAll('.screen');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');

const submitButton = document.getElementById('submit-button');

const playAgainButton = document.getElementById('play-again-button');

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

const modalTrivia = document.getElementById('modal-trivia');
const modalTriviaText = document.getElementById('modal-trivia-text');

const prizeLabel = document.getElementById('prize-label');
const resultPrize = document.getElementById('result-prize');
const resultStage = document.getElementById('result-stage');
const resultAttempts = document.getElementById('result-attempts');
const resultMistakes = document.getElementById('result-mistakes');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-description');

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = true;
  });
  screenToShow.hidden = false;
}
