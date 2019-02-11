/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* utils */
import map from 'lodash/map';

/* components */
import {
  Container,
  GridListItem,
  GridListItemTitle,
  GridListItemRow,
  GridListItemRowLabel,
  GridListItemRowValue
} from './GridList.styles';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}))
};
const defaultProps = {
  items: []
};

const GridList = ({ items }) => (
  <Container cellHeight={153} cols={3} spacing={40}>
    {items.map(item => (
      <GridListItem key={item.id}>
        <div>
          <GridListItemTitle>{item.title}</GridListItemTitle>
          {map(item.info, (val, key) => (
            <GridListItemRow key={key}>
              <GridListItemRowLabel>{key}:</GridListItemRowLabel>
              <GridListItemRowValue>{val}</GridListItemRowValue>
            </GridListItemRow>
          ))}
        </div>
      </GridListItem>
    ))}
  </Container>
);

GridList.propTypes = propTypes;
GridList.defaultProps = defaultProps;

export default GridList;
