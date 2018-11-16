/* eslint-disable react/prop-types */
import React from 'react';

/**
 * @description - This function returns a list of tags
 * @param {*} props
 * @returns {list} tag list
 */
export default function Tags(props) {
  return (
    <li className="tag">
      <span className="tag-name">
        {props.children}
      </span>
      <span className="remove-tag">
        <i className="fas fa-times"></i>
      </span>
    </li>
  );
}
