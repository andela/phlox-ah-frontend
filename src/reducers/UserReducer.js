import { USER } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  isAuth: false,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(USER).success:
      return { ...state, ...action.payload.user, isAuth: true };
    case asyncActionName(USER).reset:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
