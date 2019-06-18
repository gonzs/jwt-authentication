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
      response.users = state.response.users.filter(user => {
        return user._id !== response.users._id;
      });
      return { ...state, response };
    }
    case types.DELETE_USERS_ERROR:
      return state;

    default:
      return state;
  }
}
