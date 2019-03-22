/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* componenets */
import {
  ComponentBase,
  IconButton,
  IconLabel,
  RemoveButton
} from './GridListOption.styles';
import SortbyDialog from '../../../../../../../components/Dialog/SortbyDialog/SortbyDialog';
import {
  AddUserLink,
  ControlsRow
} from 'modules/dashboard/fragments/UsersTabView/UsersTabView.styles';
import SvgIconPlus from 'assets/icons/IconPlus';
import { Link } from 'react-router-dom';

const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

const OptionLink = styled.a`
  text-decoration: none;
  text-underline: none;
`;

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  visibility: PropTypes.string,
  isRemoveOption: PropTypes.bool
};
const defaultProps = {
  label: '',
  visibility: 'visible',
  isRemoveOption: false
};

function handleClick() {}

const GridListOption = props => {
  console.log('joe', props.label);

  return (
    <ComponentBase visibility={props.visibility} onClick={() => handleClick}>
      {props.isRemoveOption ? (
        <RemoveButton>remove indefinite</RemoveButton>
      ) : (
        <React.Fragment>
          {/*todo: this is suuuuper hacky, did this quickly for testing purposes, will refactor this asap*/}
          {props.label === 'add users' && (
            <OptionLink href="/add-user">
              <IconButton onClick={props.setIsSortByOpen}>
                {props.icon}
                <IconLabel>{props.label}</IconLabel>
              </IconButton>
            </OptionLink>
          )}
          {/*todo: this is suuuuper hacky, did this quickly for testing purposes, will refactor this asap*/}
          {props.label === 'create users' && (
            <OptionLink href="/create-team">
              <IconButton onClick={props.setIsSortByOpen}>
                {props.icon}
                <IconLabel>{props.label}</IconLabel>
              </IconButton>
            </OptionLink>
          )}

          {/* {props.label != 'add users' && (
            <IconButton onClick={props.setIsSortByOpen}>
              {props.icon}
              <IconLabel>{props.label}</IconLabel>
            </IconButton>
          )}*/}
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
