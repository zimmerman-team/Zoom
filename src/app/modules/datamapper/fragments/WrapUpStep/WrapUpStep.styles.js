import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import theme from 'app/theme/Theme';

export const ModuleContainer = styled(Box)`
  background-color: ${theme.color.aidsFondsWhite};
  padding: 162px 28% 568px 28%;
  line-height: 1.2;
`;

export const ErrorContainer = styled(Box)``;

export const ErrorTitle = styled.div`
  font-size: 20px;
  text-align: center;
  font-family: ${theme.font.zoomFontFamOne};
`;

export const ErrorItem = styled.li`
  font-size: 14px;
  color: ${theme.color.aidsFondsRed};
  text-align: center;
  font-family: ${theme.font.zoomFontFamOne};
`;
