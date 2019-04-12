/* base */
import React from 'react';
import PropTypes from 'prop-types';

import Sectors from 'modules/IATI_Detail/fragments/Sectors/Sectors';
import TotalBudget from 'modules/IATI_Detail/fragments/TotalBudget/TotalBudget';
import Header from 'modules/IATI_Detail/fragments/Header/Header';
import { Helmet } from 'react-helmet';

const propTypes = {
  data: PropTypes.shape({
    timeline: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        info: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf([PropTypes.string])
        ])
      })
    ),
    title: PropTypes.string,
    detail: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        info: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf([PropTypes.string])
        ])
      })
    ),
    totalBudget: PropTypes.number,
    budgets: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.string,
        Budget: PropTypes.number,
        BudgetColor: PropTypes.string,
        Spent: PropTypes.number,
        SpentColor: PropTypes.string
      })
    ),
    sectors: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          color: PropTypes.string,
          loc: PropTypes.number
        })
      )
    })
  })
};
const defaultProps = {
  data: {
    timeline: [],
    title: '',
    detail: [],
    totalBudget: 0,
    budgets: [],
    sectors: {}
  }
};

const IatiDetail = props => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zoom - Country detail</title>
      </Helmet>
      <Header data={props.data} />
      <TotalBudget
        data={props.data.budgets}
        totalBudget={props.data.totalBudget}
      />
      <Sectors data={props.data.sectors} />
    </React.Fragment>
  );
};

IatiDetail.propTypes = propTypes;
IatiDetail.defaultProps = defaultProps;

export default IatiDetail;
