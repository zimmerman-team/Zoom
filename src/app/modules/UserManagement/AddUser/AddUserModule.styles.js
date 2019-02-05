import styled from 'styled-components';
import { Box, Text, Form } from 'grommet';

import ZoomButton from 'components/ZoomButton/ZoomButton';

export const AddUserForm = styled.form`
  padding: 0 40px;
  width: 100%;
`;

export const DropDown = styled(Box)`
  margin-right: 40px;
`;

export const DropDownLabel = styled(Text)`
  color: #9b9b9b;
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const SubmitButton = styled(ZoomButton)`
  margin-top: 40px;
`;

export const Message = styled(Box)`
  color: ${props => props.theme.color};
  font-size: 20px;
  margin-top: 40px;
`;
