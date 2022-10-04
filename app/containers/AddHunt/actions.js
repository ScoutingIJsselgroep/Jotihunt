/*
 *
 * AddHunt actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_LOCATION,
  LOAD_LOCATION_ERROR,
  LOAD_LOCATION_SUCCESS,
  SUBMIT_HUNT,
  SUBMIT_HUNT_ERROR,
  SUBMIT_HUNT_SUCCESS,
} from './constants';

import openSocket from 'socket.io-client';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadLocation(latlng) {
  return {
    type: LOAD_LOCATION,
    latlng,
  };
}

export function loadLocationSuccess(location) {
  return {
    type: LOAD_LOCATION_SUCCESS,
    location,
  };
}

export function loadLocationError(error) {
  return {
    type: LOAD_LOCATION_ERROR,
    error,
  };
}

export function submitHunt(latlng, type, subarea, time) {
  // const socket = openSocket();
  // socket.emit('please_refresh_hints');

  return {
    type: SUBMIT_HUNT,
    latlng,
    huntType: type,
    subarea,
    time,
  };
}

export function submitHuntSuccess(response) {
  return {
    type: SUBMIT_HUNT_SUCCESS,
    response,
  };
}

export function submitHuntError(error) {
  return {
    type: SUBMIT_HUNT_ERROR,
    error,
  };
}