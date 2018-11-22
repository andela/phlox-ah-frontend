import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Button } from './Button';

const props = {
  onClick: jest.fn(),
  buttonClassName: 'class-name',
  type: 'button',
  name: 'button'
};

let component;


describe('<Button/>', () => {
  beforeEach(() => {
    component = shallow(
        <Button {...props} />
    );
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a div tag with class row', () => {
    expect(component.find('div.row').exists()).toBe(true);
  });
  it('should have a button tag', () => {
    expect(component.find('button').exists()).toBe(true);
  });
});
