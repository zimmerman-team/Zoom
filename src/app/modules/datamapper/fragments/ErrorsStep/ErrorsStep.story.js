import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorsStep from './ErrorsStep';
/* mock */
import { data, errorCells } from './ErrorsStep.mock';

storiesOf('Components', module).add('ErrorStep', () => (
  <ErrorsStep data={data} errorCells={errorCells} />
));
