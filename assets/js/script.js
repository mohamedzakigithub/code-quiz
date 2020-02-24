var jumbotron = document.querySelector("#jumbotron");
var card = document.querySelector("#card");
var question = document.querySelector("#question");
var optionLabel = document.querySelectorAll("label");
var radio = document.querySelectorAll(".radio");
var startBtn = document.querySelector("#startBtn");
var previousBtn = document.querySelector("#previousBtn");
var nextBtn = document.querySelector("#nextBtn");
var submitBtn = document.querySelector("#submitBtn");
var timerEl = document.querySelector("#timer");
var minuitsEl = document.querySelector("#minuits");
var secondsEl = document.querySelector("#seconds");
var resultEl = document.querySelector("#result");
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#save");
var resultCardEl = document.querySelector("#resultCard");
var time = 120;
var currCard = 0;
var scoresList = [];
var scoreObj = {
  initials: "",
  score: ""
};
var questionsList = [
  {
    question: "_____ is not a primative data type in JavaScript.",
    answers: ["Number", "Array", "String", "null"],
    correctAnswer: "Array",
    selectedAnswer: ""
  },
  {
    question: "JavaScript code is enclosed in _____ tag in HTML document.",
    answers: ["<code>", "<style>", "<script>", "<link>"],
    correctAnswer: "<script>",
    selectedAnswer: ""
  },
  {
    question: "_____ is the logical AND operator in JavaScript",
    answers: ["+", "&&", "AND", "&"],
    correctAnswer: "&&",
    selectedAnswer: ""
  },
  {
    question:
      "_____ function is used to display a string or a variable to the console",
    answers: ["print()", "text.log()", "write()", "console.log()"],
    correctAnswer: "console.log()",
    selectedAnswer: ""
  },
  {
    question: "In JavaScript DOM stands for _____",
    answers: [
      "Day Of Month",
      "Document Object Model",
      "Data Object Model",
      "Document Object Manipulation"
    ],
    correctAnswer: "Document Object Model",
    selectedAnswer: ""
  }
];

function startQuiz() {
  jumbotron.classList.add("d-none");
  card.classList.remove("d-none");
  timer();
  displayCard(currCard);
}

function displayCard(i) {
  switch (i) {
    case 0:
      previousBtn.classList.add("d-none");
      break;
    case 4:
      nextBtn.classList.add("d-none");
      submitBtn.classList.remove("d-none");
      break;
    default:
      nextBtn.classList.remove("d-none");
      previousBtn.classList.remove("d-none");
      submitBtn.classList.add("d-none");
  }
  question.textContent = i + 1 + " of 5: " + questionsList[i].question;
  optionLabel.forEach(function(arr, j) {
    arr.textContent = questionsList[i].answers[j];
  });
  radio.forEach(function(arr, j) {
    arr.value = questionsList[i].answers[j];
    if (radio[j].value == questionsList[i].selectedAnswer) {
      radio[j].checked = true;
    } else {
      radio[j].checked = false;
    }
  });
}

function displayRemainingTime() {
  minuitsEl.textContent =
    Math.floor(time / 60) < 10
      ? "0" + Math.floor(time / 60)
      : Math.floor(time / 60);
  secondsEl.textContent = time % 60 < 10 ? "0" + (time % 60) : time % 60;
}

function timer() {
  setInterval(function() {
    time--;
    if (time > 0) {
      displayRemainingTime();
    } else {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  var score = 0;
  for (let i = 0; i < questionsList.length; i++) {
    if (questionsList[i].selectedAnswer === questionsList[i].correctAnswer)
      score++;
  }
  card.classList.add("d-none");
  timerEl.classList.add("d-none");
  resultCardEl.classList.remove("d-none");
  resultEl.textContent = score + " out of 5 - " + (score / 5) * 100 + "%";
  return score;
}

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  currCard++;
  displayCard(currCard);
});
previousBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  currCard--;
  displayCard(currCard);
});

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  score = endQuiz();
});

saveBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (initials.value.trim() === "") {
    console.log("blank");
  } else {
    score = endQuiz();
    scoreObj.initials = initials.value;
    scoreObj.score = (score / 5) * 100;
    scoresList = JSON.parse(localStorage.getItem("scores")) || [];
    scoresList.push(scoreObj);
    localStorage.setItem("scores", JSON.stringify(scoresList));
    location.href = "./scores.html";
  }
});
