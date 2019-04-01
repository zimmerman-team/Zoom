import styled from 'styled-components';
import { Box, Text, Form } from 'grommet';
import theme from 'theme/Theme';

import ZoomButton from 'components/ZoomButton/ZoomButton';

export const AddUserForm = styled.form`
  padding: 0 40px;
  width: 100%;
`;

export const DropDownContainer = styled(Box)`
  margin-right: 40px;
  width: 280px;
`;

export const DropDownLabel = styled.span`
  color: #9b9b9b;
  margin-bottom: 5px;
  margin-top: 10px;
  font-family: ${theme.font.zoomFontFamOne};
  font-weight: 500;
  font-size: 14px;
`;

export const SubmitButton = styled(ZoomButton)`
  margin-top: 40px;
`;

export const Message = styled(Box)`
  color: ${props => props.theme.color};
  font-size: 20px;
  margin-top: 40px;
`;
