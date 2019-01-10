/* base */
import React from 'react';
import PropTypes from 'prop-types';

import Sectors from 'modules/IATI_Detail/fragments/Sectors';
import TotalBudget from 'modules/IATI_Detail/fragments/TotalBudget';
import Header from 'modules/IATI_Detail/fragments/Header';

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const IatiDetail = props => {
  return (
    <React.Fragment>
      <Header />
      <TotalBudget />
      <Sectors />
      <div>joejoejoe</div>
    </React.Fragment>
  );
};

IatiDetail.propTypes = propTypes;
IatiDetail.defaultProps = defaultProps;

export default IatiDetail;
