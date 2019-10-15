import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_GROUPS,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_ERROR,
} from './constants';

import {
  loadGroupsSuccess, loadGroups, loadGroupsError
} from './actions';

export function* getGroups() {
  const requestURL = '/api/group';
  try {
    const loadedGroups = yield call(request, requestURL);
    yield put(loadGroupsSuccess(loadedGroups));
  } catch (error) {
    yield put(loadGroupsError(error));
  }
}

export function* groups() {
  const watcher = yield takeLatest(LOAD_GROUPS, getGroups);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  groups,
];
