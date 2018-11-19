import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import {
  ALL_ARTICLES, ADD_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE,
  PUBLISH_ARTICLE, SINGLE_ARTICLE, VIEW_ARTICLE, MY_ARTICLES,
  DELETE_ARTICLE, FEATURED_ARTICLES, POPULAR_ARTICLES
} from '../actionTypes';
import { articleConstant, tagsConstant } from '../constants/Constants';
import { CREATE_TAG } from '../actionTypes/TagConstants';
import { DELETE } from '../actionTypes/DeleteContants';
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


export const deleteArticle = payload => (dispatch) => {
  dispatch(asyncActions(DELETE).loading(true));
  return axios.delete(`${articleConstant.DELETE_ARTICLE_URL}/${payload}`)
    .then((response) => {
      dispatch(asyncActions(DELETE_ARTICLE).success(payload));
      dispatch(asyncActions(DELETE).loading(false));
      return response;
    })
    .catch((error) => {
      dispatch(asyncActions(DELETE).loading(false));
      throw error;
    });
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

export const getSingleArticle = payload => (dispatch) => {
  dispatch(asyncActions(SINGLE_ARTICLE).loading(true));
  axios.get(`${articleConstant.SINGLE_ARTICLE_URL}/${payload.articlestatus}/${payload.articleslug}`)
    .then((response) => {
      dispatch(asyncActions(SINGLE_ARTICLE).success(response.data.article));
      dispatch(asyncActions(SINGLE_ARTICLE).loading(false));
    })
    .catch(error => dispatch(asyncActions(SINGLE_ARTICLE).failure(true, error)));
};

export const getMyArticles = () => (dispatch) => {
  dispatch(asyncActions(MY_ARTICLES).loading(true));
  return axios.get(articleConstant.MY_ARTICLES_URL)
    .then((response) => {
      dispatch(asyncActions(MY_ARTICLES).success(response.data.articles));
      dispatch(asyncActions(MY_ARTICLES).loading(false));
    })
    .catch(error => dispatch(asyncActions(MY_ARTICLES)
      .failure(true, error)));
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

export const publishArticle = ({ slug, status, tags }, props) => (dispatch) => {
  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      axios.put(`${articleConstant.UPDATE_ARTICLE_URL}/${slug}`, {
        status, tags
      })
        .then((response) => {
          dispatch(asyncActions(PUBLISH_ARTICLE).success(response.data));
          dispatch(msgInfoActions.success([response.data.message]));
          props.history.push(`/articles/${slug}`);
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
