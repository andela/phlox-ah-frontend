import { combineReducers } from 'redux';

import articleReducer from './ArticleReducer';
import demoArticleReducer from './DemoArticleReducer';
import userReducer from './UserReducer';
import msgInfoReducer from './MsgInfoReducer';
import categoryReducer from './CategoryReducer';
import TagReducer from './TagReducer';


const rootReducer = combineReducers({
  demoArticleReducer,
  Article: articleReducer,
  User: userReducer,
  Info: msgInfoReducer,
  Category: categoryReducer,
  Tags: TagReducer
});

export default rootReducer;
