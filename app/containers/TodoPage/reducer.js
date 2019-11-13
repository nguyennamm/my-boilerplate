/*
 *
 * TodoPage reducer
 *
 */
import produce from 'immer';
import { findIndex, remove } from 'lodash';
import {
  TODO_LIST_SUCCESS,
  TODO_LIST_FAILURE,
  TODO_ADD_ITEM_SUCCESS,
  TODO_EDIT_ITEM_SUCCESS,
  TODO_DELETE_ITEM_SUCCESS,
} from './constants';

export const initialState = {
  todos: [],
};

/* eslint-disable default-case, no-param-reassign */
const todoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TODO_LIST_SUCCESS:
        draft.todos = action.todos;
        break;
      case TODO_LIST_FAILURE:
        draft.todos = [];
        break;
      case TODO_ADD_ITEM_SUCCESS:
        draft.todos.push(action.item);
        break;
      case TODO_EDIT_ITEM_SUCCESS: {
        const indexItem = findIndex(draft.todos, { id: action.idItem });
        if (indexItem >= 0) {
          draft.todos[indexItem] = { id: action.idItem, ...action.item };
        }
        break;
      }
      case TODO_DELETE_ITEM_SUCCESS:
        draft.todos = remove(draft.todos, el => el.id !== action.idItem);
        break;
    }
  });

export default todoPageReducer;
