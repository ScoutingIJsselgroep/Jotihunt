/*
 *
 * GroupList actions
 *
 */

import {
  LOAD_GROUPS,
  LOAD_GROUPS_ERROR,
  LOAD_GROUPS_SUCCESS,
  SEARCH,
  INCREMENT_GROUP,
} from './constants';

export function loadGroups() {
  return {
    type: LOAD_GROUPS,
  };
}

export function performSearch(query) {
  return {
    type: SEARCH,
    query
  };
}

export function loadGroupsSuccess(groups) {
  return {
    type: LOAD_GROUPS_SUCCESS,
    groups,
  };
}

export function loadGroupsError(error) {
  return {
    type: LOAD_GROUPS_ERROR,
    error,
  }
}

export function incrementGroup(value, groupId) {
  console.log("Incrementing " + groupId + " with " + value);
  return {
    type: INCREMENT_GROUP,
    value,
    groupId,
  }
}
