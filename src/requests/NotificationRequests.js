import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { OPT_IN, OPT_OUT } from '../actionTypes';
import { notificationConstant } from '../constants/Constants';

export const optOutFromNotification = () => (dispatch) => {
  axios.put(notificationConstant.OPT_OUT_URL)
    .then(response => dispatch(asyncActions(OPT_OUT).success(response.data)))
    .catch(error => dispatch(asyncActions(OPT_OUT).failure(true, error.response.data.message)));
};

export const optInForNotification = () => (dispatch) => {
  axios.put(notificationConstant.OPT_IN_URL)
    .then(response => dispatch(asyncActions(OPT_IN).success(response.data)))
    .catch(error => dispatch(asyncActions(OPT_IN).failure(true, error.response.data.message)));
};
