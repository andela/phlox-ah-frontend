import { MY_ARTICLES } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  articles: [],
  loading: false
};

const MyArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(MY_ARTICLES).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(MY_ARTICLES).success:
      return { ...state, articles: action.payload };
     default:
      return state;
  }
};

export default MyArticleReducer;
