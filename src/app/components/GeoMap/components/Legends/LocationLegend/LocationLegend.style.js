import styled from 'styled-components';
import { LegendItem } from 'components/GeoMap/components/Legends/Legend.styles';
import theme from 'theme/Theme';

export const LocationLegendItem = styled(LegendItem)`
  width: fit-content;
`;

export const LocationName = styled.div`
  height: ${theme.fontSize.caption};
  color: ${theme.color.zoomGreyTwo};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 10px;
  font-weight: ${theme.weight.book};
  position: relative;
  bottom: 6px;
  margin-left: 5px;
`;

export const LocItemContainer = styled.div`
  display: flex;
`;
