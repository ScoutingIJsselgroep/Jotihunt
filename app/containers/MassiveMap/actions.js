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
  LOAD_STATUS_SUCCESS,
  LOAD_STATUS_ERROR,
  LOAD_CARS_SUCCESS,
  LOAD_CARS,
  LOAD_CARS_ERROR,
} from './constants';

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

