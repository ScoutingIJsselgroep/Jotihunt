/*
 *
 * GroupList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_GROUPS,
  LOAD_GROUPS_ERROR,
  LOAD_GROUPS_SUCCESS,
  SEARCH,
} from './constants';

const initialState = fromJS({
  loadingGroups: false,
  groups: false,
  errorLoadingGroups: false,
  search: false
});

function groupListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GROUPS:
      return state
        .set('loadingGroups', true)
        .set('groups', false)
        .set('errorLoadingGroups', false);
    case LOAD_GROUPS_ERROR:
      return state
        .set('loadingGroups', false)
        .set('groups', false)
        .set('errorLoadingGroups', action.error);
    case SEARCH:
      return state
        .set('search', action.query);
    case LOAD_GROUPS_SUCCESS:
      return state
        .set('loadingGroups', false)
        .set('groups', action.groups)
        .set('errorLoadingGroups', false);
    default:
      return state;
  }
}

export default groupListReducer;
