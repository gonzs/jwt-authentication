import * as types from './index';

export const getUsersAction = payload => {
  return {
    type: types.GET_USERS,
    payload,
  };
};

export const deleteUsersAction = payload => {
  return {
    type: types.DELETE_USERS,
    payload,
  };
};
