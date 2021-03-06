import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Login from './Login';
import { asyncActions, LOGIN } from '../BasePath';

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

describe('<Login/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Login />
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
  it('should have a login button', () => {
    expect(myComponent.find('Button').exists()).toBe(true);
  });
  it('should have a facebook login link', () => {
    expect(myComponent.find('i.fa-facebook-f').exists()).toBe(true);
  });
  it('should have a google login link', () => {
    expect(myComponent.find('i.fa-google-plus-g').exists()).toBe(true);
  });
  it('should have a twitter login link', () => {
    expect(myComponent.find('i.fa-twitter').exists()).toBe(true);
  });
  it('should have a input field', () => {
    expect(myComponent.find('Input').exists()).toBe(true);
  });
  it('should create an action to set user object on the store', () => {
    const payload = {
      username: 'dimeji',
      email: 'dimeji@email.com',
    };
    const expectedAction = {
      type: 'LOGIN_SUCCESS',
      payload
    };
    expect(asyncActions(LOGIN).success(payload)).toEqual(expectedAction);
  });
});
