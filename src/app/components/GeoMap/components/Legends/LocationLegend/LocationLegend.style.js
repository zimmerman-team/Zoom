import styled from 'styled-components';
import {
  LegendItem,
  LegendLabel
} from 'app/components/GeoMap/components/Legends/Legend.styles';
import theme from 'app/theme/Theme';

export const LocationLegendItem = styled(LegendItem)``;

export const LocationName = styled.div`
  color: ${theme.color.smallTextBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${theme.fontSize.caption};
  font-weight: ${theme.weight.book};
  position: relative;
  top: 1px;
  margin-left: 8px;
`;

export const LocationLegendLabel = styled(LegendLabel)`
  padding: 24px 0 16px 0;
  font-size: ${theme.fontSize.caption};
  line-height: 1.2;
  letter-spacing: 0.2px;
`;

export const LocItemContainer = styled.div`
  display: flex;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

export const ScgIconContainer = styled.div`
  height: 24px;
  width: 24px;
`;
