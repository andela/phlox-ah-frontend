import { combineReducers } from 'redux';
import demoArticleReducer from './DemoArticleReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import signupReducer from './SignupReducer';


const rootReducer = combineReducers({
  demoArticleReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Signup: signupReducer
});

export default rootReducer;
