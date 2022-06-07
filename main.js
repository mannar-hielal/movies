const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=adf6b924719ae76900ac8493a2124769";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=adf6b924719ae76900ac8493a2124769&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMoviesFromAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
}

getMoviesFromAPI(API_URL);

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
        getMoviesFromAPI(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }

})