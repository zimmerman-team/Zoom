import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { configureViewport } from '@storybook/addon-viewport';
import { withState } from '@dump247/storybook-state';
import { themes } from '@storybook/components';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

const req = require.context('../src/app', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setConsoleOptions({
  panelExclude: [],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// addDecorator(withInfo);
// addDecorator(withKnobs);
// addDecorator(withSmartKnobs);
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
    addonPanelInRight: false,
    sortStoriesByKind: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: false,
    selectedAddonPanel: undefined,
    enableShortcuts: false,
  }),
);

// config.js

configure(loadStories, module);
