import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ViewArticle from './ViewArticle';
import { articleStore } from './mockStore';
import { asyncActions } from '../BasePath';
import { RATE_ARTICLE, GET_ALL_COMMENT, CREATE_COMMENT } from '../../actionTypes';
import CommentReducer from '../../reducers/CommentReducer';

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
