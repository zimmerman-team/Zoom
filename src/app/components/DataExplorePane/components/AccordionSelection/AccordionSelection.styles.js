import styled from 'styled-components';
import {
  zoomFontFamOne,
  aidsFondsRed,
  zoomGreyThree,
} from 'components/theme/ThemeSheet';

export const FilterLabel = styled.div`
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  height: fit-content;
  margin-bottom: auto;
  margin-top: auto;
  color: ${aidsFondsRed};
`;

export const ComponentBase = styled.div`
  display: flex;
  color: #ff0100;
`;

export const IconContainer = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
`;

export const PointerContainer = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  margin-left: auto;
`;
