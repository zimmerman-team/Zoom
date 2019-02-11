import Theme from 'theme/Theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.color.zoomGreyZero};
`;

export const CenterTabs = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 20px 0 20px;
  margin-left: ${props => props.theme.marginLeft};
  padding-right: ${props => props.theme.paddingRight};
`;

export const TabBadge = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${Theme.color.aidsFondsWhite};
  font-family: ${Theme.font.zoomFontFamOne};
  background-color: ${Theme.color.aidsFondsRed};
`;

export const TabText = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  padding: 6px 2px 0 2px;
  color: ${props => props.theme.color};
  font-family: ${Theme.font.zoomFontFamOne};
  border-bottom: ${props => props.theme.border};

  &:hover {
    color: ${Theme.color.zoomBlack};
    border-bottom: ${Theme.border.dashboardTab};
  }
`;
