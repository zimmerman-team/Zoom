import React from 'react';
// {TODO: add it to the credits if we still using this}
// Downloaded form https://fontawesome.com/icons/circle?style=regular
// This SVG Icon Requires Attribution
// Before you download, this icon is licensed under the Creative Commons Attribution 4.0 International license and requires that you comply with the following:
//
//   You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
//
//   If this is a real thorn in your side, upgrading to Pro removes this attribution restriction (and gives you tons more icons and goodies too).

const CircleMarkerIcon = props => (
  <svg
    className="svg-inline--fa fa-circle fa-w-16"
    role="img"
    viewBox="0 0 512 512"
    height={props.height}
    width={props.width}
  >
    <path
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
      fill="currentColor"
    />
  </svg>
);

export default CircleMarkerIcon;
