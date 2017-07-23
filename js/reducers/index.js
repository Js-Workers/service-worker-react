import { combineReducers } from 'redux';
import loader from './loader';
import movies from './movies';
import { createReducers } from '../utils/createReducers';

const reducers = {
  loader,
  movies
};

const rootReducer = combineReducers(Object.assign({}, createReducers(reducers)));

export default rootReducer;
