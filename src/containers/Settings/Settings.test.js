import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Settings from './Settings';

const mockStore = configureMockStore();
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
  expect(component).toMatchSnapshot();
});
