import React from 'react';
import { Pagination } from 'react-materialize';
import PropTypes from 'prop-types';

import './Pagination.css';

const pagination = props => (
  <div className="center">
    <Pagination
      items={props.items}
      onSelect={props.select}
      activePage={props.activePage}
      maxButtons={props.maxButtons}
    />
  </div>
);


pagination.propTypes = {
  activePage: PropTypes.number,
  maxButtons: PropTypes.number,
  items: PropTypes.number,
  select: PropTypes.func
};

export default pagination;
