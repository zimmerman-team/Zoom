/* base */
import React from 'react';
import PropTypes from 'prop-types';
import theme from 'app/theme/Theme';
import TreeMap from 'app/components/charts/treemap/TreeMap';
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';

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
    <ModuleFragment
      background={theme.color.zoomGreyZero}
      title="Sectors"
      showInfoButton
    >
      {props.data.children && <TreeMap data={props.data} />}
    </ModuleFragment>
  );
};

Sectors.propTypes = propTypes;
Sectors.defaultProps = defaultProps;

export default Sectors;
