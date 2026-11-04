export const STAGE_TIMES = [10, 10, 10, 10];

export const STATUS = {
  WAITING: "waiting",
  PLAYING: "playing",
  TRANSITION: "transition",
  WON: "won",
  GAME_OVER: "gameOver"
}

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
    countdown: 3,
    buttonText: null
  },
  victory: {
    title: "Correct!",
    desc: "Great job! You guessed the word",
    hasCountdown: false,
    hasTrivia: true,
    buttonText: "View results"
  },
  gameOver: {
    title: "Game Over",
    desc: "You ran out of chances. Better luck next time!",
    hasCountdown: false,
    buttonText: "View Results"
  }
};

export const PRIZES = ["Prize A", "Prize B", "Prize C", "Prize D"];
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
