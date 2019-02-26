import React from 'react';
import ChipInput from 'material-ui-chip-input';
import NoSsr from '@material-ui/core/NoSsr';
import styled from 'styled-components';
import theme from 'theme/Theme';


const Component = styled(ChipInput)`
&&{ 
   display: flex;
   flex-direction: column;
   border-bottom: 1px solid ${theme.color.colHeadColor};
   
   div {
   min-height: 30px;
   }
   
   &:focus-within {
      border-bottom: 1px solid ${theme.color.aidsFondsBlue};
   } 
   
   input {
      color: ${theme.color.zoomBlack};
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
      line-height: 1;
      padding-bottom: 5px;
  }
  
  label {
      position: relative;
      margin-bottom: 20px;
      color: ${theme.color.colHeadColor};
      font-family: ${theme.font.zoomFontFamOne};
      font-size: 14px;
      line-height: 1;
    }
    
   div [role=button]{
      background-color: ${theme.color.aidsFondsBlue};
      border-radius: 5px;
      height: 25px;
      min-height: 0;
      line-height: 1;
      
      span{
       color: ${theme.color.aidsFondsWhite};
       font-family: ${theme.font.zoomFontFamOne};
      }
      
      svg{
       fill: ${theme.color.aidsFondsWhiteOpacity};
      }   
   }   
}
`;
const Container = props => {
  return (
    <NoSsr>
      <Component
        clickable="false"
        disableUnderline
        label="Empty"
        InputLabelProps={{
          shrink: false
        }}
        {...props}
      />
    </NoSsr>
  );
}

export default Container;
