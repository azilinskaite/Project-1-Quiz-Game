// EMPTY ARRAY TO STORE QUESTIONS AFTER FETCHAPI FUNCTION IS EXECUTED
let questionArray;

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

fetchApi().then(() => {
  console.log(questionArray);
});


// IMPORTUOTI DISPLAY FUNKCIJA


// HANDLING DATA, TAKING OBJECT OUT OF AN ARRAY
// export async function getData() {
//   try {
//     const data = await fetchApi();
//     data.results.forEach(questionObject => {
//       console.log(questionObject);
//       return questionObject;
//       // return questionObject.question;
//     });
//   } catch (error) {
//     console.error("Failed to use API data:", error);
//   }
// }

// Get each questionObject: question and answers separately
// How to use these objects outside of the function?
// How to get information outside, to be able to display it?







