/* base */
import React from 'react';
import styled from 'styled-components';

import NoSsr from '@material-ui/core/NoSsr';
import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';
import ChipInput from 'material-ui-chip-input';

export default styled(props => (
  <NoSsr>
    <ChipInput {...props} />
  </NoSsr>
))`
  && {
    & .MuiInputBase-root-18 {
      display: flex;
    }

    & input {
      padding-bottom: 8px;
      margin-top: auto;
    }

    & div[role='button'] {
      background-color: ${aidsFondsBlue};
      border-radius: 5px;
      & span {
        line-height: 1;
        color: ${aidsFondsWhite};
        font-family: ${zoomFontFamTwo};
        font-size: 14px;
        margin-right: 10px;
      }

      & svg {
        fill: white;
        fill-opacity: 0.7;
      }
    }
  }
`;
