import {
  SET_VIEWER,
  LOGOUT,
} from './constants';

export function setViewer(viewer) {
  return {
    type: SET_VIEWER,
    viewer,
  };
}

export function logout() {
  window.location = '/login';
  return {
    type: LOGOUT,
  };
}
