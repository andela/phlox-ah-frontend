import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ResetPassword from './ResetPassword';

const mockStore = configureMockStore();
const store = mockStore({
  info: {
    message: ['password is required'],
    success: false
  }
});

let component;
let myComponent;

const props = {
  match: {
    url: '/password/reset/14e84f777aebe9055d4b43682346561d',
  }
};

describe('<ResetPassword/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ResetPassword {...props} />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a form tag with class col', () => {
    expect(myComponent.find('form').exists()).toBe(true);
  });
  it('should have a forgot password button', () => {
    expect(myComponent.find('Button').exists()).toBe(true);
  });
});
