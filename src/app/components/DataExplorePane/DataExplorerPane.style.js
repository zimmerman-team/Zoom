import styled from 'styled-components';
import {
  zoomFontFamTwo,
  zoomGreyZero,
  zoomGreyThree,
} from 'components/theme/ThemeSheet';
import { Box, Accordion, AccordionPanel } from 'grommet';

export const ComponentBase = styled.div`
  width: 320px;
  padding-top: 20px;
`;

export const FilterTitle = styled.span`
  font-family: ${zoomFontFamTwo};
  font-size: 16px;
`;

export const ExplorerHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

export const FilterContainer = styled(Box)`
  background-color: ${zoomGreyZero};
  padding: 12px 0;
`;

export const PanelAccordion = styled(Accordion)`
  overflow: unset;
`;

export const AccordionSection = styled(AccordionPanel)`
  // border-bottom: 1px solid ${zoomGreyThree};
`;

export const ResetContainer = styled.div`
  display: flex;
  margin: 15px 0 0 12px;
  &:hover {
    cursor: pointer;
  }
`;
