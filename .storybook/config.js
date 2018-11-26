import {addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from "@storybook/addon-info";

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));


}


addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
    inline:true,
  })
)

// config.js

configure(loadStories, module);
