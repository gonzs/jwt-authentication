import { takeLatest } from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authenticationSaga';
import { dashboardSaga } from './dashoardSaga';
import { getUsersSaga, deleteUsersSaga } from './userSaga';

import * as types from '../actions';

export default function* watchUserAuthentication() {
  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.GET_DASHBOARD, dashboardSaga);
  yield takeLatest(types.GET_USERS, getUsersSaga);
  yield takeLatest(types.DELETE_USERS, deleteUsersSaga);
}
