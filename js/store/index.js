import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import history from '../history';
import { routerMiddleware } from 'react-router-redux';

const middleware = process.env.NODE_ENV === 'production' ? [routerMiddleware(history), thunk] : [routerMiddleware(history), thunk, createLogger()];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
