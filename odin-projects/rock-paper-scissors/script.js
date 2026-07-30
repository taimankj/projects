// Score Initialization
let humanScore = 0;
let computerScore = 0;

// DOM Elements
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const roundPara = document.querySelector("#round-result");
const computerItem = document.querySelector("#computer-score");
const humanItem = document.querySelector("#human-score");

/* 
   RETURN rock, paper, scissors based off random number generated with
      1 - rock; 2 - paper; 3 - scissors

      GET random number between 1 - 3 (inclusive)
      CASE random number given OF
         random number equals 1: RETURN "rock"
         random number equals 2: RETURN "paper"
         random number equals 3: RETURN "scissors"
*/
function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      return "ROCK";
    case 2:
      return "PAPER";
    case 3:
      return "SCISSORS";
    default:
      return;
  }
}

function playRound(humanChoice, computerChoice) {
  switch (humanChoice) {
    case "ROCK":
      switch (computerChoice) {
        case "ROCK":
          roundPara.textContent = "TIE!";
          break;
        case "PAPER":
          roundPara.textContent = `You lose ${computerChoice} beats ${humanChoice}`;
          computerScore++;
          break;
        default:
          roundPara.textContent = `You win ${humanChoice} beats ${computerChoice}`;
          humanScore++;
          break;
      }
      break;
    case "PAPER":
      switch (computerChoice) {
        case "ROCK":
          roundPara.textContent = `You win ${humanChoice} beats ${computerChoice}`;
          humanScore++;
          break;
        case "PAPER":
          roundPara.textContent = "TIE!";
          break;
        default:
          roundPara.textContent = `You lose ${computerChoice} beats ${humanChoice}`;
          computerScore++;
          break;
      }
      break;
    default:
      switch (computerChoice) {
        case "ROCK":
          roundPara.textContent = `You lose ${computerChoice} beats ${humanChoice}`;
          computerScore++;
          break;
        case "PAPER":
          roundPara.textContent = `You win ${humanChoice} beats ${computerChoice}`;
          humanScore++;
          break;
        default:
          roundPara.textContent = "TIE!";
          break;
      }
      break;
  }

  computerItem.textContent = computerScore;
  humanItem.textContent = humanScore;
  if (humanScore == 5 || computerScore == 5) {
    checkWinner();
  }
}

function checkWinner() {
  humanScore > computerScore
    ? (roundPara.textContent = `Human Wins!`)
    : (roundPara.textContent = `Computer Wins!`);
  humanScore = 0;
  computerScore = 0;
}

rock.addEventListener("click", (e) => {
  playRound("ROCK", getComputerChoice());
});
paper.addEventListener("click", (e) => {
  playRound("PAPER", getComputerChoice());
});
scissors.addEventListener("click", (e) => {
  playRound("SCISSORS", getComputerChoice());
});
