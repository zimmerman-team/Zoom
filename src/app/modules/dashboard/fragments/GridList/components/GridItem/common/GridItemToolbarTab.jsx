/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

const TabIconButton = styled.div`
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }

  &:hover path {
    fill: ${Theme.color.aidsFondsBlue} !important;
  }
`;

const propTypes = {
  icon: PropTypes.node,
  indexTab: PropTypes.string
};

const defaultProps = {};

const GridItemToolbarTab = props => {
  function handleClick(indexTab) {
    console.log('Clicked: ' + indexTab);
  }

  return (
    // todo: Evaluate element, React.Fragment only takes key/children attribute.
    <TabIconButton
      onClick={() => {
        handleClick(props.indexTab);
      }}
    >
      {props.icon}
    </TabIconButton>
  );
};
GridItemToolbarTab.propTypes = propTypes;
GridItemToolbarTab.defaultProps = defaultProps;

export default GridItemToolbarTab;
