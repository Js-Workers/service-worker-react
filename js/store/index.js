import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import {sync, logAction} from '../middlewares';

const logger = createLogger();
const middleware = [thunk, logAction, sync, logger];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
