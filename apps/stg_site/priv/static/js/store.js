import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} from 'redux';

import {
  routerStateReducer,
  reduxReactRouter,
  pushState   // not needed due to createHistory?
} from 'redux-router';

import { createHistory } from 'history';
import createLogger from 'redux-logger';


const reducer = combineReducers({
  router: routerStateReducer
});

const store = compose(
  reduxReactRouter({ createHistory }),
  applyMiddleware(createLogger())
  // devTools()
)(createStore)(reducer);

export default store;