import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import passwordReducer from './PasswordReducer';

const rootReducer = combineReducers({
  passwordReducer,
  User: userReducer,
  Info: msgInfoReducer
});

export default rootReducer;
