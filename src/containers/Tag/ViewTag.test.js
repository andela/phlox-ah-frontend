import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ViewTag from './ViewTag';

const mockStore = configureMockStore();
const store = mockStore({
  info: {
    message: ['password is required'],
    success: false
  },
  article: {
    articles: []
  },
  tags: {
    tag: {}
  },
  getOneTag: jest.fn()// eslint-disable-line

});

let component;

const props = {
  match: {
    url: '/tags/sports',
    params: {
      name: ''
    }
  }
};

describe('<ViewTag/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewTag {...props}/>
      </Provider>
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
});
