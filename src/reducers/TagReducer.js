import { ALL_TAGS, ONE_TAG } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  tag: {},
  tags: [],
  message: null,
  error: null,
  loading: false,
  failure: false,
  success: false
};

const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(ALL_TAGS).success:
      return {
        ...state,
        tags: action.payload.tags,
        message: action.payload.message
      };
    case asyncActionName(ALL_TAGS).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(ONE_TAG).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(ONE_TAG).success:
      return {
        ...state, tag: action.payload, success: true
      };
    case asyncActionName(ONE_TAG).failure:
      return {
        ...state,
        error: action.payload.status,
        failure: true,
      };
    default:
      return state;
  }
};

export default TagReducer;
