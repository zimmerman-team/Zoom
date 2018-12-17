import React from 'react';
import { storiesOf } from '@storybook/react';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import CountryInfo from 'modules/countrydetail/fragments/CountryInfo';
import AidsEpidemic from 'modules/countrydetail/fragments/AidsEpidemic';
import EconomicIndicators from 'modules/countrydetail/fragments/EconomicIndicators';
import CivicSpace from 'modules/countrydetail/fragments/CivicSpace';
import HumanRights from 'modules/countrydetail/fragments/HumanRights';
import AidsfondsTransactions from 'modules/countrydetail/fragments/AidsfondsTransactions';

storiesOf('Country Detail', module)
  .add('0. Full Page', () => <CountryDetailModule />)
  .add('1. Country Info', () => <CountryInfo />)
  .add('2. Aids Epidemic', () => <AidsEpidemic />)
  .add('3. Economic Indicators', () => <EconomicIndicators />)
  .add('4. Civic Space', () => <CivicSpace />)
  .add('6. Human Rights', () => <HumanRights />)
  .add('7. Aidsfonds financial transactions', () => <AidsfondsTransactions />);
