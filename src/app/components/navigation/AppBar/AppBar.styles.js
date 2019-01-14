import styled from 'styled-components';
import { Box, Button, Image } from 'grommet';
import { aidsFondsWhite } from 'components/theme/ThemeSheet';

export const ModuleContainer = styled(Box)`
  height: 40px;
  width: 100vw;
  padding: 10px;
  display: flex;
  margin: 0;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${aidsFondsWhite};
`;

export const AidsFondLogo = styled(Image)`
  height: 25px;
  user-select: none;
`;

export const MenuButton = styled(Button)`
  padding: 0;
  margin-right: 25px;
`;
