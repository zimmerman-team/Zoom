import React from 'react';
import { storiesOf } from '@storybook/react';
import AddUserModule from './AddUserModule';

storiesOf('User Management|Modules/', module).add('AddUserModule', () => (
  <AddUserModule />
));
