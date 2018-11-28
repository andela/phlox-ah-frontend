import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ViewProfile from './ViewProfile';
import ProfileReducer from '../../reducers/ProfileReducer';

const props = {
  profile: {
    firstName: '',
    lastName: '',
    gender: '',
    bio: '',
    contact: '',
    profileImage: 'https://via.placeholder.com/300?text=AuthorsHaven'
  },
  user: {
    username: '',
    email: ''
  },

};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  ...props,
  viewProfile: jest.fn(),
  followUser: [{ followings: [{}], followers: [{}] }]
});

let component;
let myComponent;


describe('<ViewProfile/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewProfile />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have div.profile tag', () => {
    expect(myComponent.find('div.profile').exists()).toBe(true);
  });
  it('should have img tag', () => {
    expect(myComponent.find('img').exists()).toBe(true);
  });
  it('should have a div with class pi-photo', () => {
    expect(myComponent.find('div.pi-photo').exists()).toBe(true);
  });
  it('should have a FollowList component', () => {
    expect(myComponent.find('FollowList').exists()).toBe(true);
  });
  it('should have a Tags component', () => {
    expect(myComponent.find('Tags').exists()).toBe(true);
  });
  it('should have a Link component', () => {
    expect(myComponent.find('Link').exists()).toBe(true);
  });
  it('should have ul with class authors', () => {
    expect(myComponent.find('ul.authors').exists()).toBe(true);
  });
  it('should have ul with class tags-wrapper', () => {
    expect(myComponent.find('ul.tags-wrapper').exists()).toBe(true);
  });
  it('should have table.profile-data tag', () => {
    expect(myComponent.find('table.profile-data').exists()).toBe(true);
  });
  it('should have tr with class data-row', () => {
    expect(myComponent.find('tr.data-row').exists()).toBe(true);
  });

  it('should dispatch an action to view profile', () => {
    const payload = {
      profile: props,
      message: 'Profile fetched successfully',
      success: true
    };
    const action = {
      type: 'VIEW_PROFILE_SUCCESS',
      payload
    };
    const newState = ProfileReducer({}, action);
    expect(newState).toEqual({ ...props.profile });
  });
});
