//variables
const startButton = document.querySelector(".start-button");
const gameEntry = document.querySelector(".game-entry");
const gameFrame = document.querySelector(".game-frame");

const playerOptions = document.querySelectorAll(".player-options button");
const options = ["rock", "paper", "scissors"];
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const imgDirectory = "/assets/images/";

//listeners
startButton.addEventListener("click", (event) => {
  event.preventDefault();
  gameEntry.classList.add("hide");
  gameFrame.classList.remove("hide");
});

playerOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.preventDefault();
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
  let winner = "Invalid Round";
  if (userChoice === "rock") {
    if (computerChoice === "rock") winner = "It's a tie!";
    if (computerChoice === "paper") winner = "Computer wins";
    if (computerChoice === "scissors") winner = "User wins";
  } else if (userChoice === "paper") {
    if (computerChoice === "rock") winner = "User wins";
    if (computerChoice === "paper") winner = "It's a tie!";
    if (computerChoice === "scissors") winner = "Computer wins";
  } else if (userChoice === "scissors") {
    if (computerChoice === "rock") winner = "Computer wins";
    if (computerChoice === "paper") winner = "User wins";
    if (computerChoice === "scissors") winner = "It's a tie!";
  }
  return winner;
};

const showWinner = (winner) => {
  alert(winner);
};

const playRound = (userChoice, computerChoice) => {
  const winner = determineWinner(userChoice, computerChoice);
  showWinner(winner);
};
