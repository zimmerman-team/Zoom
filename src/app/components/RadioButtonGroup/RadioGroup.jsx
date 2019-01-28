/* base */
import React from 'react';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import RadioGroup from '@material-ui/core/RadioGroup';

export default styled(({ direction, ...props }) => (
  <NoSsr>
    <RadioGroup {...props} />
  </NoSsr>
))`
  && {
    margin: 0;
    display: flex;
    flex-direction: ${props => props.direction};
  }
`;
