/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

export const initialState = {
  token: '',
  isAuthenticated: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        // draftState.loading = false;
        draftState.token = action.token;
        draftState.isAuthenticated = true;
        break;
      case LOGIN_FAILURE:
        // draftState.loading = false;
        draftState.token = '';
        draftState.isAuthenticated = false;
        break;
    }
  });

export default loginPageReducer;
