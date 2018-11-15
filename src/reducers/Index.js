import { combineReducers } from 'redux';
import article from './ArticleReducer';
import user from './UserReducer';
import info from './MsgInfoReducer';
import category from './CategoryReducer';
import tags from './TagReducer';
import password from './PasswordReducer';
import signup from './SignupReducer';
import profile from './ProfileReducer';


const rootReducer = combineReducers({
  article,
  category,
  info,
  password,
  profile,
  signup,
  tags,
  user
});

export default rootReducer;
