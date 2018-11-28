import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { GET_ALL_CATEGORY, GET_CATEGORY_ARTICLE } from '../actionTypes';
import { categoryConstant } from '../constants/Constants';

export const getAllCategory = () => (dispatch) => {
  dispatch(asyncActions(GET_ALL_CATEGORY).loading(true));
  axios.get(categoryConstant.GET_ALL_CATEGORY_URL)
    .then(response => dispatch(asyncActions(GET_ALL_CATEGORY).success(response.data)))
    .catch(error => dispatch(asyncActions(GET_ALL_CATEGORY)
      .failure(true, error.response.data.message)));
};

export const getCategoryArticle = name => (dispatch) => {
  dispatch(asyncActions(GET_CATEGORY_ARTICLE).loading(true));
  axios.get(`${categoryConstant.CATEGORY_URL}/${name}/articles`)
    .then((response) => {
      dispatch(asyncActions(GET_CATEGORY_ARTICLE).success(response.data));
      dispatch(asyncActions(GET_CATEGORY_ARTICLE).loading(false));
    })
    .catch((error) => {
      dispatch(asyncActions(GET_CATEGORY_ARTICLE).success({ articles: [] }));
      dispatch(asyncActions(GET_CATEGORY_ARTICLE).loading(false));
      dispatch(asyncActions(GET_CATEGORY_ARTICLE)
        .failure(true, error));
    });
};
