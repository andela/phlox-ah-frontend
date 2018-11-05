import { combineReducers } from 'redux';
import demoArticleReducer from './DemoArticleReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';


const rootReducer = combineReducers({
  demoArticleReducer,
  User: userReducer,
  Info: msgInfoReducer,
});

export default rootReducer;
