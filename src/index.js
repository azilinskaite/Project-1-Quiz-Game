import "./style.css";

// EMPTY ARRAY TO STORE QUESTIONS AFTER FETCHAPI FUNCTION IS EXECUTED
let questionArray;
let randomAnswer;
let answerIndex;
let questionNumber = 0;
let score = 0;
let progress = 0;
const questionContainer = document.getElementById("questionContainer");
const answersContainer = document.getElementById("answersContainer");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

// FETCHING API, RETURNING ARRAY OF QUESTION OBJECTS
export async function fetchApi() {
  const url =
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
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
  questionContainer.classList.remove("hide");
  nextBtn.classList.remove("hide");
  generateQuestion();
}

// SHOW QUESTION & GENERATE A BUTTON FOR EACH ANSWER
function generateQuestion() {
  document.getElementById("question").innerText =
    questionArray[questionNumber].question;
  // if question innerText includes "&quot;" change to '"'
  // if question innerText includes "&#039" change to "'"

  // COMBINE INCORRECT ANSWERS WITH CORRECT ONE
  const answers = [
    ...questionArray[questionNumber].incorrect_answers,
    questionArray[questionNumber].correct_answer,
  ];
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answerBtn");
    button.textContent = answer;
    answersContainer.appendChild(button);
    button.addEventListener("click", (e) => {
      checkAnswer(e);
    });
  });
  // RANDOMIZE ANSWER POSITIONS
  randomAnswer = answers.sort(() => Math.random() - 0.5);
  answerIndex = 0;

  // click only one button at the time
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
  //remove event listener?
}

// NEXT BUTTON CLICK, UPDATE INDEX, UPDATE PROGRESS BAR, GENERATE NEW QUESTION, ETC.
nextBtn.addEventListener("click", () => {
  answersContainer.innerHTML = "";
  questionNumber++;
  progress += 10;
  updateProgressBar();
  generateQuestion();
});

// SHOW PROGRESS
function updateProgressBar() {
  progressBar.style.background = `linear-gradient(to right, var(--contrast) ${progress}%, transparent ${progress}%, transparent 100%)`;
}

// END GAME WHEN OUT OF QUESTIONS

// SHOW SCORE PAGE

//   if (questionArray.length > questionNumber = 10
//   show score (instead of question)
//   show restartBtn
//   hide everything else
// document.getElementById("restartBtn").addEventListener("click", () => {
//     startGame();
//   });

// prideti rotating vinilo pics?
