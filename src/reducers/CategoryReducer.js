import { GET_ALL_CATEGORY } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  categories: [],
  message: null,
  error: null,
  loading: false
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(GET_ALL_CATEGORY).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(GET_ALL_CATEGORY).success:
      return {
        ...state,
        categories: action.payload.categories,
        message: action.payload.message
      };
    case asyncActionName(GET_ALL_CATEGORY).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    default:
      return state;
  }
};

export default CategoryReducer;
