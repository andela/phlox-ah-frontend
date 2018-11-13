import { combineReducers } from 'redux';
import profileReducer from './ProfileReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import passwordReducer from './PasswordReducer';
import signupReducer from './SignupReducer';


const rootReducer = combineReducers({
  passwordReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Profile: profileReducer,
  Signup: signupReducer
});

export default rootReducer;
