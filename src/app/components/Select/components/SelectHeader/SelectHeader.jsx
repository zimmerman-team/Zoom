import React from 'react';
import {  ComponentBase,
          PointerContainer,
          LabelContainer} from 'components/Select/components/SelectHeader/SelectHeader.styles';

import IconPointer from 'assets/icons/icon_pointer.svg';


const SelectHeader = (props) => (
  <ComponentBase>
    <PointerContainer>
      <IconPointer />
    </PointerContainer>
    <LabelContainer>{props.label}</LabelContainer>
  </ComponentBase>
);

export default SelectHeader;
