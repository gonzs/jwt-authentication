import { put, call } from 'redux-saga/effects';
import { dashboardService } from '../services/dashboardService';

import * as types from '../actions';

export function* dashboardSaga(payload) {
  try {
    const response = yield call(dashboardService, payload);
    yield [put({ type: types.GET_DASHBOARD_SUCCESS, response })];
  } catch (error) {
    yield put({ type: types.GET_DASHBOARD_ERROR, error });
  }
}
