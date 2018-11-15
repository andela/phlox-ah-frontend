import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { VERIFY_USER } from '../actionTypes/UserConstants';
import { signupConstant } from '../constants/Constants';

export const verifyUser = payload => (dispatch) => {
  dispatch(asyncActions(VERIFY_USER).loading(true));
  axios.get(`${signupConstant.VERIFY_URL}/${payload}`)
    .then((response) => {
      dispatch(asyncActions(VERIFY_USER).loading(false));
      if (response.status === 200) {
        dispatch(asyncActions(VERIFY_USER).success(true));
      }
    })
    .catch(() => {
      dispatch(asyncActions(VERIFY_USER).loading(false));
    });
};
