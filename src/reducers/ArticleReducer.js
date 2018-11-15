import {
  CREATE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE, VIEW_ARTICLE, SINGLE_ARTICLE
} from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  article: {},
  message: null,
  tags: [],
  error: null,
  loading: false,
  success: false,
  failure: false,
};

const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(CREATE_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(CREATE_ARTICLE).success:
      return {
        ...state,
        article: action.payload.article,
        message: action.payload.message,
        tags: action.payload.tags,
        error: false
      };
    case asyncActionName(CREATE_ARTICLE).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(UPDATE_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(UPDATE_ARTICLE).success:
      return {
        ...state,
        article: action.payload.article,
        message: action.payload.message,
        tags: action.payload.tags
      };
    case asyncActionName(UPDATE_ARTICLE).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(PUBLISH_ARTICLE).success:
      return {
        ...state,
        article: action.payload.article,
        message: action.payload.message,
        tags: action.payload.tags
      };
    case asyncActionName(PUBLISH_ARTICLE).failure:
      return { ...state, error: action.payload.status, message: action.payload.error };
    case asyncActionName(VIEW_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(VIEW_ARTICLE).success:
      return { ...state, success: true, article: action.payload };
    case asyncActionName(SINGLE_ARTICLE).success:
      return { ...state, article: action.payload };
    case asyncActionName(VIEW_ARTICLE).failure:
      return { ...state, failure: true, article: {} };
    default:
      return state;
  }
};

export default ArticleReducer;
