// Function to get the movie data of all the movies
const getMovies = async function () {
  const response = await fetch('http://localhost:3000/films');
  const movies = await response.json();
  return movies;
};

// Using the async/await to fetch data from the server and then calling the function to check for errors.
getMovies()
  .then(movies => console.log('Data successfully obtained', movies))
  .catch(err => console.log(err.message));

// Function to fetch a movie by id
const getMoviesById = async function (id){
  const response = await fetch(`http://localhost:3000/films/${id}`);
  const movie = await response.json();
  return movie;
};

const movieId = 1;
getMoviesById(movieId)
  .then(movie => console.log(`id movie has been fetched`, movie))
  .catch(err => console.log(`there is an error`, err.message));

// Function to create a list of the titles of the movie
const getMoviesList = async function () {
  const movies = await getMovies(); // First obtain all the movies
  const moviesList = document.getElementById("films"); // The movies will be put inside this element
  moviesList.innerHTML = ''; // Clear the element
  
  // Iterate over each movie using a for loop
  for (let i = 0; i < movies.length; i++) {
    const currentMovie = movies[i];
    const listedMovies = document.createElement('li');
    listedMovies.textContent = currentMovie.title;
    
    // Add event listener to each list item
    listedMovies.addEventListener('click', async function() {
      const pickedMovie = await getMoviesById(currentMovie.id);
      movieDetails(pickedMovie);
    }); 
    moviesList.appendChild(listedMovies); // it should be inside the loop
  }
  
  return moviesList;
};

getMoviesList();

const movieDetails = (currentMovie) => {
  const content = document.getElementById("showing");
  content.innerHTML = `
      <div class="card">
          <div class="title">${currentMovie.title}</div>
          <div class="card">
              <div id="runtime" class="meta">${currentMovie.runtime} minutes</div>
              <div class="content">
                  <div class="description">
                      <div id="film-info">${currentMovie.description}</div>
                      <span id="showtime" class="ui label">${currentMovie.showtime}</span>
                      <span id="ticket-num">${currentMovie.capacity - currentMovie.tickets_sold}</span> remaining tickets
                  </div>
              </div>
              <div class="extra content">
                  <button id="buy-ticket" class="ui orange button">
                      ${currentMovie.capacity - currentMovie.tickets_sold > 0 ? "Buy Ticket" : "Sold Out"}
                  </button>
              </div>
          </div>
      </div>
  `;
   // Select the img element inside the container
  const posterImg = document.querySelector('.four.wide.column img');

  // Updating the src and alt attributes of the img element
  posterImg.src = currentMovie.poster;
  posterImg.alt = currentMovie.title;

  let button = document.getElementById("buy-ticket");
  button.onclick = () => {
      if (currentMovie.capacity - currentMovie.tickets_sold > 0) {
          currentMovie.tickets_sold++; 
          let tickets = document.getElementById("ticket-num")
          tickets.innerHTML = `${currentMovie.capacity - currentMovie.tickets_sold}`
          button.textContent = "Buy Ticket";
      } else {
          button.textContent = "Sold Out";
      }
  };
  
};
  
 