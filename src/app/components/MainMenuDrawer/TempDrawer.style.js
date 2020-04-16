/* base */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* material ui */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import theme from 'app/theme/Theme';

export const CloseButton = styled.button`
  padding: 0;
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
`;

export const LoginBox = styled.div`
  width: 320px;
`;

export const SidebarNavList = styled(List)`
  && {
    width: 320px;
    background-color: ${theme.color.zoomGreyZero};
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const SidebarNavListItem = styled(ListItem)`
  && {
    display: flex;
    padding-top: 6px;
    padding-bottom: 6px;
    line-height: 1;
  }
`;

export const SidebarClosButton = styled(SidebarNavListItem)`
  height: 40px;
`;

export const ZoomListItemText = styled(ListItemText)`
  && {
    padding: 0;
    span {
      color: ${theme.color.aidsFondsRed};
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
    }
  }
`;

export const ZoomLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;
