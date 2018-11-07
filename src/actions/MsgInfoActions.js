import { MSG_INFO } from '../actionTypes/MsgInfoConstants';

export const msgInfoActions = {
  success: info => ({
    type: MSG_INFO,
    payload: {
      success: true,
      info
    }
  }),
  clear: () => ({
    type: MSG_INFO,
    payload: {
      success: true,
      info: []
    }
  }),
  failure: info => ({
    type: MSG_INFO,
    payload: {
      success: false,
      info
    }
  })
};
