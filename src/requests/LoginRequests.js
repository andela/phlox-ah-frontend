import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import setAuthToken from '../util/AuthTokenUtil';
import { LOGIN } from '../actionTypes/LoginConstants';
import { USER } from '../actionTypes/UserConstants';
import { loginConstant } from '../constants/Constants';

// eslint-disable-next-line
export const login = payload => (dispatch) => {
  dispatch(asyncActions(LOGIN).loading(true));
  axios.post(loginConstant.LOGIN, payload)
    .then((response) => {
      if (response.status === 200) {
        // saving token into the local storage
        localStorage.setItem('token', response.data.token);
        // setting token to request headers for authentication
        setAuthToken(response.data.token);
        dispatch(asyncActions(USER).success(response.data.user));
        dispatch(asyncActions(LOGIN).loading(false));
      }
    })
    .catch((error) => {
      dispatch(asyncActions(LOGIN).failure(true, error));
      dispatch(asyncActions(LOGIN).loading(false));
    });
};
