/* base */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  zoomGreyZero,
  // FragmentHeader,
  // FragmentVisualisation,
} from 'components/theme/ThemeSheet';
import TreeMap from 'components/charts/treemap/TreeMap';
// import { treeMapMockData } from '__mocks__/treeMapMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';

const propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
        loc: PropTypes.number,
      }),
    ),
  }),
};
const defaultProps = {
  data: {},
};

const Sectors = props => {
  return (
    <ModuleFragment background={zoomGreyZero} title="Sectors" showInfoButton>
      {props.data.children && <TreeMap data={props.data} />}
    </ModuleFragment>
  );
};

Sectors.propTypes = propTypes;
Sectors.defaultProps = defaultProps;

export default Sectors;
