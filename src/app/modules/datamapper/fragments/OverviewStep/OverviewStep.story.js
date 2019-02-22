import React from 'react';
import { storiesOf } from '@storybook/react';
import OverviewStep from './OverviewStep';
import Const from 'modules/datamapper/fragments/OverviewStep/OverviewStep.const';

storiesOf('Datamapper|Fragments/Overview Step', module).add(
  'OverviewStep',
  () => <OverviewStep data={Const} />
);
