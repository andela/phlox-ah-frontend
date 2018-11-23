import React from 'react';
import { mount } from 'enzyme';
import CommentTextArea from './CommentTextArea';

let component;

beforeEach(() => {
  component = mount(<CommentTextArea handleChange={() => { }} value={'This is article comment'} />);
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

it('should have a div with a className of comment-box', () => {
  expect(component.find('div').hasClass('comment-box'));
});

it('should have a textarea', () => {
  expect(component.find('textarea').length).toEqual(1);
});

it('should have a props of handleChange that is a function', () => {
  expect(typeof component.props().handleChange).toBe('function');
});

it('should have a props of value that is a string', () => {
  expect(typeof component.props().value).toBe('string');
});

it('should have a props of value', () => {
  expect(component.props().value).toEqual('This is article comment');
});
