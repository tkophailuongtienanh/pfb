"use strict";

let numberDigits = 3;
let allowZero = false;
let secretNumber = "";
let score = 200;
let highScore = 0;
const retryBtn = document.getElementById("retryBtn");
const howToPlayBtn = document.getElementById("howToPlay");
const bestScore = document.getElementById("best");
const messageTexts = document.querySelectorAll(".message");
const scoreTexts = document.querySelectorAll(".score");
const errorMessage = document.getElementById("errorMessage");
const guessInput = document.getElementById("guess");
const checkBtn = document.getElementById("check");
const dataTable = document.getElementById("history");
init();
function newGame() {
  getRandomNumber();
  score = 200;
  setMessageText("Bắt đầu chơi");
  setScoreText("Số lần đoán: " + score / 10);
  while (dataTable.childElementCount>1) {
    dataTable.removeChild(dataTable.lastChild);
  }
  dataTable.innerHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
}
function getRandomNumber() {
  const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var random = "";
  for (let i = 0; i < numberDigits; i++) {
    if (random.length == 0) {
      var index = Math.trunc(Math.random() * 9) + 1;
      random += arr[index];
      arr.splice(index, 1);
    } else {
      var index = Math.trunc(Math.random() * arr.length);
      random += arr[index];
      arr.splice(index, 1);
    }
  }
  secretNumber = random;
}
function setMessageText(msg) {
  messageTexts.forEach((element) => {
    element.textContent = msg;
  });
}
function setScoreText(msg) {
  scoreTexts.forEach((element) => {
    element.textContent = msg;
  });
}
function onCheckBtnClick() {
  const guess = guessInput.value;
  if (!checkValid(guess)) {
    errorMessage.textContent =
      "*Vui lòng nhập số hợp lệ có " + numberDigits + " chữ số";
    return;
  }
  errorMessage.textContent = "";
  var result = "";
  if (secretNumber === guess) {
    result = "Chuẩn òi!!!";
    addHistory(guess, result);
    gameFinish();
    return;
  }
  for (let i = 0; i < secretNumber.length; i++) {
    for (let j = 0; j < guess.length; j++) {
      if (secretNumber.charAt(i) == guess.charAt(j)) {
        result += "Pico, ";
      }
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) == secretNumber.charAt(i)) {
      result = result.replace("Pico", "Fermi");
    }
  }
  result = result.slice(0, result.length - 2);
  result = result == "" ? "Bagel" : result;
  addHistory(guess, result);
  score -= 10;
  setScoreText("Số lần đoán: " + score / 10);
  if (score <= 0) {
    gameOver();
  }
}
function checkValid(str) {
  if (str == "") return false;
  if (str.charAt(0) == "0") return false;
  if (str.length != numberDigits) return false;
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str.charAt(i) == str.charAt(j)) return false;
    }
  }

  return true;
}
function addHistory(num, str) {
  dataTable.removeChild(dataTable.lastElementChild);
  dataTable.innerHTML += "<tr><td>" + num + "</td><td>" + str + "</td></tr>";
  dataTable.innerHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
}
function gameFinish() {
  setMessageText("Win!!!");
  setScoreText("Đỉnh đấy :v")
  checkBtn.disabled = true;
  // document.querySelector("body").style.backgroundColor = "#60b347";
  // document.querySelector(".number").textContent = secretNumber;
  if (score > highScore) {
    highScore = score;
    bestScore.textContent = highScore;
  }
}
function gameOver() {
  setMessageText("GameOver!!!");
  setScoreText("Gà vãi =))))))))")
  checkBtn.disabled = true;
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
function init() {
  bestScore.textContent = highScore;
  newGame();
  checkBtn.addEventListener("click", onCheckBtnClick);
  retryBtn.addEventListener("click", newGame);
}
document.querySelector(".check").addEventListener("click", onCheckBtnClick);
document.querySelector(".again").addEventListener("click", onAgainBtnClick);
