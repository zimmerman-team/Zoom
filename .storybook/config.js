import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { configureViewport } from '@storybook/addon-viewport';
import { withState } from '@dump247/storybook-state';
import { themes } from '@storybook/components';

/*
const newViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px'
    }
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px'
    }
  }
};

configureViewport({
  viewports: newViewports
});
*/

// automatically import all files ending in *.stories.js
// const req = require.context('../stories', true, /.stories.js$/);

const req = require.context('../src/app', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setConsoleOptions({
  panelExclude: [],
});

/*module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
    ],
  },
};*/

const path = require('path');

const pathToInlineSvg = path.resolve(__dirname, '../src/app/assets/icons');

module.exports = defaultConfig => {
  const rules = defaultConfig.module.rules;

  // modify storybook's file-loader rule to avoid conflicts with svgr
  const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  // fileLoaderRule.exclude = pathToInlineSvg;

  rules.push({
    test: /\.svg$/,
    // include: pathToInlineSvg,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
        },
      },
    ],
  });

  return defaultConfig;
};

/*
addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
    inline: false,
  }),
);
*/

/*
addDecorator(
  withBackgrounds([
    { name: 'default', value: '#474747', default: true },
    { name: 'color2', value: '#ffffff' },
  ]),
);
*/

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// Option defaults:
addDecorator(
  withOptions({
    name: 'ZOOM V2',
    // theme: themes.dark,
    url: 'https://zoom-v2-dev.nyuki.io/',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: null,
    hierarchyRootSeparator: null,
    sidebarAnimations: false,
    selectedAddonPanel: undefined,
    enableShortcuts: false,
  }),
);

// config.js

configure(loadStories, module);
