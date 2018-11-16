/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description - This function returns a list of follower
 * @param {*} props
 * @returns {list} follower list
 */
export default function FollowList(props) {
  return (
    <li className="author">
    <Link to="#">
      <div className="photo"></div>
      <div className="name">
        {props.children}
      </div>
    </Link>
  </li>
  );
}
