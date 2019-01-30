import styled from 'styled-components';
import {
  aidsFondsBlue,
  zoomFontFamOne,
  zoomGreyThree,
} from 'components/theme/ThemeSheet';
import iconCheck from 'assets/icons/IconCheck';

/*TODO: clean up, and put variables in the themesheet*/

// STEP ITEM
////////////////////////////////////////////////////////////////////////////////
export const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  width: 100%;
`;

export const StepLabel = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1;
  font-family: ${zoomFontFamOne};
  color: ${props => (props.colores ? aidsFondsBlue : zoomGreyThree)};
`;

export const StepIcon = styled.div`
  border-radius: 50%;
  background-color: ${props => (props.colores ? aidsFondsBlue : zoomGreyThree)};
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
  flex-shrink: 0;
`;

export const StepCompleteIcon = styled(iconCheck)`
  display: block;
`;
export const StepNumber = styled.span`
  font-size: 12px;
  line-height: 1;
  color: white;
  font-family: ${zoomFontFamOne};
`;

export const StepSpacer = styled.div`
  height: 2px;
  width: 50%;
  visibility: ${props => (props.outer ? 'hidden' : 'visible')};
  background: ${props => (props.colores ? aidsFondsBlue : zoomGreyThree)};
`;
