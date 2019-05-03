import styled from 'styled-components';
import { Popup } from 'react-map-gl';
import theme from 'theme/Theme';

export const ToolTipContainer = styled(Popup)`
  z-index: 1;
  min-width: 320px;
  & .mapboxgl-popup-content {
    background-color: rgba(239, 239, 239, 0.67);
    padding: 16px 16px 30px 16px;
  }

  & .mapboxgl-popup-tip {
    display: none;
  }
`;

export const ToolTipLabel = styled.div`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
  line-height: 16px;
  text-align: left;
`;

export const ToolTipText = styled.span`
  color: ${theme.color.aidsFondsRed};
  margin-left: 4px;
`;

export const ValueContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

export const ToolTipTitle = styled(ToolTipLabel)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 21px;
  margin-bottom: 22px;
`;
