/* base */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

/* components */
import { Container } from './GridList.styles';
import GridItem from './components/GridItem/GridItem';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  withoptions: PropTypes.bool
};

const defaultProps = {
  items: [],
  withoptions: true
};

const GridList = ({ items, withoptions }) => (
  <Container cellHeight={153} cols={3}>
    {items.map(item => (
      <GridItem
        id={item.id}
        withoptions={withoptions}
        owner={item.owner}
        key={shortid.generate()}
        chartType={item.chartType}
        title={item.title}
        values={item.info}
        onEdit={item.onEdit}
        onView={item.onView}
        onDuplicate={item.onDuplicate}
        onDelete={item.onDelete}
      />
    ))}
  </Container>
);

GridList.propTypes = propTypes;
GridList.defaultProps = defaultProps;

export default GridList;
