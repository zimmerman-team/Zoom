import styled from 'styled-components';
import { Box } from 'grommet';
import { SectionHeading } from 'components/sort/Headings';

import ZoomTable from 'components/ZoomTable/ZoomTable';
import ColumnHeader from 'components/ZoomTable/ColumnHeader';
import CellValue from 'components/ZoomTable/CellValue';
import theme from 'theme/Theme';

export const ModuleContainer = styled(Box)`
  width: 100%;
  background-color: ${theme.color.aidsFondsWhite};
  padding: 0 1% 40px 1%;
`;

export const ErrorTitle = styled(SectionHeading)`
  margin-bottom: 16px;
`;

export const HeaderCheckBox = styled.div`
  width: fit-content;
  margin: auto;
`;

export const CheckBox = styled(HeaderCheckBox)`
  margin: 6px auto 6px auto;
`;

export const ErrorCell = styled(CellValue)`
  padding-left: 20px;
  padding-right: 8px;
  &:hover {
    cursor: pointer;
  }
`;

export const ErrorColHeader = styled(ColumnHeader)`
  padding-left: 20px;
`;

export const ErrorTable = styled(ZoomTable)`
  & tbody {
    & th {
      vertical-align: middle;
    }
    & td {
      vertical-align: middle !important;
      &:first-child {
        width: 52px;
        height: 44px;
      }
    }
  }
  & th {
    &:first-child {
      width: 52px;
      height: 30px;
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
`;

export const TabText = styled.div`
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  margin: 0 9px;
  &:hover {
    cursor: pointer;
  }
`;

export const TabDivider = styled(TabText)`
  &:hover {
    cursor: unset;
  }
`;

export const ButtonContainer = styled.div`
  height: 30px;
  margin: 5px;
`;
