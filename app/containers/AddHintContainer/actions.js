/*
 *
 * AddHintContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_COORDINATES,
  GET_COORDINATES_ERROR,
  GET_COORDINATES_SUCCESS,
  SUBMIT_COORDINATES_SUCCESS,
  SUBMIT_COORDINATES,
  SUBMIT_COORDINATES_ERROR,
  LOAD_LAST_HINT_ERROR,
  LOAD_LAST_HINT_SUCCESS,
  LOAD_LAST_HINT
} from './constants';

import openSocket from 'socket.io-client';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function lastHintError(error) {
  return {
    type: LOAD_LAST_HINT_ERROR,
    error
  }
}

export function lastHintSuccess(hint) {
  return {
    type: LOAD_LAST_HINT_SUCCESS,
    hint
  }
}

export function loadLastHint() {
  return {
    type: LOAD_LAST_HINT
  }
}


export function getCoordinates(rdx, rdy, subarea) {
  return {
    type: GET_COORDINATES,
    rdx,
    rdy,
    subarea,
  };
}

export function getCoordinatesLoaded(response) {
  return {
    type: GET_COORDINATES_SUCCESS,
    response,
  };
}

export function getCoordinatesError() {
  return {
    type: GET_COORDINATES_ERROR,
  };
}

export function submitCoordinates() {
  const socket = openSocket();
  socket.emit('please_refresh_hints');

  return {
    type: SUBMIT_COORDINATES,
  };
}

export function submitCoordinateSuccess() {
  window.location = '/hint/add';

  // Send Socket Update
  return {
    type: SUBMIT_COORDINATES_SUCCESS,
  };
}

export function submitCoordinateError(error) {
  return {
    type: SUBMIT_COORDINATES_ERROR,
    error,
  };
}