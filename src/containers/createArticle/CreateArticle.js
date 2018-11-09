import { connect } from 'react-redux';
import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
import { Row, Col, Input } from 'react-materialize';
import { WithContext as ReactTags } from 'react-tag-input';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import './CreateArticle.scss';
import '../../styles/style.scss';
import Login from '../Login/Login';
import Header from '../Header/Header';
import MsgInfo from '../MsgInfo/MsgInfo';
import { getAllTags } from '../../requests/TagRequests';
import { getAllCategory } from '../../requests/CategoryRequests';
import { TagObjectToString, convertIdToString } from '../../util/TagsHelper';
import { createArticle, updateArticle, publishArticle } from '../../requests/ArticleRequests';


/**
 * @class CreateArticle
 * @extends {Component}
 */
class CreateArticle extends Component {
  /**
   * @description - This method runs first in the class
   * @returns {object} articles
   * @memberof Articles
   */
  constructor() {
    super();

    this.state = {
      idleTimer: null,
      title: '',
      description: '',
      body: '',
      category: '',
      image: null,
      hasChanges: false,
      alertVisible: false,
      isCreated: false,
      tags: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getAlertMessage = this.getAlertMessage.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.onPublishArticle = this.onPublishArticle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  /**
    * @description - This method get runs before the component mount
    * @returns {object} void
    * @memberof Article
    */
  componentDidMount() {
    this.props.getAllCategory();
    this.props.getAllTags();
  }

  /**
    * @description - This method sets the title and description input values
    * @param {object} e
    * @returns {object} void
    * @memberof Article
    */
  onInputChange(e) {
    this.setState({ [e.target.id]: e.target.value, hasChanges: true, alertVisible: true });
  }

  /**
    * @description - This method sets the body input values
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
      return 'Saving...';
    }
    return 'Saved';
  }

  /**
    * @description - This method set the article status to published.
    * @returns {string} - return saved or not
    * @memberof Article
    */
  onPublishArticle() {
    const status = 'published';
    const { slug } = this.props.article;
    const tags = TagObjectToString(this.state.tags);
    this.props.publishArticle({ slug, status, tags });
  }

  /**
    * @description - This method create the article if changes has been made
    * @returns {string} - return saved or not
    * @memberof Article
    */
  create() {
    const {
      hasChanges, title, description, body, category, image
    } = this.state;

    const categoryId = Number(category);

    const tags = TagObjectToString(this.state.tags);

    if (hasChanges) {
      this.setState({ hasChanges: false, alertVisible: true, isCreated: true });

      this.props.createArticle({
        title, description, body, tags, categoryId
      });
    }
  }

  /**
    * @description - This method create or update the article if changes has been made
    * @returns {string} - return created or updated article
    * @memberof Article
    */
  save() {
    if (this.state.isCreated && !this.props.error) {
      this.update();
    } else {
      this.create();
    }
  }

  /**
    * @description - This method update the article if changes has been made
    * @returns {string} - return created or updated article
    * @memberof Article
    */
  update() {
    const {
      hasChanges, title, description, body, category
    } = this.state;

    const categoryId = Number(category);
    const tags = TagObjectToString(this.state.tags);
    const articleSlug = this.props.article.slug;

    if (hasChanges) {
      this.setState({ hasChanges: false, alertVisible: true });
      this.props.updateArticle(
        {
          title, description, body, articleSlug, tags, categoryId
        }
      );
    }
  }

  /**
    * @description - This method delete the Tag input values
    * @param {objecj}  i
    * @returns {object} void
    * @memberof Article
    */
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
      hasChanges: true,
      alertVisible: true
    });
  }

  /**
    * @description - This method sets the Tag input values
    * @param {string}  tag
    * @returns {object} void
    * @memberof Article
    */
  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag], hasChanges: true, alertVisible: true }));
  }

  /**
    * @description - This method renders the category options value
    * @returns {object} - return object of category options
    * @memberof Article
    */
  renderSelectOptions() {
    return this.props.categories.map(
      category => <option key={category.id} value={category.id}>{category.category}</option>
    );
  }

  /**
    * @description - This method is use to drag the tag input values
    * @param {string} tag
    * @param {string} currPos
    *  @param {string} newPos
    * @returns {object} void
    * @memberof Article
    */
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    this.setState({ tags: newTags });
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof CreateArticle
   */
  render() {
    return (
      <div>
        <Header />
        <Login />
        <MsgInfo />
        <IdleTimer
          ref={(ref) => { this.idleTimer = ref; }}
          timeout={3000}
          startOnMount={false}
          onIdle={this.save}>
          <Row className="create-article">
            <Col m={8} l={9}>
              <div className="container">
                <Row>
                  <Col m={8} className="flex">
                    <div className="author-photo"></div>
                    <div className="author-name">
                      <div>Victor victor</div>
                      <div className="pub-date">Sept 26, 2018</div>
                      {this.state.alertVisible
                        && <p className="status">
                          {this.getAlertMessage()}
                        </p>
                      }
                    </div>
                  </Col>
                  <Col className="publish-btn-wrapper" m={4}>
                    <button onClick={this.onPublishArticle}>Publish</button>
                  </Col>
                </Row>

                <Row>
                  <Col m={7}>
                    <div>
                      <label htmlFor="Title">Title (required)</label>
                      <input type="text" placeholder="Enter Title" id="title" value={this.state.title} onChange={this.onInputChange} required />
                    </div>
                  </Col>
                  <Col m={5}>
                    <label className="article-img-upload">
                      <p className="file-name">Choose file</p>
                      <label htmlFor="file-input" className="browse-btn">Browse</label>
                      <input id="image" type="file" className="file-input" onChange={this.onImageChange} />
                    </label>
                  </Col>
                </Row>

                <div>
                  <label htmlFor="Description">Description (required)</label>
                  <input type="text"
                    placeholder="Enter Description"
                    value={this.state.description}
                    id="description" onChange={this.onInputChange} required />
                </div>

                <div>
                  <label htmlFor="Body">Body (required)</label>
                  <Editor
                    className="editable"
                    data-placeholder="Tell your story here..."
                    text={this.state.body}
                    onChange={this.handleEditorChange}
                    options={{ toolbar: true }}
                    required
                  />
                </div>
              </div>
            </Col>
            <Col m={4} l={3}>
              <ReactTags
                tags={this.state.tags}
                suggestions={convertIdToString(this.props.suggestedTags)}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                placeholder="Add new tag (required)"
                required
              />
              <div className="input-field col s12">
                <Input s={12} type='select' id="category" label="(required) Select Category" onChange={this.onInputChange} defaultValue={this.state.category ? this.state.category : '0'} required>
                  <option value="0" disabled>Choose your option</option>
                  {this.renderSelectOptions()}
                </Input>
              </div>
            </Col>
          </Row>
        </IdleTimer>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  article: PropTypes.object,
  suggestedTags: PropTypes.array,
  categories: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  getAllTags: PropTypes.func,
  createArticle: PropTypes.func,
  updateArticle: PropTypes.func,
  publishArticle: PropTypes.func,
  getAllCategory: PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    article, message, tags, loading, error
  } = state.Article;
  const { categories } = state.Category;
  const suggestedTags = state.Tags.tags;

  return {
    article, message, tags, loading, categories, suggestedTags, error
  };
};

export default connect(mapStateToProps,
  {
    createArticle, updateArticle, publishArticle, getAllCategory, getAllTags
  })(CreateArticle);
