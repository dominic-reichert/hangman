function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

Vue.createApp({
  data() {
    return {
      words: ["backend", "frontend", "html", "css", "javascript"],
      pickedWord: "",
      fails: 0,
      guesses: [],
      gameStarted: false,
      win: false,
    };
  },
  computed: {
    hiddenWord() {
      const letters = this.pickedWord.split("");
      return letters
        .map((letter) => {
          if (this.guesses.includes(letter)) {
            return letter;
          } else {
            return "_ ";
          }
        })
        .join("");
    },
    alphabet() {
      const alphabetArr = [];

      for (let i = 97; i < 123; i++) {
        const char = String.fromCharCode(i);
        alphabetArr.push(char);
      }

      return alphabetArr;
    },
    checkForSolution() {
      let check = 0;
      for (let i = 0; i < this.pickedWord.length; i++) {
        if (this.guesses.includes(this.pickedWord[i])) {
          check++;
        }
      }
      if (check === this.pickedWord.length) {
        this.win = true;
        return true;
      }
    },
    returnGameState() {
      if (this.win === true) {
        return "won";
      }
      if (this.fails < 10) {
        return "active";
      } else {
        return "lost";
      }
    },
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.fails = 0;
      this.guesses = [];
      this.win = false;
      this.pickRandomWord();
    },
    pickRandomWord() {
      const randomIndexNumber = getRandomInt(this.words.length);
      this.pickedWord = this.words[randomIndexNumber];
    },
    userGuess(char) {
      if (this.fails === 10) {
        return;
      }

      if (this.win) {
        return;
      }

      this.guesses.push(char);
      if (!this.pickedWord.includes(char)) {
        this.fails++;
        document.querySelector(".fails").classList.add("fail");
        setTimeout(() => {
          document.querySelector(".fails").classList.remove("fail");
        }, "1200");
      }
    },
    letterWasUsed(char) {
      return this.guesses.includes(char);
    },
  },
}).mount("#app");
