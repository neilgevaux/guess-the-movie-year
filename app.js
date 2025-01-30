const apiKey = config.apiKey; 

async function getMovie() {

  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500) + 1}&with_watch_monetization_types=flatrate`; // Example query
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No movies found.");
    }

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];
    getMovieDetails(randomMovie.id);

  } catch (error) {
      console.error("Error fetching movie data:", error);
      const movieInfoDiv = document.getElementById('movie-info');
      if (movieInfoDiv) {
          movieInfoDiv.textContent = "Error fetching movie data. Please try again later.";
      } else {
          console.error("movie-info element not found!");
      }
  }
}

async function getMovieDetails(movieId) {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  const response = await fetch(detailsUrl);
  const movieDetails = await response.json();
  displayMovie(movieDetails);
}

function displayMovie(movie) {
  const movieInfoDiv = document.getElementById('movie-info');
  movieInfoDiv.innerHTML = "";

  const title = document.createElement('h3');
  title.textContent = movie.title;

  const movieYear = movie.release_date? movie.release_date.substring(0, 4): "Year not available"; 
  console.log(`Year: ${movieYear}`);

  const guessBox = document.createElement('input');
  guessBox.type = 'text';
  guessBox.id = "guessBox";

  guessBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission (if inside a form)
      const guess = guessBox.value;
      checkGuess(guess, movieYear);
    }
  });

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

  const nextMovieButton = document.createElement('button');
  nextMovieButton.textContent = 'Next Movie';
  nextMovieButton.id = 'next-movie'
  nextMovieButton.addEventListener('click', getMovie);

  movieInfoDiv.appendChild(nextMovieButton); 
}

document.addEventListener('DOMContentLoaded', () => {
  getMovie();
})
