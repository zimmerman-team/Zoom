import styled from 'styled-components';
import { Box } from 'grommet';
import {
  aidsFondsRed,
  aidsFondsWhite,
  CellValue,
  ColumnHeader,
  SectionHeading,
  zoomFontFamOne,
  ZoomTable,
} from 'components/theme/ThemeSheet';

export const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
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
  margin: 7px auto 0 auto;
`;

export const ErrorCell = styled(CellValue)`
  padding-top: 6px;
  padding-left: 20px;
  padding-right: 8px;
`;

export const ErrorColHeader = styled(ColumnHeader)`
  padding-left: 20px;
`;

export const ErrorTable = styled(ZoomTable)`
  & tbody {
    & td {
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
  wdith: fit-content;
  margin: 0 auto 14px auto;
`;

export const TabText = styled.div`
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamOne};
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
