import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from 'app/theme/Theme';

export const ComponentBase = styled.div``;

export const NavPaneItem = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: 16px 24px;
  color: ${theme.color.aidsFondsRed};
  border-bottom: 1px solid ${theme.color.zoomGreySeven};
  &:hover {
    background-color: ${theme.color.zoomGreyZero};
    cursor: pointer;
  }
`;

export const ItemLabel = styled.div`
  margin-left: 16px;
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 13px;
`;

export const ItemIcon = styled.div`
  transform: rotate(90deg);
  width: fit-content;
`;
