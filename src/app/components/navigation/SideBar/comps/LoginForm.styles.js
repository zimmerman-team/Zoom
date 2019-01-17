import styled from 'styled-components';
import { Box, TextInput, Text } from 'grommet';
import {
  zoomGreyZero,
  ZoomButton,
  aidsFondsRed,
} from 'components/theme/ThemeSheet';

export const ComponentBase = styled.form`
  padding: 20px;
`;

export const LoginHeader = styled(Box)`
  display: flex;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const LoginHeaderLabel = styled(Text)`
  padding-left: 10px;
`;

export const TextField = styled(TextInput)`
  font-size: 12px;
  margin: 10px 0;
  border-radius: 0;
  border-style: none;
  background: ${zoomGreyZero};
  -webkit-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  -moz-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5);
`;

export const SignInButton = styled(ZoomButton)`
  margin: 10px 0;
`;

export const ForgotPassLink = styled.a`
  font-size: 10px;
  color: ${aidsFondsRed};
`;

export const InfoText = styled(Text)`
  display: block;
  margin-top: 20px;
`;

export const EmailLink = styled.a`
  text-decoration: none;
  color: ${aidsFondsRed};
`;
