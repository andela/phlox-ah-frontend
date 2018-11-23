import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { NEW_BOOKMARK, ALL_BOOKMARK, DELETE_BOOKMARK } from '../actionTypes';
import { bookmarkConstant } from '../constants/Constants';

export const bookmarkArticle = articleId => (dispatch) => {
  dispatch(asyncActions(NEW_BOOKMARK).loading(true));
  axios.post(bookmarkConstant.BOOKMARK_URL, { articleId })
    .then((response) => {
      dispatch(asyncActions(NEW_BOOKMARK).success(response.data.bookmark));
      dispatch(asyncActions(NEW_BOOKMARK).loading(false));
    })
    .catch(error => dispatch(asyncActions(NEW_BOOKMARK)
      .failure(true, error)));
};

export const allBookmarks = () => (dispatch) => {
  dispatch(asyncActions(ALL_BOOKMARK).loading(true));
  axios.get(bookmarkConstant.BOOKMARK_URL)
    .then((response) => {
      dispatch(asyncActions(ALL_BOOKMARK).success(response.data.bookmarks));
      dispatch(asyncActions(ALL_BOOKMARK).loading(false));
    })
    .catch(error => dispatch(asyncActions(ALL_BOOKMARK)
      .failure(true, error)));
};

export const deleteBookmark = articleId => (dispatch) => {
  dispatch(asyncActions(DELETE_BOOKMARK).loading(true));
  axios.delete(bookmarkConstant.BOOKMARK_URL, { data: { articleId } })
    .then((response) => {
      dispatch(asyncActions(DELETE_BOOKMARK).success(false));
      dispatch(asyncActions(DELETE_BOOKMARK).loading(false));
    })
    .catch(error => dispatch(asyncActions(DELETE_BOOKMARK)
      .failure(true, error)));
};
