import { CREATE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  article: {},
  message: null,
  success: null,
  tags: [],
  error: null,
  loading: false
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
        success: action.payload.success,
        tags: action.payload.tags,
        loading: false
      };
    case asyncActionName(CREATE_ARTICLE).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error, loading: false
      };
    case asyncActionName(UPDATE_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(UPDATE_ARTICLE).success:
      return {
        ...state,
        article: action.payload.article,
        message: action.payload.message,
        success: action.payload.success,
        tags: action.payload.tags,
        loading: false
      };
    case asyncActionName(UPDATE_ARTICLE).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error, loading: false
      };
    case asyncActionName(PUBLISH_ARTICLE).success:
      return {
        ...state,
        article: action.payload.article,
        message: action.payload.message,
        success: action.payload.success,
        tags: action.payload.tags,
        loading: false
      };
    case asyncActionName(PUBLISH_ARTICLE).failure:
      return { ...state, error: action.payload.status, message: action.payload.error };
    default:
      return state;
  }
};

export default ArticleReducer;
