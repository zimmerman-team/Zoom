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

const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  visibility: PropTypes.string,
  isRemoveButton: PropTypes.bool
};
const defaultProps = {
  label: '',
  visibility: 'visible',
  isRemoveButton: false
};

function handleClick() {}

const GridListOption = props => {
  return (
    <ComponentBase visibility={props.visibility} onClick={() => handleClick}>
      {props.isRemoveButton ? (
        <RemoveButton>remove indefinite</RemoveButton>
      ) : (
        <React.Fragment>
          <IconButton>
            {props.icon}
            <IconLabel>{props.label}</IconLabel>
          </IconButton>

          {/*<SortbyDialog*/}
          {/*open={setIsOpen(!setIsOpen)}*/}
          {/*options={sortByOptions}*/}
          {/*selectedOptionValue={sort}*/}
          {/*onOptionClick={handleOptionClick}*/}
          {/*setWrapperRef={setWrapperRef}*/}
          {/*closeDialog={setIsOpen(!setIsOpen)}*/}
          {/*/>*/}
        </React.Fragment>
      )}
    </ComponentBase>
  );
};
GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
