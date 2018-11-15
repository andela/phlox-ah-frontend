import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './MsgInfo.scss';

/**
 *
 *
 * @class MsgInfo
 * @extends {Component}
 */
class MsgInfo extends Component {
  /**
   * @memberof MsgInfo
   */

  /**
   * @description - This method runs first in the class
   * @returns {object} null
   * @param {object} props
   * @memberof MsgInfo
   */
  constructor() {
    super();

    this.state = {
      message: [],
      success: true
    };
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof MsgInfo
   */
  static getDerivedStateFromProps(props, state) {
    return props.info;
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof MsgInfo
   */
  render() {
    const { success, message } = this.state;

    const messages = message.map((data, index) => (<li key={index} className="info">{data}</li>));

    return (
      <div className={message.length ? '_show' : '_hide'}>
        <div className={success
          ? 'msg-info success' : 'msg-info error'}>
            <ul>
              {messages}
            </ul>
          </div>
        </div>
    );
  }
}


MsgInfo.propTypes = {
  clearMsgInfo: PropTypes.func
};


const mapStateToProps = state => ({
  info: state.info
});

export default connect(mapStateToProps, {})(MsgInfo);
