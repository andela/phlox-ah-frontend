import { FORGOT_PASSWORD, RESET_PASSWORD } from '../actionTypes/PasswordConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  loading: false, error: false, errorMessage: null, successMessage: null
};

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(FORGOT_PASSWORD).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(FORGOT_PASSWORD).success:
      return { ...state, successMessage: action.payload };
    case asyncActionName(FORGOT_PASSWORD).failure:
      return {
        ...state,
        error: action.payload.status,
        errorMessage: action.payload.error.response.data.message
      };
    case asyncActionName(RESET_PASSWORD).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(RESET_PASSWORD).success:
      return { ...state, successMessage: action.payload };
    case asyncActionName(RESET_PASSWORD).failure:
      return {
        ...state,
        error: action.payload.status,
        errorMessage: action.payload.error.response.data.message
      };
    default:
      return state;
  }
};

export default passwordReducer;
