import { connect } from 'react-redux';
import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import { createArticle, updateArticle, publishArticle } from '../../requests/ArticleRequests';
import './CreateArticle.scss';

/**
 * @class CreateArticle
 * @extends {Component}
 */
class CreateArticle extends Component {
  /**
   * @description - This method runs first in the class
   * @param {object} props
   * @returns {object} articles
   * @memberof Articles
   */
  constructor(props) {
    super(props);

    this.state = {
      idleTimer: null,
      title: '',
      description: '',
      body: '',
      hasChanges: false,
      alertVisible: false,
      isCreated: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getAlertMessage = this.getAlertMessage.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.onPublishArticle = this.onPublishArticle.bind(this);
  }

  /**
    * @description - This method sets the title and description input values
    * @param {objecj} e
    * @returns {object} void
    * @memberof Article
    */
  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value, hasChanges: true, alertVisible: true });
  }

  /**
    * @description - This method sets the Editor input values
    * @param {objecj}  text
    * @returns {object} void
    * @memberof Article
    */
  handleEditorChange(text) {
    this.setState({ body: text, hasChanges: true, alertVisible: true });
  }

  /**
    * @description - This method show if the article has been save or not.
    * @returns {string} - return saved or not
    * @memberof Article
    */
  getAlertMessage() {
    if (this.state.hasChanges) {
      return 'Data has unsaved changes';
    }
    return 'Data saved successfully';
  }

  /**
    * @description - This method set and dismiss the alert message.
    * @returns {string} - return saved or not
    * @memberof Article
    */
  onPublishArticle() {
    const status = 'published';
    const { slug } = this.props.article;
    this.props.publishArticle({ slug, status });
  }

  /**
    * @description - This method create the article if changes has been made
    * @returns {string} - return saved or not
    * @memberof Article
    */
  create() {
    const {
      hasChanges, title, description, body
    } = this.state;

    if (hasChanges && title.length >= 6 && description.length >= 6 && body.length >= 6) {
      this.setState({ hasChanges: false, alertVisible: true, isCreated: true });
      this.props.createArticle({ title, description, body });
    }
  }

  /**
    * @description - This method create or update the article if changes has been made
    * @returns {string} - return created or updated article
    * @memberof Article
    */
  save() {
    if (this.state.isCreated) {
      this.update();
    } else {
      this.create();
    }
  }

  /**
    * @description - This method is used to display component state
    * @returns {string} - return created or updated article
    * @memberof Article
    */
  renderAlert() {
    if (this.props.loading) {
      return 'Saving...';
    }
    this.getAlertMessage();
  }

  /**
    * @description - This method update the article if changes has been made
    * @returns {string} - return created or updated article
    * @memberof Article
    */
  update() {
    const {
      hasChanges, title, description, body
    } = this.state;
    console.log(this.props.article);
    const articleSlug = this.props.article.slug;

    if (hasChanges && title.length >= 6 && description.length >= 6 && body.length >= 6) {
      this.setState({ hasChanges: false, alertVisible: true });
      this.props.updateArticle(
        {
          title, description, body, articleSlug
        }
      );
    }
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof CreateArticle
   */
  // eslint-disable-next-line
  render() {
    console.log(this.state);

    return (
      <IdleTimer
        ref={(ref) => { this.idleTimer = ref; }}
        timeout={3000}
        startOnMount={false}
        onIdle={this.save}>
        <div id="container">
          <h1>Author Haven</h1>
          <button onClick={this.onPublishArticle}>Publish</button>

          {
            this.state.alertVisible
            && <div>
              {this.renderAlert()}
            </div>
          }

          <div></div>
          <div>
            <label htmlFor="Title">Title</label>
            <input type="text" placeholder="Enter Title" name="title" value={this.state.title} onChange={this.onInputChange} />
          </div>

          <div>
            <label htmlFor="Description">Description</label>
            <input type="text"
          placeholder="Enter Description"
          value={this.state.description}
          name="description" onChange={this.onInputChange} />
            {/* <Editor
              // name="description"
              className="editable"
              data-placeholder="Description"
              text={this.state.description}
              onChange={this.onInputChange}
              options={{ toolbar: true }}
            /> */}
          </div>

          <div>
            <label htmlFor="Body">Body</label>
            <Editor
              name="body"
              className="editable"
              data-placeholder="Pen down your ingenious idea..."
              text={this.state.body}
              onChange={this.handleEditorChange}
              options={{ toolbar: true }}
            />
          </div>
        </div>
      </IdleTimer>
    );
  }
}

CreateArticle.propTypes = {
  article: PropTypes.object,
  // title: PropTypes.string,
  // description: PropTypes.string,
  // body: PropTypes.string,
  // hasChanges: PropTypes.bool,
  loading: PropTypes.bool,
  // idleTimer: PropTypes.any,
  createArticle: PropTypes.func,
  updateArticle: PropTypes.func,
  publishArticle: PropTypes.func
};

const mapStateToProps = ({ ArticleReducer }) => {
  const {
    article, message, tags, loading
  } = ArticleReducer;

  return {
    article, message, tags, loading
  };
};

export default connect(mapStateToProps,
  { createArticle, updateArticle, publishArticle })(CreateArticle);
