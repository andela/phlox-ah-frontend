import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import { NEW_PROFILE, VIEW_PROFILE } from '../actionTypes/ProfileConstants';
import { profileConstant } from '../constants/Constants';

export const newProfile = (profile, props) => (dispatch) => {
  dispatch(asyncActions(VIEW_PROFILE).loading(true));
  axios.post(profileConstant.PROFILE_URL, profile)
    .then((response) => {
      dispatch(asyncActions(NEW_PROFILE).success(response.data));
      props.history.push('/profile');
    })
    .catch(error => dispatch(asyncActions(NEW_PROFILE).failure(true, error)));
};

export const viewProfile = () => (dispatch) => {
  dispatch(asyncActions(VIEW_PROFILE).loading(true));
  return axios.get(profileConstant.PROFILE_URL)
    .then((response) => {
      dispatch(asyncActions(VIEW_PROFILE).success(response.data));
      return response.data.profile;
    })
    .catch(error => dispatch(asyncActions(VIEW_PROFILE).failure(true, error)));
};
