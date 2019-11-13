/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './constants';

export function loginUser(username, password) {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginUserSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
