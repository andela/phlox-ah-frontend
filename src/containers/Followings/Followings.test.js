import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Followings from './Followings';
import { followerStore } from './mockStore';
import { asyncActions } from '../BasePath';
import {
  FOLLOW_USER, UNFOLLOW_USER
} from '../../actionTypes';
import CommentReducer from '../../reducers/CommentReducer';

const mockStore = configureMockStore([thunk]);
const store = mockStore(followerStore);

let component;
let myComponent;

describe('<Followings/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Followings />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should have a card', () => {
    expect(myComponent.find('Card').exists()).toBe(true);
  });
  it('should have a followers list', () => {
    expect(myComponent.find('FollowList').exists()).toBe(true);
  });
  it('should have an unfollow button', () => {
    expect(myComponent.find('Button.followAuthor').exists()).toBe(true);
  });
  it('should create an action to unfollow a user', () => {
    const payload = 'johnDoe';
    const expectedAction = {
      type: 'UNFOLLOW_USER_SUCCESS',
      payload
    };
    expect(asyncActions(UNFOLLOW_USER).success(payload)).toEqual(expectedAction);
  });
});
