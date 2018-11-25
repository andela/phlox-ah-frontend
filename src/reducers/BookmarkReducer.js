import { NEW_BOOKMARK, ALL_BOOKMARK, DELETE_BOOKMARK } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  bookmark: {},
  bookmarks: [],
  loading: false,
  success: false,
};

const BookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(NEW_BOOKMARK).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(NEW_BOOKMARK).success:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      };
    case asyncActionName(NEW_BOOKMARK).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(ALL_BOOKMARK).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(ALL_BOOKMARK).success:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case asyncActionName(ALL_BOOKMARK).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(DELETE_BOOKMARK).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(DELETE_BOOKMARK).success:
      return { ...state, bookmarks: [] };
    case asyncActionName(DELETE_BOOKMARK).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    default:
      return state;
  }
};

export default BookmarkReducer;
