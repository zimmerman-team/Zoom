import React from 'react';

const SvgIconDownload = props => (
  <svg width={12} height={14} {...props}>
    <defs>
      <path
        id="IconDownload_svg__a"
        d="M986.334 108v3.15h-8.668V108H976v4.075c0 .51.372.925.834.925h10.332c.461 0 .834-.414.834-.925V108z"
      />
      <path
        id="IconDownload_svg__b"
        d="M982.359 106.887l-2.217-2.981s-.338-.355.028-.355h1.25v-4.34s-.05-.211.236-.211h1.759c.206 0 .201.178.201.178v4.284h1.154c.444 0 .11.371.11.371s-1.887 2.787-2.15 3.079c-.19.212-.371-.025-.371-.025z"
      />
    </defs>
    <use
      fill="#ff0100"
      transform="translate(-976 -99)"
      xlinkHref="#IconDownload_svg__a"
    />
    <use
      fill="#ff0100"
      transform="translate(-976 -99)"
      xlinkHref="#IconDownload_svg__b"
    />
  </svg>
);

export default SvgIconDownload;
