import React from 'react';
import { mount } from 'enzyme';
import CommentButton from './CommentButton';

let component;

beforeEach(() => {
  component = mount(<CommentButton addComment={() => { }}/>);
});

afterEach(() => {
  component.unmount();
});

it('should render without throwing an error', () => {
  expect(component).toMatchSnapshot();
});

it('should have a div', () => {
  expect(component.find('div').length).toEqual(1);
});

it('should have a div with a className of comment-button', () => {
  expect(component.find('div').hasClass('comment-button'));
});

it('should have a button', () => {
  expect(component.find('button').length).toEqual(1);
});

it('should have a button with text Comment', () => {
  expect(component.find('button').text()).toEqual('Comment');
});

it('should have a props of addComment that is a function', () => {
  expect(typeof component.props().addComment).toBe('function');
});
