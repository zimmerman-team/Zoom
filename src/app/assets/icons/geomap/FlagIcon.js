import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

const defaultProps = {
  fill: '#00f',
  height: 14,
  width: 16
};

const FlagIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 16 14"
  >
    <path
      fill={props.fill}
      d="M2.02.351A1.15 1.15 0 0 0 1.185.01a1.15 1.15 0 0 0-.837.341A1.115 1.115 0 0 0 0 1.176c0 .437.197.77.592 1.001v11.527c0 .079.029.147.088.205a.287.287 0 0 0 .208.086h.591c.08 0 .15-.028.209-.086a.278.278 0 0 0 .087-.205V2.177c.395-.23.592-.565.592-1.001 0-.322-.115-.597-.346-.825z"
    />
    <path
      fill={props.fill}
      d="M15.806 1.353a.574.574 0 0 0-.416-.173c-.08 0-.248.064-.504.191-.256.128-.527.27-.814.428a5.91 5.91 0 0 1-1.017.428 3.526 3.526 0 0 1-1.086.191c-.309 0-.58-.057-.814-.173a16.607 16.607 0 0 0-2.025-.801 6.27 6.27 0 0 0-1.85-.264c-1.14 0-2.438.364-3.893 1.093a7.925 7.925 0 0 0-.73.391c-.191.14-.287.307-.287.5v6.757c0 .157.059.294.176.41a.572.572 0 0 0 .416.172c.099 0 .2-.027.305-.081 1.677-.887 3.107-1.33 4.29-1.33.45 0 .89.067 1.318.2.429.134.785.28 1.068.437a6.35 6.35 0 0 0 1.004.438c.385.133.766.2 1.142.2.95 0 2.087-.352 3.412-1.056.166-.085.288-.169.365-.25.077-.083.116-.2.116-.351V1.763a.555.555 0 0 0-.176-.41z"
    />
  </svg>
);

FlagIcon.propTypes = propTypes;
FlagIcon.defaultProps = defaultProps;

export default FlagIcon;
