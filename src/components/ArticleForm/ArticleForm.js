import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Editor from 'react-medium-editor';
import { Row, Col } from 'react-materialize';

import './ArticleForm.scss';

const currentDate = moment(new Date()).format('ll');

const ArticleForm = ({
  getAlertMessage,
  componentState,
  handleEditorChange,
  handleInputChange,
  handleImageChange,
  handlePublishArticle,
  authorName
}) => (
    <Col m={9} className="container-fluid">
      <div className="main-content">
      <Row>
        <Col m={8} className="flex">
          <div className="author-photo"></div>
          <div className="author-name">
            <div>{authorName}</div>
            <div className="pub-date">{currentDate}</div>
            {componentState.alertVisible
              && <span className="status">
                {getAlertMessage}
              </span>
            }
          </div>
        </Col>
        <Col className="publish-btn-wrapper" m={4}>
          <button onClick={handlePublishArticle}>Publish</button>
        </Col>
      </Row>

      <Row>
        <Col m={8}>
            <div className="title-input">
              <input
                type="text"
                className="title-size"
                placeholder="Title"
                id="title"
                value={componentState.title}
                onChange={handleInputChange}
              />
          </div>
        </Col>
        <Col m={4}>
          <label className="article-img-upload">
              <p className="file-name">{componentState.imageName || 'Choose file'}</p>
            <label htmlFor="file-input" className="browse-btn">Browse</label>
            <input id="image" type="file" className="file-input" onChange={handleImageChange} />
          </label>
        </Col>
      </Row>

      <div>
        <input type="text"
          placeholder="Description"
          value={componentState.description}
          id="description" onChange={handleInputChange} />
      </div>

      <div className="text-area">
        <Editor
          className="editable"
          data-placeholder={componentState.isCreated ? '' : 'Tell your story here...'}
          text={componentState.body}
          onChange={handleEditorChange}
          options={{
            toolbar:
            { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'h4', 'quote'] }
          }}
          required
        />
      </div>
    </div>
  </Col>
);


ArticleForm.propTypes = {
  componentState: PropTypes.object,
  getAlertMessage: PropTypes.string,
  authorName: PropTypes.string,
  handleEditorChange: PropTypes.func,
  handleImageChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  handlePublishArticle: PropTypes.func
};

export default ArticleForm;
