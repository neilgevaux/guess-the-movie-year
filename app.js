const movieId = '';

// async function getMovie() {
//   const imdbID = 'tt0076759'; 
//   // const url = `https://www.omdbapi.com/?apikey=${}`
//   const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

//   try {
//     const response = await fetch(url);
//     const movieData = await(response.json());
//     console.log(movieData);

//     displayMovie(movieData);
//   } catch (error) {
//     console.error('Error fetching movie:', error);
//   }
// }

// function displayMovie(movie) {
//   const movieInfoDiv = document.getElementById('movie-info');
//   const title = document.createElement('h3');
//   const poster = document.createElement('img');
//   const plot = document.createElement('p');
//   plot.textContent = movie.plot;

//   movieInfoDiv.innerHTML = ''; // Clear previous content
//   movieInfoDiv.appendChild(title);
//   movieInfoDiv.appendChild(poster);
//   movieInfoDiv.appendChild(plot);
// }

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
  title.textContent =movie.Title;

  movieInfoDiv.appendChild(title);
}
