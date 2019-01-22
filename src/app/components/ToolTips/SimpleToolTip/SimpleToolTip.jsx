import React from 'react';
import {ComponentBase} from 'components/ToolTips/SimpleToolTip/SimpleToolTip.styles';

const SimpleToolTip = (props) => (
  <ComponentBase>
    {props.title}
  </ComponentBase>
);

export default SimpleToolTip;
