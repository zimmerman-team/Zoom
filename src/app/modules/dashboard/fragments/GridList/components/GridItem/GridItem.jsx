/* base */
import React from 'react';
import * as PropTypes from 'prop-types';

/* components...*/
import GridItemText from './common/GridItemText';
import GridItemToolbar from './common/GridItemToolbar';
import {ComponentBase, GridItemHeading, Box} from './GridItem.styles';


const propTypes = {
  data: PropTypes.array,
  id: PropTypes.number,
  chartType: PropTypes.number,
  withOptions: PropTypes.bool,
};

const defaultProps = {
  data: PropTypes.array,
  id: 1,
  chartType: 1,
  withOptions: true,
};

const GridItem = props => {
  const [isHovered, setIsHovered] = React.useState(false);
  const path = `/public/chart-library/${props.id}/${props.chartType}`;

  function handleMouseEnter() {
    setIsHovered(!isHovered);
  }

  function handleClick(e){
    props.withOptions ? e.preventDefault() : '';
  }

  return (
    <ComponentBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      onClick={handleClick}
      withOptions={props.withOptions}
      to={path}
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
      {props.withOptions && isHovered ? <GridItemToolbar/> : null}
    </ComponentBase>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
