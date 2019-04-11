import { create } from '@storybook/theming';

export default create({
  // Is this a 'light' or 'dark' theme?
  base: 'light',

  brandTitle: 'ZOOM V2',
  brandUrl: 'https://storybook.js.org',

  // Color palette
  colorPrimary: 'red', // primary color
  colorSecondary: 'blue', // secondary color

  // UI
  appBg: '#ffffff',
  appContentBg: 'white',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 0,

  // Fonts
  fontBase: 'FFMarkProAF-Book',
  fontCode: 'Monaco, monospace',

  // Text colors
  textColor: '#000000',
  textInverseColor: '#333333',

  // Toolbar default and active colors
  barTextColor: '#000000',
  barSelectedColor: 'blue',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // Brand logo/text
  brand: `<svg .../>`
});
