// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import 'whatwg-fetch';

import { LOCATION_CHANGE } from 'react-router-redux';
import { loadWikiError, loadWikiSuccess } from './actions';
import { LOAD_WIKI } from './constants';

const config = require('../../../config');

export function* getWiki() {
  const requestURL = config.wiki;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield fetch(requestURL).then((res) => res.text());
    yield put(loadWikiSuccess(response));
  } catch (error) {
    yield put(loadWikiError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* wiki() {
  // Watches for LOAD_LOCATION actions and calls getLocation when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_WIKI, getWiki);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  wiki,
];
