import { MY_ARTICLES, DELETE_ARTICLE } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  articles: [],
  loading: false
};

const MyArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(MY_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(DELETE_ARTICLE).success:
      return {
        ...state,
        articles: state.articles.filter(data => data.slug !== action.payload)
      };
    case asyncActionName(MY_ARTICLES).success:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
};

export default MyArticleReducer;
