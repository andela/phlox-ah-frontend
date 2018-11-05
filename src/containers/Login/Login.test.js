import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Login from './Login';
import { asyncActions, USER } from './BasePath';

const mockStore = configureMockStore();
const store = mockStore({});

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
    expect(component).toMatchSnapshot();// eslint-disable-line 
  });
  it('should have a form tag with class col', () => {
    expect(myComponent.find('form').hasClass('col')).toBe(true)// eslint-disable-line 
  });
  it('should have a login button', () => {
    expect(myComponent.find('Button#login-button').exists()).toBe(true)// eslint-disable-line 
  });
  it('should have a input field', () => {
    expect(myComponent.find('Input').exists()).toBe(true)// eslint-disable-line 
  });
  it('should create an action to set user object on the store', () => {
    const payload = {
      username: 'dimeji',
      email: 'dimeji@email.com',
    };
    const expectedAction = {
      type: 'USER_SUCCESS',
      payload
    };
    expect(asyncActions(USER).success(payload)).toEqual(expectedAction);// eslint-disable-line
  });
});
