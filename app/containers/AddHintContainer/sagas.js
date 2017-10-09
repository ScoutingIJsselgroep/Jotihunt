/**
 * Gets the repositories of the user from Github
 */

import { call, cancel, put, take, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { getCoordinatesError, getCoordinatesLoaded } from './actions';
import { GET_COORDINATES } from './constants';

/**
 * Coordinates request/response handler
 */
export function* getCoordinates({ rdx, rdy }) {
  const requestURL = '/api/hint/information';
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: rdx,
        longitude: rdy,
      }),
    });

    yield put(getCoordinatesLoaded(response));
  } catch (err) {
    yield put(getCoordinatesError(err));
  }
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
