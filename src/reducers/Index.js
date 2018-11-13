import { combineReducers } from 'redux';
import user from './UserReducer';
import info from './MsgInfoReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';


const rootReducer = combineReducers({
  info,
  password,
  signup,
  user
});

export default rootReducer;
