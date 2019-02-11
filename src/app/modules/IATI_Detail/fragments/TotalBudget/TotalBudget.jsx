/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';

const Title = styled.span`
  width: 100%;
  line-height: 40px;
  text-align: center;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      Budget: PropTypes.number,
      BudgetColor: PropTypes.string,
      Spent: PropTypes.number,
      SpentColor: PropTypes.string
    })
  ),
  totalBudget: PropTypes.number
};
const defaultProps = {
  data: [],
  totalBudget: 0
};

const TotalBudget = props => (
  <ModuleFragment
    showInfoButton
    title={
      <Title>
        Total budget
        <br />$
        {props.totalBudget.toLocaleString(
          {},
          {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        )}
      </Title>
    }
  >
    <BarChartVertical data={props.data} keys={['Budget', 'Spent']} />
  </ModuleFragment>
);

TotalBudget.propTypes = propTypes;
TotalBudget.defaultProps = defaultProps;

export default TotalBudget;
