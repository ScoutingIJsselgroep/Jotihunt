/*
 *
 * MassiveMap reducer
 *
 */

import {
  fromJS
} from 'immutable';
import {
  LOAD_HINTS,
  LOAD_HINTS_ERROR,
  LOAD_HINTS_SUCCESS,
  LOAD_STATUS,
  LOAD_STATUS_SUCCESS,
  SET_LATLNG,
  LOAD_STATUS_ERROR,
  LOAD_PREDICTIONS,
  SET_INFO_WINDOW_STATE,
  LOAD_PREDICTIONS_ERROR,
  LOAD_PREDICTIONS_SUCCES,
  LOAD_CARS_SUCCESS,
  LOAD_CARS_ERROR,
  TOGGLE_HISTORY,
  LOAD_CARS,
  RIGHT_CLICK_EVENT,
  RIGHT_CLICK_EVENT_SUCCESS,
  CLEAR_LOCATION,
  SET_SEARCH_RESULTS,
} from './constants';

function checkIfOpened(object, state, type) {
  for (var key in object) {
    object[key].isOpen = state.getIn(['popupState', type, object[key].id], false);
  }

  return object
}

const initialState = fromJS({
  popupState: {},
  loading: false,
  error: false,
  hints: false,
  loadingStatus: false,
  errorStatus: false,
  status: false,
  carsLoading: false,
  carsError: false,
  cars: false,
  history: false,
  rightClickSubarea: false,
  predictions: false,
  predictionsError: false,
  loadRightClick: false,
  rightClickLatLng: false,
  latlng: {
    lat: 52.1023337615325,
    lng: 6.009883117643787
  },
  zoom: 10,
  rightClickLocation: false,
  searchResults: false,
});

function massiveMapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INFO_WINDOW_STATE:
      return state
        .setIn(['popupState', action.key, action.id], action.popupState);
    case SET_LATLNG:
      return state
        .set('latlng', fromJS(action.latlng))
        .set('zoom', fromJS(action.zoom));
    case LOAD_PREDICTIONS:
      return state
        .set('predictionsError', false);
    case LOAD_PREDICTIONS_ERROR:
      return state
        .set('predictionsError', action.error);
    case LOAD_PREDICTIONS_SUCCES:
      return state
        .set('predictionsError', false)
        .set('predictions', action.predictions);
    case LOAD_HINTS:
      return state
        .set('hints', false);
    case LOAD_HINTS_SUCCESS:
      checkIfOpened(action.hints, state, "hints")
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
    case RIGHT_CLICK_EVENT:
      return state
        .set('loadRightClick', true)
        .set('rightClickSubarea', action.subarea)
        .set('rightClickLatLng', action.latlng);
    case CLEAR_LOCATION:
      return state
        .set('loadRightClick', false)
        .set('rightClickLocation', false)
        .set('rightClickSubarea', false)
        .set('rightClickLatLng', false);
    case RIGHT_CLICK_EVENT_SUCCESS:
      return state
        .set('loadRightClick', false)
        .set('rightClickLocation', action.location);
    case LOAD_STATUS_SUCCESS:
      return state
        .set('errorStatus', false)
        .set('status', action.status)
        .set('loadingStatus', false);
    case LOAD_STATUS:
      return state
        .set('errorStatus', false);
    case LOAD_CARS_ERROR:
      return state
        .set('carsError', action.error)
        .set('carsLoading', false);
    case LOAD_CARS:
      return state
        .set('carsError', false);
    case LOAD_CARS_SUCCESS:
      checkIfOpened(action.cars, state, "cars")
      return state
        .set('carsLoading', false)
        .set('carsError', false)
        .set('cars', action.cars);
    case SET_SEARCH_RESULTS:
      return state
        .set('searchResults', action.searchResults);
    case TOGGLE_HISTORY:
      return state
        .set('history', action.history);
    default:
      return state;
  }
}

export default massiveMapReducer;