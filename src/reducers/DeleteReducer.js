import { DELETE } from '../actionTypes/DeleteContants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  loading: false
};

const deleteReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(DELETE).loading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default deleteReducer;
