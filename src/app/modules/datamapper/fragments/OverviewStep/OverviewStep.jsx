/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';

/* mock */
import {
  columns,
  data,
} from 'modules/datamapper/fragments/OverviewStep/OverviewStep.mock';

/* styles */
import { ModuleContainer } from 'modules/datamapper/fragments/OverviewStep/OverviewStep.styles';
import { SectionHeading } from 'components/sort/Headings';
import ZoomTable from 'components/ZoomTable/ZoomTable';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fileColumn: PropTypes.string,
      summary: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.any, // cause it can be number or string
        }),
      ),
      dataTypes: PropTypes.arrayOf(PropTypes.string),
      blankCells: PropTypes.number,
    }),
  ),
};
const defaultProps = {
  data,
};

const OverviewStep = props => {
  return (
    <ModuleContainer>
      <SectionHeading>Overview</SectionHeading>
      <Box>
        <ZoomTable columns={columns} data={props.data} />
      </Box>
    </ModuleContainer>
  );
};

OverviewStep.propTypes = propTypes;
OverviewStep.defaultProps = defaultProps;

export default OverviewStep;
