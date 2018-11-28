import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import {
  RATE_ARTICLE, LIKE_ARTICLE, DISLIKE_ARTICLE, ALL_BOOKMARK, NEW_BOOKMARK
} from '../../actionTypes';
import CommentReducer from '../../reducers/CommentReducer';
import BookmarkReducer from '../../reducers/BookmarkReducer';
import ReportArticleReducer from '../../reducers/ReportArticleReducer';

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
    expect(myComponent.find('span.red-text').exists()).toBe(true);
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

  describe('REPORT_ARTICLE Action Type', () => {
    it('should handle an action type of REPORT_ARTICLE_SUCCESS', () => {
      const payload = {
        report: {},
        message: 'Report added successfully',
        success: true,
        loading: false
      };
      const action = {
        type: 'REPORT_ARTICLE_SUCCESS',
        payload
      };
      const newState = ReportArticleReducer({}, action);

      expect(newState).toEqual({
        report: payload.report,
        message: payload.message,
        success: payload.success,
      });
    });
    it('should handle an action type of REPORT_ARTICLE_FAILING', () => {
      const payload = {
        report: {},
        message: 'Report could not be added',
        success: false,
        loading: false,
        error: true
      };
      const action = {
        type: 'REPORT_ARTICLE_FAILING',
        payload
      };
      const newState = ReportArticleReducer({}, action);

      expect(newState).toEqual({
        error: undefined,
        message: {
          report: payload.report,
          message: payload.message,
          error: payload.error,
          success: payload.success,
          loading: payload.loading
        }
      });
    });
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
