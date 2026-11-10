import { ALL_QUESTIONS_IMAGES } from "./questions.js";

export const MODES = {
  NORMAL: "normal",
  PROGRESSIVE: "progressive"
};

export const MODE_CONFIG = {
  [MODES.NORMAL]: {
    name: "Normal Mode",
    numberOfStages: 1,
    stageDuration: 60,
    imagesPerStage: 4,
    letterBankSize: 16,
    prize: "Standard Reward"
  },
  [MODES.PROGRESSIVE]: {
    name: "Progressive Mode",
    numberOfStages: 2,
    stageDuration: 30,
    imagesPerStage: 2,
    letterBankSize: 16,
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
    sound: 'timeUp',
    countdown: 3,
    buttonText: null
  },
  victory: {
    title: "Correct!",
    desc: "Great job! You guessed the word",
    hasCountdown: false,
    sound: 'achievement',
    hasTrivia: true,
    buttonText: "View results"
  },
  gameOver: {
    title: "Game Over",
    sound: 'timeUp',
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

export const AUDIO_PATHS = {
  click:      'assets/audio/press.ogg',        
  typing:     'assets/audio/typing.ogg',       
  backspace:  'assets/audio/release.ogg',      
  close:      'assets/audio/close.ogg',       
  timer:      'assets/audio/progress-step.ogg',
  warning:    'assets/audio/warning.ogg',      
  blocked:    'assets/audio/blocked.ogg',      
  error:      'assets/audio/error.ogg',       
  stageUp:    'assets/audio/level-up.ogg',   
  reward:     'assets/audio/success.ogg',    

  // new keys
  start:       'assets/audio/start.ogg',
  achievement: 'assets/audio/achievement.ogg',
  finish:      'assets/audio/complete.ogg',  
  timeUp:      'assets/audio/stop.ogg',       
  trivia:      'assets/audio/notification.ogg',
  bonus:       'assets/audio/bonus.ogg',       
};
