/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ENABLE_LOADING, DISABLE_LOADING } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ENABLE_LOADING:
        draft.loading = true;
        break;
      case DISABLE_LOADING:
        draft.loading = false;
    }
  });

export default appReducer;
