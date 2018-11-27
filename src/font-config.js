import { assetUrl } from 'fusion-core';
export const preloadDepth = 0;
export const fonts = {
  'FFMarkProAF-Bold': {
    urls: {
      woff: assetUrl('./app/assets/fonts/FFMarkProAF-Bold.woff'),
      woff2: assetUrl('./app/assets/fonts/FFMarkProAF-Bold.woff2'),
    },
    fallback: {
      name: 'Helvetica',
    },
  },
  'FFMarkProAF-Book': {
    urls: {
      woff: assetUrl('./app/assets/fonts/FFMarkProAF-Book.woff'),
      woff2: assetUrl('./app/assets/fonts/FFMarkProAF-Book.woff2'),
    },
    fallback: {
      name: 'Helvetica',
    },
  },
};
