/* base */
import React from 'react';
import * as PropTypes from 'prop-types';

/* components...*/
import GridItemText from './common/GridItemText';
import GridItemToolbar from './common/GridItemToolbar';
import {ComponentBase, GridItemHeading, Box} from './GridItem.styles';


const propTypes = {
  disableToolbar: PropTypes.bool
};
const defaultProps = {
  disableToolbar: false
};

const GridItem = props => {
  const [isSelected, setIsSelected] = React.useState(false);

  function handleMouserEnter() {
    setIsSelected(!isSelected);
  }

  return (
    <ComponentBase
      onMouseEnter={handleMouserEnter}
      onMouseLeave={handleMouserEnter}
    >
      <Box>
        <GridItemHeading>People Living with HIV</GridItemHeading>
        <GridItemText label="Author" value="Jane Doe" />
        <GridItemText label="Publication date" value="01-01-2019" />
        <GridItemText label="Updated" value="n/a" />
        <GridItemText label="Shared" value="Team Jane Doe, Public" />
        <GridItemText label="Type of chart" value="Line chart" />
        <GridItemText label="Data sources" value="UN AIDS" />
      </Box>
      {isSelected && !props.disableToolbar ? <GridItemToolbar /> : null}
    </ComponentBase>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
