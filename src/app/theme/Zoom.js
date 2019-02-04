// (C) Copyright 2017-2018 Hewlett Packard Enterprise Development LP
import { css } from 'styled-components';

import theme from 'theme/Theme';
const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item);

const deepFreeze = obj => {
  Object.keys(obj).forEach(
    key => key && isObject(obj[key]) && Object.freeze(obj[key]),
  );
  return Object.freeze(obj);
};

const accentColors = ['#2AD2C9', '#614767', '#ff8d6d'];
const neutralColors = ['#425563', '#5F7A76', '#80746E', '#767676'];
const statusColors = {
  critical: '#F04953',
  error: '#F04953',
  warning: '#FFD144',
  ok: '#01a982',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC',
};

const colors = {
  brand: theme.color.aidsFondsRed,
  focus: accentColors[0],
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

export const zoom = deepFreeze({
  global: {
    colors,
    font: {
      family: "'FFMarkProAF-Book', Verdana, sans-serif",
      face: `
        @font-face {
          font-family: 'FFMarkProAF-Book';

          src: url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.eot'); /* IE9 Compat Modes */
          src: url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.woff2') format('woff2'), /* Super Modern Browsers */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.woff') format('woff'), /* Pretty Modern Browsers */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.ttf')  format('truetype'), /* Safari, Android, iOS */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Book.svg#svgFontName') format('svg'); 
          font-weight: 400;
        }

        @font-face {
          font-family: 'FFMarkProAF-Bold';
          src: url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.eot'); /* IE9 Compat Modes */
          src: url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.woff2') format('woff2'), /* Super Modern Browsers */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.woff') format('woff'), /* Pretty Modern Browsers */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.ttf')  format('truetype'), /* Safari, Android, iOS */
          url('https://aidsfonds.nl/Assets/fonts/ffmark/FFMarkProAF-Bold.svg#svgFontName') format('svg'); 
          font-weight: 700;
        }
      `,
    },
  },
  text: {
    extend: css`
      color: #9b9b9b;
      font-size: 14px;
      font-weight: 500;
    `,
  },
  radioButton: {
    gap: 'xsmall',
    size: '16px',
    border: {
      color: '#b4bfc9',
      width: '1px',
    },
    extend: css`
      color: ${theme.color.zoomBlack};
      font-size: 14px;
      font-weight: 300;
    `,

    hover: {
      border: {
        color: 'dark-3',
      },
    },
    check: {
      radius: '100%',
      color: {
        light: theme.color.zoomBlack,
      },
    },
    icon: {
      size: '10px',
    },
  },
});
