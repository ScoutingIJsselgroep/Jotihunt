/*
 *
 * AddHintContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_COORDINATES, GET_COORDINATES_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  rdx: 0,
  rdy: 0,
  wgs: false,
  subarea: false,
  address: false,
});

function addHintContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return state
        .set('loading', true)
        .set('rdx', action.rdx)
        .set('rdy', action.rdy);
    case GET_COORDINATES_SUCCESS:
      return state
        .set('loading', false)
        .set('subarea', action.response.subarea)
        .set('address', action.response.address)
        .set('wgs', action.response.wgs);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addHintContainerReducer;
