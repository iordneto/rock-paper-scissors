const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();

  if (
    userInput === "rock" ||
    userInput === "paper" ||
    userInput === "scissors"
  ) {
    return userInput;
  }

  console.log("Error: Invalid input");
};

const getComputerChoice = () => {
  const number = Math.floor(Math.random() * 3);
  switch (number) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      return "";
  }
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

const userChoice = getUserChoice("paper");
const computerChoice = getComputerChoice();

const winner = determineWinner(userChoice, computerChoice);

console.log(
  `User chose '${userChoice}' and Computer chose '${computerChoice}'.`
);
console.log(winner);
