import { connect } from 'react-redux';
import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'react-materialize';
import { WithContext as ReactTags } from 'react-tag-input';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import './CreateArticle.scss';
import '../../styles/style.scss';
import articleFormData from '../../util/formData';
import { getAllTags } from '../../requests/TagRequests';
import { getAllCategory } from '../../requests/CategoryRequests';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
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
      articleTags: [],
      alertVisible: false,
      body: '',
      category: '',
      description: '',
      hasChanges: false,
      idleTimer: null,
      imgUrl: null,
      imageName: '',
      isCreated: false,
      title: ''
    };

    this.create = this.create.bind(this);
    this.getAlertMessage = this.getAlertMessage.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePublishArticle = this.handlePublishArticle.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
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
  handleInputChange(e) {
    this.setState({ [e.target.id]: e.target.value, hasChanges: true, alertVisible: true });
  }

  /**
    * @description - This method sets the image
    * @param {object} e
    * @returns {object} void
    * @memberof Article
    */
  handleImageChange(e) {
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      this.setState({
        imgUrl: file, imageName: file.name, hasChanges: true, alertVisible: true
      });
    }
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
  handlePublishArticle() {
    const status = 'published';
    const { slug } = this.props.article;
    const tags = TagObjectToString(this.state.articleTags);
    this.props.publishArticle({ slug, status, tags });
  }

  /**
    * @description - This method create the article if changes has been made
    * @returns {string} - return saved or not
    * @memberof Article
    */
  create() {
    const {
      hasChanges, title, description, body, category, imgUrl, articleTags
    } = this.state;

    const categoryId = Number(category);

    const tags = TagObjectToString(articleTags);

    if (hasChanges) {
      this.setState({ hasChanges: false, alertVisible: true, isCreated: true });
      const formData = articleFormData(title, description, body, imgUrl, categoryId, tags);
      this.props.createArticle(formData, tags);
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
      hasChanges, title, description, body, category, imgUrl, articleTags
    } = this.state;

    const categoryId = Number(category);
    const tags = TagObjectToString(articleTags);
    const articleSlug = this.props.article.slug;

    if (hasChanges) {
      this.setState({ hasChanges: false, alertVisible: true });
      const formData = articleFormData(title, description, body, imgUrl, categoryId, tags);
      this.props.updateArticle(formData, tags, articleSlug);
    }
  }

  /**
    * @description - This method delete the Tag input values
    * @param {objecj}  tagIndexToDelete
    * @returns {object} void
    * @memberof Article
    */
  handleDelete(tagIndexToDelete) {
    const { articleTags } = this.state;
    this.setState({
      articleTags: articleTags.filter((tag, index) => index !== tagIndexToDelete),
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
    this.setState(state => (
      { articleTags: [...state.articleTags, tag], hasChanges: true, alertVisible: true }));
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
    * @param {string} currentPosition
    *  @param {string} newPosition
    * @returns {object} void
    * @memberof Article
    */
  handleDrag(tag, currentPosition, newPosition) {
    const tags = [...this.state.articleTags];
    const newTags = tags.slice();

    newTags.splice(currentPosition, 1);
    newTags.splice(newPosition, 0, tag);
    this.setState({ tags: newTags });
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof CreateArticle
   */
  render() {
    const defaultValue = this.state.category ? this.state.category : 0;
    return (
      <div>
        <IdleTimer
          ref={(ref) => { this.idleTimer = ref; }}
          timeout={5000}
          startOnMount={false}
          onIdle={this.save}>
          <Row className="create-article">
            <ArticleForm
              componentState={this.state}
              getAlertMessage={this.getAlertMessage()}
              handleInputChange={this.handleInputChange}
              handleEditorChange={this.handleEditorChange}
              handleImageChange={this.handleImageChange}
              handlePublishArticle={this.handlePublishArticle}
            />
            <Col m={3} className="tag-category">
              <label htmlFor="Title">Tags</label>
              <ReactTags
                tags={this.state.articleTags}
                suggestions={convertIdToString(this.props.suggestedTags)}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                required
              />
              <div className="input-field col s12">
                <span htmlFor="Title">Categories</span>
                <Input
                  s={12}
                  type="select"
                  id="category"
                  onChange={this.handleInputChange}
                  defaultValue={defaultValue}
                  required>
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
  categories: PropTypes.array,
  createArticle: PropTypes.func,
  error: PropTypes.bool,
  getAllCategory: PropTypes.func,
  getAllTags: PropTypes.func,
  publishArticle: PropTypes.func,
  suggestedTags: PropTypes.array,
  updateArticle: PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    article, tags, error
  } = state.article;
  const { categories } = state.category;
  const suggestedTags = state.tags.tags;

  return {
    article, tags, categories, suggestedTags, error
  };
};

export default connect(mapStateToProps,
  {
    createArticle, updateArticle, publishArticle, getAllCategory, getAllTags
  })(CreateArticle);