/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* style */
import {
  InfoIcon,
  ToolTipContainer,
  InvContainer
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
    <div>
      <Tooltip
        // options
        html={
          <InvContainer>
            <ToolTipContainer>{props.text}</ToolTipContainer>
          </InvContainer>
        }
        position="top"
      >
        <InfoIcon />
      </Tooltip>
    </div>
  );
};

FragmentInfoButton.propTypes = propTypes;
FragmentInfoButton.defaultProps = defaultProps;

export default FragmentInfoButton;
