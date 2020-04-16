/* base */
import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'app/theme/Theme';

export default styled(props => (
  <NoSsr>
    <Checkbox {...props} />
  </NoSsr>
))`
  && {
    padding: 0;
    margin: auto 20px auto 0;
    svg {
      width: 18px;
      height: 18px;
      border-radius: 3px;
      fill: ${theme.color.aidsFondsRed};
    }
  }
`;
