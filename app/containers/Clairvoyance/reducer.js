/*
 *
 * Clairvoyance reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SUBMIT_VALUES,
  RESULT,
  SUBMIT_VALUES_AS_HINT_SUCCESS,
  SUBMIT_VALUES_AS_HINT_ERROR,
  SUBMIT_VALUES_AS_HINT, LOAD_HINTS, LOAD_HINTS_ERROR, LOAD_HINTS_SUCCESS,
} from './constants';

const initialState = fromJS({
  values: false,
  loading: false,
  result: false,
  error: false,
  sendValues: false,
  success: false,
});

function clairvoyanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_HINTS:
      return state
        .set('hints', false)
        .set('loading', true)
        .set('error', false);
    case LOAD_HINTS_SUCCESS:
      return state
        .set('hints', action.hints)
        .set('loading', false)
        .set('error', false);
    case LOAD_HINTS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SUBMIT_VALUES:
      return state
        .set('loading', true)
        .set('success', false)
        .set('values', action.values);
    case RESULT:
      return state
        .set('loading', false)
        .set('success', false)
        .set('result', action.result);
    case SUBMIT_VALUES_AS_HINT:
      return state
        .set('loading', true)
        .set('result', false)
        .set('sendValues', action.values)
        .set('success', false)
        .set('error', false);
    case SUBMIT_VALUES_AS_HINT_SUCCESS:
      return state
        .set('success', true)
        .set('loading', false);
    case SUBMIT_VALUES_AS_HINT_ERROR:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default clairvoyanceReducer;
