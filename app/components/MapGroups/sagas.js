import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_GROUPS,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_ERROR,
  SET_SUBAREA,
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

export function* setSubarea({subareaId, groupId}) {
  const requestURL = '/api/group/subarea';

  try {
    // Call our request helper (see 'utils/request')
    const groups = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subareaId,
        groupId,
      }),
    });
    yield put(loadGroups());
  } catch (error) {
    // yield put(loadGroupsError(error));
  }
}

export function* groups() {
  const watcher = yield takeLatest(LOAD_GROUPS, getGroups);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* subarea() {
  const watcher = yield takeLatest(SET_SUBAREA, setSubarea);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  groups,
  subarea
];
