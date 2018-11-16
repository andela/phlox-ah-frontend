import React from 'react';

import './Reply.scss';

const Reply = () => (
  <div className="reply-box-display">
    <span className="view-replies">
      <i className="fas fa-caret-down fa-lg"></i>
      <span>Replies</span>
    </span>
    <div className="reply-display">
      <div className="author-details">
        <div className="author-image"></div>
        <div className="more-details">
          <span className="author-name">Nnaji Nelson</span>
          <span className="date">Oct 17, 2017</span>
        </div>
      </div>
      <p className="comment-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perferendis
        at sit eum ducimus minus, fuga quasi voluptates adipisci aliquam rerum repellat,
        rem a quia itaque distinctio illo ex asperiores. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Similique perferendis at sit eum ducimus minus, fuga
        quasi voluptates adipisci aliquam rerum repellat, rem a
        quia itaque distinctio illo ex asperiores.
      </p>
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
  </div>
);

export default Reply;
