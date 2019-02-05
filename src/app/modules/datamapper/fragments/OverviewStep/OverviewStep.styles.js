import styled from 'styled-components';
import { Box } from 'grommet';
import { CellValue, ColumnHeader } from 'components/theme/ThemeSheet';
import theme from 'theme/Theme';

export const ModuleContainer = styled(Box)`
  background-color: ${theme.color.aidsFondsWhite};
  padding: 0px 1% 95px 1%;
`;

export const CellLine = styled.div`
  display: flex;
`;

export const CellText = styled(CellValue)`
  font-family: ${theme.font.zoomFontFamTwo};
  margin-left: 4px;
`;

export const Cell = styled.div`
  padding: 3px 0 6px 20px;
`;

export const ColHeader = styled(ColumnHeader)`
  padding-left: 20px;
`;
