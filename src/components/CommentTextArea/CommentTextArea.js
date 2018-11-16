import React from 'react';
import PropTypes from 'prop-types';
import './CommentTextArea.scss';

const CommentTextArea = ({ handleChange, value }) => (
    <div className="comment-box">
    <textarea name="comment" value={value} onChange={handleChange} rows="10" placeholder="Comment here..."></textarea>
    </div>
);

CommentTextArea.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string
};

export default CommentTextArea;
