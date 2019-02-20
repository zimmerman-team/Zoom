import { Box } from 'grommet';
import styled from 'styled-components';
import theme from 'theme/Theme';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

export const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 1024px;
  flex-direction: column;
`;

export const ButtonLabel = styled.div`
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const ButtonContainer = styled(Box)`
  margin: 0 4px;
`;

export const Stepz = styled(Step)`
  & [class*='MuiStepIcon-root'] {
    color: ${theme.color.zoomGreyThree};
    width: 21px;
    height: 21px;
  }

  & [class*='MuiStepIcon-active'] {
    color: ${theme.color.aidsFondsBlue} !important;
  }

  & [class*='MuiStepIcon-completed'] {
    color: ${theme.color.aidsFondsBlue} !important;
  }
`;

export const StepzLabel = styled(StepLabel)`
  & span {
    font-size: 14px;
    font-family: ${theme.font.zoomFontFamOne} !important;
  }

  & [class*='MuiTypography-root'] {
    margin-top: 12px !important;
  }

  & [class*='MuiStepLabel-active'] {
    color: ${theme.color.aidsFondsBlue} !important;
  }

  & [class*='MuiStepLabel-completed'] {
    color: ${theme.color.aidsFondsBlue} !important;
  }
`;

export const StyledStepper = styled(Stepper)`
  margin-bottom: 26px;
  background-color: inherit !important;
  padding: 0 !important;
  width: 100% !important;
`;

export const stepButStyle = {
  width: '75px'
};

export const materialStyles = uiTheme => ({
  connectorActive: {
    '& $connectorLine': {
      border: `1px solid ${theme.color.aidsFondsBlue}`
    }
  },
  connectorCompleted: {
    '& $connectorLine': {
      border: `1px solid ${theme.color.aidsFondsBlue}`
    }
  },
  connectorDisabled: {
    '& $connectorLine': {
      border: `1px solid ${theme.color.zoomGreySeven}`
    }
  },
  connectorLine: {
    transition: uiTheme.transitions.create('border-color')
  }
});
