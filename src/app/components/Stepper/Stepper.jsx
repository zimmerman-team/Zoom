/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';
import ZoomButton from 'components/ZoomButton/ZoomButton';

/* styles */
import theme from 'theme/Theme';
import {
  ComponentBase,
  stepButStyle,
  ButtonLabel,
  ButtonContainer,
  Stepz,
  StepzLabel,
  StyledStepper,
  materialStyles
} from './Stepper.style';

/* consts */
import { steps } from './Stepper.const';

const propTypes = {
  data: PropTypes.object,
  onlyButtons: PropTypes.bool
};
const defaultProps = {
  data: undefined,
  onlyButtons: false
};

class Stepperz extends React.Component {
  render() {
    const { classes } = this.props;

    const nextEnabled = this.props.step !== 6;
    const prevEnabled = this.props.step !== 1;

    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );

    const activeStep = this.props.step - 1;

    return (
      <ComponentBase>
        {!this.props.onlyButtons && (
          <StyledStepper
            alternativeLabel
            activeStep={activeStep}
            connector={connector}
          >
            {steps.map(step => (
              <Stepz key={step.label}>
                <StepzLabel>{step.label}</StepzLabel>
              </Stepz>
            ))}
          </StyledStepper>
        )}
        <Box direction="row">
          <ButtonContainer margin="small">
            <ZoomButton
              style={{
                backgroundColor: !prevEnabled ? theme.color.zoomGreySix : '',
                ...stepButStyle
              }}
              onClick={prevEnabled ? this.props.prevStep : undefined}
            >
              <ButtonLabel>back</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{
                backgroundColor: !nextEnabled ? theme.color.zoomGreySix : '',
                ...stepButStyle
              }}
              onClick={nextEnabled ? this.props.nextStep : undefined}
            >
              <ButtonLabel>next</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </Box>
      </ComponentBase>
    );
  }
}

Stepperz.propTypes = propTypes;
Stepperz.defaultProps = defaultProps;

export default withStyles(materialStyles)(Stepperz);
