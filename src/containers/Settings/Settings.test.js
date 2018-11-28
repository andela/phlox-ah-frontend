import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Settings from './Settings';
import NotificationReducer from '../../reducers/NotificationReducer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  notification: {
    error: null,
    message: 'successfully opted out of notification',
    success: true,
    emailNotification: false
  },
  user: {
    isAuth: true,
    loading: false,
    id: 6,
    email: 'admin@authorshaven.com',
    username: 'admin1',
    role: 'Admin'
  }
});
let component;
let myComponent;

beforeEach(() => {
  component = shallow(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  myComponent = component.dive({ context: { store } }).dive();
});

it('should render without throwing an error', () => {
  expect(myComponent).toMatchSnapshot();
});

it('should have a div', () => {
  expect(myComponent.find('div').length).toEqual(4);
});

it('should have a p', () => {
  expect(myComponent.find('p').length).toEqual(1);
});

it('should have a hr', () => {
  expect(myComponent.find('hr').length).toEqual(1);
});

it('should have a header', () => {
  expect(myComponent.find('header').length).toEqual(1);
});

it('should have a h2 with text settings', () => {
  expect(myComponent.find('h2').text()).toEqual('Settings');
});

it('should have a h4 with text Turn On All Notifications', () => {
  expect(myComponent.find('h4').text()).toEqual('Turn On All Notifications');
});

describe('OPT_IN Action Type', () => {
  it('should handle an action type of OPT_IN_SUCCESS', () => {
    const payload = {
      message: 'successfully opted in to notification',
      success: true,
      emailNotification: true
    };
    const action = {
      type: 'OPT_IN_SUCCESS',
      payload
    };
    const newState = NotificationReducer({}, action);

    expect(newState).toEqual({
      emailNotification: action.payload.emailNotification,
      success: action.payload.success,
      message: action.payload.message
    });
  });
});

describe('NOTIFICATION_STATUS Action Type', () => {
  it('should handle an action type of NOTIFICATION_STATUS_SUCCESS', () => {
    const payload = {
      message: 'successfully fetch notification status',
      success: true,
      user: {
        emailNotification: true
      }
    };
    const action = {
      type: 'NOTIFICATION_STATUS_SUCCESS',
      payload
    };
    const newState = NotificationReducer({}, action);

    expect(newState).toEqual({
      emailNotification: action.payload.user.emailNotification,
      success: action.payload.success,
      message: action.payload.message
    });
  });
});

describe('OPT_OUT Action Type', () => {
  it('should handle an action type of OPT_OUT_SUCCESS', () => {
    const payload = {
      message: 'successfully opted out of notification',
      success: true,
      emailNotification: false
    };
    const action = {
      type: 'OPT_OUT_SUCCESS',
      payload
    };
    const newState = NotificationReducer({}, action);

    expect(newState).toEqual({
      emailNotification: action.payload.emailNotification,
      success: action.payload.success,
      message: action.payload.message
    });
  });
});
