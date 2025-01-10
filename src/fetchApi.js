// EMPTY ARRAY TO STORE QUESTIONS AFTER FETCHAPI FUNCTION IS EXECUTED
let questionArray;
let questionNumber = 0;
let score = 0;

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

// fetchApi().then(() => {
//   console.log(questionArray);
//   console.log(questionArray[0].question);
//   console.log(questionArray[0].correct_answer);
//   console.log(questionArray[0].incorrect_answers); // array
// });

// START THE GAME
// SHOW QUESTIONS & ANSWERS
// ANSWER CLICKED

// SEPARATE QUESTION OBJECTS TO ACCESS QUESTIONS AND ANSWERS INDIVIDUALLY

function displayQuestion () {
  let question = questionArray[0].question;
  let correctAnswer = questionArray[0].correct_answer;
  let incorrectAnswers = questionArray[0].incorrect_answers;
}

// function displayAnswers

// Get each questionObject: question and answers separately
// How to use these objects outside of the function?
// How to get information outside, to be able to display it?

// button to show next question





