/**
 * Gets the repositories of the user from Github
 */

import { call, cancel, put, take, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { getCoordinatesError, getCoordinatesLoaded, submitCoordinateSuccess, submitCoordinateError } from './actions';
import { GET_COORDINATES, SUBMIT_COORDINATES } from './constants';

import { makeSelectAddress, makeSelectRdx, makeSelectRdy, makeSelectWgs, makeSelectSubarea } from './selectors';

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

/**
 * Coordinates request/response handler
 */
export function* doSubmitCoordinate() {
  // Select WSG, RDX, RDY, ADDRESS, SUBAREA
  const wgs = yield select(makeSelectWgs());
  const rdx = yield select(makeSelectRdx());
  const rdy = yield select(makeSelectRdy());
  const address = yield select(makeSelectAddress());
  const faAddress = address[0].formatted_address;
  const subarea = yield select(makeSelectSubarea());

  const requestURL = '/api/hint';
  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: wgs[0],
        longitude: wgs[1],
        rdx,
        rdy,
        address: faAddress,
        subarea,
      }),
    });
    yield put(submitCoordinateSuccess());
  } catch (err) {
    yield put(submitCoordinateError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* submitCoordinate() {
  // Watches for SUBMIT_COORDINATES actions and calls doSubmitCoordinate when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SUBMIT_COORDINATES, doSubmitCoordinate);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  coordinates,
  submitCoordinate,
];
