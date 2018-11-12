import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
import { Row, Col } from 'react-materialize';

import './ArticleForm.scss';

const ArticleForm = ({
  componentState,
  getAlertMessage,
  onPublishArticle,
  onInputChange,
  onImageChange,
  handleEditorChange
}) => (
    <Col m={8} className="container-fluid">
      <div className="main-content">
      <Row>
        <Col m={8} className="flex">
          <div className="author-photo"></div>
          <div className="author-name">
            <div>Victor victor</div>
            <div className="pub-date">Sept 26, 2018</div>
            {componentState.alertVisible
              && <p className="status">
                {getAlertMessage}
              </p>
            }
          </div>
        </Col>
        <Col className="publish-btn-wrapper" m={4}>
          <button onClick={onPublishArticle}>Publish</button>
        </Col>
      </Row>

      <Row>
        <Col m={7}>
            <div className="title-input">
              <input type="text" className="title-size" placeholder="Title" id="title" value={componentState.title} onChange={onInputChange} />
          </div>
        </Col>
        <Col m={5}>
          <label className="article-img-upload">
            <p className="file-name">Choose file</p>
            <label htmlFor="file-input" className="browse-btn">Browse</label>
            <input id="image" type="file" className="file-input" onChange={onImageChange} />
          </label>
        </Col>
      </Row>

      <div>
        <input type="text"
          placeholder="Description"
          value={componentState.description}
          id="description" onChange={onInputChange} />
      </div>

      <div className="text-area">
        <Editor
          className="editable"
          data-placeholder="Tell your story here..."
          text={componentState.body}
          onChange={handleEditorChange}
          options={{ toolbar: true }}
          required
        />
      </div>
    </div>
  </Col>
);


ArticleForm.propTypes = {
  componentState: PropTypes.object,
  handleEditorChange: PropTypes.func,
  onImageChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onPublishArticle: PropTypes.func,
  getAlertMessage: PropTypes.string,
};

export default ArticleForm;
