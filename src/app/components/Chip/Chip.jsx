/* base */
import React from 'react';
import styled from 'styled-components';

import NoSsr from '@material-ui/core/NoSsr';
import Chip from '@material-ui/core/Chip';

import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';

export default styled(props => (
  <NoSsr>
    <Chip {...props} />
  </NoSsr>
))`
  && {
    background-color: ${aidsFondsBlue};
    border-radius: 5px;
    margin: 0;
    margin-right: 20px;
    margin-bottom: 3px;
    span {
      line-height: 1;
      color: ${aidsFondsWhite};
      font-family: ${zoomFontFamTwo};
      margin-right: 10px;
    }

    svg {
      fill: white;
      fill-opacity: 0.7;
    }
  }
`;
