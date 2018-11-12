import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import setAuthToken from '../util/AuthTokenUtil';
import { LOGIN } from '../actionTypes/UserConstants';
import { loginConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';
import { formatError } from '../helpers/Errors';

export const login = payload => dispatch => axios.post(loginConstant.LOGIN_URL, payload)
  .then((response) => {
    if (response.status === 200) {
      // saving token into the local storage
      localStorage.setItem('token', response.data.token);
      // setting token to request headers for authentication
      setAuthToken(response.data.token);
      dispatch(asyncActions(LOGIN).success(response.data.user));
      dispatch(msgInfoActions.success([response.data.message]));
      setTimeout(() => dispatch(msgInfoActions.clear()), 3000);
      $('#login-modal').modal('close');
    }
    return response;
  })
  .catch((error) => {
    dispatch(msgInfoActions.failure(formatError(error.response.data)));
    throw error;
  });
