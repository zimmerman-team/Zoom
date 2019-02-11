import React from 'react';

const SvgOnlyIconPlus = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    style={{ margin: 'auto' }}
    {...props}
  >
    <defs>
      <path id="qgwfa" d="M1237 74h-2v4h-4v2h4v4h2v-4h4v-2h-4z" />
    </defs>
    <use fill="#4a4a4a" xlinkHref="#qgwfa" transform="translate(-1231 -74)" />
  </svg>
);

export default SvgOnlyIconPlus;
