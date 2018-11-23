import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Settings from './Settings';

const mockStore = configureMockStore();
const store = mockStore({
  info: {
    message: ['password is required'],
    success: false
  },
  user: {
    loading: false,
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
