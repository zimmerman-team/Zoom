/* base */
import React from 'react';

/* components */
import { Box } from 'grommet';

/* mock */
import { columns, data } from 'components/OverviewStep/OverviewStep.mock';
import { OverviewTitle, ModuleContainer } from 'components/OverviewStep/OverviewStep.styles';
import { ZoomTable } from 'components/theme/ThemeSheet';

const OverviewStep = () => {

  return (
    <ModuleContainer>
      <OverviewTitle>Overview</OverviewTitle>
      <Box>
        <ZoomTable columns={columns} data={data} />
      </Box>
    </ModuleContainer>
  );
};

export default OverviewStep;
