import rockHandImg from "./images/rock.png";
import paperHandImg from "./images/paper.png";
import scissorsHandImg from "./images/scissors.png";
import menuSoundThemeURL from "./sounds/menu-theme.mp3";

const game = () => {
  //variables
  const startButton = document.querySelector(".start-button");
  const quitGameButon = document.querySelector(".quit-game button");
  const gameEntry = document.querySelector(".game-entry");
  const gameFrame = document.querySelector(".game-frame");

  const playerOptions = document.querySelectorAll(".player-options button");
  const options = ["rock", "paper", "scissors"];

  const hands = document.querySelectorAll(".hand");
  const playerHand = document.querySelector(".player-hand");
  const computerHand = document.querySelector(".computer-hand");

  const playerScore = document.querySelector(".score .player-score p");
  const computerScore = document.querySelector(".score .computer-score p");

  const tieFlag = document.querySelector(".main .tie-flag");
  const userWinnerFlag = document.querySelector(".main .player .winner-flag");
  const computerWinnerFlag = document.querySelector(
    ".main .computer .winner-flag"
  );
  const menuSoundTheme = new Audio(menuSoundThemeURL);
  menuSoundTheme.volume = 0.1;

  let gameData = {
    score: {
      player: 0,
      computer: 0,
    },
    play: false,
  };

  //listeners
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    gameData.play = true;
    menuSoundTheme.currentTime = 0;
    menuSoundTheme.play();
    gameEntry.classList.add("hide");
    gameFrame.classList.remove("hide");
  });

  playerOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      restartBoard();

      const userChoice = getUserChoice(option.textContent);
      const computerChoice = getComputerChoice();

      playRound(userChoice, computerChoice);
    });
  });

  hands.forEach((hand) => {
    hand.addEventListener("animationend", () => {
      hand.style.animation = "";
    });
  });

  quitGameButon.addEventListener("click", (event) => {
    event.preventDefault();
    quitGame();
  });

  menuSoundTheme.addEventListener("ended", () => {
    if (gameData.play) startMusic();
    else stopMusic();
  });

  //functions
  const startMusic = () => {
    menuSoundTheme.currentTime = 0;
    menuSoundTheme.play();
  };

  const stopMusic = () => menuSoundTheme.pause();

  const getUserChoice = (userInput) => {
    userInput = userInput.toLowerCase();
    if (userInput && options.some((option) => option === userInput)) {
      const userChoiceIndex = options.indexOf(userInput);
      const userChoice = options[userChoiceIndex];

      return userChoice;
    }
  };

  const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    const computerChoice = options[randomNumber];

    return computerChoice;
  };

  const determineWinner = (userChoice, computerChoice) => {
    let winner = "";

    if (userChoice === "rock") {
      if (computerChoice === "rock") winner = "tie";
      if (computerChoice === "paper") winner = "computer";
      if (computerChoice === "scissors") winner = "user";
    } else if (userChoice === "paper") {
      if (computerChoice === "rock") winner = "user";
      if (computerChoice === "paper") winner = "tie";
      if (computerChoice === "scissors") winner = "computer";
    } else if (userChoice === "scissors") {
      if (computerChoice === "rock") winner = "computer";
      if (computerChoice === "paper") winner = "user";
      if (computerChoice === "scissors") winner = "tie";
    }

    return winner;
  };

  const updateScoreBoard = (winner) => {
    if (winner && winner === "user") {
      gameData.score.player++;
      playerScore.textContent = gameData.score.player;
    } else if (winner && winner === "computer") {
      gameData.score.computer++;
      computerScore.textContent = gameData.score.computer;
    }
  };

  const getHandImg = (choice) => {
    if (choice === "rock") return rockHandImg;
    if (choice === "paper") return paperHandImg;
    if (choice === "scissors") return scissorsHandImg;
  };

  const showChoices = (userChoice, computerChoice) => {
    const playerHandImg = getHandImg(userChoice);
    const computerHandImg = getHandImg(computerChoice);

    playerHand.setAttribute("src", playerHandImg);
    computerHand.setAttribute("src", computerHandImg);
  };

  const showWinner = (winner) => {
    if (winner === "user") {
      if (userWinnerFlag.classList.contains("hide"))
        userWinnerFlag.classList.remove("hide");
    } else {
      if (winner === "computer") {
        if (computerWinnerFlag.classList.contains("hide"))
          computerWinnerFlag.classList.remove("hide");
      } else {
        tieFlag.classList.remove("hide");

        if (userWinnerFlag.classList.contains("hide"))
          userWinnerFlag.classList.add("hide");
        if (computerWinnerFlag.classList.contains("hide"))
          computerWinnerFlag.classList.add("hide");
      }
    }
  };

  const restartBoard = () => {
    playerHand.setAttribute("src", rockHandImg);
    computerHand.setAttribute("src", rockHandImg);

    if (!userWinnerFlag.classList.contains("hide"))
      userWinnerFlag.classList.add("hide");

    if (!computerWinnerFlag.classList.contains("hide"))
      computerWinnerFlag.classList.add("hide");

    if (!tieFlag.classList.contains("hide")) tieFlag.classList.add("hide");
  };

  const playRound = (userChoice, computerChoice) => {
    playerHand.style.animation = "shakePlayer 2s ease";
    computerHand.style.animation = "shakeComputer 2s ease";
    setTimeout(() => {
      const winner = determineWinner(userChoice, computerChoice);
      showChoices(userChoice, computerChoice);
      updateScoreBoard(winner);
      showWinner(winner);
    }, 2000);
  };

  const quitGame = () => {
    gameData.play = false;
    menuSoundTheme.pause();
    restartBoard();
    gameData.score.player = 0;
    gameData.score.computer = 0;
    playerScore.textContent = gameData.score.player;
    computerScore.textContent = gameData.score.computer;
    gameEntry.classList.remove("hide");
    gameFrame.classList.add("hide");
  };
};

game();
