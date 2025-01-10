import "./style.css";

// EMPTY ARRAY TO STORE QUESTIONS AFTER FETCHAPI FUNCTION IS EXECUTED
let questionArray;
let questionNumber = 0;
let score = 0;
const questionContainer = document.getElementById("questionContainer");
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

// fetchApi();

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

// SHOW QUESTIONS & ANSWERS

function generateQuestion() {
    questionArray[questionNumber].question;

}



// ANSWER CLICKED