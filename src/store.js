import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import demoArticleReducer from './reducers/demoArticleReducer';

export default createStore(
  combineReducers({
    demoArticleReducer
  }),
  {},
  applyMiddleware(createLogger(), thunk)
);
