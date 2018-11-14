import { VIEW_ARTICLE } from '../actionTypes/ArticleConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  loading: false,
  success: false,
  failure: false,
  article: {}
};

const articleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(VIEW_ARTICLE).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(VIEW_ARTICLE).success:
      return { ...state, success: true, article: action.payload };
    case asyncActionName(VIEW_ARTICLE).failure:
      return { ...state, article: {} };
    default:
      return state;
  }
};

export default articleReducer;
