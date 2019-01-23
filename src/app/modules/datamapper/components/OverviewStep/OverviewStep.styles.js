import styled from 'styled-components';
import { Box } from 'grommet';
import {
  aidsFondsWhite,
  CellValue,
  SectionHeading,
  zoomFontFamTwo,
} from 'components/theme/ThemeSheet';

export const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
  padding: 0px 1% 95px 1%;
`;

export const OverviewTitle = styled(SectionHeading)`
  text-align: center;
`;

export const CellLine = styled.div`
  display: flex;
`;

export const CellText = styled(CellValue)`
  font-family: ${zoomFontFamTwo};
  margin-left: 4px;
`;
