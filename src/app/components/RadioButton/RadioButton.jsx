/* base */
import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconRadioUnchecked from 'assets/icons/IconRadioUnchecked';
import NoSsr from '@material-ui/core/NoSsr';
import { aidsFondsBlue } from 'components/theme/ThemeSheet';

/*TODO: add checked icon*/

const IconUnchecked = (
  <SvgIcon>
    <IconRadioUnchecked />
  </SvgIcon>
);

export default styled(props => (
  <NoSsr>
    <Radio disableRipple icon={IconUnchecked} {...props} />
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
