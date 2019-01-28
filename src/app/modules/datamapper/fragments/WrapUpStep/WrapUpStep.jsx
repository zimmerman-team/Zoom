/* base */
import React from 'react';

/* styles */
import { ModuleContainer } from './WrapUpStep.styles';
import { SectionHeading } from 'components/theme/ThemeSheet';

const WrapUpStep = () => (
  <ModuleContainer>
    <SectionHeading>
      Your data set was updated/uploaded succesfully!
    </SectionHeading>
  </ModuleContainer>
);

export default WrapUpStep;
