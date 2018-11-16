import { combineReducers } from 'redux';

import article from './ArticleReducer';
import user from './UserReducer';
import info from './MsgInfoReducer';
import category from './CategoryReducer';
import tags from './TagReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';
import comments from './CommentReducer';


const rootReducer = combineReducers({
  article,
  category,
  comments,
  info,
  password,
  signup,
  tags,
  user
});

export default rootReducer;
