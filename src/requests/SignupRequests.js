import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { SIGNUP } from '../actionTypes/UserConstants';
import { signupConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';

const formatError = (error) => {
  if (Array.isArray(error)) {
    return error.message;
  }
  if (error.message) {
    return [error.message];
  }
  return ['Error occurred'];
};

export const signup = payload => (dispatch) => {
  dispatch(asyncActions(SIGNUP).loading(true));
  dispatch(msgInfoActions.clear());
  axios.post(signupConstant.SIGNUP_URL, payload)
    .then((response) => {
      if (response.status === 201) {
        dispatch(asyncActions(SIGNUP).success());
      }
    })
    .catch((error) => {
      dispatch(asyncActions(SIGNUP).failure(true, error.response.data.message));
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
    });
};
