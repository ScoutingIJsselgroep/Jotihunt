/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SUBMIT_VALUES } from './constants';

import request from 'utils/request';

const config = require('../../../config');

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

    // TODO: Catch response
    // yield put(submitCoordinateSuccess());
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

// Bootstrap sagas
export default [
  cfData,
];
