import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import {
  ALL_ARTICLES, CREATE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE,
  VIEW_ARTICLE, FEATURED_ARTICLES, POPULAR_ARTICLES, RATE_ARTICLE, LIKE_ARTICLE, DISLIKE_ARTICLE
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

export const getArticles = () => (dispatch) => {
  dispatch(asyncActions(ALL_ARTICLES).loading(true));
  axios.get(articleConstant.ALL_ARTICLES_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(ALL_ARTICLES).success(response.data.articles));
        dispatch(asyncActions(ALL_ARTICLES).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(ALL_ARTICLES)
      .failure(true, error)));
};

export const viewArticle = payload => (dispatch) => {
  dispatch(asyncActions(VIEW_ARTICLE).loading(true));
  axios.get(`${articleConstant.VIEW_ARTICLE_URL}/${payload}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(VIEW_ARTICLE).success(response.data.article));
        dispatch(asyncActions(VIEW_ARTICLE).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(VIEW_ARTICLE).failure(true, error)));
};

export const rateArticle = (slug, rating) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  dispatch(asyncActions(RATE_ARTICLE).loading(true));
  axios.post(`${articleConstant.RATE_ARTICLE_URL}/${slug}/rate`, { rating }, headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(RATE_ARTICLE).success(response.data.article));
        dispatch(asyncActions(RATE_ARTICLE).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(RATE_ARTICLE).failure(true, error)));
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
          dispatch(asyncActions(CREATE_ARTICLE).loading(false));
          dispatch(asyncActions(CREATE_ARTICLE).success(response.data));
          dispatch(msgInfoActions.success([response.data.message]));
        })
        .catch((error) => {
          dispatch(asyncActions(CREATE_ARTICLE)
            .failure(true, error.response.data.message));
          dispatch(msgInfoActions.failure(formatError(error.response.data)));
          dispatch(asyncActions(CREATE_ARTICLE).loading(false));
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

export const getFeaturedArticles = () => (dispatch) => {
  dispatch(asyncActions(FEATURED_ARTICLES).loading(true));
  axios.get(articleConstant.FEATURED_ARTICLES_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(FEATURED_ARTICLES).success(response.data.articles));
        dispatch(asyncActions(FEATURED_ARTICLES).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(FEATURED_ARTICLES)
      .failure(true, error)));
};

export const getPopularArticles = () => (dispatch) => {
  dispatch(asyncActions(POPULAR_ARTICLES).loading(true));
  axios.get(articleConstant.POPULAR_ARTICLES_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(POPULAR_ARTICLES).success(response.data.articles));
        dispatch(asyncActions(POPULAR_ARTICLES).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(POPULAR_ARTICLES)
      .failure(true, error)));
};

export const likeArticle = payload => (dispatch) => {
  dispatch(asyncActions(DISLIKE_ARTICLE).loading(true));
  axios.post(`${articleConstant.LIKE_DISLIKE_URL}/${payload}/like`)
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
  axios.post(`${articleConstant.LIKE_DISLIKE_URL}/${payload}/dislike`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(DISLIKE_ARTICLE).success(response.data.message));
        dispatch(asyncActions(DISLIKE_ARTICLE).loading(false));
        dispatch(viewArticle(payload));
      }
    })
    .catch(error => dispatch(asyncActions(DISLIKE_ARTICLE).failure(true, error)));
};
