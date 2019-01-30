import React from 'react';

const SvgIconRadioUnchecked = props => (
  <svg width={22} height={22} {...props}>
    <defs>
      <rect id="icon_radio_unchecked_svg__b" width={16} height={16} rx={8} />
      <filter
        id="icon_radio_unchecked_svg__a"
        width="162.5%"
        height="162.5%"
        x="-31.2%"
        y="-25%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation={1.5}
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0750113225 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 2)">
      <use
        fill="#000"
        filter="url(#icon_radio_unchecked_svg__a)"
        xlinkHref="#icon_radio_unchecked_svg__b"
      />
      <rect
        width={15}
        height={15}
        x={0.5}
        y={0.5}
        fill="#FFF"
        stroke="#B4BFC9"
        strokeLinejoin="square"
        rx={7.5}
      />
    </g>
  </svg>
);

export default SvgIconRadioUnchecked;
