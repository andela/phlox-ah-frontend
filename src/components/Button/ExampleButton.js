import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const Button = props => {
  return (
  <div>
    <button>{ props.text }</button>
  </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
