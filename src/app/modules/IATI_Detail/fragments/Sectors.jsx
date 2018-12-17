/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  zoomGreyZero,
  FragmentHeader,
  FragmentVisualisation,
} from 'components/theme/ThemeSheet';
import TreeMap from 'components/charts/treemap/TreeMap';
import { treeMapMockData } from '__mocks__/treeMapMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const Sectors = props => {
  return (
    <ModuleFragment background={zoomGreyZero}>
      <FragmentHeader>Sectors</FragmentHeader>
      <FragmentVisualisation>
        <TreeMap data={treeMapMockData} />
      </FragmentVisualisation>
    </ModuleFragment>
  );
};

Sectors.propTypes = propTypes;
Sectors.defaultProps = defaultProps;

export default Sectors;
