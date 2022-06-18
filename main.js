const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=adf6b924719ae76900ac8493a2124769";
const API_KEY = "adf6b924719ae76900ac8493a2124769"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=adf6b924719ae76900ac8493a2124769&query=";
const PLAYING_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=adf6b924719ae76900ac8493a2124769&language=en-US";
const TOP_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=adf6b924719ae76900ac8493a2124769&language=en-US";
const UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=adf6b924719ae76900ac8493a2124769&language=en-US";
const VIDEO_URL = "https://api.themoviedb.org/3/movie/"


const form = document.getElementById("form");
const search = document.getElementById("search");
const playingBtn = document.getElementById("playing");
const topBtn = document.getElementById("top");
const upcomingBtn = document.getElementById("upcoming");
const loader = document.querySelector(".loader");
const video = document.getElementById("video");
const close = document.getElementById("close");


const moviesSection = document.getElementById("movies");
let page = 1;
let currentUrl = API_URL;

async function getMoviesFromAPI(url) {
    const response = await fetch(`${url}&page=${page}`);
    const data = await response.json();
    showMovies(data.results);
}

async function fetchVideo(id) {
    const videoUrl = `${VIDEO_URL}${id}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch (videoUrl);
    const data = await response.json();
    setVideoSrc(data.results[0].key);
}

getMoviesFromAPI(API_URL);

function showMovies(movies) {
    movies.forEach(movie=> {
        const {title, vote_average, poster_path, overview} = movie;
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMAGE_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>
                    <a href="#popup">${title}</a>
                </h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <div>${overview.substring(0,120)}..</div>
            </div>
        `;
        moviesSection.appendChild(movieEl);

        movieEl.addEventListener("click", () => {
            fetchVideo(movie.id);
        });
    })
}

function setVideoSrc(key) {
    video.src = `https://www.youtube.com/embed/${key}`;
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

close.addEventListener ("click", ()=> {
    video.src = "about:blank";
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
        clearMovieSection();
        currentUrl = SEARCH_URL + searchTerm;
        getMoviesFromAPI(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});

function clearMovieSection() {
    moviesSection.innerHTML="";
}

playingBtn.addEventListener ("click", ()=> {
    clearMovieSection();
    currentUrl = PLAYING_URL;
    getMoviesFromAPI(PLAYING_URL);
});

topBtn.addEventListener ("click", ()=> {
    clearMovieSection();
    currentUrl = TOP_URL;
    getMoviesFromAPI(TOP_URL);
});

upcomingBtn.addEventListener ("click", ()=> {
    clearMovieSection();
    currentUrl = UPCOMING_URL;
    getMoviesFromAPI(UPCOMING_URL);
});

window.addEventListener("scroll", ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.body;
    if ( scrollTop + clientHeight >= scrollHeight - 5) {
        loader.classList.add("show");

        setTimeout(()=>{
            loader.classList.remove("show");
        }, 2000);

        setTimeout(()=>{
            page++;
            getMoviesFromAPI(currentUrl);
        }, 2000);
    }
})