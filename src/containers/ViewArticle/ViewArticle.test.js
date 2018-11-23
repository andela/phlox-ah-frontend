import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import {
  RATE_ARTICLE, GET_ALL_COMMENT, CREATE_COMMENT, LIKE_ARTICLE, DISLIKE_ARTICLE, ALL_BOOKMARK, NEW_BOOKMARK
} from '../../actionTypes';
import CommentReducer from '../../reducers/CommentReducer';
import BookmarkReducer from '../../reducers/BookmarkReducer';

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

  it('should create an action to get bookmarks', () => {
    const payload = true;
    const expectedAction = {
      type: 'ALL_BOOKMARK_SUCCESS',
      payload
    };
    expect(asyncActions(ALL_BOOKMARK).success(payload)).toEqual(expectedAction);
  });

  it('should create a new bookmark', () => {
    const payload = true;
    const expectedAction = {
      type: 'NEW_BOOKMARK_SUCCESS',
      payload
    };
    expect(asyncActions(NEW_BOOKMARK).success(payload)).toEqual(expectedAction);
  });

  it('should have a like button', () => {
    expect(myComponent.find('i.fa-thumbs-up').exists()).toBe(true);
  });

  it('should have a dislike button', () => {
    expect(myComponent.find('i.fa-thumbs-down').exists()).toBe(true);
  });

  it('should have a bookmark button', () => {
    expect(myComponent.find('i.fa-bookmark').exists()).toBe(true);
  });
  it('should have function showBookmarkIcon', () => {
    expect(myComponent.instance().showBookmarkIcon).toBeDefined();
  });
  it('should have function bookmark', () => {
    expect(myComponent.instance().bookmark).toBeDefined();
  });
  it('should have bookmarks state as array', () => {
    expect(myComponent.instance().state.bookmarks).toEqual([]);
  });

  describe('GET_ALL_COMMENT Action Type', () => {
    it('should handle an action type of GET_ALL_COMMENT_SUCCESS', () => {
      const payload = {
        comments: [],
        message: 'Comments fetched successfully',
        success: true
      };
      const action = {
        type: 'GET_ALL_COMMENT_SUCCESS',
        payload
      };
      const newState = CommentReducer({}, action);

      expect(newState).toEqual({
        comment: payload.comments,
        message: payload.message,
        success: payload.success
      });
    });
  });
  describe('CREATE_COMMENT Action Type', () => {
    it('should handle an action type of CREATE_COMMENT SUCCESS', () => {
      const payload = {
        comments: {},
        message: 'Comment added successfully',
        success: true
      };
      const action = {
        type: 'CREATE_COMMENT_SUCCESS',
        payload
      };
      const newState = CommentReducer({}, action);

      expect(newState).toEqual({
        comment: payload.comments,
        message: payload.message,
        success: payload.success
      });
    });
  });
});
