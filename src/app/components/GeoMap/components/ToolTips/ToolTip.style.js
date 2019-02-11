import styled from 'styled-components';
import { Popup } from 'react-map-gl';
import theme from 'theme/Theme';

export const ToolTipContainer = styled(Popup)`
  z-index: 1;
  width: 320px;
  & .mapboxgl-popup-content {
    background-color: rgba(239, 239, 239, 0.67);
    padding: 16px;
  }

  & .mapboxgl-popup-tip {
    display: none;
  }
`;

export const ToolTipText = styled.div`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;

export const ToolTipLabel = styled(ToolTipText)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 21px;
  margin-bottom: 12px;
`;
