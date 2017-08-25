/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_GROUPS } from './constants';
import { loadGroupsSuccess, loadGroupsError } from './actions';

import request from 'utils/request';

/**
 * Group request/response handler
 */
export function* getGroupData() {
  const requestURL = `/api/group`;

  try {
    // Call our request helper (see 'utils/request')
    const groups = yield call(request, requestURL);
    yield put(loadGroupsSuccess(groups));
  } catch (error) {
    yield put(loadGroupsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* groupData() {
  // Watches for LOAD_GROUPS actions and calls getGroupData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_GROUPS, getGroupData);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  groupData,
];
