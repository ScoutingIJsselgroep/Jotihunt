// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_HINTS, DELETE_HINT } from 'containers/HintList/constants';
import { loadHintsError, loadHintsSuccess, loadHints } from './actions';

import request from 'utils/request';

export function* deleteHintHandler({hintId}) {
  const requestUrl = `/api/hint/delete/${hintId}`;

  try {
    // Call the request helper.
    const result = yield call(request, requestUrl);
    yield put(loadHints());
  } catch (error) {
    console.log(error);
    // TODO: Catch error
  }
}
/**
 * Hints request/response handler
 */
export function* getHints() {
  const requestURL = `/api/hint`;

  try {
    // Call our request helper (see 'utils/request')
    const hints = yield call(request, requestURL);
    yield put(loadHintsSuccess(hints));
  } catch (error) {
    yield put(loadHintsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* deleteHint(hintId) {
  // Watches for DELETE_HINT actions and calls getHints when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(DELETE_HINT, deleteHintHandler);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

// All sagas to be loaded
export default [
  hints,
  deleteHint
];
