import React from 'react';

const SvgIconPlus = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    style={{ margin: 'auto' }}
    {...props}
  >
    <defs>
      <path
        id="osbta"
        d="M19 14.8h-3.2V18h-1.6v-3.2H11v-1.6h3.2V10h1.6v3.2H19zM15 6c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8z"
      />
    </defs>
    <use fill="#ff0100" xlinkHref="#osbta" transform="translate(-7 -6)" />
  </svg>
);

export default SvgIconPlus;
