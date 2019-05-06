import * as types from '../actions';

export default function(
  state = { response: { success: undefined, message: undefined } },
  action
) {
  const response = action.response;

  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return { ...state, response };
    case types.REGISTER_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}
