import styled from 'styled-components';
import { zoomFontFamOne, aidsFondsRed } from 'components/theme/ThemeSheet';

export const ComponentBase = styled.div`
  display: flex;
  border-radius: 0;
  font-family: ${zoomFontFamOne};
  font-weight: normal;
  font-size: 14px;
  color: ${aidsFondsRed};
  margin-right: auto;
  height: 41px;
  ::-webkit-input-placeholder {
    color: ${aidsFondsRed};
  }
`;

export const PointerContainer = styled.div`
  height: fit-content;
  margin: auto 24px auto 14px;
`;

export const LabelContainer = styled.div`
  margin: auto 0;
`;
