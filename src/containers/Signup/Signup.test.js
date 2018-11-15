import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Signup from './Signup';

const mockStore = configureMockStore();
const store = mockStore({
  signup: {
    loading: true,
    success: false,
    failure: false,
    errors: []
  }
});

let component;
let myComponent;

describe('<Signup/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Signup />
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
  it('should have a signup button', () => {
    expect(myComponent.find('Button').exists()).toBe(true);
  });
  it('should have a input field', () => {
    expect(myComponent.find('Input').exists()).toBe(true);
  });
});
