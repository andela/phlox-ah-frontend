import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const Button = props => (
  <div className="row">
    <button
      className={`btn waves-effect waves-light form-button ${props.buttonClassName}`}
      type={props.type || 'button'}>
      {props.name}
    </button>
  </div>
);


Button.propTypes = {
  buttonClassName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string
};
