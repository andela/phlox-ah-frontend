import React from 'react';
import { mount } from 'enzyme';
import CommentDisplayBox from './CommentDisplayBox';
import comment from './mockStore';

let component;

beforeEach(() => {
  component = mount(<CommentDisplayBox comment={comment} />);
});

afterEach(() => {
  component.unmount();
});

it('should render without throwing an error', () => {
  expect(component).toMatchSnapshot();
});

it('should have a div', () => {
  expect(component.find('div').length).toEqual(8);
});

it('should have a span', () => {
  expect(component.find('span').length).toEqual(8);
});

it('should have a p', () => {
  expect(component.find('p').length).toEqual(1);
});

it('should have a i', () => {
  expect(component.find('i').length).toEqual(2);
});

it('should have a props of comment that is an object', () => {
  expect(typeof component.props().comment).toBe('object');
});

it('should have a first name and last name', () => {
  expect(component.find('.author-name').text()).toEqual('Jame Jackson');
});

it('should have a comment', () => {
  expect(component.find('.comment-content').text()).toEqual('good work');
});

it('should have a data', () => {
  expect(component.find('.date').text()).toEqual('Nov 21, 2018');
});
