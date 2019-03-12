import theme from 'theme/Theme';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarNavListContainer = styled.div`
  background-color: ${theme.color.zoomGreyZero};
  padding: 20px;
`;

export const SidebarNavList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SidebarNavListItem = styled(Link)`
  border: none;
  color: ${theme.color.aidsFondsRed};
  border-radius: initial;
  font-family: ${theme.font.zoomFontFamTwo};
  display: flex;
  padding-left: 0;
  padding-right: 0;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 16px;
  transition: opacity 200ms ease-out;

  &:last-child {
    margin-bottom: 0;
    opacity: 0.5;
  }

  &:hover {
    opacity: 0.5;
  }
`;
