const movieId = '';

function getMovie() {
  const apiKey = config.apiKey; 
  const imdbID = 'tt0076759'; 
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  fetch(url)
  .then(response => response.json())
  .then(movieData => {
    console.log(movieData);
    displayMovie(movieData); 
  });
}

function displayMovie(movie) {
  const movieInfoDiv = document.getElementById('movie-info');

  const title = document.createElement('h3');
  title.textContent = movie.Title;

  const year = movie.Year;
  console.log(`Year: ${year}`)

  const guessBox = document.createElement('input');
  const submitGuessButton = document.createElement('button');
  submitGuessButton.textContent = 'Guess';
  submitGuessButton.title = 'Guess';
  submitGuessButton.addEventListener('click', retrieveGuess);

  function retrieveGuess() {
    const guess = guessBox.value;
    console.log(guess);
  }

  function checkGuess() {
    const userGuess = guessBox.value;
    console.log(userGuess);
    return userGuess;
  }
  
  checkGuess();

  movieInfoDiv.appendChild(title);
  movieInfoDiv.appendChild(guessBox);
  movieInfoDiv.appendChild(submitGuessButton);
}
