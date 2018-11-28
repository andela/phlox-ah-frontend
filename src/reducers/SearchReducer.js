import { SEARCH_ARTICLES } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  searchResult: [],
  error: null,
  loading: false,
  success: false,
  failure: false,
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(SEARCH_ARTICLES).loading:
      return {
        ...state,
        loading: action.payload,
        success: false,
        failure: false
      };
    case asyncActionName(SEARCH_ARTICLES).success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        searchResult: action.payload
      };
    case asyncActionName(SEARCH_ARTICLES).failure:
      return {
        ...state,
        loading: false,
        failure: true,
        success: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default SearchReducer;
