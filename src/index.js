import "./style.css";
import scoreImage from './assets/vinyl.png';

// EMPTY ARRAY TO STORE QUESTIONS AFTER FETCHAPI FUNCTION IS EXECUTED
let questionArray;
let questionNumber;
let randomAnswer;
let score;
let progress;
const questionContainer = document.getElementById("questionContainer");
const answersContainer = document.getElementById("answersContainer");
const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const scorePage = document.getElementById("scorePage");
// adding image to scorePage. What's a better way to do this?
const scoreImageEl = document.createElement("img");
scoreImageEl.src = scoreImage;
scoreImageEl.alt = "Score image";
scoreImageEl.classList.add("hide");
scorePage.appendChild(scoreImageEl);

// FETCHING API, RETURNING ARRAY OF QUESTION OBJECTS
export async function fetchApi() {
  const url =
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const jsonData = await response.json();
    questionArray = jsonData.results;
    return questionArray;
  } catch (error) {
    console.error("Failed to get data:", error.message);
    throw error;
  }
}

fetchApi();

// START THE GAME WHEN START BUTTON IS CLICKED
startBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  startBtn.classList.add("hide");
  scorePage.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextBtn.classList.remove("hide");
  questionNumber = 0;
  score = 0;
  progress = 10;
  updateProgressBar();
  generateQuestion();
}

// SHOW QUESTION & GENERATE BUTTONS FOR ANSWERS
function generateQuestion() {
  document.getElementById("question").innerText = convertHTMLEntities(
    questionArray[questionNumber].question
  );
  // combine incorrect and correct answers together
  const answers = [
    ...questionArray[questionNumber].incorrect_answers,
    questionArray[questionNumber].correct_answer,
  ];
  // randomize answer positions
  randomAnswer = answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answerBtn");
    button.textContent = convertHTMLEntities(answer);
    answersContainer.appendChild(button);
  });
  // only one answer can be clicked per question
  answersContainer.addEventListener(
    "click",
    (e) => {
      if (e.target.matches(".answerBtn")) {
        checkAnswer(e);
      }
    },
    { once: true }
  );
}

// FUNCTION TO FIX STRANGE CHARACTERS IN QUESTIONS
function convertHTMLEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "-")
    .replace(/&uuml;/g, "ü");
}

// CHECK IF CLICKED ANSWER IS CORRECT
function checkAnswer(e) {
  const selectedButton = e.target;
  const selectedAnswer = selectedButton.textContent;
  const correctAnswer = questionArray[questionNumber].correct_answer;
  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct-button");
    score++;
  } else {
    selectedButton.classList.add("wrong-button");
  }
}

// NEXT BUTTON CLICK, UPDATE INDEX, PROGRESS BAR, GENERATE NEW QUESTION, ETC.
nextBtn.addEventListener("click", () => {
  answersContainer.innerHTML = "";
  questionNumber++;
  progress += 10;
  updateProgressBar();
  // check if there are questions left in array
  if (questionArray.length > questionNumber) {
    generateQuestion();
  } else {
    showScore();
  }
});

// SHOW PROGRESS
function updateProgressBar() {
  progressBar.style.background = `linear-gradient(to right, var(--contrast) ${progress}%, transparent ${progress}%, transparent 100%)`;
}

// SHOW SCORE WHEN GAME IS OVER
function showScore() {
  questionContainer.classList.add("hide");
  nextBtn.classList.add("hide");
  startBtn.classList.remove("hide");
  scorePage.classList.remove("hide");
  scoreImageEl.classList.remove("hide");
  document.querySelector("#scorePage h2").innerText = "Nice job!";
  document.querySelector("#scorePage p").innerText = `You scored: ${+score}`;
  startBtn.innerText = "Play again!";
}
