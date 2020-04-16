import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import theme from 'app/theme/Theme';

export const ButtonContainer = styled(Box)`
  margin: 0 4px;
`;

export const ButtonLabel = styled.div`
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const ModuleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${theme.color.zoomGreyZero};
  justify-content: center;
  margin-top: auto;
  padding: 20px 0;
`;

export const TopModuleSection = styled(ModuleSection)`
  margin-top: 40px;
`;

export const ModuleContent = styled.div`
  width: 100%;
`;

export const ModuleContainer = styled.div`
  min-height: 96vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
