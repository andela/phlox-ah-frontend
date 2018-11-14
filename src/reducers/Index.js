import { combineReducers } from 'redux';
import user from './UserReducer';
import info from './MsgInfoReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';
import profile from './ProfileReducer';


const rootReducer = combineReducers({
  info,
  password,
  profile,
  signup,
  user
});

export default rootReducer;
