//variables
const startButton = document.querySelector(".start-button");
const gameEntry = document.querySelector(".game-entry");
const gameFrame = document.querySelector(".game-frame");

const playerOptions = document.querySelectorAll(".player-options button");
const options = ["rock", "paper", "scissors"];
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const imgDirectory = "/assets/images/";

const tieFlag = document.querySelector(".main .tie-flag");
const userWinnerFlag = document.querySelector(".main .player .winner-flag");
const computerWinnerFlag = document.querySelector(
  ".main .computer .winner-flag"
);

const gameData = {
  score: {
    player: 0,
    computer: 0,
  },
};

//listeners
startButton.addEventListener("click", (event) => {
  event.preventDefault();
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

//functions
const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();
  if (userInput && options.some((option) => option === userInput)) {
    const userChoiceIndex = options.indexOf(userInput);
    const userChoice = options[userChoiceIndex];
    const optionImageURL = imgDirectory + userChoice + ".png";

    playerHand.setAttribute("src", optionImageURL);

    return userChoice;
  }
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  const computerChoice = options[randomNumber];
  const optionImageURL = imgDirectory + computerChoice + ".png";

  computerHand.setAttribute("src", optionImageURL);

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
  const playerScore = document.querySelector(".score .player-score p");
  const computerScore = document.querySelector(".score .computer-score p");

  if (winner && winner === "user") {
    gameData.score.player++;
    playerScore.textContent = gameData.score.player;
  } else if (winner && winner === "computer") {
    gameData.score.computer++;
    computerScore.textContent = gameData.score.computer;
  }
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
  if (!userWinnerFlag.classList.contains("hide"))
    userWinnerFlag.classList.add("hide");

  if (!computerWinnerFlag.classList.contains("hide"))
    computerWinnerFlag.classList.add("hide");

  if (!tieFlag.classList.contains("hide")) tieFlag.classList.add("hide");
};

const playRound = (userChoice, computerChoice) => {
  const winner = determineWinner(userChoice, computerChoice);
  updateScoreBoard(winner);
  showWinner(winner);
};
