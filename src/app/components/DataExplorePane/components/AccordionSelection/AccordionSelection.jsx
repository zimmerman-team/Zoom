import React from 'react';
import {
  FilterLabel,
  ComponentBase,
  IconContainer,
  PointerContainer
} from 'components/DataExplorePane/components/AccordionSelection/AccordionSelection.styles';
import IconPointer from 'assets/icons/IconPointer';
import theme from 'theme/Theme';
const AccordionSelection = props => {
  const compStyle = props.active
    ? {
        backgroundColor: theme.color.zoomGreyZero,
        borderBottom: `1px solid ${theme.color.zoomGreyFour}`
      }
    : { backgroundColor: theme.color.aidsFondsWhite };
  return (
    <ComponentBase style={compStyle}>
      <IconContainer>{props.icon}</IconContainer>
      <FilterLabel
        style={{
          color: props.active
            ? theme.color.aidsFondsBlue
            : theme.color.aidsFondsRed
        }}
      >
        {props.label}
      </FilterLabel>
      <PointerContainer
        style={{ transform: props.active ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <IconPointer />
      </PointerContainer>
    </ComponentBase>
  );
};

export default AccordionSelection;
