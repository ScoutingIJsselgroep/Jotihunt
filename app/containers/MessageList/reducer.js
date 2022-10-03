/*
 *
 * GroupList reducer
 *
 */

import {
  fromJS
} from 'immutable';
import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_ERROR,
  LOAD_MESSAGE_SUCCESS,
  SEARCH,
} from './constants';

const initialState = fromJS({
  loadingMessage: false,
  message: false,
  errorLoadingMessage: false,
  search: false
});

function messageListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGE:
      return state
        .set('loadingMessage', true)
        .set('message', false)
        .set('errorLoadingMessage', false);
    case LOAD_MESSAGE_ERROR:
      return state
        .set('loadingMessage', false)
        .set('message', false)
        .set('errorLoadingMessage', action.error);
    case SEARCH:
      return state
        .set('search', action.query);
    case LOAD_MESSAGE_SUCCESS:
      return state
        .set('loadingMessage', false)
        .set('message', action.message)
        .set('errorLoadingMessage', false);
    default:
      return state;
  }
}

export default messageListReducer;