import * as types from './index';

export const getUsersAction = payload => {
  return {
    type: types.GET_USERS,
    payload,
  };
};
