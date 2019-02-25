import styled from 'styled-components';
import theme from 'theme/Theme';

export const FilterLabel = styled.div`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  height: fit-content;
  margin-bottom: auto;
  margin-top: auto;
  color: ${theme.color.aidsFondsRed};
`;

export const ComponentBase = styled.div`
  display: flex;
  color: ${theme.color.aidsFondsRed};
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
