import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Home from './Home';
import { getFeaturedArticles, getPopularArticles } from '../../requests/ArticleRequests';
import { getAllCategory } from '../../requests/CategoryRequests';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  success: true,
  article: {
    articles: [],
    featuredArticles: [],
    popularArticles: []
  },
  category: {
    categories: []
  },
  featuredArticles: [],
  popularArticles: [],
  trendingArticles: [],
  getArticles: jest.fn(),
  getFeaturedArticles: jest.fn(),
  getPopularArticles: jest.fn(),
  getAllCategory: jest.fn()

});

let component;
let myComponent;

describe('<Home/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a row-header class', () => {
    expect(myComponent.find('.row-header').exists()).toBe(true);
  });
  it('should have a column-1 class', () => {
    expect(myComponent.find('.column-1').exists()).toBe(true);
  });
  it('should have a sidebar class', () => {
    expect(myComponent.find('.sidebar').exists()).toBe(true);
  });
  it('should have function carousel', () => {
    expect(myComponent.instance().carousel).toBeDefined();
  });
  it('should have function popularArticles', () => {
    expect(myComponent.instance().popularArticles).toBeDefined();
  });
  it('should have function trendingArticles', () => {
    expect(myComponent.instance().trendingArticles).toBeDefined();
  });
  it('should have function showCategories', () => {
    expect(myComponent.instance().showCategories).toBeDefined();
  });
  it('should have function listArticles', () => {
    expect(myComponent.instance().listArticles).toBeDefined();
  });
  it('should have categories state as array', () => {
    expect(myComponent.instance().state.categories).toEqual([]);
  });
  it('should have featuredArticles state as array', () => {
    expect(myComponent.instance().state.featuredArticles).toEqual([]);
  });
  it('should have popularArticles state as array', () => {
    expect(myComponent.instance().state.popularArticles).toEqual([]);
  });
  it('should have trendingArticles state as array', () => {
    expect(myComponent.instance().state.trendingArticles).toEqual([]);
  });
});
