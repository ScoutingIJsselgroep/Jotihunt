/*
 *
 * Clairvoyance actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_VALUES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitValues(values) {
  return {
    type: SUBMIT_VALUES,
    values,
  };
}
