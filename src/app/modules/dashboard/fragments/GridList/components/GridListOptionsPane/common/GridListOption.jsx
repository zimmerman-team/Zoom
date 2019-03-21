/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* componenets */
import {
  ComponentBase,
  IconButton,
  IconLabel,
  RemoveButton
} from './GridListOption.styles';
import SortbyDialog from '../../../../../../../components/Dialog/SortbyDialog/SortbyDialog';

const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  visibility: PropTypes.string,
  isRemoveOption: PropTypes.bool,
  targetUrl: PropTypes.string
};
const defaultProps = {
  label: '',
  visibility: 'visible',
  isRemoveOption: false,
  targetUrl: '/'
};

function handleClick() {}

const GridListOption = props => {
  return (
    <ComponentBase
      visibility={props.visibility}
      onClick={() => handleClick}
      to={props.targetUrl}
    >
      {props.isRemoveOption ? (
        <RemoveButton>remove indefinite</RemoveButton>
      ) : (
        <React.Fragment>
          <IconButton onClick={props.setIsSortByOpen}>
            {props.icon}
            <IconLabel>{props.label}</IconLabel>
          </IconButton>

          <SortbyDialog
            open={props.isSortByOpen}
            options={sortByOptions}
            selectedOptionValue={props.sort}
            onOptionClick={props.changeSortBy}
            setWrapperRef={props.setWrapperRef}
            closeDialog={props.setIsSortByOpen}
          />
        </React.Fragment>
      )}
    </ComponentBase>
  );
};
GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
