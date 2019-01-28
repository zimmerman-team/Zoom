/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import {
  ComponentBase,
  StepCompleteIcon,
  StepIcon,
  StepLabel,
  StepNumber,
  StepSpacer,
} from 'components/stepper/StepperItem.style';

/*TODO: document component*/

const propTypes = {
  stepLabel: PropTypes.string,
  isActive: PropTypes.bool,
  isDone: PropTypes.bool,
  stepNumber: PropTypes.number,
  outerStep: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};
const defaultProps = {
  stepLabel: 'empty label',
  isActive: false,
  stepNumber: 1,
  isDone: false,
  outerStep: false,
  isFirst: false,
  isLast: false,
};

const StepItem = props => {
  return (
    <ComponentBase>
      <Box direction="row" align="center" width="100%">
        <StepSpacer
          colores={props.isDone || props.isActive}
          outer={props.isFirst}
        />
        <StepIcon colores={props.isDone || props.isActive}>
          {props.isDone ? (
            <StepCompleteIcon />
          ) : (
            <StepNumber>{props.stepNumber}</StepNumber>
          )}
        </StepIcon>
        <StepSpacer
          colores={props.isDone || props.isActive}
          outer={props.isLast}
        />
      </Box>
      <StepLabel colores={props.isDone || props.isActive}>
        {props.stepLabel}
      </StepLabel>
    </ComponentBase>
  );
};

StepItem.propTypes = propTypes;
StepItem.defaultProps = defaultProps;

export default StepItem;
