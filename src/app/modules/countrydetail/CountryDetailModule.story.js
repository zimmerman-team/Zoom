import React from 'react';
import { storiesOf } from '@storybook/react';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import CountryInfo from 'modules/countrydetail/fragments/CountryInfo/CountryInfo';
import AidsEpidemic from 'modules/countrydetail/fragments/AidsEpidemic';
import EconomicIndicators from 'modules/countrydetail/fragments/EconomicIndicators';
import CivicSpace from 'modules/countrydetail/fragments/CivicSpace';
import HumanRights from 'modules/countrydetail/fragments/HumanRights';
import AidsfondsTransactions from 'modules/countrydetail/fragments/AidsfondsTransactions';
import PageNavigation from 'modules/countrydetail/fragments/PageNavigation';
import Projects from 'modules/countrydetail/fragments/Projects/Projects';

storiesOf('Module: Country Detail', module)
  .add('0. Full Page', () => <CountryDetailModule />)
  .add('1. Page Navigation', () => <PageNavigation />)
  .add('2. Country Info', () => <CountryInfo />)
  .add('3. Aids Epidemic', () => <AidsEpidemic />)
  .add('4. Economic Indicators', () => <EconomicIndicators />)
  .add('5. Civic Space', () => <CivicSpace />)
  .add('6. Human Rights', () => <HumanRights />)
  .add('7. Aidsfonds financial transactions', () => <AidsfondsTransactions />)
  .add('8. Projects', () => <Projects />);
