import styled from 'styled-components';
import { Box, Button, Image } from 'grommet';
import theme from 'theme/Theme';

export const ComponentBase = styled(Box)`
  height: 40px;
  width: 100vw;
  padding: 10px 16px 10px 10px;
  display: flex;
  margin: 0;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${theme.color.aidsFondsWhite};
`;

export const AidsFondLogo = styled(Image)`
  height: 25px;
  user-select: none;
`;

export const MenuButton = styled(Button)`
  padding: 0;
  margin-right: 25px;
  height: 24px;
`;

export const PaneButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-left: auto;
  display: flex;
`;

export const PaneButtonText = styled.div`
  margin-left: 12px;
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
`;

export const PaneButContainer = styled.div`
  display: flex;
`;

export const PaneButtonVar = styled(PaneButton)`
  background-color: ${theme.color.zoomGreyZero}
  
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.zoomGreyOne}
  }
`;
