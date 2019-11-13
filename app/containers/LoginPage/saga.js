import { call, put, all, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_REQUEST, LOGOUT, LOGIN_FAILURE } from './constants';
// import request from '../../utils/request';
import { API_TOKEN } from '../../utils/constants';
import { loginUserSuccess, loginUserFailure } from './actions';
import { setCookie, deleteCookie } from '../../utils/cookies';

function* authorize(user, password) {
  try {
    console.log(user, password);
    // const token  = yield call(request, user, password);
    const token = '4354353fdgdfd';
    yield call(setCookie, API_TOKEN, 1);

    if (token) {
      yield put(loginUserSuccess(token));
      yield put(push('/dashboard'));
    } else {
      yield put(loginUserFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(loginUserFailure());
  }
}

function* logout() {
  yield call(deleteCookie, API_TOKEN);
  yield put(push('/login'));
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, authorize),
    takeLatest(LOGOUT, logout),
    takeLatest(LOGIN_FAILURE, logout),
  ]);
}
