// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';

import FontLoaderReact, {
  FontLoaderReactConfigToken,
} from 'fusion-plugin-font-loader-react';

import root from './root';
import {fonts, preloadDepth} from "./font-config";

export default () => {
  const app = new App(root);
  app.register(FontLoaderReactConfigToken, {
    fonts,
    preloadDepth
  });
  app.register(FontLoaderReact);
  app.register(Router);
  return app;
};
