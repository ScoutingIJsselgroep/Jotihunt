// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_CARS, LOAD_HINTS, LOAD_STATUS, RIGHT_CLICK_EVENT, LOAD_PREDICTIONS } from './constants';
import {
  loadCarsError, loadCarsSucess, loadHintsError, loadHintsSuccess, loadStatusError,
  loadStatusSuccess, rightClickLocationSuccess, loadPredictions, loadPredictionsError, loadPredictionsSucces
} from './actions';


/**
 * Hints request/response handler
 */
export function* getHints() {
  const requestURL = '/api/hint';

  try {
    // Call our request helper (see 'utils/request')
    const loadedhints = yield call(request, requestURL);
    yield put(loadHintsSuccess(loadedhints));
  } catch (error) {
    yield put(loadHintsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* hints() {
  // Watches for LOAD_HINTS actions and calls getHints when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_HINTS, getHints);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * Cars request/response handler
 */
export function* getCars() {
  const requestURL = '/api/car';

  try {
    // Call our request helper (see 'utils/request')
    const loadedCars = yield call(request, requestURL);
    yield put(loadCarsSucess(loadedCars));
  } catch (error) {
    yield put(loadCarsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cars() {
  // Watches for LOAD_CARS actions and calls getCars when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_CARS, getCars);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * Cars request/response handler
 */
export function* getPredictions() {
  const requestURL = '/api/prediction';

  try {
    // Call our request helper (see 'utils/request')
    const predictions = yield call(request, requestURL);
    yield put(loadPredictionsSucces(predictions));
  } catch (error) {
    yield put(loadPredictionsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* predictions() {
  // Watches for LOAD_PREDICTIONS actions and calls getPredictions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_PREDICTIONS, getPredictions);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getStatus() {
  const requestURL = '/api/status/latest';

  try {
    // Call our request helper (see 'utils/request')
    const loadedStatus = yield call(request, requestURL);
    yield put(loadStatusSuccess(loadedStatus));
  } catch (error) {
    yield put(loadStatusError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* status() {
  // Watches for LOAD_STATUS actions and calls getStatus when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_STATUS, getStatus);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getLocation({ latlng }) {
  const requestURL = '/api/hint/location';

  try {
    // Call our request helper (see 'utils/request')
    const location = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latlng,
      }),
    });
    yield put(rightClickLocationSuccess(location));
  } catch (error) {
    // yield put(loadStatusError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* rightClick() {
  // Watches for RIGHT_CLICK_EVENT actions and calls getLocation when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(RIGHT_CLICK_EVENT, getLocation);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  hints,
  status,
  cars,
  rightClick,
  predictions,
];
