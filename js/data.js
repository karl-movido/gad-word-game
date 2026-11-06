export const MODES = {
  NORMAL: "normal",
  PROGRESSIVE: "progressive"
};

export const MODE_CONFIG = {
  [MODES.NORMAL]: {
    name: "Normal Mode",
    numberOfStages: 1,
    stageDuration: 40,
    imagesPerStage: 4,
    letterBankSize: 15,
    prize: "Standard Reward"
  },
  [MODES.PROGRESSIVE]: {
    name: "Progressive Mode",
    numberOfStages: 2,
    stageDuration: 15,
    imagesPerStage: 2,
    letterBankSize: 15,
    prize: "Grand Reward"
  }
};

export const STATUS = {
  WAITING: "waiting",
  PLAYING: "playing",
  TRANSITION: "transition",
  WON: "won",
  GAME_OVER: "gameOver"
};

export const FEEDBACKS = {
  empty: ["Oops!", "You haven't entered an answer yet. Type something before submitting!"],
  incorrect: ["Not quite!", "That's not the right word. Try again!"],
  incomplete: ["Almost there!", "Fill in all the letters before submitting."],
};

export const MODALS = {
  nextRound: {
    title: "Time's up!",
    desc: "Get ready for the next round",
    hasCountdown: true,
    sound: 'blocked',
    countdown: 3,
    buttonText: null
  },
  victory: {
    title: "Correct!",
    desc: "Great job! You guessed the word",
    hasCountdown: false,
    sound: 'reward',
    hasTrivia: true,
    buttonText: "View results"
  },
  gameOver: {
    title: "Game Over",
    sound: 'error',
    desc: "You ran out of time. Better luck next time!",
    hasCountdown: false,
    buttonText: "View Results"
  }
};

export const LOSS_PRIZE = null;

export const RESULTS = {
  won: {
    title: "Congratulations!",
    description: "You've successfully guessed the word! Great job!",
    prizeLabel: "Your Reward",
  },
  gameOver: {
    title: "Better Luck Next Time!",
    description: "You weren't able to guess the word this time. Don't give up!",
    prizeLabel: "Game Result",
  }
};
