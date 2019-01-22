import React from 'react';
import { FilterLabel, ComponentBase,
  IconContainer, PointerContainer } from 'components/DataExplorePane/components/AccordionSelection/AccordionSelection.styles';
import IconPointer from 'assets/icons/icon_pointer.svg';
import { aidsFondsBlue, aidsFondsRed, zoomGreyZero, aidsFondsWhite, zoomGreyFour } from 'components/theme/ThemeSheet';

const AccordionSelection = props => {
  const compStyle = props.active ? { backgroundColor: zoomGreyZero, borderBottom: `1px solid ${zoomGreyFour}` } :
    { backgroundColor: aidsFondsWhite };
  return (
    <ComponentBase style={compStyle}>
      <IconContainer>
        {props.icon}
      </IconContainer>
      <FilterLabel style={{ color: props.active ? aidsFondsBlue : aidsFondsRed }}>{props.label}</FilterLabel>
      <PointerContainer style={{ transform: props.active ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <IconPointer />
      </PointerContainer>
    </ComponentBase>
  );
};

export default AccordionSelection;
