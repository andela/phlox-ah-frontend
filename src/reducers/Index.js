import { combineReducers } from 'redux';

import article from './ArticleReducer';
import myArticle from './MyArticleReducer';
import user from './UserReducer';
import info from './MsgInfoReducer';
import deleteItem from './DeleteReducer';
import category from './CategoryReducer';
import password from './PasswordReducer';
import comments from './CommentReducer';
import profile from './ProfileReducer';
import signup from './SignupReducer';
import tags from './TagReducer';
import verifyUser from './VerifyUserReducer';
import notification from './NotificationReducer';
import bookmark from './BookmarkReducer';
import report from './ReportArticleReducer';


const rootReducer = combineReducers({
  article,
  bookmark,
  category,
  deleteItem,
  comments,
  info,
  myArticle,
  password,
  profile,
  report,
  signup,
  tags,
  user,
  verifyUser,
  notification
});

export default rootReducer;
