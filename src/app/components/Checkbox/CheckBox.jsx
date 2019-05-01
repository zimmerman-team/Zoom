/* base */
import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconBoxUnchecked from 'assets/icons/IconBoxUnchecked';
import IconBoxChecked from 'assets/icons/IconBoxChecked';
import theme from 'theme/Theme';

const Label = styled.span`
  color: #9b9b9b;
  font-size: 11px;
  font-family: ${theme.font.zoomFontFamTwo};
`;

const ComponentBase = styled.div`
  display: flex;
`;
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

const SimpleCheckbox = styled(props => (
  <ComponentBase>
    <Checkbox
      disableRipple
      icon={IconUnchecked}
      checkedIcon={IconChecked}
      {...props}
    />
    {/* <Label>etc</Label> */}
  </ComponentBase>
))`
  && {
    padding: 0;
    margin-right: 5px;
  }
`;

export default SimpleCheckbox;
