/*
 *
 * GroupList actions
 *
 */

import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_ERROR,
  LOAD_MESSAGE_SUCCESS,
  SEARCH,
} from './constants';

export function loadMessage() {
  return {
    type: LOAD_MESSAGE,
  };
}

export function performSearch(query) {
  return {
    type: SEARCH,
    query
  };
}

export function loadMessageSuccess(message) {
  return {
    type: LOAD_MESSAGE_SUCCESS,
    message,
  };
}

export function loadMessageError(error) {
  return {
    type: LOAD_MESSAGE_ERROR,
    error,
  }
}