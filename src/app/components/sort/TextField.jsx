/* base */
import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(props => (
  <NoSsr>
    <TextField
      id="standard-full-width"
      placeholder="Placeholder"
      fullWidth
      margin="none"
      InputProps={{
        disableUnderline: true
      }}
      InputLabelProps={{
        disableAnimation: true
      }}
      {...props}
    />
  </NoSsr>
))`
  && {
    font-size: 14px;
    color: black;
    font-family: ${theme.font.zoomFontFamTwo};
    margin: 0;

    &:before {
      left: 0;
      right: 0;
      bottom: 0;
      content: '\\00a0';
      position: absolute;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid #9b9b9b;
      pointer-events: none;
    }

    &:after {
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      position: absolute;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid #303f9f;
      pointer-events: none;
    }

    // & [class*='MuiFormLabel-root'] {
    //   color: ${theme.color.colHeadColor};
    //   font-weight: 500;
    //   font-size: 18px;
    //   font-family: ${theme.font.zoomFontFamOne};
    // }
    //
    // & [class*='MuiInputLabel-focused'] {
    //   color: ${theme.color.aidsFondsBlue};
    // }
    //
    // & [class*='MuiInputBase-focused'] {
    //   border-bottom: 1px solid ${theme.color.aidsFondsBlue};
    // }
    //
    // & [class*='MuiInputLabel-error'] {
    //   color: ${theme.color.aidsFondsRed};
    // }
    //
    // & [class*='MuiPrivateTextarea-root'] {
    //   padding-top: 10px;
    // }
    //
    // & input,
    // textarea {
    //   font-family: ${theme.font.zoomFontFamTwo};
    //   font-size: 14px;
    // }
    //
    // & input {
    //   padding-top: 14px;
    // }
    //
    // & [class*='MuiInput-error'] {
    //   border-bottom: 1px solid ${theme.color.aidsFondsRed};
    // }
  }
`;
