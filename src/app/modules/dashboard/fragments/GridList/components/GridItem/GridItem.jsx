/* base */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

/* components...*/
import GridItemText from './common/GridItemText';
import GridItemToolbar from './common/GridItemToolbar';
import {ComponentBase, GridItemHeading, Box} from './GridItem.styles';


const propTypes = {

  withOptions: PropTypes.bool
};
const defaultProps = {
  withOptions: true
};

const GridItem = props => {
  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseEnter() {
    setIsHovered(!isHovered);
  }

  function handleClick(id, chartType) {
    if(!props.withOptions) {
      console.log('click!');
      return `public/chart-library/${id}/${chartType}`;
    }
  }

  return (
    <ComponentBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      onClick={() => handleClick(1, 1)}
      withOptions={props.withOptions}
      to={handleClick}
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
