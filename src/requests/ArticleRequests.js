import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { ALL_ARTICLES, VIEW_ARTICLE } from '../actionTypes/ArticleConstants';
import { articleConstant } from '../constants/Constants';

export const viewArticle = payload => (dispatch) => {
  dispatch(asyncActions(VIEW_ARTICLE).loading(true));
  axios.get(`${articleConstant.ARTICLES_URL}/${payload}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(VIEW_ARTICLE).success(response.data.article));
        dispatch(asyncActions(VIEW_ARTICLE).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(VIEW_ARTICLE).failure(true, error)));
};
