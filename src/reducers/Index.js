import { combineReducers } from 'redux';
import articleReducer from './ArticlesReducer';
import msgInfoReducer from './MsgInfoReducer';
import passwordReducer from './PasswordReducer';
import signupReducer from './SignupReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
  Articles: articleReducer,
  passwordReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Signup: signupReducer
});

export default rootReducer;
