/*
 *
 * AddHunt reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LOCATION_ERROR, LOAD_LOCATION_SUCCESS, LOAD_LOCATION, SUBMIT_HUNT, SUBMIT_HUNT_ERROR, SUBMIT_HUNT_SUCCESS,
} from './constants';

const initialState = fromJS({
  locationLoading: false,
  locationError: false,
  locationResult: false,
  huntLoading: false,
  huntResult: false,
  huntError: false,
  subarea: false,
});

function addHuntReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOCATION:
      return state
        .set('locationLoading', true)
        .set('locationError', false)
        .set('locationResult', false)
        .set('huntError', false)
        .set('huntResult', false)
        .set('huntLoading', false);
    case LOAD_LOCATION_SUCCESS:
      return state
        .set('locationLoading', false)
        .set('locationError', false)
        .set('locationResult', action.location);
    case LOAD_LOCATION_ERROR:
      return state
        .set('locationLoading', false)
        .set('locationError', action.error)
        .set('locationResult', false);
    case SUBMIT_HUNT:
      return state
        .set('subarea', action.subarea)
        .set('huntError', false)
        .set('huntResult', false)
        .set('huntLoading', true);
    case SUBMIT_HUNT_ERROR:
      return state
        .set('huntError', action.error)
        .set('huntResult', false)
        .set('huntLoading', false);
    case SUBMIT_HUNT_SUCCESS:
      return state
        .set('huntError', false)
        .set('huntResult', true)
        .set('huntLoading', false);
    default:
      return state;
  }
}

export default addHuntReducer;
