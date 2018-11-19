import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { ALL_TAGS, ONE_TAG } from '../actionTypes';
import { tagsConstant } from '../constants/Constants';

export const getAllTags = () => (dispatch) => {
  axios.get(tagsConstant.GET_ALL_TAG_URL)
    .then((response) => {
      dispatch(asyncActions(ALL_TAGS).success(response.data));
      dispatch(asyncActions(ALL_TAGS).loading(false));
    })
    .catch(error => dispatch(asyncActions(ALL_TAGS)
      .failure(true, error)));
};

export const getOneTag = name => (dispatch) => {
  axios.get(`${tagsConstant.GET_ONE_TAG_URL}/${name}`)
    .then(response => dispatch(asyncActions(ONE_TAG).success(response.data.tag)))
    .catch(error => dispatch(asyncActions(ONE_TAG)
      .failure(true, error)));
};
