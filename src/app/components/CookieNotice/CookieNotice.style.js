import styled from 'styled-components';
import theme from 'app/theme/Theme';
import { NavLink } from 'react-router-dom';

/* general */
const CookieNoticeBackground = theme.color.zoomGrey14;
const CookieNoticeFontFam = theme.font.zoomFontFamTwo;
const CookieNoticeTextColor = theme.color.aidsFondsWhite;
const CookieNoticeFontWeight = 400;
/* cookie message */
const CookieMessageFontSize = theme.fontSize.cookieNoticMessage;
/* cookie button */
const CookieButtonBorderColor = theme.color.aidsFondsWhite;
const CookieButtonFontSize = theme.fontSize.cookieNoticeButton;
/* hovers */
const HoverOpacity = 0.5;

export const ComponentBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${CookieNoticeBackground};
  width: 100vw;
  height: 130px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 10;
`;

export const CookieMessage = styled.p`
  color: ${CookieNoticeTextColor};
  font-size: ${CookieMessageFontSize};
  font-family: ${CookieNoticeFontFam};
  font-weight: ${CookieNoticeFontWeight};
  margin: auto;
  max-width: 674px;
  width: 100%;
  line-height: 25.6px;
`;

export const Spacer = styled.div`
  width: 60px;
`;

/* todo: create separate component for the cookie button */
export const CookieButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0 8px 5px 8px;
  height: fit-content;
  text-decoration: none;
  color: ${CookieNoticeTextColor};
  font-family: ${CookieNoticeFontFam};
  font-weight: ${CookieNoticeFontWeight};
  font-size: ${CookieButtonFontSize};
  border-radius: 50px;
  border: 2px solid ${CookieButtonBorderColor};
  cursor: pointer;
  &:hover {
    opacity: ${HoverOpacity};
  }
  margin: 8px 8px auto 0;
`;

export const CookieInfoLink = styled(NavLink)`
  color: white;
  &:hover {
    opacity: ${HoverOpacity};
  }
`;
