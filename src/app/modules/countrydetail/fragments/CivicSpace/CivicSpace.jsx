/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll';
import { Tooltip } from 'react-tippy';
import { Circle, Container, ItemContainer, StateTooltip, Text } from './CivicSpace.styles';

const propTypes = {
  value: PropTypes.number,
  background: PropTypes.string
};
const defaultProps = {
  value: 0,
  background: ''
};

const CivicSpace = props => {
  return (
    <Element name="Civic space">
      <ModuleFragment
        background={props.background}
        title={countryDetailMockData.fragments[3].title}
        description={countryDetailMockData.fragments[3].description[0]}
        showInfoButton
      >
        <Container>
          {countryDetailMockData.fragments[3].states.map(state => (
            <ItemContainer>
              <Tooltip
                position="top"
                trigger="mouseenter"
                html={<StateTooltip>{state.desc}</StateTooltip>}
              >
                <Circle
                  color={state.color}
                  active={props.value === state.value}
                />
              </Tooltip>
              <Text>{state.text}</Text>
            </ItemContainer>
          ))}
        </Container>
      </ModuleFragment>
    </Element>
  );
};

CivicSpace.propTypes = propTypes;
CivicSpace.defaultProps = defaultProps;

export default CivicSpace;
