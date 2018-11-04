import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { LOGIN } from '../actionTypes/LoginConstants';
import { loginConstant } from '../constants/Constants';

// eslint-disable-next-line
export const login = payload => (dispatch) => {
  dispatch(asyncActions(LOGIN).loading(true));
  axios.post(loginConstant.LOGIN, payload)
    .then((response) => {
      if (response.status === 200) {
        dispatch(asyncActions(LOGIN).success(response.data.articles));
        dispatch(asyncActions(LOGIN).loading(false));
      }
    })
    .catch((error) => {
      dispatch(asyncActions(LOGIN).failure(true, error));
      dispatch(asyncActions(LOGIN).loading(false));
    });
};
