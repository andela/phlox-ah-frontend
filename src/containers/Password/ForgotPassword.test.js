import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ForgotPassword from './ForgotPassword';

const mockStore = configureMockStore();
const store = mockStore({});

let component;
let myComponent;

describe('<ForgotPassword/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a form tag with class col', () => {
    expect(myComponent.find('form').hasClass('col')).toBe(true);
  });
  it('should have a forgot password button', () => {
    expect(myComponent.find('Button.forgot-button').exists()).toBe(true);
  });
});
