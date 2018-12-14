/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import countryDetailMockData from '../../../__mocks__/countryDetailMock';
import {
  ConditionMet,
  ConditionUnmet,
  FragmentHeader,
  FragmentDescription,
  FragmentVisualisation,
  StigmaListItem,
  StigmaList,
} from '../../../components/theme/ThemeSheet';
import ModuleFragment from '../../../components/layout/ModuleFragment/ModuleFragment';

const propTypes = {};
const defaultProps = {};

const HumanRights = props => {
  return (
    <ModuleFragment>
      <FragmentHeader>
        {countryDetailMockData.fragments[4].title}
      </FragmentHeader>
      <FragmentDescription>
        {countryDetailMockData.fragments[4].description[0]}
      </FragmentDescription>
      <FragmentVisualisation>
        <StigmaList>
          <StigmaListItem>
            <ConditionMet color="green" />
            <p>Laws deeming sex work to be illegal</p>
          </StigmaListItem>
          <StigmaListItem>
            <ConditionMet color="green" />
            <p>Laws that criminalize same-sex activities</p>
          </StigmaListItem>
          <StigmaListItem>
            <ConditionUnmet color="red" />
            <p>
              Impose compulsory treatment/detention for people who use drugs
            </p>
          </StigmaListItem>
          <StigmaListItem>
            <ConditionMet color="green" />
            <p>
              Laws that specifically criminalize HIV transmission or exposure
            </p>
          </StigmaListItem>
        </StigmaList>
      </FragmentVisualisation>
    </ModuleFragment>
  );
};

HumanRights.propTypes = propTypes;
HumanRights.defaultProps = defaultProps;

export default HumanRights;
