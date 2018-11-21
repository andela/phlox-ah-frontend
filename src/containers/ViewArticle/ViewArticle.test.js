import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import { RATE_ARTICLE, GET_ALL_COMMENT, CREATE_COMMENT } from '../../actionTypes';

const mockStore = configureMockStore();
const store = mockStore(articleStore);

let component;
let myComponent;

describe('<ViewArticle/>', () => {
  test('renders the ArticlePage Container', () => {
    component = shallow(
      <Provider store={store}>
        <ViewArticle match={{ params: { articleslug: '' } }} />
      </Provider>
    );
    expect(component.exists()).toBe(true);
  });
  it('should create an action to set rating in the store', () => {
    const payload = {
      rating: 4
    };
    const expectedAction = {
      type: 'RATE_ARTICLE_SUCCESS',
      payload
    };
    expect(asyncActions(RATE_ARTICLE).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action to get all comment', () => {
    const payload = {
      articleSlug: 'title-of-article2'
    };
    const expectedAction = {
      type: 'GET_ALL_COMMENT_SUCCESS',
      payload
    };
    expect(asyncActions(GET_ALL_COMMENT).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action to create a comment', () => {
    const payload = {
      articleSlug: 'title-of-article2'
    };
    const expectedAction = {
      type: 'CREATE_COMMENT_SUCCESS',
      payload
    };
    expect(asyncActions(CREATE_COMMENT).success(payload)).toEqual(expectedAction);
  });
});
