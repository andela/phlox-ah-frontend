import { combineReducers } from 'redux';
import article from './ArticleReducer';
import category from './CategoryReducer';
import info from './MsgInfoReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';
import comments from './CommentReducer';
import profile from './ProfileReducer';
import tags from './TagReducer';
import user from './UserReducer';
import verifyUser from './VerifyUserReducer';


const rootReducer = combineReducers({
  article,
  category,
  comments,
  info,
  password,
  profile,
  signup,
  tags,
  user,
  verifyUser
});

export default rootReducer;
