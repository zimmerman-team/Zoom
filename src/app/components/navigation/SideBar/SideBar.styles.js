import styled from 'styled-components';
import { Box, Button, Layer, RoutedButton } from 'grommet/es6';
import {
  aidsFondsRed,
  zoomFontFamTwo,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';

export const CloseButton = styled(Button)`
  padding: 0;
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamTwo};
  font-size: 14px;
`;

export const SidebarNavListContainer = styled(Box)`
  background-color: ${zoomGreyZero};
  padding: 20px;
`;

export const SidebarNavList = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const SidebarNavListItem = styled(RoutedButton)`
  border: none;
  color: ${aidsFondsRed};
  border-radius: initial;
  font-family: ${zoomFontFamTwo};
  display: flex;
  padding-left: 0;
  padding-right: 0;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 16px;
  transition: opacity 200ms ease-out;

  &:last-child {
    margin-bottom: 0;
    opacity: 0.5;
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const SideBarLayer = styled(Layer)`
  border-radius: 0;
`;

export const SidebarHeader = styled(Box)`
  padding: 20px;
  padding-bottom: 8px;
  padding-top: 8px;
`;

export const LoginContainer = styled(Box)`
  width: 100px;
  height: 100px;
`;
