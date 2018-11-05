import { MSG_INFO } from '../actionTypes/MsgInfoConstants';

const initialState = {
  success: false,
  info: [],
};

const msgInfoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case MSG_INFO:
      return { ...state, ...action.payload, };
    default:
      return state;
  }
};

export default msgInfoReducer;
