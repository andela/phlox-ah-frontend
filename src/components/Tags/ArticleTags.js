import PropTypes from 'prop-types';
import React from 'react';
import './ArticleTags.scss';

const ArticleTags = (props) => {
  const tags = props.tags.map(
    (tag, index) => <span key={tag.name} className="tag">{tag.name}</span>
  );
  return (
    <div className="col l8 s12 tag-div">
      <span><h6 className="bold">Tags: {tags}</h6></span>
    </div>
  );
};

ArticleTags.propTypes = {
  tags: PropTypes.array,
};
export default ArticleTags;
