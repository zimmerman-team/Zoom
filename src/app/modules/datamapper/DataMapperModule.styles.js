import styled from 'styled-components';
import { Box } from 'grommet';
import { zoomGreyZero } from 'components/theme/ThemeSheet';

export const StepperContainer = styled(Box)`
  background-color: ${zoomGreyZero};
`;

export const ModuleContainer = styled.div`
  min-height: 96vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BottomStepCont = styled(StepperContainer)`
  margin-top: auto;
`;

export const ModuleHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${zoomGreyZero};
  padding-top: 20px;
`;
export const ModuleContent = styled.div`
  width: 1024px;
`;
export const ModuleFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
