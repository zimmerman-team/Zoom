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
  id: PropTypes.string,
  title: PropTypes.string,
  values: PropTypes.object,
  chartType: PropTypes.string,
  withoptions: PropTypes.bool
};

const defaultProps = {
  id: '1',
  title: PropTypes.string,
  values: {},
  chartType: 'geomap',
  withoptions: true
};

const GridItem = props => {
  const [isHovered, setIsHovered] = React.useState(false);
  const path = `/public/${props.chartType}/${props.id}/preview`;

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleClick(e) {
    props.withoptions ? e.preventDefault() : '';
  }

  return (
    <ComponentBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
      {props.withoptions && isHovered ? (
        <GridItemToolbar
          onEdit={props.onEdit}
          onView={props.onView}
          onDuplicate={props.onDuplicate}
          onDelete={props.onDelete}
        />
      ) : null}
    </ComponentBase>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
