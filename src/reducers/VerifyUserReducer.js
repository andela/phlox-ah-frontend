import { VERIFY_USER } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  loading: true,
  success: false,
};

const verifyUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(VERIFY_USER).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(VERIFY_USER).success:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

export default verifyUserReducer;
