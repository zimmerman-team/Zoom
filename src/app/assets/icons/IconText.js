import React from 'react';

const SvgIconText = props => (
  <svg width={19} height={15} {...props}>
    <defs>
      <path
        d="M1048 18h-9v3h3v7h3v-7h3zm-19-5v3h5v12h3V16h5v-3z"
        id="icon_text_svg__a"
      />
    </defs>
    <use
      xlinkHref="#icon_text_svg__a"
      fill="#fff"
      transform="translate(-1029 -13)"
    />
  </svg>
);

export default SvgIconText;
