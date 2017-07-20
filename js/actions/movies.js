import {showLoader, hideLoader} from './loader';
import queryString from 'query-string';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCEED = 'REQUEST_SUCCEED';
export const REQUEST_FAILS = 'REQUEST_FAILS';

export {
  loadMoviesRequestStarted,
  loadMoviesRequestSucceed,
  loadMoviesRequestFails,
  loadMovies
};

function loadMoviesRequestStarted() {
  return {
    type: REQUEST_STARTED
  };
}

function loadMoviesRequestSucceed(movies) {
  return {
    type: REQUEST_SUCCEED,
    payload: {
      movies
    },
    sync: true
  };
}

function loadMoviesRequestFails(error) {
  return {
    type: REQUEST_FAILS,
    payload: {
      error
    }
  };
}

const queryObj = {
  'api_key': '59ff214635b431c1656379bf5aa01a8a',
  language: 'en-US',
  page: 1
};

const api = `https://api.themoviedb.org/3/movie/popular?${queryString.stringify(queryObj)}`;

function loadMovies() {
  return dispath => {
    dispath(loadMoviesRequestStarted());
    dispath(showLoader());
    return fetch(api, {method: 'GET'})
      .then(response => {
        if (response.status !== 200) return Promise.reject(response);

        return response.json()
          .then(data => {
            dispath(hideLoader());

            return dispath(loadMoviesRequestSucceed(data.results));
          });
      })
      .catch(error => {
        dispath(hideLoader());

        return error.text().then(text => dispath(loadMoviesRequestFails(text)));
      });
  };
}
