import React from 'react';

const SvgIconDelete = props => (
  <svg width={27} height={33} {...props}>
    <defs>
      <path
        id="IconDelete_svg__b"
        d="M9.936 5.184l-1.08 1.123h-5.4v2.247h17.28V6.307h-5.4l-1.08-1.123h-4.32zm-5.4 5.616v14.602c0 1.235.972 2.246 2.16 2.246h10.8c1.188 0 2.16-1.01 2.16-2.246V10.8H4.536zm3.24 2.246h2.16v12.356h-2.16V13.046zm6.48 0h2.16v12.356h-2.16V13.046z"
      />
      <filter
        id="IconDelete_svg__a"
        width="198.4%"
        height="175.7%"
        x="-49.2%"
        y="-28.9%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy={2} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation={2.5}
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.128566576 0"
        />
      </filter>
    </defs>
    <g fill="none" transform="translate(1 -2)">
      <use
        fill="#000"
        filter="url(#IconDelete_svg__a)"
        xlinkHref="#IconDelete_svg__b"
      />
      <use fill="#FF0100" xlinkHref="#IconDelete_svg__b" />
    </g>
  </svg>
);

export default SvgIconDelete;
