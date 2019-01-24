import styled from 'styled-components';
import { Box, TextInput } from 'grommet';
import {
  ZoomTable,
  ZoomButton,
  zoomGreyFour,
  ColumnHeader,
  CellValue,
} from 'components/theme/ThemeSheet';

export const CreateTeamForm = styled.form`
  padding: 0 40px;
  width: 100%;
`;

export const TableBox = styled(Box)`
  margin: 40px 0;
  border-bottom: 1px solid ${zoomGreyFour};
`;

export const UsersTable = styled(ZoomTable)`
  & tbody {
    & td {
      &:first-child {
        width: 40px;
        height: 40px;
      }
      &:last-child {
        width: 40px;
        height: 40px;
      }
    }
  }
  & th {
    &:first-child {
      width: 40px;
      height: 40px;
    }
    &:last-child {
      width: 40px;
      height: 40px;
    }
  }
`;

export const UsersTableColHeader = styled(ColumnHeader)`
  padding: 5px 0 5px 15px;
`;

export const UsersTableCellValue = styled(CellValue)`
  padding: 12px 0 12px 15px;
`;

export const SubmitButton = styled(ZoomButton)`
  margin-top: 40px;
`;

export const Message = styled(Box)`
  color: ${props => props.theme.color};
  font-size: 20px;
  margin-top: 40px;
`;

export const TextField = styled(TextInput)`
  font-size: 12px;
  margin: 10px 0;
  border-radius: 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${zoomGreyFour};
  padding-left: 35px;
  // -webkit-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // -moz-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5);
`;
