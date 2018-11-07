import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import { NEW_PROFILE, VIEW_PROFILE } from '../actionTypes/ProfileConstants';
import { profileConstant } from '../constants/Constants';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6ImphY2tAc29tZXRoaW5nLmNvbSIsInVzZXJuYW1lIjoiamFja2RvZSIsInJvbGUiOiJBdXRob3IifSwiaWF0IjoxNTQxNDQ0MTU0LCJleHAiOjE1NDE2MTY5NTR9.pi4PqBTtwCSXpXSgLhkNCcA0hyD0AlnfF9Ah7SPXDZw'
  }
};
export const newProfile = profile => (dispatch) => {
  axios.post(profileConstant.PROFILE_URL, profile, config)
    .then((response) => {
      dispatch(asyncActions(NEW_PROFILE).success(response.data));
    })
    .catch(error => dispatch(asyncActions(NEW_PROFILE).failure(true, error)));
};

export const viewProfile = () => (dispatch) => {
  axios.get(profileConstant.PROFILE_URL, config)
    .then((response) => {
      dispatch(asyncActions(VIEW_PROFILE).success(response.data.profile));
    })
    .catch(error => dispatch(asyncActions(VIEW_PROFILE).failure(true, error)));
};
