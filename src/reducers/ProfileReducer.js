import { NEW_PROFILE, VIEW_PROFILE } from '../actionTypes/ProfileConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  firstName: '',
  lastName: '',
  gender: '',
  bio: '',
  contact: '',
  profileImage: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(NEW_PROFILE).success:
      return { ...action.payload.profile };
    case asyncActionName(VIEW_PROFILE).success:
      return { ...state, ...action.payload.profile.profile };
    default:
      return state;
  }
};

export default profileReducer;
