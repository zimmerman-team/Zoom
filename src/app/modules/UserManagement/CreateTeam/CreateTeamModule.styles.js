import styled from 'styled-components';
import { Box, TextInput } from 'grommet';
import { ZoomButton, zoomGreyOne } from 'components/theme/ThemeSheet';

export const CreateTeamForm = styled.form`
  padding: 0 40px;
  width: 100%;
`;

export const TableBox = styled(Box)`
  margin: 40px 0;
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
  border-color: ${zoomGreyOne};
  // -webkit-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // -moz-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5);
`;
