import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import {
  ALL_ARTICLES, ADD_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE, PUBLISH_ARTICLE
} from '../actionTypes';
import { articleConstant, tagsConstant } from '../constants/Constants';
import { CREATE_TAG } from '../actionTypes/TagConstants';

export const addArticle = article => (dispatch) => {
  dispatch(asyncActions(ADD_ARTICLE).loading(true));
  dispatch(asyncActions(ADD_ARTICLE).success(article));
};

export const getArticles = () => (dispatch) => {
  dispatch(asyncActions(ALL_ARTICLES).loading(true));
  axios.get(articleConstant.ALL_ARTICLES)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(ALL_ARTICLES).success(response.data.articles));
        dispatch(asyncActions(ALL_ARTICLES).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(ALL_ARTICLES)
      .failure(true, error)));
};

export const createArticle = ({ title, description, body }) => (dispatch) => {
  const tags = ['five'];

  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      dispatch(asyncActions(CREATE_ARTICLE).loading(true));

      axios.post(articleConstant.CREATE_ARTICLES_URL, {
        title, description, body, tags, categoryId: 1
      })
        .then(response => dispatch(asyncActions(CREATE_ARTICLE).success(response.data)))
        .catch(error => dispatch(asyncActions(CREATE_ARTICLE)
          .failure(true, error.response.data.message)));
    })
    .catch(error => dispatch(asyncActions(CREATE_TAG)
      .failure(true, error.response.data.message)));
};

export const updateArticle = ({
  title, description, body, articleSlug
}) => (dispatch) => {
  const tags = ['five'];

  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      dispatch(asyncActions(UPDATE_ARTICLE).loading(true));

      axios.put(`${articleConstant.UPDATE_ARTICLE_URL}/${articleSlug}`, {
        title, description, body, tags, categoryId: 1
      })
        .then(response => dispatch(asyncActions(UPDATE_ARTICLE).success(response.data)))
        .catch(error => dispatch(asyncActions(UPDATE_ARTICLE)
          .failure(true, error.response.data.message)));
    })
    .catch(error => dispatch(asyncActions(CREATE_TAG)
      .failure(true, error.response.data.message)));
};

export const publishArticle = ({ slug, status }) => (dispatch) => {
  const tags = ['five'];

  axios.post(tagsConstant.CREATE_TAG_URL, { tags })
    .then(() => {
      axios.put(`${articleConstant.UPDATE_ARTICLE_URL}/${slug}`, {
        status, tags
      })
        .then(response => dispatch(asyncActions(PUBLISH_ARTICLE).success(response.data)))
        .catch(error => dispatch(asyncActions(PUBLISH_ARTICLE)
          .failure(true, error.response.data.message)));
    })
    .catch(error => dispatch(asyncActions(CREATE_TAG)
      .failure(true, error.response.data.message)));
};
