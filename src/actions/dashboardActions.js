import * as types from './index';

export const getDashboardAction = payload => {
  return {
    type: types.GET_DASHBOARD,
    payload,
  };
};
