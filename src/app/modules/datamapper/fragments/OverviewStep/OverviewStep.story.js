import React from 'react';
import { storiesOf } from '@storybook/react';
import OverviewStep from './OverviewStep';
import { data } from 'modules/datamapper/fragments/OverviewStep/OverviewStep.const';

storiesOf('Components', module).add('OverviewStep', () => (
  <OverviewStep data={data} />
));
