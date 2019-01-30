/* base */
import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconBoxUnchecked from 'assets/icons/IconBoxUnchecked';
import NoSsr from '@material-ui/core/NoSsr';
import { aidsFondsBlue } from 'components/theme/ThemeSheet';

/*TODO: add checked icon*/
const IconUnchecked = (
  <SvgIcon>
    <IconBoxUnchecked />
  </SvgIcon>
);

export default styled(props => (
  <NoSsr>
    <Checkbox disableRipple icon={IconUnchecked} {...props} />
  </NoSsr>
))`
  && {
    padding: 0;
    margin-right: 5px;
    svg {
      fill: ${aidsFondsBlue};
    }
  }
`;
