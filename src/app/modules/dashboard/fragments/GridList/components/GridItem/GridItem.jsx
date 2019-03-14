/* base */
import React from 'react';
import * as PropTypes from 'prop-types';

/* utils */
import map from 'lodash/map';

/* components...*/
import GridItemText from './common/GridItemText';
import GridItemToolbar from './common/GridItemToolbar';
import {
  ComponentBase,
  GridItemHeading,
  Box,
  GridItemInfoContainer
} from './GridItem.styles';

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  chartType: PropTypes.number,
  withOptions: PropTypes.bool
};

const defaultProps = {
  id: 1,
  title: PropTypes.string,
  chartType: 1,
  withOptions: true
};

const GridItem = props => {
  const [isHovered, setIsHovered] = React.useState(false);
  const path = `/public/chart-library/${props.id}/${props.chartType}`;

  function handleMouseEnter() {
    setIsHovered(!isHovered);
  }

  function handleClick(e) {
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
        <GridItemHeading>{props.title}</GridItemHeading>
        <GridItemInfoContainer>
          {map(props.values, (val, key) => (
            <GridItemText label={key} value={val} />
          ))}
        </GridItemInfoContainer>
      </Box>
      {props.withOptions && isHovered ? <GridItemToolbar /> : null}
    </ComponentBase>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
