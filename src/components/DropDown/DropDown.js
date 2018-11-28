import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { getCategoryArticle } from '../../requests/CategoryRequests';
import './DropDown.scss';

const history = createBrowserHistory();

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
    this.getCategory = this.getCategory.bind(this);
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
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @param {object} name
   * @memberof DropDrown
   */
  getCategory(name) {
    console.log(name);
    this.props.getCategoryArticle(name);
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
          <li className="dropdown-list"><Link to="/arts/articles" onClick={() => this.getCategory('arts')}>Arts</Link></li>
          <li className="dropdown-list"><Link to="/technology/articles" onClick={() => this.getCategory('technology')}>Technology</Link></li>
          <li className="dropdown-list"><Link to="/animals/articles" onClick={() => this.getCategory('animals')}>Animals</Link></li>
          <li className="dropdown-list"><Link to="/culture/articles" onClick={() => this.getCategory('culture')}>Culture</Link></li>
          <li className="dropdown-list"><Link to="/finance/articles" onClick={() => this.getCategory('finance')}>Finance</Link></li>
        </ul>
        <ul className="r-wing">
          <li className="dropdown-list"><Link to="/sport/articles" onClick={() => this.getCategory('sport')}>Sport</Link></li>
          <li className="dropdown-list"><Link to="/medicine/articles" onClick={() => this.getCategory('medicine')}>Medicine</Link></li>
          <li className="dropdown-list"><Link to="/gadget/articles" onClick={() => this.getCategory('gadget')}>Gadget</Link></li>
          <li className="dropdown-list"><Link to="/programming/articles" onClick={() => this.getCategory('programming')}>Programming</Link></li>
          <li className="dropdown-list"><Link to="/history/articles" onClick={() => this.getCategory('history')}>History</Link></li>
          <li className="dropdown-list"><Link to="/fashion/articles" onClick={() => this.getCategory('fashion')}>Fashion</Link></li>
        </ul>
      </div>
    );
  }
}

DropDrown.propTypes = {
  blur: PropTypes.func.isRequired,
  getCategoryArticle: PropTypes.func
};

export default connect(null, { getCategoryArticle })(DropDrown);
