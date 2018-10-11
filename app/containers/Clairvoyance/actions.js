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
  SUBMIT_VALUES_AS_HINT_SUCCESS, LOAD_HINTS, LOAD_HINTS_ERROR, LOAD_HINTS_SUCCESS,
  LOAD_DEFAULT_VALUES, LOAD_DEFAULT_VALUES_ERROR, LOAD_DEFAULT_VALUES_SUCCESS,
} from './constants';

export function loadDefaultValues() {
  return {
    type: LOAD_DEFAULT_VALUES,
  };
}

export function loadDefaultValuesError() {
  return {
    type: LOAD_DEFAULT_VALUES_ERROR,
  };
}

export function loadDefaultValuesSuccess(defaultValues) {
  return {
    type: LOAD_DEFAULT_VALUES_SUCCESS,
    defaultValues,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
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
