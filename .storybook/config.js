import {addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from "@storybook/addon-info";
import { setConsoleOptions,withConsole } from '@storybook/addon-console';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { configureViewport } from '@storybook/addon-viewport';
import { withState } from '@dump247/storybook-state';

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


const req = require.context('../src', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setConsoleOptions({
  panelExclude: [],
});

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
    inline:false,
  })
);



addDecorator(
  withBackgrounds([
    { name: 'default', value: '#ffffff', default: true },
    { name: 'color2', value: '#00aced' },
    { name: 'color3', value: '#3b5998' },
  ])
);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// Option defaults:
addDecorator(
  withOptions({
    name: 'ZOOM V2',
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
  })
);


// config.js

configure(loadStories, module);
