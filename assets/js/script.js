// Variables declarations and DOM elements selector.

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
var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var resultEl = document.querySelector("#result");
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#save");
var alertEl = document.querySelector("#alert");
var resultCardEl = document.querySelector("#resultCard");
var time = 120;
var currCard = 0;
var scoresList = [];
var scoreObj = {
  initials: "",
  score: ""
};

// List of objects containing questions, possible answers list,
// correct answer and selected answer by the user.

var questionsList = [
  {
    question: "_____ is not a primitive data type in JavaScript.",
    answers: ["Number", "Array", "String", "Null"],
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
    question: "_____ is the symbol of logical AND operator in JavaScript.",
    answers: ["+", "&&", "AND", "&"],
    correctAnswer: "&&",
    selectedAnswer: ""
  },
  {
    question:
      "_____ function is used to display a string or a variable to the console.",
    answers: ["print()", "text.log()", "write()", "console.log()"],
    correctAnswer: "console.log()",
    selectedAnswer: ""
  },
  {
    question: "In JavaScript, DOM stands for _____.",
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

// Event listener for the start quiz button that calls the startQuiz function.

startBtn.addEventListener("click", startQuiz);

// Event listener for the next button that displays the next question
// with a callback function calling displayCard function.

nextBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  currCard++;
  displayCard(currCard);
});

// Event listener for the previous button that displays the previous question
// with a callback function calling displayCard function.

previousBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  currCard--;
  displayCard(currCard);
});

// Event listener for the submit button that calls the endQuiz function.

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let j = 0; j < radio.length; j++) {
    if (radio[j].checked)
      questionsList[currCard].selectedAnswer = radio[j].value;
  }
  score = endQuiz();
});

// Event listener to save score button with a callback function to check for
// and saves the scores in a scores object then saves it to local storage.

saveBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (initials.value.trim() === "") {
    alertEl.classList.remove("d-none");
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

// Function to start the quiz. Display the first question and start the timer function.

function startQuiz() {
  jumbotron.classList.add("d-none");
  card.classList.remove("d-none");
  timer();
  displayCard(currCard);
}

// The main timer function. The function calls the display time function every second and checks
// if the time is up and calls the endQuiz function.

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

// Function to format and display the remaining time.

function displayRemainingTime() {
  minutesEl.textContent =
    Math.floor(time / 60) < 10
      ? "0" + Math.floor(time / 60)
      : Math.floor(time / 60);
  secondsEl.textContent = time % 60 < 10 ? "0" + (time % 60) : time % 60;
}

// Function to  pick the question from the questions list and display the
// question and the possible answer by manipulating the DOM.

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

// Function to check the answer for each question and compares it to the correct answer
// then displays the score.

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
