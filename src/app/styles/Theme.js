import { css } from 'styled-components';
// import Colors from './facets/Colors';
// import Typography from './facets/Typography';



const Colors = {
  primary: {
    first: '#ff0100',
    second: '#0000ff',
    third: '#ffffff',
  },
};

const Typography = {
  primaryFontFamily: 'FF Mark Pro AF',
  secondaryFontFamily: 'FF Mark Pro AF',
};

const Borders = {
  radius: '20px',
}

const Radius = {
  buttons:'15px',
  dialogs: '20px',
}

const Shadows= {
  parameters: 'box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);'
}

const Theme = {
  colors: Colors,
  typography: Typography,
  // TODO: Expand theming
  // buttons
  // input
  // headers
  // more
};

export default Theme;
