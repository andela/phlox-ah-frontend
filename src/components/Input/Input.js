import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export const Input = (props) => {
  const className = `form-input ${props.inputClassName || ''}`;
  return (
    <div className="row">
      <div className={`input-field col s${props.s}`}>
        <input
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type || 'text' }
          className={props.hasError ? `${className} input-error` : className }
          required={props.required || false}
        />
        <label
          className={`form-label ${props.labelClassName || ''}`}
          htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    </div>
  );
};


Input.propTypes = {
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  s: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  hasError: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};
