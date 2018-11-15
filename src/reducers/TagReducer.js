import { ALL_TAGS } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  tags: [],
  message: null,
  error: null,
  loading: false
};

const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(ALL_TAGS).success:
      return {
        ...state,
        tags: action.payload.tags,
        message: action.payload.message,
      };
    case asyncActionName(ALL_TAGS).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    default:
      return state;
  }
};

export default TagReducer;
