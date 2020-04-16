import styled from 'styled-components';
import { LegendLabel } from 'app/components/GeoMap/components/Legends/Legend.styles';
import theme from 'app/theme/Theme';

export const CircleLegendItem = styled.div`
  display: flex;
`;

export const CircleNumber = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0 19px;
  margin: auto auto 0 auto;
  &:first-child {
    padding-left: 0;
    margin-left: 0;
  }
  &:last-child {
    padding-right: 0;
    margin-right: 0;
  }
`;

export const CircleLegendLabel = styled(LegendLabel)`
  padding-bottom: 0;
`;

export const CircleLegendNum = styled.div`
  margin: 0 auto;
  color: ${theme.color.smallTextBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 10px;
  line-height: 12px;
`;
