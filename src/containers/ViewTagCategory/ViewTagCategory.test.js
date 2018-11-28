import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewTagCategory from './ViewTagCategory';
import TagReducer from '../../reducers/TagReducer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  success: true,
  article: {
    articles: []
  },
  tags: {
    tag: { articles: [{ title: 'first title' }] }
  },
  category: {
    categoryArticle: []
  },
  getOneTag: jest.fn()

});

let component;
let myComponent;

const props = {
  match: {
    url: '/tags/sports',
    params: {
      name: ''
    }
  }
};

describe('<ViewTagCategory/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewTagCategory {...props}/>
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a site-container class', () => {
    expect(myComponent.find('.site-container').exists()).toBe(true);
  });
  it('should have a sidebar class', () => {
    expect(myComponent.find('.sidebar').exists()).toBe(true);
  });
  it('should have a h5', () => {
    expect(myComponent.find('h5.center').exists()).toBe(true);
  });
  it('should have function showTagArticles', () => {
    expect(myComponent.instance().showTagArticles).toBeDefined();
  });
  it('should have function getTag', () => {
    expect(myComponent.instance().getTag).toBeDefined();
  });
  it('should have tag state as object', () => {
    expect(myComponent.instance().state.tag).toMatchObject({});
  });
  it('should have tagName state as string', () => {
    expect(myComponent.instance().state.tagName).toEqual('');
  });
  it('should have articles props', () => {
    expect(myComponent.instance().props.match.url).toEqual('/tags/sports');
  });
  it('should dispatch an action to get all tags', () => {
    const payload = {
      tags: [],
      message: 'Tags retrieved successfullys',
    };
    const action = {
      type: 'ALL_TAGS_SUCCESS',
      payload
    };
    const newState = TagReducer({}, action);
    expect(newState).toEqual({
      tags: payload.tags,
      message: payload.message,
    });
  });
});
