import { combineReducers } from 'redux';

import article from './ArticleReducer';
import user from './UserReducer';
import info from './MsgInfoReducer';
import category from './CategoryReducer';
import password from './PasswordReducer';
import profile from './ProfileReducer';
import signup from './SignupReducer';
import tags from './TagReducer';


const rootReducer = combineReducers({
  article,
  category,
  info,
  password,
  signup,
  profile,
  tags,
  user
});

export default rootReducer;
