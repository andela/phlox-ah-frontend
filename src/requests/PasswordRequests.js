import axios from 'axios';
import { createBrowserHistory } from 'history';
import { asyncActions } from '../util/AsyncUtil';
import { FORGOT_PASSWORD, RESET_PASSWORD } from '../actionTypes/PasswordConstants';
import { passwordConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';
import { formatError } from '../helpers/Errors';

const history = createBrowserHistory({ forceRefresh: true });

export const sendResetPassword = (token, password) => (dispatch) => {
  dispatch(asyncActions(RESET_PASSWORD).loading(true));
  axios.put(`${passwordConstant.RESET_PASSWORD_URL}/${token}`, { password })
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(RESET_PASSWORD).success(response.data.message));
        dispatch(msgInfoActions.success([response.data.message]));
        dispatch(asyncActions(RESET_PASSWORD).loading(false));
        history.push('/');
      }
    })
    .catch((error) => {
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
      dispatch(asyncActions(RESET_PASSWORD).failure(true, error));
      throw error;
    });
};

export const sendForgotPassword = email => (dispatch) => {
  dispatch(asyncActions(FORGOT_PASSWORD).loading(true));
  axios.post(passwordConstant.FORGOT_PASSWORD_URL, { email })
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(FORGOT_PASSWORD).success(response.data.message));
        dispatch(asyncActions(FORGOT_PASSWORD).loading(false));
        history.push('/password/forgot-success');
      }
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(msgInfoActions.failure(formatError(error)));
      } else {
        dispatch(msgInfoActions.failure(formatError(error.response.data)));
      }
      dispatch(asyncActions(FORGOT_PASSWORD).failure(true, error));
      throw error;
    });
};
