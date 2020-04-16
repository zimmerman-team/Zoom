/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* components */
import Theme from 'app/theme/Theme';
import { FragmentVisualisation } from 'app/components/sort/Fragments';
import { Element } from 'react-scroll/modules';
import PieChart from 'app/components/charts/piechart/PieChart';
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
/* mock */
import { countryDetailMockData } from 'app/__mocks__/countryDetailMock';
/* utils */
import get from 'lodash/get';

const propTypes = {
  data: PropTypes.shape({
    commitment: PropTypes.arrayOf(PropTypes.shape({})),
    disbursement: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  countryName: PropTypes.string,
  background: PropTypes.string
};
const defaultProps = {
  data: {
    commitment: [],
    disbursement: []
  },
  countryName: '',
  background: Theme.color.aidsFondsWhite
};

const ChartContainer = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  text-align: center;
`;

const NoDataText = styled.div`
  text-align: center;
`;

const AidsfondsTransactions = props => {
  return (
    <Element name="Financials">
      <ModuleFragment
        background={props.background}
        title={countryDetailMockData.fragments[5].title}
        fragmentInfo={`${`${get(
          props.countryName,
          '[0]',
          ''
        ).toUpperCase()}${props.countryName.slice(1)}`}${
          countryDetailMockData.fragments[5].description
        }`}
        showInfoButton
      >
        <FragmentVisualisation direction="row">
          <ChartContainer>
            <Title>Commitments</Title>
            {props.data.commitment.length > 0 ? (
              <PieChart data={props.data.commitment} />
            ) : (
              <NoDataText>No data available</NoDataText>
            )}
          </ChartContainer>
          <ChartContainer>
            <Title>Disbursements</Title>
            {props.data.commitment.length > 0 ? (
              <PieChart data={props.data.disbursement} />
            ) : (
              <NoDataText>No data available</NoDataText>
            )}
          </ChartContainer>
        </FragmentVisualisation>
      </ModuleFragment>
    </Element>
  );
};

AidsfondsTransactions.propTypes = propTypes;
AidsfondsTransactions.defaultProps = defaultProps;

export default AidsfondsTransactions;
