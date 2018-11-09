import { combineReducers } from 'redux';
import demoArticleReducer from './DemoArticleReducer';
import profileReducer from './ProfileReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';


const rootReducer = combineReducers({
  demoArticleReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Profile: profileReducer
});

export default rootReducer;
