import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} from 'redux';

import { routeReducer } from 'redux-simple-router';

import createLogger from 'redux-logger';

/**
 * Create a setter from an action.type and an accessor. Ex:
 * ```
 * createSetter('SET_TIME', 'now', '')
 * ```
 * generates
 * ```
 * (state = '', action) => {
 *   if (action.type === 'SET_TIME')
 *     return action.now
 *   else
 *     return state
 * }
 * ```
 */
const createSetter = (type, accessor, defaultState) => {
  return (state = defaultState, action) => {
    return action.type === type ? action[accessor] : state;
  }
}

const reducer = combineReducers({
  routing: ((state = { segments: [] }, type) => {
    let res = routeReducer(state, type);
    return { ...res, segments: res.path ? res.path.split(/[\/?]/).slice(2).slice(0,-1) : [] };
  }),
  time: createSetter('SET_TIME', 'now', ''),
  menuOpen: createSetter('MENU_TOGGLE', 'menuOpen', false),
  message: createSetter('SET_MESSAGE', 'message', null)
});

const store = compose(
  // reduxReactRouter({ createHistory }),
  // applyMiddleware(createLogger())
  // devTools()
)(createStore)(reducer);

export default store;