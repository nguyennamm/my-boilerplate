import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  getListSuccess,
  getListFailure,
  addItemSuccess,
  addItemFailure,
  editItemSuccess,
  editItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
} from './actions';
import {
  TODO_LIST_REQUEST,
  TODO_ADD_ITEM_REQUEST,
  TODO_EDIT_ITEM_REQUEST,
  TODO_DELETE_ITEM_REQUEST,
} from './constants';
import request from '../../utils/request';

function* getList({ urlParams }) {
  try {
    const url = urlParams
      ? `https://jsonplaceholder.typicode.com/todos${urlParams}`
      : `https://jsonplaceholder.typicode.com/todos`;
    const response = yield call(request, url);
    yield put(getListSuccess(response));
  } catch (error) {
    yield put(getListFailure());
  }
}

function* addItem({ item }) {
  try {
    const bodyObj = { ...item, userId: 1 };
    const response = yield call(
      request,
      'https://jsonplaceholder.typicode.com/todos',
      {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    yield put(addItemSuccess(response));
  } catch (error) {
    yield put(addItemFailure(error));
  }
}

function* editItem({ item, idItem }) {
  try {
    const { id, ...rest } = item;
    const bodyObj = { ...rest };
    const response = yield call(
      request,
      `https://jsonplaceholder.typicode.com/todos/${idItem}`,
      {
        method: 'PATCH',
        body: JSON.stringify(bodyObj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    yield put(editItemSuccess(idItem, response));
  } catch (error) {
    yield put(editItemFailure(error));
  }
}

function* deleteItem({ idItem }) {
  try {
    yield call(
      request,
      `https://jsonplaceholder.typicode.com/todos/${idItem}`,
      {
        method: 'DELETE',
      },
    );

    yield put(deleteItemSuccess(idItem));
  } catch (error) {
    yield put(deleteItemFailure(error));
  }
}

// Individual exports for testing
export default function* todoPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(TODO_LIST_REQUEST, getList),
    takeLatest(TODO_ADD_ITEM_REQUEST, addItem),
    takeLatest(TODO_EDIT_ITEM_REQUEST, editItem),
    takeLatest(TODO_DELETE_ITEM_REQUEST, deleteItem),
  ]);
}
