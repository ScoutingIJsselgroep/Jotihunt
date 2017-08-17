/*
 *
 * AddHintContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_COORDINATES,
} from './constants';

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
