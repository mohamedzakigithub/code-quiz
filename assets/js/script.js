var jumbotron = document.querySelector(".jumbotron");
var card = document.querySelector("#card");
var startBtn = document.querySelector("#startBtn");
var previousBtn = document.querySelector("#previousBtn");
var nextBtn = document.querySelector("#nextBtn");
var minuitsEl = document.querySelector("#minuits");
var secondsEl = document.querySelector("#seconds");
var remainingTime = 300;
var minuits = 10;
var seconds = 0;

var questions = [
  { qustion: "question 1", answers: ["11", "12", "13", "14"] },
  { qustion: "question 2", answers: ["21", "22", "23", "24"] }
];

function startQuiz() {
  jumbotron.classList.add("d-none");
  card.classList.remove("d-none");
  timer();
}

function displayRemainingTime() {
  minuitsEl.textContent =
    Math.floor(remainingTime / 60) < 10
      ? "0" + Math.floor(remainingTime / 60)
      : Math.floor(remainingTime / 60);
  secondsEl.textContent =
    remainingTime % 60 < 10 ? "0" + (remainingTime % 60) : remainingTime % 60;
}

function timer() {
  setInterval(function() {
    remainingTime--;
    if (remainingTime > 0) {
      displayRemainingTime();
    } else {
      endQuiz();
    }
  }, 1000);
}

startBtn.addEventListener("click", startQuiz);
// previousBtn.addEventListener("click", reviousQuestion);
// nextBtn.addEventListener("click", nextQuestion);
