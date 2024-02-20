import GameObj from "./Game";
const Game = new GameObj();

const initApp = () => {
  initAllTimeData();
  updateScoreBoard();
  listenForPlayerChoice();
  listenForEnterKey();
  listenForPlayAgain();
  lockComputerGameBoardHeight();
  // set focus to start new game
  document.querySelector("h1").focus();
};

document.addEventListener("DOMContentLoaded", initApp);

const initAllTimeData = () => {
  Game.setP1AllTime(parseInt(localStorage.getItem("p1AllTime")) || 0);
  Game.setCpAllTime(parseInt(localStorage.getItem("cpAllTime")) || 0);
};

const updateScoreBoard = () => {
  const p1Ats = document.getElementById("p1_all_time_score");
  p1Ats.textContent = Game.getP1AllTime();
  p1Ats.ariaLabel = `Player One has ${Game.getP1AllTime()} all time wins.`;

  const cpAts = document.getElementById("cp_all_time_score");
  cpAts.textContent = Game.getCpAllTime();
  cpAts.ariaLabel = `Computer Player has ${Game.getCpAllTime()} all time wins.`;

  const p1s = document.getElementById("p1_session_score");
  p1s.textContent = Game.getP1Session();
  p1s.ariaLabel = `Player One has ${Game.getP1Session()} and wins this session.`;

  const cps = document.getElementById("cp_session_score");
  cps.textContent = Game.getCpSession();
  p1s.ariaLabel = `Computer Player has ${Game.getCpSession()} and wins this session.`;
};

const listenForPlayerChoice = () => {
  const p1Images = document.querySelectorAll(
    ".playerBoard .gameboard__square img"
  );
  p1Images.forEach((img) => {
    img.addEventListener("click", (event) => {
      if (Game.getActiveStatus()) return;
      Game.startGame();
      const playerChoice = event.target.parentElement.id;
      updateP1Message(playerChoice);
      p1Images.forEach((img) => {
        if (img === event.target) {
          img.parentElement.classList.add("selected");
        } else {
          img.parentElement.classList.add("not-selected");
        }
      });
      computerAnimationSequence(playerChoice);
    });
  });
};

const listenForEnterKey = () => {
  window.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && event.target.tagName === "IMG") {
      event.target.click();
    }
  });
};

const listenForPlayAgain = () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    resetBoard(); // TODO
  });
};

const lockComputerGameBoardHeight = () => {
  const cpGameBoard = document.querySelector(".computerBoard .gameboard");
  const cpGBStyles = getComputedStyle(cpGameBoard);
  const height = cpGBStyles.getPropertyValue("height");
  cpGameBoard.style.minHeight = height;
};

const updateP1Message = (choice) => {
  let p1msg = document.getElementById("p1msg").textContent;
  p1msg += ` ${choice[0].toUpperCase()}${choice.slice(1)}!`;
  document.getElementById("p1msg").textContent = p1msg;
};

const computerAnimationSequence = (playerChoice) => {
  let interval = 1000;
  setTimeout(() => computerChoiceAnimation("cp_rock", 1), interval);
  setTimeout(() => computerChoiceAnimation("cp_paper", 2), (interval += 500));
};

const computerChoiceAnimation = (elementId, number) => {
  const element = document.getElementById(elementId);
  element.firstElementChild.remove();
  const p = document.createElement("p");
  p.textContent = number;
  element.appendChild(p);
};
