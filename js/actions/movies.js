import {showLoader, hideLoader} from './loader';
import queryString from 'query-string';
import db from '../db';

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

function loadMoviesRequestSucceed(movies, offlineOptions) {
  const obj = {
    type: REQUEST_SUCCEED,
    payload: {
      movies
    }
  };

  return offlineOptions ? {...obj, ...offlineOptions} : obj;
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

            // TODO: store to IndexedDb response
            db.cache.put(Object.assign({}, data, {api}));

            return dispath(loadMoviesRequestSucceed(data.results));
          });
      })
      .catch(() => {
        dispath(hideLoader());

        return dispath(loadMoviesRequestSucceed(null, {sync: {api}}))
          .catch(err => dispath(loadMoviesRequestFails(err)));
      });
  };
}
