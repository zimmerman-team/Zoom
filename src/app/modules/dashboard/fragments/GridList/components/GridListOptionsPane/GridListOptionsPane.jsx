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
  visibilityLeftButton: PropTypes.string,
  leftOptionLabel: PropTypes.string,
  isRemoveOption: PropTypes.bool
};

const defaultProps = {
  visibilityLeftButton: 'visible',
  leftOptionLabel: '',
  isRemoveOption: false
};

const GridListOptionsPane = props => {
  return (
    <ComponentBase>
      <GridListOption
        isRemoveOption={props.isRemoveOption}
        icon={<SvgIconAdd />}
        label={props.leftOptionLabel}
        visibility={props.visibilityLeftButton}
      />
      <GridListOption
        icon={<SvgIconSort />}
        isSortByOpen={props.isSortByOpen}
        changeSortBy={props.changeSortBy}
        setWrapperRef={props.setWrapperRef}
        setIsSortByOpen={props.setIsSortByOpen}
        activeTab={props.activeTab}
        sort={props.sort}
        tabs={props.tabs}
      />
    </ComponentBase>
  );
};

GridListOptionsPane.propTypes = propTypes;
GridListOptionsPane.defaultProps = defaultProps;

export default GridListOptionsPane;
