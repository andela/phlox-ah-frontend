import { MSG_INFO } from '../actionTypes/MsgInfoConstants';

export const msgInfoActions = {
  success: message => ({
    type: MSG_INFO,
    payload: {
      success: true,
      message
    }
  }),
  clear: () => ({
    type: MSG_INFO,
    payload: {
      success: true,
      message: []
    }
  }),
  failure: message => ({
    type: MSG_INFO,
    payload: {
      success: false,
      message
    }
  })
};
