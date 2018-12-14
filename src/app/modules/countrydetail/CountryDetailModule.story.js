import React from 'react';
import { storiesOf } from '@storybook/react';
import CountryDetailModule from './CountryDetailModule';
import CountryInfo from 'modules/countrydetail/fragments/CountryInfo';
import AidsEpidemic from 'modules/countrydetail/fragments/AidsEpidemic';
import EconomicIndicators from 'modules/countrydetail/fragments/EconomicIndicators';
import CivicSpace from 'modules/countrydetail/fragments/CivicSpace';
import HumanRights from 'modules/countrydetail/fragments/HumanRights';
import AidsfondsTransactions from 'modules/countrydetail/fragments/AidsfondsTransactions';

storiesOf('Country Detail', module)
  .add('Country Detail', () => <CountryDetailModule />)
  .add('Country Info', () => <CountryInfo />)
  .add('Aids Epidemic', () => <AidsEpidemic />)
  .add('Economic Indicators', () => <EconomicIndicators />)
  .add('Civic Space', () => <CivicSpace />)
  .add('Human Rights', () => <HumanRights />)
  .add('Aidsfonds financial transactions', () => <AidsfondsTransactions />);
