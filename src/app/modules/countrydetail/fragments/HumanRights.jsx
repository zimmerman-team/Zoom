/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import {
  ConditionMet,
  ConditionUnmet,
  FragmentHeader,
  FragmentDescription,
  FragmentVisualisation,
  StigmaListItem,
  StigmaList,
} from 'components/theme/ThemeSheet';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';

const ItemText = styled.p`
  //justify-self: flex-start;
  align-self: flex-start;
  width: 90%;
`;

const propTypes = {};
const defaultProps = {};

const HumanRights = props => {
  return (
    <ModuleFragment
      title={countryDetailMockData.fragments[4].title}
      description={countryDetailMockData.fragments[4].description[0]}
      showInfoButton
    >
      <StigmaList>
        <StigmaListItem>
          <ConditionMet color="green" />
          <ItemText>Laws deeming sex work to be illegal</ItemText>
        </StigmaListItem>
        <StigmaListItem>
          <ConditionMet color="green" />
          <ItemText>Laws that criminalize same-sex activities</ItemText>
        </StigmaListItem>
        <StigmaListItem>
          <ConditionUnmet color="red" />
          <ItemText>
            Impose compulsory treatment/detention for people who use drugs
          </ItemText>
        </StigmaListItem>
        <StigmaListItem>
          <ConditionMet color="green" />
          <ItemText>
            Laws that specifically criminalize HIV transmission or exposure
          </ItemText>
        </StigmaListItem>
      </StigmaList>
    </ModuleFragment>
  );
};

HumanRights.propTypes = propTypes;
HumanRights.defaultProps = defaultProps;

export default HumanRights;
