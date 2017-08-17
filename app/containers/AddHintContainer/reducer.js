/*
 *
 * AddHintContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_COORDINATES,
} from './constants';

const initialState = fromJS({
  loading: false,
  rdx: 0,
  rdy: 0,
});

function addHintContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return state
        .set('loading', true)
        .set('rdx', action.rdx)
        .set('rdy', action.rdy);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addHintContainerReducer;
