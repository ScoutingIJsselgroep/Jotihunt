/*
 * MapGroups reducer
 */
import { fromJS } from 'immutable';
import {
  LOAD_GROUPS,
  LOAD_GROUPS_ERROR,
  LOAD_GROUPS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  groups: false,
  error: false,
});

function mapGroupsReducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_GROUPS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('groups', action.groups)

    case LOAD_GROUPS_ERROR:
      return state
        .set('loading', false)
        .set('error', false)
        .set('groups', action.groups)

    case LOAD_GROUPS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('groups', action.groups)

    default:
      return state;
  }
}

export default mapGroupsReducer;
