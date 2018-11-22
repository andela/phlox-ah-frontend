import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Sidebar from './Sidebar';
import { asyncActions } from '../BasePath';
import { ALL_TAGS } from '../../actionTypes';

const mockStore = configureMockStore([thunk]);
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
let myComponent;

describe('<Sidebar/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a sidebar-tag-container class', () => {
    expect(myComponent.find('.sidebar-tag-container').exists()).toBe(true);
  });
  it('should have an h6 header', () => {
    expect(myComponent.find('h6 b').exists()).toBe(true);
  });
  it('should have function showSidebarArticles', () => {
    expect(myComponent.instance().showSidebarArticles).toBeDefined();
  });
  it('should have function showTags', () => {
    expect(myComponent.instance().showTags).toBeDefined();
  });
  it('should have error state as true', () => {
    expect(myComponent.instance().state.error).toBe(true);
  });
  it('should have limit state as 10', () => {
    expect(myComponent.instance().state.limit).toEqual(10);
  });
  it('should have tags state as empty array', () => {
    expect(myComponent.instance().state.tags).toEqual([]);
  });
  it('should have error props', () => {
    expect(myComponent.instance().props.error).toEqual(true);
  });
  it('should get all tags', () => {
    const payload = {
      tags: [],
      message: ''
    };
    const expectedAction = {
      type: 'ALL_TAGS_SUCCESS',
      payload
    };
    expect(asyncActions(ALL_TAGS).success(payload)).toEqual(expectedAction);
  });
});
