import { combineReducers } from 'redux';
import demoArticleReducer from './DemoArticleReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import passwordReducer from './PasswordReducer';

const rootReducer = combineReducers({
  demoArticleReducer,
  passwordReducer,
  User: userReducer,
  Info: msgInfoReducer,
});

export default rootReducer;
