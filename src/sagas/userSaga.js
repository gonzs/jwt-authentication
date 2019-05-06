import { put, call } from 'redux-saga/effects';
import { getUsersService } from '../services/userService';

import * as types from '../actions';

export function* getUsersSaga(payload) {
  try {
    const response = yield call(getUsersService, payload);
    yield [put({ type: types.GET_USERS_SUCCESS, response })];
  } catch (error) {
    yield put({ type: types.GET_USERS_ERROR, error });
  }
}
