/* base */
import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(props => (
  <NoSsr>
    <Paper {...props} />
  </NoSsr>
))`
  && {
    padding: 0;
    margin: 0;
    width: 300px;
    //max-width: 1000px;
  }
`;
