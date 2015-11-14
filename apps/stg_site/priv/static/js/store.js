import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} from 'redux';

import { routeReducer } from 'redux-simple-router';

import createLogger from 'redux-logger';

const reducer = combineReducers({
  routing: routeReducer,
  time: (state = '', action) => {
    if (action.type === 'SET_TIME')
      return action.now
    else
      return state
  }
});

const store = compose(
  // reduxReactRouter({ createHistory }),
  applyMiddleware(createLogger())
  // devTools()
)(createStore)(reducer);

export default store;