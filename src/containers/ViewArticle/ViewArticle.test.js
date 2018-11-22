import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import { RATE_ARTICLE, GET_ALL_COMMENT, CREATE_COMMENT } from '../../actionTypes';

const mockStore = configureMockStore([thunk]);
const store = mockStore(articleStore);

let component;
let myComponent;

describe('<ViewArticle/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewArticle match={{ params: { articleslug: '' } }} />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should have a follow button', () => {
    expect(myComponent.find('button.followButton').exists()).toBe(true);
  });
  it('should have a star rating', () => {
    expect(myComponent.find('StarRatings').exists()).toBe(true);
  });
  it('should have an edit button', () => {
    expect(myComponent.find('button.editButton').exists()).toBe(true);
  });
  it('should have a thumbs-up button', () => {
    expect(myComponent.find('i.fa-thumbs-up').exists()).toBe(true);
  });
  it('should have a thumbs-down button', () => {
    expect(myComponent.find('i.fa-thumbs-down').exists()).toBe(true);
  });
  it('should have a bookmark button', () => {
    expect(myComponent.find('i.fa-bookmark').exists()).toBe(true);
  });
  it('should have a share button', () => {
    expect(myComponent.find('i.fa-share-alt').exists()).toBe(true);
  });
  it('should have a report article link', () => {
    expect(myComponent.find('a.red-text').exists()).toBe(true);
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
