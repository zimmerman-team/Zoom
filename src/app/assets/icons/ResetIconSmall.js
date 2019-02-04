import React from 'react';

const ResetIconSmall = props => (
  <svg
    style={{
      margin: 'auto',
    }}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="17"
    height="15"
    viewBox="0 0 17 15"
  >
    <defs>
      <path
        id="dcmna"
        d="M9.5 2.38a7.126 7.126 0 0 0-7.125 7.125H0l3.167 3.167 3.166-3.167H3.958A5.538 5.538 0 0 1 9.5 3.963a5.538 5.538 0 0 1 5.542 5.542 5.538 5.538 0 0 1-8.756 4.512l-1.124 1.14A7.126 7.126 0 1 0 9.5 2.38zm1.573 7.125c0-.87-.71-1.583-1.578-1.583-.868 0-1.578.712-1.578 1.583 0 .87.71 1.583 1.578 1.583.868 0 1.578-.712 1.578-1.583z"
      />
    </defs>
    <use fill="#898989" xlinkHref="#dcmna" transform="translate(0 -2)" />
  </svg>
);

export default ResetIconSmall;
