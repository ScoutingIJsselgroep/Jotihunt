/**
 * Gets the repositories of the user from Github
 */

import {
  take,
  call,
  put,
  cancel,
  takeLatest
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE
} from 'react-router-redux';
import {
  LOAD_MESSAGE,
} from './constants';
import {
  loadMessageSuccess,
  loadMessageError
} from './actions';

import request from 'utils/request';

/**
 * Message request/response handler
 */
export function* getMessageData() {
  const requestURL = '/api/articles';

  try {
    // Call our request helper (see 'utils/request')
    const message = yield call(request, requestURL);
    yield put(loadMessageSuccess(message));
  } catch (error) {
    yield put(loadMessageError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* messageData() {
  // Watches for LOAD_MESSAGE actions and calls getMessageData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_MESSAGE, getMessageData);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  messageData,
];