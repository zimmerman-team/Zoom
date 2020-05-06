import styled from "styled-components";
import { Popup } from "react-map-gl";
import theme from "app/theme/Theme";

export const ToolTipContainer = styled(Popup)`
  z-index: 1;
  min-width: 338px;
  // max-height: 30vh;
  & .mapboxgl-popup-content {
    background-color: ${theme.color.white};
    padding: 15px 12px;
  }
`;

export const ToolTipLabel = styled.div`
  margin-top: 4px;
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
  flex-direction: column;
  margin-bottom: 14px;
`;

export const ToolTipTitle = styled(ToolTipLabel)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 21px;
  margin-bottom: 18px;
`;
