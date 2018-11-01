import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { ALL_ARTICLES, ADD_ARTICLE } from '../actionTypes/ArticleConstants';
import { articleConstant } from '../constants/Constants';

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
