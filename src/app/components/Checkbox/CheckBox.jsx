/* base */
import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconBoxUnchecked from 'assets/icons/IconBoxUnchecked';
import IconBoxChecked from 'assets/icons/IconBoxChecked';

import NoSsr from '@material-ui/core/NoSsr';

const IconUnchecked = (
  <SvgIcon>
    <IconBoxUnchecked />
  </SvgIcon>
);

const IconChecked = (
  <SvgIcon>
    <IconBoxChecked />
  </SvgIcon>
);

export default styled(props => (
  <NoSsr>
    <Checkbox
      disableRipple
      icon={IconUnchecked}
      checkedIcon={IconChecked}
      {...props}
    />
  </NoSsr>
))`
  && {
    padding: 0;
    margin-right: 5px;
  }
`;
