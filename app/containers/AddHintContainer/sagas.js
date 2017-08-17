/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { GET_COORDINATES } from './constants';

/**
 * Coordinates request/response handler
 */
export function* getCoordinates({ rdx, rdy }) {
  // Select username from store
  const username = "tristandb";
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  console.log(rdx);
  // try {
  //   // Call our request helper (see 'utils/request')
  //   const repos = yield call(request, requestURL);
  //   yield put(reposLoaded(repos, username));
  // } catch (err) {
  //   yield put(repoLoadingError(err));
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* coordinates() {
  // Watches for GET_COORDINATES actions and calls getCoordinates when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_COORDINATES, getCoordinates);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  coordinates,
];
