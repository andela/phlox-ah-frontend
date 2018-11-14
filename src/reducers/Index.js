import { combineReducers } from 'redux';

import article from './ArticleReducer';
import myArticle from './MyArticleReducer';
import user from './UserReducer';
import info from './MsgInfoReducer';
import category from './CategoryReducer';
import password from './PasswordReducer';
import profile from './ProfileReducer';
import signup from './SignupReducer';
import tags from './TagReducer';


const rootReducer = combineReducers({
  article,
  myArticle,
  category,
  info,
  password,
  signup,
  profile,
  tags,
  user
});

export default rootReducer;
