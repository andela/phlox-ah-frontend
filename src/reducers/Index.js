import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import passwordReducer from './PasswordReducer';
import signupReducer from './SignupReducer';


const rootReducer = combineReducers({
  passwordReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Signup: signupReducer
});

export default rootReducer;
