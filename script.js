"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highScore = 0;
// document.querySelector(".number").textContent = secretNumber;

function onCheckBtnClick() {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "No number!";
  } else if (guess > secretNumber) {
    document.querySelector(".message").textContent = "Too High!";
    score--;
  } else if (guess < secretNumber) {
    document.querySelector(".message").textContent = "Too Low!";
    score--;
  } else if (guess === secretNumber) {
    gameFinish();
    return;
  }

  if (score <= 0) {
    gameOver();
  }
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
}
function gameFinish() {
  document.querySelector(".message").textContent = "Correct number!";
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").textContent = secretNumber;
  if (score > highScore) {
    highScore = score;
    document.querySelector(".highscore").textContent = highScore;
  }
  document.querySelector(".guess").disabled = true;
}
function gameOver() {
  document.querySelector(".message").textContent = "GameOver!!!";
  document.querySelector(".guess").disabled = true;
}
function onAgainBtnClick() {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 10;
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").disabled = false;
}

document.querySelector(".check").addEventListener("click", onCheckBtnClick);
document.querySelector(".again").addEventListener("click", onAgainBtnClick);
