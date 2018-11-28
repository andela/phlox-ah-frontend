import { OPT_IN, OPT_OUT, NOTIFICATION_STATUS } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  error: null,
  message: '',
  success: false,
  emailNotification: null
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(NOTIFICATION_STATUS).success:
      return {
        ...state,
        emailNotification: action.payload.user.emailNotification,
        success: action.payload.success,
        message: action.payload.message
      };
    case asyncActionName(NOTIFICATION_STATUS).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(OPT_IN).success:
      return {
        ...state,
        emailNotification: true,
        success: action.payload.success,
        message: action.payload.message
      };
    case asyncActionName(OPT_IN).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    case asyncActionName(OPT_OUT).success:
      return {
        ...state,
        emailNotification: false,
        success: action.payload.success,
        message: action.payload.message
      };
    case asyncActionName(OPT_OUT).failure:
      return {
        ...state, error: action.payload.status, message: action.payload.error
      };
    default:
      return state;
  }
};

export default NotificationReducer;
