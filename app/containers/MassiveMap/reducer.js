/*
 *
 * MassiveMap reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_HINTS,
  LOAD_HINTS_ERROR,
  LOAD_HINTS_SUCCESS,
  LOAD_STATUS,
  LOAD_STATUS_SUCCESS,
  LOAD_STATUS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  hints: false,
  loadingStatus: false,
  errorStatus: false,
  status: false,
});

function massiveMapReducer(state = initialState, action) {
  switch (action.type) {
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
    case LOAD_STATUS_ERROR:
      return state
        .set('errorStatus', action.error)
        .set('status', false)
        .set('loadingStatus', false);
    case LOAD_STATUS_SUCCESS:
      return state
        .set('errorStatus', false)
        .set('status', action.status)
        .set('loadingStatus', false);
    case LOAD_STATUS:
      return state
        .set('errorStatus', false)
        .set('status', false)
        .set('loadingStatus', true);
    default:
      return state;
  }
}

export default massiveMapReducer;