/*
 *
 * AddHintContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, GET_COORDINATES, GET_COORDINATES_SUCCESS, SUBMIT_COORDINATES,
  SUBMIT_COORDINATES_SUCCESS,
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
