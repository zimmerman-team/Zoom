// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      "@global": {
        "*, *::before, *::after": {
          /* todo: commented because it messes up the search progress bar */
          // transition: 'none !important',
          // animation: 'none !important',
        }
      }
    },

    // MuiSwitch: {
    //   root: {
    //     backgroundColor: "red"
    //   },
    //   track: {
    //     backgroundColor: "red"
    //   },
    //   thumb: {
    //     color: "red",
    //     backgroundColor: "red"
    //   }
    // },
    MuiButtonBase: {
      root: {
        width: "initial",
        minWidth: "initial"
      }
    }
  }
});

// export default responsiveFontSizes(theme);
export default theme;
