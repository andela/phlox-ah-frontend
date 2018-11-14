import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { GET_ALL_CATEGORY } from '../actionTypes';
import { categoryConstant } from '../constants/Constants';

export const getAllCategory = () => (dispatch) => {
  dispatch(asyncActions(GET_ALL_CATEGORY).loading(true));

  axios.get(categoryConstant.GET_ALL_CATEGORY_URL)
    .then(response => dispatch(asyncActions(GET_ALL_CATEGORY).success(response.data)))
    .catch(error => dispatch(asyncActions(GET_ALL_CATEGORY)
      .failure(true, error.response.data.message)));
};
