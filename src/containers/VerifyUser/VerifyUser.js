import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';
import './VerifyUser.scss';
import { connect } from 'react-redux';
import { verifyUser } from '../../requests/VerifyUserRequests';
import VerificationStatus from '../../components/VerificationStatus/VerificationStatus';

/**
 * @class VerifyUser
 * @extends {Component}
 */
class VerifyUser extends Component {
  /**
   * @constructor function
   * @param {*} props React properties
   */
  constructor() {
    super();
    this.state = { success: false, loading: true };
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @memberof VerifyUser
   */
  static getDerivedStateFromProps(props) {
    return { success: props.success, loading: props.loading };
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof VerifyUser
   */
  componentDidMount() {
    this.props.verifyUser(this.props.match.params.verificationToken);
  }

  /**
   * @memberOf handleredirection to home page
   * @method closeModal
   * @param {*} event
   * @return {*} boolean
   */
  redirectToHome() {
    this.props.history.push('/');
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof VerifyUser
   */
  render() {
    const { loading, success } = this.state;
    return (
      <div>
        { loading && <h5>Loading...</h5>}
        {
          !loading
          && <div className="row verifyDiv">
            <div className="col m8 offset-m2">
              {
                success
                  && <VerificationStatus
                    message={'User successfully verified'}
                    iconClass={'far fa-check-circle fa-5x'}
                    onClick={this.redirectToHome}
                    />
              }
              {
                !success
                && <VerificationStatus
                    message={'Could Not Verify account'}
                    iconClass={'fas fa-exclamation-triangle red-text fa-5x'}
                    onClick={this.redirectToHome}
                    />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

VerifyUser.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.verifyUser.loading,
  success: state.verifyUser.success,
});

export default connect(mapStateToProps, { verifyUser })(withRouter(VerifyUser));
