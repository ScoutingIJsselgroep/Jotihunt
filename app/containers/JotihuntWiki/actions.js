/*
 *
 * JotihuntWiki actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_WIKI,
  LOAD_WIKI_ERROR,
  LOAD_WIKI_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadWiki() {
  return {
    type: LOAD_WIKI,
  };
}

export function loadWikiError(error) {
  return {
    type: LOAD_WIKI_ERROR,
    error,
  };
}

export function loadWikiSuccess(response) {
  return {
    type: LOAD_WIKI_SUCCESS,
    response,
  };
}

