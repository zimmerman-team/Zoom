import React from 'react';

const SvgIconPointer = props => (
  <svg
    style={{
      margin: 'auto'
    }}
    fill="#ff0100"
    width={13}
    height={11}
    {...props}
  >
    <defs>
      <path
        id="icon_pointer_svg__a"
        d="M1243.66 57.439a.553.553 0 0 1 0-.778.542.542 0 0 1 .771 0l4.91 4.95a.553.553 0 0 1 0 .778l-4.91 4.95a.542.542 0 0 1-.771 0 .553.553 0 0 1 0-.778l4.523-4.561z"
      />
    </defs>
    <use
      // fill="#ff0100"
      xlinkHref="#icon_pointer_svg__a"
      transform="rotate(90 654.5 -586)"
    />
  </svg>
);

export default SvgIconPointer;
