import React from 'react';
import PropTypes from 'prop-types';
import './CommentButton.scss';

const CommentButton = ({ addComment }) => (
  <div className="comment-button">
    <button onClick={addComment}>Comment</button>
  </div>
);

CommentButton.propTypes = {
  addComment: PropTypes.func,
};

export default CommentButton;
