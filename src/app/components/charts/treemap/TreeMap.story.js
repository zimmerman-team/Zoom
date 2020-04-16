import React from 'react';
import { storiesOf } from '@storybook/react';
import TreeMap from './TreeMap';
import { treeMapMockData } from 'app/__mocks__/treeMapMock';

storiesOf('Charts|Components/', module).add('TreeMap', () => (
  <TreeMap data={treeMapMockData} />
));
