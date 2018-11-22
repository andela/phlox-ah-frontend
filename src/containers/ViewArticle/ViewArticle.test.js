import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import {
  RATE_ARTICLE, GET_ALL_COMMENT, CREATE_COMMENT, LIKE_ARTICLE, DISLIKE_ARTICLE
} from '../../actionTypes';

const mockStore = configureMockStore([thunk]);
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
    myComponent = component.dive({ context: { store } }).dive();
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

  it('should create an action to like an article', () => {
    const payload = true;
    const expectedAction = {
      type: 'LIKE_ARTICLE_SUCCESS',
      payload
    };
    expect(asyncActions(LIKE_ARTICLE).success(payload)).toEqual(expectedAction);
  });

  it('should create an action to dislike an article', () => {
    const payload = true;
    const expectedAction = {
      type: 'DISLIKE_ARTICLE_SUCCESS',
      payload
    };
    expect(asyncActions(DISLIKE_ARTICLE).success(payload)).toEqual(expectedAction);
  });

  it('should have a like button', () => {
    expect(myComponent.find('i.fa-thumbs-up').exists()).toBe(true);
  });

  it('should have a dislike button', () => {
    expect(myComponent.find('i.fa-thumbs-down').exists()).toBe(true);
  });
});
