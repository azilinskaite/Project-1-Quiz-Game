async function fetchApi() {
    const url = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Failed to get data:", error.message);
      throw error;
    }
  };

  export async function getApiResults() {
    try {
    // data is an object, results are an array inside that object
      const data = await fetchApi();
      data.results.forEach(item => {
        console.log(item);
      });
    } catch (error) {
      console.error("Failed to use API data:", error);
    }
  }

  getApiResults();