/* base */
import React from 'react';

/* components */
import { Box } from 'grommet';

/* mock */
import { columns } from 'modules/datamapper/components/OverviewStep/OverviewStep.mock';
import { OverviewTitle, ModuleContainer } from 'modules/datamapper/components/OverviewStep/OverviewStep.styles';
import { ZoomTable } from 'components/theme/ThemeSheet';

const OverviewStep = (props) => {

  return (
    <ModuleContainer>
      <OverviewTitle>Overview</OverviewTitle>
      <Box>
        <ZoomTable columns={columns} data={props.data} />
      </Box>
    </ModuleContainer>
  );
};

export default OverviewStep;
