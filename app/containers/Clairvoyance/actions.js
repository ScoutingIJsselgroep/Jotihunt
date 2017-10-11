/*
 *
 * Clairvoyance actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_VALUES,
  RESULT,
  SUBMIT_VALUES_AS_HINT,
  SUBMIT_VALUES_AS_HINT_ERROR,
  SUBMIT_VALUES_AS_HINT_SUCCESS
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

export function submitValuesAsHint(values) {
  return {
    type: SUBMIT_VALUES_AS_HINT,
    values,
  };
}

export function submitValuesAsHintSuccess() {
  return {
    type: SUBMIT_VALUES_AS_HINT_SUCCESS,
  };
}

export function submitValuesAsHintError(error) {
  return {
    type: SUBMIT_VALUES_AS_HINT_ERROR,
    error,
  };
}
