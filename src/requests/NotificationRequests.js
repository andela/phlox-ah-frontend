import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { OPT_IN, OPT_OUT, NOTIFICATION_STATUS } from '../actionTypes';
import { notificationConstant, userConstant } from '../constants/Constants';

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

export const getUserNotificationStatus = username => (dispatch) => {
  axios.get(userConstant(username).GET_ONE_USER_URL)
    .then(response => dispatch(asyncActions(NOTIFICATION_STATUS).success(response.data)))
    .catch(error => dispatch(asyncActions(NOTIFICATION_STATUS)
      .failure(true, error.response.data.message)));
};
