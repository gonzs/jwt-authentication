import * as types from '../actions';

export default function(
  state = { response: { success: undefined, message: undefined } },
  action
) {
  const response = action.response;

  switch (action.type) {
    case types.GET_DASHBOARD_SUCCESS:
      return { ...state, response };
    case types.GET_DASHBOARD_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}
