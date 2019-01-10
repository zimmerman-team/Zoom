/* base */
import React from 'react';
import PropTypes from 'prop-types';

import Sectors from 'modules/IATI_Detail/fragments/Sectors';
import TotalBudget from 'modules/IATI_Detail/fragments/TotalBudget';
import Header from 'modules/IATI_Detail/fragments/Header';

const propTypes = {
  data: PropTypes.shape({
    timeline: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf([PropTypes.string]),
      ])
    })),
    title: PropTypes.string,
    detail: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf([PropTypes.string]),
      ])
    })),
    sectors: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
        loc: PropTypes.number,
      }))
    }),
  }),
};
const defaultProps = {
  data: {
    timeline: [],
    title: '',
    detail: [],
    sectors: {}
  },
};

const IatiDetail = props => {
  return (
    <React.Fragment>
      <Header data={props.data} />
      <TotalBudget />
      <Sectors data={props.data.sectors} />
    </React.Fragment>
  );
};

IatiDetail.propTypes = propTypes;
IatiDetail.defaultProps = defaultProps;

export default IatiDetail;
