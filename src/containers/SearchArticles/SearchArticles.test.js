import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import SearchArticles from './SearchArticles';
import { articleStore } from './mockStore';
import { SEARCH_ARTICLES } from '../../actionTypes';
import { asyncActions } from '../BasePath';


const mockStore = configureMockStore([thunk]);
const store = mockStore(articleStore);

const props = {
  location: {
    search: ''
  }
};

let component;
let myComponent;

describe('<SearchArticles/>', () => {
  test('renders the ArticlePage Container', () => {
    component = shallow(
      <Provider store={store}>
        <SearchArticles { ...props } />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
    expect(component.exists()).toBe(true);
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a main container', () => {
    expect(myComponent.find('.site-container').exists()).toBe(true);
  });
  it('should have a search input', () => {
    expect(myComponent.find('.searchInput').exists()).toBe(true);
  });
  it('should have a filter row', () => {
    expect(myComponent.find('.filter-row').exists()).toBe(true);
  });
  it('should have an input with class name active', () => {
    expect(myComponent.find('input.active').exists()).toBe(true);
  });
  it('should have function that displays the search results', () => {
    expect(myComponent.instance().showSearchedArticles).toBeDefined();
  });
  it('should have function that changes the search filter', () => {
    expect(myComponent.instance().swithSearchBy).toBeDefined();
  });
  it('should have a function  that handles input change event', () => {
    expect(myComponent.instance().change).toBeDefined();
  });
  it('should have articles state as array', () => {
    expect(myComponent.instance().state.searchBy).toBeDefined();
  });
  it('should create an action to search for articles', () => {
    const payload = true;
    const expectedAction = {
      type: 'SEARCH_ARTICLES_SUCCESS',
      payload
    };
    expect(asyncActions(SEARCH_ARTICLES).success(payload)).toEqual(expectedAction);
  });
});
