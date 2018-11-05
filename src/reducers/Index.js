import { combineReducers } from 'redux';

import demoArticleReducer from './DemoArticleReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
  demoArticleReducer,
  User: userReducer,
});

export default rootReducer;
