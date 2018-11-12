import React, { Component } from 'react';
import Login from '../Login/Login';
import ForgotPassword from '../Password/ForgotPassword';
import ResetPassword from '../Password/ResetPassword';
import Signup from '../Signup/Signup';
/**
 *
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @returns {array} article
   * @memberof Home
   */

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Home
   */
  render() {
    return (
      <div>
        <Signup {...this.props} />
        <Login {...this.props} />
        <ForgotPassword {...this.props} />
        <ResetPassword {...this.props} />
        This is the home component
      </div>
    );
  }
}

export default Home;
