import { put, call } from 'redux-saga/effects';
import { getUsersService, deleteUsersService } from '../services/userService';

import * as types from '../actions';

export function* getUsersSaga(payload) {
  try {
    const response = yield call(getUsersService, payload);
    yield [put({ type: types.GET_USERS_SUCCESS, response })];
  } catch (error) {
    yield put({ type: types.GET_USERS_ERROR, error });
  }
}

export function* deleteUsersSaga(payload) {
  try {
    const response = yield call(deleteUsersService, payload);
    yield [put({ type: types.DELETE_USERS_SUCCESS, response })];
  } catch (error) {
    yield put({ type: types.DELETE_USERS_ERROR, error });
  }
}
