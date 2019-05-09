import { Box } from 'grommet/components/Box';
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
  },

  stepLabel: {
    fontSize: '14px',
    fontFamily: theme.font.zoomFontFamOne,
    color: theme.color.zoomGreyTen,
    marginTop: '10px !important',
    '&$stepLabelActive': {
      color: theme.color.aidsFondsBlue
    },
    '&stepLabelCompleted': {
      color: theme.color.aidsFondsBlue
    }
  },
  stepLabelActive: {},
  stepLabelCompleted: {},

  stepIcon: {
    color: theme.color.zoomGreyTen,
    '&$stepIconCompleted': {
      color: theme.color.aidsFondsBlue
    },
    '&$stepIconActive': {
      color: theme.color.aidsFondsBlue
    },
    // fixme: not conform material-ui guidelines
    '& text': {
      fontFamily: theme.font.zoomFontFamOne
    }
  },
  stepIconActive: {},
  stepIconText: {},
  stepIconCompleted: {}
});
