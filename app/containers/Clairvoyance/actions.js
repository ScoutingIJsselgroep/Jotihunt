/*
 *
 * Clairvoyance actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_VALUES,
  RESULT,
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

export function retrieveResult(result) {
  return {
    type: RESULT,
    result,
  };
}
