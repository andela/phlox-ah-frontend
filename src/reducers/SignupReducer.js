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
        loading: true,
        success: false,
        failure: false
      };
    case asyncActionName(SIGNUP).success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false
      };
    case asyncActionName(SIGNUP).failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true
      };
    default:
      return state;
  }
};

export default signupReducer;
