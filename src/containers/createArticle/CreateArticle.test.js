import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CreateArticle from './CreateArticle';

const mockStore = configureMockStore();
const article = [{
  body: '<p>Writing can be better</p>',
  categoryId: 2,
  createdAt: '2018-11-09T08:05:04.173Z',
  description: 'writing skill',
  id: 59,
  imgUrl: '',
  ratingAverage: 0,
  readTime: 1,
  slug: 'writing-skill-b271c674-c842-4306-93ac-7597aa69824e',
  status: 'draft',
  title: 'writing skill',
  updatedAt: '2018-11-09T08:05:04.173Z',
  userId: 1
}];
const suggestedTags = [{
  ArticlesTags:
  {
    articleId: 59, tagId: 2, createdAt: '2018-11-09T08:05:04.183Z', updatedAt: '2018-11-09T08:05:04.183Z'
  },
  id: 2,
  name: 'sports'
}];
const categories = [{
  category: 'religion',
  createdAt: '2018-11-07T09:44:42.002Z',
  id: 1,
  updatedAt: '2018-11-07T09:44:42.002Z'
}];
const tags = [{
  createdAt: '2018-11-07T09:39:44.428Z',
  id: 1,
  name: 'five',
  updatedAt: '2018-11-07T09:39:44.428Z'
}];

const store = mockStore({
  Article: {
    article,
    message: 'article created successfully',
    tags,
    loading: false,
    error: true
  },
  Category: {
    categories,
  },
  Tags: {
    tags,
  }
});
let component;
let myComponent;

describe('<CreateArticle />', () => {
  beforeEach(() => {
    /* eslint-disable no-undef */
    const mockFunc = jest.fn();
    component = shallow(
      <CreateArticle
        store={store}
        createArticle={mockFunc}
        updateArticle={mockFunc}
        publishArticle={mockFunc}
        getAllCategory={mockFunc}
     />
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
});
