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
} from './constants';

import openSocket from 'socket.io-client';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getCoordinates(rdx, rdy) {
  return {
    type: GET_COORDINATES,
    rdx,
    rdy,
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
