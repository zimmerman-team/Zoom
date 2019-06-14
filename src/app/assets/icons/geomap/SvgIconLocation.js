import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

const defaultProps = {
  color: '#818181',
  width: 24,
  height: 24
};

const SvgIconLocation = props => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon/location_pin" fill="none" fillRule="evenodd">
      <rect id="boundry" width={props.width} height={props.height} />
      <path
        d="M12,2 C8.13,2 5,5.13 5,9 C5,14.25 12,22 12,22 C12,22 19,14.25 19,9 C19,5.13 15.87,2 12,2 Z M12,11.5 C10.62,11.5 9.5,10.38 9.5,9 C9.5,7.62 10.62,6.5 12,6.5 C13.38,6.5 14.5,7.62 14.5,9 C14.5,10.38 13.38,11.5 12,11.5 Z"
        id="Shape"
        fill={props.color}
      />
    </g>
  </svg>
);

SvgIconLocation.propTypes = propTypes;
SvgIconLocation.defaultProps = defaultProps;

export default SvgIconLocation;
