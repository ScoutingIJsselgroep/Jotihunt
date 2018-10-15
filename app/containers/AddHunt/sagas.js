// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { loadLocationError, loadLocationSuccess, submitHuntError, submitHuntSuccess } from './actions';
import { LOAD_LOCATION, SUBMIT_HUNT } from './constants';
import { locationResultSelector } from './selectors';

const config = require('../../../config');

export function* doSubmitHunt({ latlng, huntType, time }) {
  const requestURL = '/api/hint';

  try {
    const result = yield select(locationResultSelector());
    const address = result.address[0] ? result.address[0].formatted_address : 'Onbekende weg';

    const subarea = result.subarea;

    // Convert time to ISO
    const isoTime = new Date();
    const hour = parseInt(time.substring(0, 2));
    const minute = parseInt(time.substring(3, 5));

    // Pass back one day.
    if (isoTime.getHours() == 0 && hour == "23") {
      isoTime.setDate(isoTime.getDate() - 1);
    }
    isoTime.setHours(hour);
    isoTime.setMinutes(minute);

    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: latlng[0],
        longitude: latlng[1],
        hintTypeId: config.dbMappings.hintType[huntType],
        rdx: 0,
        rdy: 0,
        address,
        subarea,
        createdAt: isoTime,
        updatedAt: isoTime
      }),
    });
    yield put(submitHuntSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(submitHuntError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* submitHunt() {
  // Watches for SUBMIT_HUNT actions and calls doSubmitHunt when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SUBMIT_HUNT, doSubmitHunt);

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
    yield put(loadLocationSuccess(location));
  } catch (error) {
    yield put(loadLocationError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loadLocation() {
  // Watches for LOAD_LOCATION actions and calls getLocation when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_LOCATION, getLocation);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  loadLocation,
  submitHunt,
];
