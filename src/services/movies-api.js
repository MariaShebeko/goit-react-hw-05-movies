import axios from 'axios';
const API_KEY = 'd9be23358e97f87c33dbf928d8eaec37';
const BASE_URL = 'https://api.themoviedb.org/3/';

function getTrendingMovies() {
  return axios
    .get(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
    .then(response => {
      if (response.status === 200 && response.data.results.length !== 0) {
        return response.data.results;
      } else {
        return Promise.reject(
          new Error('There are no trending movies at the moment'),
        );
      }
    });
}

function getMoviesBySearch(query, page) {
  return axios
    .get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`,
    )
    .then(response => {
      if (response.status === 200 && response.data.results.length !== 0) {
        return response.data.results;
      } else {
        return Promise.reject(
          new Error('There are no movies for your request'),
        );
      }
    });
}

function getMovieDetails(movieId) {
  return axios
    .get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        return Promise.reject(
          new Error('There is no information about this movie'),
        );
      }
    });
}

function getMovieActors(movieId) {
  return axios
    .get(
      `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => {
      if (response.status === 200) {
        return response.data.cast;
      } else {
        return Promise.reject(
          new Error('There is no information about this movie'),
        );
      }
    });
}

function getMovieReviews(movieId) {
  return axios
    .get(
      `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => {
      if (response.status === 200) {
        return response.data.results;
      } else {
        return Promise.reject(
          new Error('There is no information about this movie'),
        );
      }
    });
}

const api = {
  getTrendingMovies,
  getMoviesBySearch,
  getMovieDetails,
  getMovieActors,
  getMovieReviews,
};

export default api;
