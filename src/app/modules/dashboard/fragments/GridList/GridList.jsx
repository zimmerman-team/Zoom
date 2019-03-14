/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Container } from './GridList.styles';
import GridItem from './components/GridItem/GridItem';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  withOptions: PropTypes.bool
};
const defaultProps = {
  items: [],
  withOptions: true
};

const GridList = ({ items, withOptions }) => (
  <Container cellHeight={153} cols={3}>
    {items.map(item => (
      <GridItem
        withOptions={withOptions}
        key={item.id}
        title={item.title}
        values={item.info}
      />
    ))}
  </Container>
);

GridList.propTypes = propTypes;
GridList.defaultProps = defaultProps;

export default GridList;
