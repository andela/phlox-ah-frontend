import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewAllArticles from './ViewAllArticles';
import { articleStore } from './mockStore';

const mockStore = configureMockStore([thunk]);
const store = mockStore(articleStore);

const props = {
  location: {
    search: ''
  }
};

let component;
let myComponent;

describe('<ViewAllArticles/>', () => {
  test('renders the ArticlePage Container', () => {
    component = shallow(
      <Provider store={store}>
        <ViewAllArticles { ...props } />
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
  it('should have a sidebar', () => {
    expect(myComponent.find('.sidebar').exists()).toBe(true);
  });
  it('should have function showAllArticles', () => {
    expect(myComponent.instance().showAllArticles).toBeDefined();
  });
  it('should have getArticles prop function', () => {
    expect(myComponent.instance().props.getArticles).toBeDefined();
  });
  it('should have articles state as array', () => {
    expect(myComponent.instance().state.articles).toMatchObject(articleStore.article.articles);
  });
});
