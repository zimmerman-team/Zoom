import { addParameters, addDecorator, configure } from '@storybook/react';
import 'loki/configure-react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { configureViewport } from '@storybook/addon-viewport';
import { withState } from '@dump247/storybook-state';
import { themes } from '@storybook/components';
// import { withKnobs } from '@storybook/addon-knobs';
// import { withSmartKnobs } from 'storybook-addon-smart-knobs';
const { withPropsTable } = require('storybook-addon-react-docgen');

import yourTheme from './yourTheme';

addParameters({
  options: {
    theme: yourTheme
  }
});

const req = require.context('../src/app', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setConsoleOptions({
  panelExclude: []
});

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addDecorator(
  withInfo({
    inline: false,
    header: true
  })
);

addDecorator(withPropsTable);
// addDecorator(withKnobs);
// addDecorator(withSmartKnobs);

// config.js

configure(loadStories, module);
