import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './DropDown.scss';

/**
 *
 *
 * @class DropDown
 * @extends {Component}
 */
class DropDrown extends Component {
  /**
   * @description - This method runs first in the class
   * @param {props} props
   * @memberof DropDrown
   */
  constructor() {
    super();
    this.dropDrownWrapper = React.createRef();
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @memberof DropDrown
   */
  componentDidMount() {
    this.dropDrownWrapper.current.focus();
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof DropDrown
   */
  render() {
    return (
      <div
        onBlur={this.props.blur}
        tabIndex="1"
        ref={this.dropDrownWrapper}
        className="dropdown-wrapper">
        <ul className="l-wing">
          <li className="dropdown-list"><Link to={'/articles/feed'}>All Articles</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Arts</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Technology</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Animals</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Culture</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Finance</Link></li>
        </ul>
        <ul className="r-wing">
          <li className="dropdown-list"><Link to={'#'}>Sport</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Medicine</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Gadget</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Programming</Link></li>
          <li className="dropdown-list"><Link to={'#'}>History</Link></li>
          <li className="dropdown-list"><Link to={'#'}>Fashion</Link></li>
        </ul>
      </div>
    );
  }
}

DropDrown.propTypes = {
  blur: PropTypes.func.isRequired,
};

export default DropDrown;
