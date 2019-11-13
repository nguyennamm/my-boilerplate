/*
 *
 * TodoPage actions
 *
 */

import {
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_LIST_FAILURE,
  TODO_ADD_ITEM_REQUEST,
  TODO_ADD_ITEM_SUCCESS,
  TODO_ADD_ITEM_FAILURE,
  TODO_EDIT_ITEM_SUCCESS,
  TODO_EDIT_ITEM_FAILURE,
  TODO_EDIT_ITEM_REQUEST,
  TODO_DELETE_ITEM_REQUEST,
  TODO_DELETE_ITEM_SUCCESS,
  TODO_DELETE_ITEM_FAILURE,
} from './constants';

export function getList(urlParams) {
  return {
    type: TODO_LIST_REQUEST,
    urlParams,
  };
}

export function getListSuccess(todos) {
  return {
    type: TODO_LIST_SUCCESS,
    todos,
  };
}

export function getListFailure() {
  return {
    type: TODO_LIST_FAILURE,
  };
}

export function requestAddItem(item) {
  return {
    type: TODO_ADD_ITEM_REQUEST,
    item,
  };
}

export function addItemSuccess(item) {
  return {
    type: TODO_ADD_ITEM_SUCCESS,
    item,
  };
}

export function addItemFailure() {
  return {
    type: TODO_ADD_ITEM_FAILURE,
  };
}

export function requestEditItem(idItem, item) {
  return {
    type: TODO_EDIT_ITEM_REQUEST,
    idItem,
    item,
  };
}

export function editItemSuccess(idItem, item) {
  return {
    type: TODO_EDIT_ITEM_SUCCESS,
    idItem,
    item,
  };
}

export function editItemFailure() {
  return {
    type: TODO_EDIT_ITEM_FAILURE,
  };
}

export function requestDeleteItem(idItem) {
  return {
    type: TODO_DELETE_ITEM_REQUEST,
    idItem,
  };
}

export function deleteItemSuccess(idItem) {
  return {
    type: TODO_DELETE_ITEM_SUCCESS,
    idItem,
  };
}

export function deleteItemFailure() {
  return {
    type: TODO_DELETE_ITEM_FAILURE,
  };
}
