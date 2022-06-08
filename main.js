const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=adf6b924719ae76900ac8493a2124769";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=adf6b924719ae76900ac8493a2124769&query=";
const PLAYING_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=adf6b924719ae76900ac8493a2124769&language=en-US&page=1";
const TOP_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=adf6b924719ae76900ac8493a2124769&language=en-US&page=1";
const UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=adf6b924719ae76900ac8493a2124769&language=en-US&page=1";


const form = document.getElementById("form");
const search = document.getElementById("search");
const playingBtn = document.getElementById("playing");
const topBtn = document.getElementById("top");
const upcomingBtn = document.getElementById("upcoming");

const moviesSection = document.getElementById("movies");

async function getMoviesFromAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
}

getMoviesFromAPI(API_URL);

function showMovies(movies) {
    moviesSection.innerHTML="";

    movies.forEach(movie=> {
        const {title, vote_average, poster_path, overview} = movie;
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMAGE_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <div>${overview}</div>
            </div>
        `;
        moviesSection.appendChild(movieEl);
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if(vote >=5) {
        return "orange";
    }else {
        return "red";
    }
}

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
        getMoviesFromAPI(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});

playingBtn.addEventListener ("click", ()=> {
    getMoviesFromAPI(PLAYING_URL);
});

topBtn.addEventListener ("click", ()=> {
    getMoviesFromAPI(TOP_URL);
});

upcomingBtn.addEventListener ("click", ()=> {
    getMoviesFromAPI(UPCOMING_URL);
})