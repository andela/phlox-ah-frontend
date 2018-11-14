import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { ALL_TAGS } from '../actionTypes';
import { tagsConstant } from '../constants/Constants';

export const getAllTags = () => (dispatch) => {
  axios.get(tagsConstant.GET_ALL_TAG_URL)
    .then(response => dispatch(asyncActions(ALL_TAGS).success(response.data)))
    .catch(error => dispatch(asyncActions(ALL_TAGS)
      .failure(true, error.response.data.message)));
};
