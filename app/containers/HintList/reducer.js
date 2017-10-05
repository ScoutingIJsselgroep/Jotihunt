/*
 *
 * HintList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_HINTS,
  LOAD_HINTS_SUCCESS,
  LOAD_HINTS_ERROR,
  DELETE_HINT,
} from './constants';

const initialState = fromJS({
  loadingHints: false,
  hints: false,
  errorLoadingHints: false,
});

function hintListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HINTS:
      return state
        .set('loadingHints', true)
        .set('hints', false)
        .set('errorLoadingHints', false);
    case LOAD_HINTS_ERROR:
      return state
        .set('loadingHints', false)
        .set('errorLoadingHints', action.error);
    case LOAD_HINTS_SUCCESS:
      return state
        .set('loadingHints', false)
        .set('hints', action.hintList);
    case DELETE_HINT:
      return state
        .set('loadingHints', true)
        .set('hints', false);
    default:
      return state;
  }
}

export default hintListReducer;
