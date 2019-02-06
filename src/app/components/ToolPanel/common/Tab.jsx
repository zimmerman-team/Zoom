/* base */
import React from 'react';
import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';
import { withStyles } from '@material-ui/core/styles';

export default styled(props => (
  <NoSsr>
    <Tab disableRipple {...props} />
  </NoSsr>
))`
  && {
    padding: 0;
    margin: 0;
    width: 50px;
    height: 40px;
    min-width: initial;
    max-width: initial;
    //outline: 1px solid white;
    //background-color: ${theme.color.aidsFondsRed};
  }
`;
