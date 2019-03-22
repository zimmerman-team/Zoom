import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DashboardModule from './DashboardModule';
import tabs from '__consts__/DashboardTabsConsts';

storiesOf('Dashboard|Modules', module)
  .addDecorator(StoryRouter())
  .add('0: Full page', () => <DashboardModule tabs={tabs} />);
