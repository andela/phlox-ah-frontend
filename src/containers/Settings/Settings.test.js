import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Settings from './Settings';
import { getUserNotificationStatus, optInForNotification, optOutFromNotification } from '../../requests/NotificationRequests';

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
