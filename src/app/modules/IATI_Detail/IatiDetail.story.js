import React from 'react';
import { storiesOf } from '@storybook/react';
import IatiDetail from 'modules/IATI_Detail/IatiDetail';
import Sectors from 'modules/IATI_Detail/fragments/Sectors';
import Header from 'modules/IATI_Detail/fragments/Header/Header';
import TotalBudget from 'modules/IATI_Detail/fragments/TotalBudget';

storiesOf('Module: IATI Detail', module)
  .add('0. Full page', () => <IatiDetail />)
  .add('1. Header', () => <Header />)
  .add('2. Total Budget', () => <TotalBudget />)
  .add('3. Sectors', () => <Sectors />);
