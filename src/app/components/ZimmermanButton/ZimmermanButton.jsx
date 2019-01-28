import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import { zoomFontFamTwo } from 'components/theme/ThemeSheet';
const StyledButton = styled(Button)`
  && {
    background: red;
    border-radius: 15px;
    border: 0;
    color: white;
    height: 30px;
    width: 75px;
    padding: 0 30px;
    font-family: ${zoomFontFamTwo};
    font-size: 14px;
    text-transform: lowercase;

    &:hover {
      color: red;
      background-color: white;
      border: 1px solid red;
    }
  }
`;

function ZimmermanButton() {
  return (
    <NoSsr>
      <StyledButton disableRipple>next</StyledButton>
    </NoSsr>
  );
}

export default ZimmermanButton;
