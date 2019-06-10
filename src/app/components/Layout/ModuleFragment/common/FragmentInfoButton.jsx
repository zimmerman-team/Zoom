/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* style */
import {
  InfoIcon,
  ToolTipContainer,
  InvContainer,
  ComponentBase
} from './FragmentInfoButton.style';

/* components */
import { Tooltip } from 'react-tippy';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  text: PropTypes.string
};
const defaultProps = {
  text: 'No text'
};

const FragmentInfoButton = props => {
  return (
    <ComponentBase>
      <Tooltip
        // options
        html={
          <InvContainer>
            <ToolTipContainer data-cy="tooltip-content">
              {props.text}
            </ToolTipContainer>
          </InvContainer>
        }
        position="top"
      >
        <InfoIcon data-cy="tooltip-info-button" />
      </Tooltip>
    </ComponentBase>
  );
};

FragmentInfoButton.propTypes = propTypes;
FragmentInfoButton.defaultProps = defaultProps;

export default FragmentInfoButton;
