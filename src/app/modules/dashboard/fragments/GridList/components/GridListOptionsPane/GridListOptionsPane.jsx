/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SvgIconSort from '../../../../../../assets/icons/IconSort';
import SvgIconAdd from '../../../../../../assets/icons/IconAdd';
import GridListOption from './common/GridListOption';

const ComponentBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 17px;
  margin-bottom: 17px;
  width: 100%;
`;

const propTypes = {
  visibilityAddChart: PropTypes.string,
  leftOptionLabel: PropTypes.string,
  isRemoveButton: PropTypes.bool
};

const defaultProps = {
  visibilityAddChart: 'visible',
  leftOptionLabel: '',
  isRemoveButton: false
};

const GridListOptionsPane = props => {
  return (
    <ComponentBase>
      <GridListOption
        isRemoveButton={props.isRemoveButton}
        icon={<SvgIconAdd />}
        label={props.leftOptionLabel}
        visibility={props.visibilityAddChart}
      />
      <GridListOption icon={<SvgIconSort />} />
    </ComponentBase>
  );
};

GridListOptionsPane.propTypes = propTypes;
GridListOptionsPane.defaultProps = defaultProps;

export default GridListOptionsPane;
