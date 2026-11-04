const STAGE_TIMES = [25, 20, 15, 10];

const STATUS = {
  WAITING: "waiting",
  PLAYING: "playing",
  TRANSITION: "transition",
  WON: "won",
  GAME_OVER: "gameOver"
}

const FEEDBACKS = {
  empty: ["Oops!", "You haven't entered an answer yet. Type something before submitting!"],
  incorrect: ["Not quite!", "That's not the right word. Try again!"],
  incomplete: ["Almost there!", "Fill in all the letters before submitting."],
};

const MODALS = {
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
    buttonText: "View results"
  },
  gameOver: {
    title: "Game Over",
    desc: "You ran out of chances. Better luck next time!",
    hasCountdown: false,
    buttonText: "View Results"
  }
};

const PRIZES = ["Prize A", "Prize B", "Prize C", "Prize D"];
const LOSS_PRIZE = null;

const RESULTS = {
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
