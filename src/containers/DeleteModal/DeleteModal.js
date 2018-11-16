import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import PropTypes from 'prop-types';
import { deleteArticle } from '../../requests/ArticleRequests';

import './DeleteModal.scss';

/**
 *
 * @class DeleteModal
 * @extends {Component}
 */
class DeleteModal extends Component {
  /**
   * @member of DeleteModal
   */

  /**
   *
   * @description - This method runs first in the class
   * @returns {object} null
   * @memberof DeleteModal
   */
  constructor() {
    super();
    this.deleteArticle = this.deleteArticle.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  /**
   *
   * @description - This method hides delete modal
   * @returns {object} - null
   * @memberof DeleteModal
   */
  hideDeleteModal() {
    if (this.props.deleteItem.loading) return;
    this.props.hideDeleteModal();
  }

  /**
   *
   * @description - This method deletes an article by slug
   * @returns {object} - null
   * @memberof DeleteModal
   */
  deleteArticle() {
    if (this.props.deleteItem.loading) return;
    this.props.deleteArticle(this.props.articleslug)
      .then(this.hideDeleteModal);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof DeleteModal
   */
  render() {
    return (
      <div className="delete-modal">
        <div className="modal-body">
          {
            this.props.deleteItem.loading
              && <div className="loader-wrapper">
                <Preloader />
              </div>
          }
          <div className="modal-info">
            <span className="warning-icon">
              <i
                className="fas fa-exclamation-triangle">
              </i>
            </span>
            <span className="warning-text">
              Are you sure you want to delete this article?
            </span>
          </div>
          <div className="modal-buttons">
            <button
              onClick={this.deleteArticle}
              className="btn yes">
              Yes
            </button>
            <button
              onClick={this.hideDeleteModal}
              className="btn no">
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  deleteItem: PropTypes.shape({
    loading: PropTypes.bool
  }),
  articleslug: PropTypes.string,
  hideDeleteModal: PropTypes.func,
  deleteArticle: PropTypes.func
};

const mapStateToProps = state => ({
  deleteItem: state.deleteItem
});

export default connect(mapStateToProps, {
  deleteArticle
})(DeleteModal);
