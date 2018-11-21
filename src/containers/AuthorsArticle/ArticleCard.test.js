
import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ArticleCard from './ArticleCard';

const mockStore = configureMockStore([thunk]);

const props = {
  placeholderImg: 'https://via.placeholder.com/300?text=AuthorsHaven',
  article: {
    title: 'title',
    slug: 'title',
    status: 'title',
    description: 'title',
    imgUrl: 'https://via.placeholder.com/300?text=AuthorsHaven',
    body: 'body',
    description: 'description'
  },
  deleteArticle: jest.fn()
};

const store = mockStore({
  ...props
});

let component;
let myComponent;

describe('<ArticleCard />', () => {
  beforeEach(() => {
    component = shallow(
      <ArticleCard {...props} />
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have img tag', () => {
    expect(component.find('img').exists()).toBe(true);
  });
  it('should have div.title tag', () => {
    expect(component.find('div.title').exists()).toBe(true);
  });
  it('should have li.article tag', () => {
    expect(component.find('li.article').exists()).toBe(true);
  });
  it('should have div.photo tag', () => {
    expect(component.find('div.photo').exists()).toBe(true);
  });
  it('should have div.footer tag', () => {
    expect(component.find('div.footer').exists()).toBe(true);
  });
  it('should have span.edit tag', () => {
    expect(component.find('span.edit').exists()).toBe(true);
  });
  it('should have span.view tag', () => {
    expect(component.find('span.view').exists()).toBe(true);
  });
  it('should have span.share tag', () => {
    expect(component.find('span.share').exists()).toBe(true);
  });
  it('should have span.delete tag', () => {
    expect(component.find('span.delete').exists()).toBe(true);
  });
  it('should have Link tag', () => {
    expect(component.find('Link').exists()).toBe(true);
  });
  it('should have i.fas tag', () => {
    expect(component.find('i.fas').exists()).toBe(true);
  });
});
