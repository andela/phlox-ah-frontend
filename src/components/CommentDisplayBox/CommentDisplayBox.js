import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from 'react-avatar';
import './CommentDisplayBox.scss';

const CommentDisplayBox = ({ comment }) => (
  <div className="comment-display">
    <div className="author-details">
      <div className="author-image">
        {
          comment.User.Profile.profileImage ? <img className="profileImage" src={comment.User.Profile.profileImage} />
            : <Avatar name={comment.User.username} size="50" round={true} />
        }
      </div>
      <div className="more-details">
        <span className="author-name">{comment.User.Profile.firstName} {comment.User.Profile.lastName}</span>
        <span className="date">{moment(comment.createdAt).format('ll')}</span>
      </div>
    </div>

    <p className="comment-content">{comment.comment}</p>

    <div className="comment-like">
      <span className="likes">
        <i className="fas fa-thumbs-up"></i>
        <span className="likes-count">10</span>
      </span>
      <span className="likes">
        <i className="fas fa-thumbs-down"></i>
        <span className="likes-count">23</span>
      </span>
    </div>
  </div>
);

CommentDisplayBox.propTypes = {
  comment: PropTypes.object
};

export default CommentDisplayBox;
