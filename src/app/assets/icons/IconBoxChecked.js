import React from 'react';
import theme from 'theme/Theme';

const SvgComponent = props => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="prefix__b"
        d="M0 3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3z"
      />
      <path
        id="prefix__a"
        d="M6.247 9.453l-2.45-2.45-.817.817 3.267 3.267 7-7-.817-.817-6.183 6.183z"
      />
      <path id="prefix__d" d="M1 14V0h14v14z" />
      <clipPath id="prefix__c">
        <use xlinkHref="#prefix__a" />
      </clipPath>
    </defs>
    <use fill={theme.color.aidsFondsBlue} xlinkHref="#prefix__b" />
    <use xlinkHref="#prefix__a" />
    <g clipPath="url(#prefix__c)">
      <use fill="#fff" xlinkHref="#prefix__d" />
    </g>
  </svg>
);

export default SvgComponent;
