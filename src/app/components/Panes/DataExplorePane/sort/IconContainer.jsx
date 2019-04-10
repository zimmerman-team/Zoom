/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'theme/Theme';

const IconContainer = styled(props => <div {...props} />)`
  display: flex;
  height: 40px;
  width: 40px;
  &&& {
    padding-right: 0;
  }
  && svg {
    fill: ${props => props.styles.color};
  }
`;

export default IconContainer;
