import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { FORGOT_PASSWORD, RESET_PASSWORD } from '../actionTypes/PasswordConstants';
import { passwordConstant } from '../constants/Constants';

export const sendResetPassword = (token, password) => (dispatch) => {
  dispatch(asyncActions(RESET_PASSWORD).loading(true));
  axios.put(`${passwordConstant.RESET_PASSWORD_URL}/${token}`, { password })
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(RESET_PASSWORD).success(response.data.message));
        dispatch(asyncActions(RESET_PASSWORD).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(RESET_PASSWORD)
      .failure(true, error)));
};

export const sendForgotPassword = email => (dispatch) => {
  dispatch(asyncActions(FORGOT_PASSWORD).loading(true));
  axios.post(passwordConstant.FORGOT_PASSWORD_URL, { email })
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(FORGOT_PASSWORD).success(response.data.message));
        dispatch(asyncActions(FORGOT_PASSWORD).loading(false));
      }
    })
    .catch(error => dispatch(asyncActions(FORGOT_PASSWORD)
      .failure(true, error)));
};
