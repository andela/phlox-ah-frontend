import { combineReducers } from 'redux';

import articleReducer from './ArticleReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import categoryReducer from './CategoryReducer';
import TagReducer from './TagReducer';
import passwordReducer from './PasswordReducer';
import signupReducer from './SignupReducer';


const rootReducer = combineReducers({
  Article: articleReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Category: categoryReducer,
  Tags: TagReducer,
  passwordReducer,
  Signup: signupReducer
});

export default rootReducer;
