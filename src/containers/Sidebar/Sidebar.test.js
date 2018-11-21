import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Sidebar from './Sidebar';

const mockStore = configureMockStore();
const store = mockStore({
  info: {
    message: ['password is required'],
    success: false
  },
  tags: {
    error: true,
    tags: [],
    article: {
      articles: {
        title: ''
      }
    }
  },
  article: {
    articles: []
  },
  getArticles: jest.fn()

});

let component;

const props = {
  match: {
    url: '/tags/sports',
  },

};

describe('<Sidebar/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Sidebar {...props} />
      </Provider>
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
});