/*
 *
 * JotihuntWiki reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_WIKI_SUCCESS,
  LOAD_WIKI_ERROR,
  LOAD_WIKI,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  result: false,
});

function jotihuntWikiReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_WIKI_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('result', false);
    case LOAD_WIKI:
      return state
        .set('loading', true)
        .set('error', false)
        .set('result', false);
    case LOAD_WIKI_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('result', action.response);
    default:
      return state;
  }
}

export default jotihuntWikiReducer;
