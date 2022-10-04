/**
 * MapGroups actions
 */
import {
  LOAD_GROUPS,
  LOAD_GROUPS_SUCCESS,
  SET_SUBAREA,
  LOAD_GROUPS_ERROR,
} from './constants';
import openSocket from 'socket.io-client';

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

export function setSubarea(subareaId, groupId) {
  // const socket = openSocket();
  // socket.emit('please_refresh_groups');

  return {
    type: SET_SUBAREA,
    subareaId,
    groupId,
  }
}