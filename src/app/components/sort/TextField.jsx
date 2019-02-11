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

    /*  &:before {
      left: 0;
      right: 0;
      bottom: 0;
      content: '\\00a0';
      position: absolute;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
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
      border-bottom: 2px solid #303f9f;
      pointer-events: none;
    }*/

    input {
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
    }
  }
`;
