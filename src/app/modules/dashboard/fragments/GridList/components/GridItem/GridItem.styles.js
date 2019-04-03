import styled from 'styled-components';
import Theme from 'theme/Theme';
import { NavLink } from 'react-router-dom';

export const ComponentBase = styled(NavLink)`
  //CSS router Link reset
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${Theme.color.zoomBlack};
  }

  min-height: 145px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 39px;
  width: 285px;
  padding: 15px;
  background-color: ${Theme.color.zoomGreyZero};
  box-shadow: 0 2px 4px 2px rgba(157, 157, 157, 0.5);
  margin-left: 6px;

  &:hover {
    cursor: pointer;
  }
`;

export const GridItemHeading = styled.div`
  font-family: ${Theme.font.zoomFontFamTwo};
  font-size: 18px;
  line-height: 1;
  color: ${Theme.color.aidsFondsRed};
  margin-bottom: 15px;
`;

export const Box = styled.div`
  height: 100%;
`;

export const GridItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
