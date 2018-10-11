/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {LOAD_HINTS, SUBMIT_VALUES, SUBMIT_VALUES_AS_HINT, LOAD_DEFAULT_VALUES } from './constants';

import request from 'utils/request';
import {
  loadHintsError, loadHintsSuccess, retrieveResult, submitValuesAsHintError,
  submitValuesAsHintSuccess, loadDefaultValuesSuccess, loadDefaultValuesError
} from "./actions";

const config = require('../../../config');


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
 * DefaultValues request/response handler
 */
export function* getDefaultValue() {
  const requestURL = '/api/clairvoyance/init';

  try {
    // Call our request helper (see 'utils/request')
    const loadedDefaultValues = yield call(request, requestURL);
    yield put(loadDefaultValuesSuccess(loadedDefaultValues));
  } catch (error) {
    yield put(loadDefaultValuesError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* defaultValues() {
  // Watches for LOAD_DEFAULT_VALUES actions and calls getDefaultValue when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_DEFAULT_VALUES, getDefaultValue);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/*
 * Clairvoyance request/response handler
 */
export function* getCFData({ values }) {
  // Call server using ordinary methods.
  const requestURL = '/api/clairvoyance';

  const puzzleData = config.dbMappings.nArea.map((area) => values[area]);
  // const previousData = config.dbMappings.nArea.map((area) => values[`p${area}`]);

  const data = [['Puzzle', puzzleData]];
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    });

    console.log('saga');
    console.log(yield response);

    yield put(retrieveResult(response));
  } catch (err) {

    // TODO: Catch response
    // yield put(submitCoordinateError(err));
  }

  // Retrieve possible answers.
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

/*
 * Clairvoyance request/response handler
 */
export function* submitAsHint({ values }) {
  // Call server using ordinary methods.
  const requestURL = '/api/hint/clairvoyance';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: values,
      }),
    });
    yield put(submitValuesAsHintSuccess());
  } catch (err) {
    yield put(submitValuesAsHintError(err));
  }
}

export function* submitClairvoyanceValues() {
  // Watches for SUBMIT_VALUES_AS_HINT actions and calls submitAsHint when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SUBMIT_VALUES_AS_HINT, submitAsHint);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  cfData,
  hints,
  defaultValues,
  submitClairvoyanceValues,
];
