
import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Input } from './Input';

const props = {
  onChange: jest.fn(),
  className: 'class-name',
  type: 'text',
  name: 'input',
  id: 'id',
  value: 'value',
  label: 'label',
  required: true,
  hasError: true,
  labelClassName: 'labelClassName'
};

let component;


describe('<Input/>', () => {
  beforeEach(() => {
    component = shallow(
        <Input {...props} />
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a div tag with class row', () => {
    expect(component.find('div.row').exists()).toBe(true);
  });
  it('should have a div.input-field tag', () => {
    expect(component.find('div.input-field').exists()).toBe(true);
  });
  it('should have a input tag', () => {
    expect(component.find('input').exists()).toBe(true);
  });
  it('should have a label tag', () => {
    expect(component.find('label').exists()).toBe(true);
  });
});
