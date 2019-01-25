import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = () => (
  <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={5}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={e => console.log('Selected page', e)}
    containerClassName={'pagination'}
    pageClassName={'page'}
    activeClassName={'active-page'}
    nextClassName={'nextPage'}
    previousClassName={'prevPage'}
    disabledClassName={'disabledLab'}
  />
);

export default Pagination;
