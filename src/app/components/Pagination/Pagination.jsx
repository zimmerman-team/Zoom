/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

/* style */
import './Pagination.css';

const propTypes = {
  pageCount: PropTypes.number,
  changePage: PropTypes.func
};
const defaultProps = {
  pageCount: 0,
  changePage: null
};

const Pagination = props => (
  <ReactPaginate
    previousLabel="previous"
    nextLabel="next"
    breakLabel="..."
    breakClassName="break-me"
    pageCount={props.pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={props.changePage}
    containerClassName="pagination"
    pageClassName="page"
    activeClassName="active-page"
    nextClassName="nextPage"
    previousClassName="prevPage"
    disabledClassName="disabledLab"
  />
);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
