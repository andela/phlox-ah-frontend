import { CREATE_COMMENT, GET_ALL_COMMENT } from '../actionTypes/CommentConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  comment: [],
  error: null,
  message: '',
  success: false
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(CREATE_COMMENT).success:
      return {
        ...state,
        comment: action.payload.comments,
        message: action.payload.message,
        success: action.payload.success
      };
    case asyncActionName(CREATE_COMMENT).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(GET_ALL_COMMENT).success:
      return {
        ...state,
        comment: action.payload.comments,
        message: action.payload.message,
        success: action.payload.success
      };
    case asyncActionName(GET_ALL_COMMENT).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    default:
      return state;
  }
};

export default CommentReducer;
