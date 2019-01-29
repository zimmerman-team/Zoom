import styled from 'styled-components';
import { Box } from 'grommet';
import { zoomGreyZero } from 'components/theme/ThemeSheet';

export const StepperContainer = styled(Box)`
  background-color: ${zoomGreyZero};
`;

export const ModuleContainer = styled(Box)`
  min-height: 96vh;
`;

export const BottomStepCont = styled(StepperContainer)`
  margin-top: auto;
`;
