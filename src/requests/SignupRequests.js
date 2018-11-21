import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { SIGNUP } from '../actionTypes/UserConstants';
import { signupConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';

const formatError = (error) => {
  if (Array.isArray(error)) {
    return error;
  }
  if (error) {
    return [error];
  }
  return ['Error occurred'];
};

export const signup = payload => (dispatch) => {
  dispatch(asyncActions(SIGNUP).loading(true));
  dispatch(msgInfoActions.clear());
  return axios.post(signupConstant.SIGNUP_URL, payload)
    .then((response) => {
      dispatch(asyncActions(SIGNUP).loading(false));
      if (response.status === 201) {
        dispatch(asyncActions(SIGNUP).success(true));
      }
      return response;
    })
    .catch((error) => {
      dispatch(asyncActions(SIGNUP).loading(false));
      dispatch(msgInfoActions.failure(formatError(error.response.data.message)));
      throw error;
    });
};
