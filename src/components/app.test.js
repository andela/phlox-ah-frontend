import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

test('<App/>', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();// eslint-disable-line 
});
