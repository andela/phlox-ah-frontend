import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import {
  ALL_ARTICLES,
  ADD_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  PUBLISH_ARTICLE,
  VIEW_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
} from '../actionTypes';
import { articleConstant, tagsConstant } from '../constants/Constants';
import { CREATE_TAG } from '../actionTypes/TagConstants';
import { msgInfoActions } from '../actions/MsgInfoActions';

const formatError = (error) => {
  if (Array.isArray(error.message)) {
    return error.message;
  }
  if (error.message) {
    return [error.message];
  }
  return ['Error occurred'];
};

export const viewArticle = payload => (dispatch) => {
  dispatch(asyncActions(VIEW_ARTICLE).loading(true));
  axios.get(`${articleConstant.VIEW_ARTICLE_URL}/${payload}`)
    .then((response) => {
      if (response.status === 200) {
        axios.get(`${articleConstant.VIEW_ARTICLE_URL}/${payload}/status`)
          .then((res) => {
            const likeStatus = res.status === 200 ? res.data.status : null;
            const data = {
              article: response.data.article,
              likes: response.data.article.likes.filter(like => like.like === true),
              dislikes: response.data.article.likes.filter(like => like.like === false),
              likeStatus
            };
            dispatch(asyncActions(VIEW_ARTICLE).success(data));
            dispatch(asyncActions(VIEW_ARTICLE).loading(false));
          })
          .catch((error) => {
            const data = {
              article: response.data.article,
              likes: response.data.article.likes.filter(like => like.like === true),
              dislikes: response.data.article.likes.filter(like => like.like === false),
              likeStatus: null
            };
            dispatch(asyncActions(VIEW_ARTICLE).success(data));
            dispatch(asyncActions(VIEW_ARTICLE).loading(false));
          });
      }
    })
    .catch(error => dispatch(asyncActions(VIEW_ARTICLE).failure(true, error)));
};

export const likeArticle = payload => (dispatch) => {
  dispatch(asyncActions(DISLIKE_ARTICLE).loading(true));
  axios.post(`${articleConstant.LIKE_ARTICLE_URL}/${payload}/like`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(LIKE_ARTICLE).success(response.data.message));
        dispatch(asyncActions(LIKE_ARTICLE).loading(false));
        dispatch(viewArticle(payload));
      }
    })
    .catch(error => dispatch(asyncActions(LIKE_ARTICLE).failure(true, error)));
};

export const dislikeArticle = payload => (dispatch) => {
  dispatch(asyncActions(DISLIKE_ARTICLE).loading(true));
  axios.post(`${articleConstant.DISLIKE_ARTICLE_URL}/${payload}/dislike`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(DISLIKE_ARTICLE).success(response.data.message));
        dispatch(asyncActions(DISLIKE_ARTICLE).loading(false));
        dispatch(viewArticle(payload));
      }
    })
    .catch(error => dispatch(asyncActions(DISLIKE_ARTICLE).failure(true, error)));
};

export const createArticle = (formData, tags) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  axios.post(tagsConstant.CREATE_TAG_URL, { tags }, headers)
    .then(() => {
      dispatch(asyncActions(CREATE_ARTICLE).loading(true));

      axios.post(articleConstant.CREATE_ARTICLES_URL, formData, headers)
        .then((response) => {
          dispatch(asyncActions(CREATE_ARTICLE).success(response.data));
          dispatch(msgInfoActions.success([response.data.message]));
        })
        .catch((error) => {
          dispatch(asyncActions(CREATE_ARTICLE)
            .failure(true, error.response.data.message));
          dispatch(msgInfoActions.failure(formatError(error.response.data)));
        });
    })
    .catch((error) => {
      dispatch(asyncActions(CREATE_TAG)
        .failure(true, error.response.data.message));
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
    });
};

export const updateArticle = (formData, tags, articleSlug) => (dispatch) => {
  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      dispatch(asyncActions(UPDATE_ARTICLE).loading(true));

      axios.put(`${articleConstant.UPDATE_ARTICLE_URL}/${articleSlug}`, formData)
        .then((response) => {
          dispatch(asyncActions(UPDATE_ARTICLE).success(response.data));
          dispatch(msgInfoActions.success([response.data.message]));
          dispatch(asyncActions(UPDATE_ARTICLE).loading(false));
        })
        .catch((error) => {
          dispatch(asyncActions(UPDATE_ARTICLE)
            .failure(true, error.response.data.message));
          dispatch(msgInfoActions.failure(formatError(error.response.data)));
        });
    })
    .catch((error) => {
      dispatch(asyncActions(CREATE_TAG)
        .failure(true, error.response.data.message));
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
    });
};

export const publishArticle = ({ slug, status, tags }) => (dispatch) => {
  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      axios.put(`${articleConstant.UPDATE_ARTICLE_URL}/${slug}`, {
        status, tags
      })
        .then((response) => {
          dispatch(asyncActions(PUBLISH_ARTICLE).success(response.data));
          dispatch(msgInfoActions.success([response.data.message]));
        })
        .catch((error) => {
          dispatch(asyncActions(PUBLISH_ARTICLE)
            .failure(true, error.response.data.message));
          dispatch(msgInfoActions.failure(formatError(error.response.data)));
        });
    })
    .catch((error) => {
      dispatch(asyncActions(CREATE_TAG)
        .failure(true, error.response.data.message));
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
    });
};
