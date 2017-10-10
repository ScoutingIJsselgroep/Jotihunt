/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SUBMIT_VALUES } from './constants';

/*
 * Clairvoyance request/response handler
 */
export function* getCFData() {
  // Call server

}

/**
 * Root saga manages watcher lifecycle
 */
export function* cfData() {
  // Watches for SUBMIT_VALUES actions and calls getCFData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SUBMIT_VALUES, getCFData);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  cfData,
];
