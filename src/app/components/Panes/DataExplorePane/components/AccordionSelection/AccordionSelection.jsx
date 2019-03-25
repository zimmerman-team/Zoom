import React from 'react';
import PropTypes from 'prop-types';

import {
  FilterLabel,
  ComponentBase,
  IconContainer,
  PointerContainer
} from 'components/Panes/DataExplorePane/components/AccordionSelection/AccordionSelection.styles';
import IconPointer from 'assets/icons/IconPointer';
import theme from 'theme/Theme';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePanel';

const propTypes = {
  active: PropTypes.bool
};

const defaultProps = {};

const AccordionSelection = props => {
  const compStyle = props.active
    ? {
        backgroundColor: theme.color.zoomGreyZero,
        borderBottom: `1px solid ${theme.color.zoomGreyFour}`
      }
    : {
        backgroundColor: theme.color.aidsFondsWhite,
        borderBottom: `2px solid ${theme.color.zoomGreyFour}`
      };
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
      {/*<PointerContainer
        style={{ transform: props.active ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <IconPointer />
      </PointerContainer>*/}
    </ComponentBase>
  );
};

AccordionSelection.propTypes = propTypes;
AccordionSelection.defaultProps = defaultProps;

export default AccordionSelection;
