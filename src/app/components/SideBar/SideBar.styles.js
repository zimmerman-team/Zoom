import styled from 'styled-components';
import { Box, Button, Layer, RoutedButton } from 'grommet';
import theme from 'theme/Theme';

export const CloseButton = styled(Button)`
  padding: 0;
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
`;

export const SidebarNavListContainer = styled(Box)`
  background-color: ${theme.color.zoomGreyZero};
  padding: 20px;
`;

export const SidebarNavList = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const SidebarNavListItem = styled(RoutedButton)`
  border: none;
  color: ${theme.color.aidsFondsRed};
  border-radius: initial;
  font-family: ${theme.font.zoomFontFamTwo};
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
