import { combineReducers } from 'redux';

import article from './ArticleReducer';
import category from './CategoryReducer';
import info from './MsgInfoReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';
import tags from './TagReducer';
import user from './UserReducer';
import verifyUser from './VerifyUserReducer';


const rootReducer = combineReducers({
  article,
  category,
  info,
  password,
  signup,
  tags,
  user,
  verifyUser
});

export default rootReducer;
