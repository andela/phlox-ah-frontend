import {
  FOLLOW_USER, UNFOLLOW_USER, GET_FOLLOWINGS, GET_FOLLOWERS
} from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  loading: true,
  success: false,
  followings: [],
  followers: []
};

const followUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(FOLLOW_USER).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(FOLLOW_USER).success:
      return { ...state, followings: [action.payload] };
    case asyncActionName(FOLLOW_USER).failure:
      return { ...state, error: action.payload.status };
    case asyncActionName(UNFOLLOW_USER).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(UNFOLLOW_USER).success:
      return {
        ...state,
        followings: state.followings.filter(data => data.username !== action.payload.user.username)
      };
    case asyncActionName(UNFOLLOW_USER).failure:
      return { ...state, error: action.payload.status };
    case asyncActionName(GET_FOLLOWINGS).failure:
      return { ...state, error: action.payload.status };
    case asyncActionName(GET_FOLLOWINGS).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(GET_FOLLOWINGS).success:
      return { ...state, followings: action.payload.following };
    case asyncActionName(GET_FOLLOWERS).failure:
      return { ...state, error: action.payload.status };
    case asyncActionName(GET_FOLLOWERS).loading:
      return { ...state, loading: action.payload };
    case asyncActionName(GET_FOLLOWERS).success:
      return { ...state, followers: action.payload.followers };
    default:
      return state;
  }
};

export default followUserReducer;
