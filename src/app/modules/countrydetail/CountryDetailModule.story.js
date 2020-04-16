import React from 'react';
import { storiesOf } from '@storybook/react';
import CountryDetailModule from 'app/modules/countrydetail/CountryDetailModule';
import CountryInfo from 'app/modules/countrydetail/fragments/CountryInfo/CountryInfo';
import AidsEpidemic from 'app/modules/countrydetail/fragments/AidsEpidemic/AidsEpidemic';
import EconomicIndicators from 'app/modules/countrydetail/fragments/EconomicIndicators';
import CivicSpace from 'app/modules/countrydetail/fragments/CivicSpace/CivicSpace';
import HumanRights from 'app/modules/countrydetail/fragments/HumanRights';
import AidsfondsTransactions from 'app/modules/countrydetail/fragments/AidsfondsTransactions';
import PageNavigation from 'app/modules/countrydetail/fragments/PageNavigation';
import Projects from 'app/modules/countrydetail/fragments/Projects/Projects';

storiesOf('Country Detail|Modules/Fragments', module)
  .add('0. Full Page', () => <CountryDetailModule />)
  .add('0. Full Page', () => <CountryDetailModule />)
  .add('1. Page Navigation', () => <PageNavigation />)
  .add('2. Country Info', () => <CountryInfo />)
  .add('3. Aids Epidemic', () => <AidsEpidemic />)
  .add('4. Economic Indicators', () => <EconomicIndicators />)
  .add('5. Civic Space', () => <CivicSpace />)
  .add('6. Human Rights', () => <HumanRights />)
  .add('7. Aidsfonds financial transactions', () => <AidsfondsTransactions />)
  .add('8. Projects', () => <Projects />);
