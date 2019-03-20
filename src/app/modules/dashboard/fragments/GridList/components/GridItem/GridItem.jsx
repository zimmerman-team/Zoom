/* base */
import React from 'react';
import shortId from 'shortid';
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
  values: PropTypes.object,
  chartType: PropTypes.number,
  withoptions: PropTypes.bool
};

const defaultProps = {
  id: 1,
  title: PropTypes.string,
  values: {},
  chartType: 1,
  withoptions: true
};

const GridItem = props => {
  const [isHovered, setIsHovered] = React.useState(false);
  const path = `/public/chart-library/${props.id}/${props.chartType}`;

  function handleMouseEnter() {
    setIsHovered(!isHovered);
  }

  function handleClick(e) {
    props.withoptions ? e.preventDefault() : '';
  }

  return (
    <ComponentBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      onClick={handleClick}
      options={props.withoptions ? 'pointer' : 'default'}
      to={path}
    >
      <Box>
        <GridItemHeading>{props.title}</GridItemHeading>
        <GridItemInfoContainer>
          {map(props.values, (val, key) => (
            <GridItemText key={shortId.generate()} label={key} value={val} />
          ))}
        </GridItemInfoContainer>
      </Box>
      {props.withoptions && isHovered ? <GridItemToolbar /> : null}
    </ComponentBase>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
