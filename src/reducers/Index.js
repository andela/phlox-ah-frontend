import { combineReducers } from 'redux';

import ArticleReducer from './ArticleReducer';
import demoArticleReducer from './DemoArticleReducer';

const rootReducer = combineReducers({
  demoArticleReducer,
  ArticleReducer
});

export default rootReducer;
