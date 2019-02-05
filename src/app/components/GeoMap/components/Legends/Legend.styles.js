import styled from 'styled-components';
import {
  zoomBlack,
  zoomFontFamOne,
  smallTextBlack,
  zoomFontFamTwo,
} from 'components/theme/ThemeSheet';

export const LegendItem = styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: white;
  margin-top: 14px;
  padding: 4px 26px 14px 18px;
  background-color: rgba(239, 239, 239, 0.72);
`;

export const LegendLabel = styled.div`
  padding: 10px 0;
  margin-left: 3px;
  line-height: 12px;
  color: ${zoomBlack};
  font-family: ${zoomFontFamOne};
  font-size: 10px;
`;

export const LegendIcon = styled.div`
  width: fit-content;
  margin: auto;
`;

export const LegendNumberContainer = styled.div`
  display: flex;
`;

export const LegendNumber = styled.div`
  color: ${smallTextBlack};
  margin: auto;
  font-family: ${zoomFontFamTwo};
  font-size: 10px;
  line-height: 12px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;
