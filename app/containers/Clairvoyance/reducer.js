/*
 *
 * Clairvoyance reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SUBMIT_VALUES,
} from './constants';

const initialState = fromJS({
  values: false,
  loading: false,
  result: false,
});

function clairvoyanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_VALUES:
      return state
        .set('loading', true)
        .set('values', action.values);
    default:
      return state;
  }
}

export default clairvoyanceReducer;
