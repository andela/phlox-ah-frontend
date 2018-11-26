import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Profile from './Profile';
import ProfileReducer from '../../reducers/ProfileReducer';

const props = {
  profile: {
    firstName: '',
    lastName: '',
    gender: '',
    bio: '',
    contact: '',
    profileImage: ''
  },
  user: {
    username: '',
    email: ''
  },

};

const mockStore = configureMockStore([thunk]);
const store = mockStore({ ...props, viewProfile: jest.fn() });

let component;
let myComponent;


describe('<Profile/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a Row component', () => {
    expect(myComponent.find('Row').exists()).toBe(true);
  });
  it('should have a form tag with class col', () => {
    expect(myComponent.find('form').exists()).toBe(true);
  });
  it('should have a Col component', () => {
    expect(myComponent.find('Col').exists()).toBe(true);
  });
  it('should have a Update profile button', () => {
    expect(myComponent.find('Button').exists()).toBe(true);
  });
  it('should have a input field', () => {
    expect(myComponent.find('Input').exists()).toBe(true);
  });

  it('should dispatch an action to create profile', () => {
    const payload = {
      profile: props.profile,
      message: 'Profile created successfully',
      success: true
    };
    const action = {
      type: 'NEW_PROFILE_SUCCESS',
      payload
    };
    const newState = ProfileReducer({}, action);
    expect(newState).toEqual({ ...props.profile });
  });
});
