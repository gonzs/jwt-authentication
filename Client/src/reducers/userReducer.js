import * as types from '../actions';

export default function(
  state = { response: { success: undefined, message: undefined } },
  action
) {
  const response = action.response;

  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return { ...state, response };
    case types.GET_USERS_ERROR:
      return { ...state, response };
    case types.DELETE_USERS_SUCCESS: {
      console.log(response);
      return state;
    }
    case types.DELETE_USERS_ERROR:
      return state;
    default:
      return state;
  }
}
