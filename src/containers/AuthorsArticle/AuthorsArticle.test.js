import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AuthorsArticle from './AuthorsArticle';

const mockStore = configureMockStore([thunk]);
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
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have parent div', () => {
    expect(myComponent.find('div.authors-article').exists()).toBe(true);
  });
  it('should have showDeleteModal of false', () => {
    expect(myComponent.instance().state.showDeleteModal).toBe(false);
  });
  it('should have articleslug of null', () => {
    expect(myComponent.instance().state.articleslug).toBeNull();
  });
  it('should have hideDeleteModal function', () => {
    expect(myComponent.instance().hideDeleteModal).toBeDefined();
  });
  it('should have renderArticles function', () => {
    expect(myComponent.instance().renderArticles).toBeDefined();
  });
  it('should have deleteArticle function', () => {
    expect(myComponent.instance().deleteArticle).toBeDefined();
  });
  it('should have articles array', () => {
    expect(Array.isArray(myComponent.instance().props.articles)).toBe(true);
  });
  it('should have getMyArticles function', () => {
    expect(myComponent.instance().props.getMyArticles).toBeDefined();
  });
});
