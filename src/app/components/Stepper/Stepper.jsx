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
  StepLabelClass,
  StyledStepper,
  materialStyles
} from './Stepper.style';

/* consts */
import { steps } from './Stepper.const';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import { StepIcon } from '@material-ui/core';

const propTypes = {
  data: PropTypes.object,
  onlyButtons: PropTypes.bool,
  nextDisabled: PropTypes.func
};
const defaultProps = {
  data: undefined,
  onlyButtons: false,
  nextDisabled: undefined
};


class Stepperz extends React.Component {
  render() {
    const { classes } = this.props;

    const nextDisabled = this.props.nextDisabled || this.props.step === 6;
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
              <Step key={step.label}>
                <StepLabel
                  classes={{
                    label: classes.stepLabel,
                    active: classes.stepLabelActive,
                    completed: classes.stepLabelActive
                  }}
                  StepIconProps={{
                      classes: {
                          root: classes.stepIcon,
                          active: classes.stepIconActive,
                          completed: classes.stepIconCompleted,
                          text: classes.stepIconText,
                        }}}
                >
                  {step.label}
                </StepLabel>
              </Step>
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
                backgroundColor: nextDisabled ? theme.color.zoomGreySix : '',
                ...stepButStyle
              }}
              onClick={this.props.step !== 6 ? this.props.nextStep : undefined}
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
