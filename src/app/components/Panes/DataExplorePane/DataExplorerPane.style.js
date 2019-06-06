import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import { Accordion } from 'grommet/components/Accordion';
import { AccordionPanel } from 'grommet/components/AccordionPanel';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  z-index: 8;
  width: 320px;
  overflow: auto;
  height: inherit;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);
  background-color: ${theme.color.aidsFondsWhite};
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
  padding-bottom: 6px;
  padding-top: 6px;
`;

export const PanelAccordion = styled(Accordion)`
  overflow: unset;
`;

export const AccordionSection = styled(AccordionPanel)``;

export const ResetContainer = styled.div`
  width: fit-content;
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
