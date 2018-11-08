import { SIGNUP } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  loading: false,
  success: false,
  failure: false
};

const signupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(SIGNUP).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(SIGNUP).success:
      return {
        ...state,
        success: action.payload,
      };
    case asyncActionName(SIGNUP).failure:
      return {
        ...state,
        failure: true
      };
    default:
      return state;
  }
};

export default signupReducer;
