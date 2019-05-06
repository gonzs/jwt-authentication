import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import dashboard from './dashboardReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  register,
  login,
  dashboard,
  user,
});

export default rootReducer;
