/**
 * MapGroups actions
 */
import {
  LOAD_GROUPS,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_ERROR,
} from './constants';

export function loadGroups() {
  return {
    type: LOAD_GROUPS,
  }
}

export function loadGroupsError(error) {
  return {
    type: LOAD_GROUPS_ERROR,
    error,
  }
}

export function loadGroupsSuccess(groups) {
  return {
    type: LOAD_GROUPS_SUCCESS,
    groups,
  }
}
