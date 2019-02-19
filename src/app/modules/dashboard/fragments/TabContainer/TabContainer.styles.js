import Theme from 'theme/Theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.color.zoomGreyZero};
  padding-bottom: 10px;
`;

export const TabItems = styled.div`
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

export const TabText = styled.div`

display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  padding: 6px 2px 0 2px;
  
  color: ${props => props.theme.color};

  font-family: ${Theme.font.zoomFontFamOne};
  border-bottom: ${props => props.theme.border};
  
     &:before{
   background-color: blue;
   width: 10px;
   height: 10px;
    }

  &:hover {
    //position: relative;
    color: ${Theme.color.zoomBlack};
     //border-bottom: ${Theme.border.dashboardTab};
   
  
  

}

`;
