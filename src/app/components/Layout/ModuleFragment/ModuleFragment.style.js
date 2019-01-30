import styled from 'styled-components';
import { aidsFondsRed, aidsFondsWhite, zoomFontFamOne, zoomFontFamTwo } from 'components/theme/ThemeSheet';

import { Box } from 'grommet';

export const FragmentInfoButton = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${aidsFondsRed};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    background-color: darkgrey;
  }

  &:after {
    content: 'i';
    font-size: 13px;
    text-align: center;
    color: ${aidsFondsWhite};
    font-family: ${zoomFontFamOne};
    user-select: none;
  }
`;

export const FragmentInfo = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  background-color: white;
  padding: 20px;
  z-index: 2;
  border-radius: 2%;
  font-family: ${zoomFontFamTwo};
`;
