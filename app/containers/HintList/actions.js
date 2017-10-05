/*
 *
 * HintList actions
 *
 */

import {
  LOAD_HINTS,
  LOAD_HINTS_ERROR,
  LOAD_HINTS_SUCCESS,
  DELETE_HINT,
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
  }
}

export function loadHintsSuccess (hintList) {
  return {
    type: LOAD_HINTS_SUCCESS,
    hintList
  }
}

export function deleteHint (hintId) {
  return {
    type: DELETE_HINT,
    hintId,
  }
}
