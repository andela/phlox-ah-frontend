import axios from 'axios';

import { commentConstant } from '../constants/Constants';
import { asyncActions } from '../util/AsyncUtil';
import { CREATE_COMMENT, GET_ALL_COMMENT } from '../actionTypes/CommentConstants';

export const createComment = (articleSlug, comment) => (dispatch) => {
  axios.post(commentConstant(articleSlug).COMMENT_URL, { comment })
    .then(() => {
      axios.get(commentConstant(articleSlug).COMMENT_URL)
        .then(response => dispatch(asyncActions(CREATE_COMMENT).success(response.data)))
        .catch(error => dispatch(asyncActions(CREATE_COMMENT)
          .failure(true, error.response.data.message)));
    })
    .catch(error => dispatch(asyncActions(GET_ALL_COMMENT)
      .failure(true, error.response.data.message)));
};

export const getAllComment = articleSlug => (dispatch) => {
  axios.get(commentConstant(articleSlug).COMMENT_URL)
    .then(response => dispatch(asyncActions(GET_ALL_COMMENT).success(response.data)))
    .catch(error => dispatch(asyncActions(GET_ALL_COMMENT)
      .failure(true, error.response.data.message)));
};
