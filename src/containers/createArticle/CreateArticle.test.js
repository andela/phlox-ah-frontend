import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CreateArticle from './CreateArticle';
import {
  article, categories, tags
} from '../../util/articleMockData';

const mockStore = configureMockStore();
const store = mockStore({
  article: {
    article,
    message: 'article created successfully',
    tags,
    loading: false,
    error: true
  },
  category: { categories },
  tags: { tags }
});
let component;

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
