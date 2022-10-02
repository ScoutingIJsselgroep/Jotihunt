/*
 *
 * MassiveMap actions
 *
 */

import {
  LOAD_HINTS,
  LOAD_HINTS_ERROR,
  LOAD_HINTS_SUCCESS,
  LOAD_STATUS,
  TOGGLE_HISTORY,
  LOAD_STATUS_SUCCESS,
  LOAD_STATUS_ERROR,
  LOAD_CARS_SUCCESS,
  LOAD_PREDICTIONS,
  LOAD_PREDICTIONS_ERROR,
  LOAD_PREDICTIONS_SUCCES,
  LOAD_CARS,
  LOAD_CARS_ERROR,
  RIGHT_CLICK_EVENT,
  SET_LATLNG,
  SET_SEARCH_RESULTS,
  RIGHT_CLICK_EVENT_SUCCESS,
  CLEAR_LOCATION,
} from './constants';


export function setSearchResults(searchResults) {
  return {
    type: SET_SEARCH_RESULTS,
    searchResults
  }
}

export function loadPredictions() {
  return {
    type: LOAD_PREDICTIONS,
  }
}

export function setLatLng(latlng) {
  return {
    type: SET_LATLNG,
    latlng,
  }
}

export function loadPredictionsError(error) {
  return {
    type: LOAD_PREDICTIONS_ERROR,
    error
  }
}

export function loadPredictionsSucces(predictions) {
  return {
    type: LOAD_PREDICTIONS_SUCCES,
    predictions
  }
}

export function loadHints() {
  return {
    type: LOAD_HINTS,
  };
}


export function loadHintsError(error) {
  return {
    type: LOAD_HINTS_ERROR,
    error,
  };
}

export function loadHintsSuccess(hints) {
  return {
    type: LOAD_HINTS_SUCCESS,
    hints,
  };
}


export function loadStatus() {
  return {
    type: LOAD_STATUS,
  };
}


export function loadStatusError(error) {
  return {
    type: LOAD_STATUS_ERROR,
    error,
  };
}

export function loadStatusSuccess(status) {
  return {
    type: LOAD_STATUS_SUCCESS,
    status,
  };
}


export function loadCars() {
  return {
    type: LOAD_CARS,
  };
}


export function loadCarsError(error) {
  return {
    type: LOAD_CARS_ERROR,
    error,
  };
}

export function loadCarsSucess(cars) {
  return {
    type: LOAD_CARS_SUCCESS,
    cars,
  };
}

export function historyToggle(history) {
  return {
    type: TOGGLE_HISTORY,
    history,
  };
}

export function rightClickEvent(latlng, subarea) {
  return {
    type: RIGHT_CLICK_EVENT,
    latlng,
    subarea,
  };
}

export function rightClickLocationSuccess(location) {
  return {
    type: RIGHT_CLICK_EVENT_SUCCESS,
    location,
  };
}

export function clearLocation() {
  return {
    type: CLEAR_LOCATION,
  };
}