import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import VerifyUser from './VerifyUser';

const mockStore = configureMockStore();
const store = mockStore({ VerifyUser: { loading: true, success: false } });

let component;

describe('<VerifyUser/>', () => {
  test('renders the Verify User Container', () => {
    component = shallow(
      <Provider store={store}>
        <VerifyUser match={{ params: { verificationToken: '' } }} />
      </Provider>
    );
    expect(component.exists()).toBe(true);
  });
});
