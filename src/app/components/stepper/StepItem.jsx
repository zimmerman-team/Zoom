/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import { aidsFondsWhite, zoomGreyZero } from 'components/theme/ThemeSheet';

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StepLabel = styled.div``;
const StepIcon = styled.div`
  border-radius: 50%;
  background-color: dimgrey;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;
const StepNumber = styled.span`
  font-size: 12px;
  line-height: 1;
  color: white;
`;

const StepSpacer = styled.div`
  height: 2px;
  width: 75px;
  background: dimgray;
`;

const propTypes = {
  stepLabel: PropTypes.string,
  stepActive: PropTypes.bool,
  stepDonestepDone: PropTypes.bool,
  stepNumber: PropTypes.number,
  firstStep: PropTypes.bool,
  lastStep: PropTypes.bool,
};
const defaultProps = {
  stepLabel: 'empty label',
  stepActive: false,
  stepNumber: 1,
  stepDone: false,
  firstStep: true,
};

const StepItem = props => {
  return (
    <ComponentBase>
      <Box direction="row" align="center">
        <StepSpacer />
        <StepIcon>
          {!props.stepDone && <StepNumber>{props.stepNumber}</StepNumber>}
        </StepIcon>
        <StepSpacer />
      </Box>
      <StepLabel>{props.stepLabel}</StepLabel>
    </ComponentBase>
  );
};

StepItem.propTypes = propTypes;
StepItem.defaultProps = defaultProps;

export default StepItem;
