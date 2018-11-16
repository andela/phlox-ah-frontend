import {
  CREATE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE, VIEW_ARTICLE,
  ALL_ARTICLES, FEATURED_ARTICLES, POPULAR_ARTICLES, RATE_ARTICLE
} from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  articles: [],
  article: {},
  featuredArticles: [],
  message: null,
  popularArticles: [],
  tags: [],
  latestArticles: [],
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
    case asyncActionName(ALL_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(ALL_ARTICLES).success:
      return {
        ...state, articles: action.payload
      };
    case asyncActionName(ALL_ARTICLES).failure:
      return {
        ...state,
        error: action.payload.status,
        failure: true,
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
    case asyncActionName(VIEW_ARTICLE).failure:
      return { ...state, failure: true, article: {} };
    case asyncActionName(RATE_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(RATE_ARTICLE).success:
      return {
        ...state,
        success: true,
        article: { ...state.article, ratingAverage: action.payload[1][0].ratingAverage }
      };
    case asyncActionName(RATE_ARTICLE).failure:
      return { ...state, failure: true };
    case asyncActionName(FEATURED_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(FEATURED_ARTICLES).success:
      return {
        ...state, featuredArticles: action.payload, success: true,
      };
    case asyncActionName(FEATURED_ARTICLES).failure:
      return {
        ...state,
        error: action.payload.status,
        failure: true,
      };
    case asyncActionName(POPULAR_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(POPULAR_ARTICLES).success:
      return {
        ...state, popularArticles: action.payload
      };
    case asyncActionName(POPULAR_ARTICLES).failure:
      return {
        ...state,
        error: action.payload.status,
        failure: true,
      };
    default:
      return state;
  }
};

export default ArticleReducer;
