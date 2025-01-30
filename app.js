const movieId = '';

async function getMovie() {
  const apiKey = config.apiKey; 
  const imdbID = 'tt0076759'; 
  // const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie`; // Search for movies

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    const movieData = await response.json();
    console.log(movieData);
    displayMovie(movieData);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    const movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.textContent = "Error fetching movie data. Please try again later."
  }
}

function displayMovie(movie) {
  const movieInfoDiv = document.getElementById('movie-info');
  movieInfoDiv.innerHTML = "";

  const title = document.createElement('h3');
  title.textContent = movie.Title;

  const movieYear = movie.Year;
  console.log(`Year: ${movieYear}`)

  const guessBox = document.createElement('input');
  guessBox.type = 'text';
  guessBox.id = "guessBox";

  const submitGuessButton = document.createElement('button');
  submitGuessButton.textContent = 'Guess';
  submitGuessButton.title = 'Guess';

  submitGuessButton.addEventListener('click', () => {
    const guess = guessBox.value;
    checkGuess(guess, movieYear);
  });

  function checkGuess(guess, correctYear) {
    let message;

    if (guess === correctYear) {
      message = `Your guess of ${guess} was correct!`
    } else {
      message = `Unlucky - the correct year was ${correctYear}`
    }

    console.log(message);
    const resultMessage = document.createElement('p');
    resultMessage.textContent = message;
    movieInfoDiv.appendChild(resultMessage);
    guessBox.value = ""
  }

  movieInfoDiv.appendChild(title);
  movieInfoDiv.appendChild(guessBox);
  movieInfoDiv.appendChild(submitGuessButton);
}
