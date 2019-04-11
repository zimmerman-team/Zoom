import React from 'react';

const SvgIconBack = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={16}
    height={16}
    style={{ margin: 'auto' }}
    viewBox="0 0 20 20"
    {...props}
  >
    <defs>
      <path
        id="r7tqa"
        d="M25 16l-4 4 4 4v-3h6v-2h-6zm1-4c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm0-2c-5.511 0-10 4.489-10 10s4.489 10 10 10 10-4.489 10-10-4.489-10-10-10z"
      />
    </defs>
    <use fill="#ff0100" xlinkHref="#r7tqa" transform="translate(-16 -10)" />
  </svg>
);

export default SvgIconBack;
