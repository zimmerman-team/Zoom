/* base */
import React from 'react';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import CircularProgress from '@material-ui/core/CircularProgress';

export default styled(({ ...props }) => (
  <NoSsr>
    <CircularProgress size={100} {...props} />
  </NoSsr>
))`
  && {
    z-index: 1;
    position: fixed;
    top: 40%;
    left: 46%;
  }
`;
