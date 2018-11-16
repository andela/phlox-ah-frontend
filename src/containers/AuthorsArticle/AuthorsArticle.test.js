import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AuthorsArticle from './AuthorsArticle';

const mockStore = configureMockStore();
const store = mockStore({
  profile: {
    firstName: 'john',
    lastName: 'doe'
  },
  myArticle: {
    articles: [
      {
        title: 'title',
        body: 'body',
        description: 'description'
      }
    ]
  },
  /* eslint-disable no-undef */
  getMyArticles: jest.fn()
});

let component;
let myComponent;

describe('<AuthorsArticle />', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <AuthorsArticle />
      </Provider>
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
});
