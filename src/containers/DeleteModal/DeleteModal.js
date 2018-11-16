import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { deleteArticle } from '../../requests/ArticleRequests';

import './DeleteModal.scss';

class DeleteModal extends Component {
  constructor() {
    super();

    this.deleteArticle = this.deleteArticle.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  hideDeleteModal() {
    if (this.props.deleteItem.loading) return;
    this.props.hideDeleteModal();
  }

  deleteArticle() {
    if (this.props.deleteItem.loading) return;
    console.log(this.props.articleslug);
    this.props.deleteArticle(this.props.articleslug)
      .then(this.hideDeleteModal);
  }

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

const mapStateToProps = state => ({
  deleteItem: state.deleteItem
});

export default connect(mapStateToProps, {
  deleteArticle
})(DeleteModal);
