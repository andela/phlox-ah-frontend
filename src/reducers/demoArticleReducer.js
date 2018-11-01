import { ALL_ARTICLES, ADD_ARTICLE } from '../actionTypes/ArticleConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = { articles: [{ title: 'The first article', body: 'The body' }] };

const demoArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(ALL_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(ALL_ARTICLES).success:
      return { ...state, articles: action.payload };
    case asyncActionName(ALL_ARTICLES).failure:
      return { ...state, error: action.payload.status, errorMessage: action.payload.error };
    case asyncActionName(ADD_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(ADD_ARTICLE).success:
      return { ...state, articles: [...state.articles, action.payload] };
    case asyncActionName(ADD_ARTICLE).failure:
      return { ...state, error: action.payload.status, errorMessage: action.payload.error };
    default:
      return state;
  }
};

export default demoArticleReducer;
