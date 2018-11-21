import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import {
  FOLLOW_USER, UNFOLLOW_USER, GET_FOLLOWINGS
} from '../actionTypes/UserConstants';
import { followUserConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';

export const followUser = username => (dispatch) => {
  dispatch(asyncActions(FOLLOW_USER).loading(true));
  axios.post(`${followUserConstant.FOLLOW_USER_CONSTANT}/${username}/follow`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(FOLLOW_USER).success(response.data.user));
        dispatch(asyncActions(FOLLOW_USER).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(FOLLOW_USER).failure(true, error)));
};

export const unfollowUser = username => (dispatch) => {
  dispatch(asyncActions(UNFOLLOW_USER).loading(true));
  axios.delete(`${followUserConstant.FOLLOW_USER_CONSTANT}/${username}/follow`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(UNFOLLOW_USER).success(response.data.user));
        dispatch(asyncActions(UNFOLLOW_USER).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(UNFOLLOW_USER).failure(true, error)));
};

export const getFollowings = () => (dispatch) => {
  dispatch(asyncActions(GET_FOLLOWINGS).loading(true));
  axios.get(`${followUserConstant.GET_FOLLOWINGS_CONSTANT}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(GET_FOLLOWINGS).success(response.data));
        dispatch(asyncActions(GET_FOLLOWINGS).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(FOLLOW_USER).failure(true, error)));
};
