import React from 'react';

const SvgIconBoxUnchecked = props => (
  <svg width={22} height={22} {...props}>
    <defs>
      <rect
        id="icon_box_unchecked_svg__b"
        x={0}
        y={0}
        width={16}
        height={16}
        rx={3}
      />
      <filter
        x="-31.2%"
        y="-25%"
        width="162.5%"
        height="162.5%"
        filterUnits="objectBoundingBox"
        id="icon_box_unchecked_svg__a"
      >
        <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation={1.5}
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0750113225 0"
          in="shadowBlurOuter1"
        />
      </filter>
    </defs>
    <g transform="translate(3 2)" fill="none" fillRule="evenodd">
      <use
        fill="#000"
        filter="url(#icon_box_unchecked_svg__a)"
        xlinkHref="#icon_box_unchecked_svg__b"
      />
      <rect
        stroke="#B4BFC9"
        strokeLinejoin="square"
        fill="#FFF"
        x={0.5}
        y={0.5}
        width={15}
        height={15}
        rx={3}
      />
    </g>
  </svg>
);

export default SvgIconBoxUnchecked;
