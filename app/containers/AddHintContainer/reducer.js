/*
 *
 * AddHintContainer reducer
 *
 */

import {
  fromJS
} from 'immutable';
import {
  DEFAULT_ACTION,
  GET_COORDINATES,
  GET_COORDINATES_SUCCESS,
  SUBMIT_COORDINATES,
  SUBMIT_COORDINATES_SUCCESS,
  LOAD_LAST_HINT,
  LOAD_LAST_HINT_SUCCESS,
  LOAD_LAST_HINT_ERROR
} from './constants';

const initialState = fromJS({
  loading: false,
  rdx: 0,
  rdy: 0,
  wgs: false,
  subarea: false,
  address: false,
  submittingSuccess: false,
  submitting: false,
  loadingLastHint: false,
  lastHint: false,
  lastHintError: false,
});

function addHintContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return state
        .set('loading', true)
        .set('submittingSuccess', false)
        .set('subarea', action.subarea)
        .set('rdx', action.rdx)
        .set('rdy', action.rdy);
    case GET_COORDINATES_SUCCESS:
      return state
        .set('loading', false)
        .set('address', action.response.address)
        .set('wgs', action.response.wgs);
    case SUBMIT_COORDINATES:
      return state
        .set('submitting', true);
    case LOAD_LAST_HINT:
      return state
        .set('loadingLastHint', true)
        .set('lastHintError', false)
        .set('lastHint', false);
    case LOAD_LAST_HINT_SUCCESS:
      return state
        .set('loadingLastHint', false)
        .set('lastHint', action.hint)
        .set('lastHintError', false);
    case LOAD_LAST_HINT_ERROR:
      return state
        .set('loadingLastHint', false)
        .set('lastHintError', action.error)
        .set('lastHint', false)
    case SUBMIT_COORDINATES_SUCCESS:
      return state
        .set('submitting', false)
        .set('subarea', false)
        .set('address', false)
        .set('wgs', false)
        .set('rdx', false)
        .set('submittingSuccess', true)
        .set('rdy', false);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addHintContainerReducer;