import {REQUEST_SUCCEED} from '../actions/movies';

export default {
  [REQUEST_SUCCEED]: (state, {payload}) => {
    return payload.movies;
  }
};
