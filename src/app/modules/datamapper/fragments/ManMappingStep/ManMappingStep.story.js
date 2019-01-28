import React from 'react';
import { storiesOf } from '@storybook/react';
import ManMappingStep from './ManMappingStep';
import { mockData } from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep.mock';

storiesOf('Components', module).add('ManMappingStep', () => (
  <ManMappingStep data={mockData} />
));
