import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import ColumnHeader from 'components/ZoomTable/ColumnHeader';
import theme from 'theme/Theme';
import CellValue from 'components/ZoomTable/CellValue';
import ZoomTable from 'components/ZoomTable/ZoomTable';

export const ModuleContainer = styled(Box)`
  width: 100%;
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

export const OverviewTable = styled(ZoomTable)`
  & tbody {
    & th {
      vertical-align: top;
    }
  }
`;
