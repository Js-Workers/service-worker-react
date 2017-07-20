import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import history from '../history';
import { routerMiddleware } from 'react-router-redux';
import {sync, logAction} from '../middlewares';

const middleware = [routerMiddleware(history), thunk, logAction, sync, createLogger()];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
