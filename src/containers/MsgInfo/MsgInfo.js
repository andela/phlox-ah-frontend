import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { msgInfoActions } from '../BasePath';

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
      info: [],
      success: false
    };

    this.close = this.close.bind(this);
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
   * @description - This method clear msg info
   * @returns {object} null
   * @memberof MsgInfo
   */
  close() {
    this.props.clearMsgInfo();
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof MsgInfo
   */
  render() {
    const { success, info } = this.state;

    const messages = info.map((data, index) => (<li key={index} className="info">{data}</li>));

    return (
      <div className={info.length ? '_show' : '_hide'}>
        <div className={success
          ? 'msg-info success' : 'msg-info error'}>
            <div className="close-btn">
              <span onClick={this.close}
                className="x-btn">
                &times;
              </span>
            </div>
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

export default connect(mapStateToProps, {
  clearMsgInfo: msgInfoActions.clear
})(MsgInfo);
