import { LOGIN, LOGOUT } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  isAuth: false,
  loading: false
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(LOGIN).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(LOGIN).success:
      return { ...state, ...action.payload.user, isAuth: true };
    case asyncActionName(LOGOUT).success:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
