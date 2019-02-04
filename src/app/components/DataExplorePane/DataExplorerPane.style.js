import styled from 'styled-components';
import { Box, Accordion, AccordionPanel } from 'grommet';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  width: 320px;
  padding-top: 20px;
`;

export const FilterTitle = styled.span`
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 16px;
`;

export const ExplorerHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

export const FilterContainer = styled(Box)`
  background-color: ${theme.color.zoomGreyZero};
  padding: 12px 0;
`;

export const PanelAccordion = styled(Accordion)`
  overflow: unset;
`;

export const AccordionSection = styled(AccordionPanel)``;

export const ResetContainer = styled.div`
  display: flex;
  margin: 15px 0 0 12px;
  &:hover {
    cursor: pointer;
  }
`;

export const DropDownCont = styled.div`
  background-color: ${theme.color.aidsFondsWhite};
  margin: 6px 20px 6px 18px;
`;
