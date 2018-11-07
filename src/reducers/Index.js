import { combineReducers } from 'redux';

import demoArticleReducer from './DemoArticleReducer';
import profileReducer from './ProfileReducer';

const rootReducer = combineReducers({
  demoArticleReducer,
  Profile: profileReducer
});

export default rootReducer;
