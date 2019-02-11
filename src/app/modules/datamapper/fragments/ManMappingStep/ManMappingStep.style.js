import styled from 'styled-components';
import { Box } from 'grommet';
import { SectionHeading } from 'components/sort/Headings';
import TextField from '@material-ui/core/TextField';
import theme from 'theme/Theme';
import ZoomTable from 'components/ZoomTable/ZoomTable';
import ColumnHeader from 'components/ZoomTable/ColumnHeader';
import CellValue from 'components/ZoomTable/CellValue';

export const ModuleContainer = styled(Box)`
  width: 100%;
  background-color: ${theme.color.aidsFondsWhite};
  padding: 0px 1% 364px 1%;
`;

export const ColHeader = styled(ColumnHeader)`
  padding-left: 4px;
`;

export const ZoomColHeader = styled(ColumnHeader)`
  padding-left: 56px;
`;

export const Cell = styled.div`
  display: flex;
  width: 100%;
  padding-left: 6px;
`;

export const CellLine = styled.div`
  width: 73%;
  height: 1px;
  border-bottom: 1px solid #9f9f9f;
  margin: auto 18px auto auto;
`;

export const ManMapTable = styled(ZoomTable)`
  & th {
    &:first-child {
      width: 42%;
    }
    &:last-child {
      width: 42%;
    }
  }

  & tbody {
    & th {
      height: 45px;
      vertical-align: middle;
    }

    & td {
      height: 45px;
      vertical-align: middle !important;
    }
  }
`;

export const CellTextField = styled(TextField)`
  margin: 0 !important;
  width: 88%;
  height: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: ${theme.color.aidsFondsWhite};
  & fieldset {
    border: 0;
  }
  & input {
    margin-top: 2px;
    padding: 0;
  }
`;

export const CellButton = styled(CellValue)`
  height: fit-content;
  margin: auto 0 auto auto;
  padding: 0 20px;
  color: ${theme.color.aidsFondsRed};
  &:hover {
    cursor: pointer;
  }
`;

export const ManMapTitle = styled(SectionHeading)`
  margin-bottom: 86px;
`;
