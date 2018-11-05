import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import setAuthToken from '../util/AuthTokenUtil';
import { LOGIN } from '../actionTypes/LoginConstants';
import { USER } from '../actionTypes/UserConstants';
import { loginConstant } from '../constants/Constants';
import { msgInfoActions } from '../actions/MsgInfoActions';


// eslint-disable-next-line
const formatError = (error) => {
  if (Array.isArray(error.message)) {
    return error.message;
  } else if (error.message) {
    return [error.message]
  } else 
    return ['Error occured'];
};


// eslint-disable-next-line
export const login = payload => (dispatch) => {
  return axios.post(loginConstant.LOGIN, payload)
    .then((response) => {
      if (response.status === 200) {
        // saving token into the local storage
        localStorage.setItem('token', response.data.token);
        // setting token to request headers for authentication
        setAuthToken(response.data.token);
        dispatch(asyncActions(USER).success(response.data.user));
        dispatch(msgInfoActions.success([response.data.message]));
        // eslint-disable-next-line
        $("#login-modal").modal("close");
      }
    })
    .catch((error) => {
      dispatch(msgInfoActions.failure(formatError(error.response.data)));
    });
};
