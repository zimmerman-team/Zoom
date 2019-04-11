/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* componenets */
import { Link as _Link } from 'react-router-dom';
import {
  IconButton,
  IconLabel,
  RemoveButton,
  SortIconButton
} from './GridListOption.styles';
import SortbyDialog from '../../../../../../../components/Dialog/SortbyDialog/SortbyDialog';

const sortByOptions = [
  { label: 'Name (asc)', value: 'title' },
  { label: 'Name (desc)', value: '-title' }
];

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  visibility: PropTypes.string,
  isRemoveOption: PropTypes.bool,
  isSort: PropTypes.bool,
  targetUrl: PropTypes.string
};
const defaultProps = {
  label: '',
  visibility: 'visible',
  isRemoveOption: false,
  isSort: false,
  targetUrl: '/'
};

const Link = styled(_Link)`
  text-decoration: none;
  visibility: ${props => props.visibility};
`;

const GridListOption = props => {
  switch (true) {
    case props.isRemoveOption:
      return <RemoveButton>remove indefinite</RemoveButton>;
    case props.isSort:
      return (
        <React.Fragment>
          <SortIconButton
            onClick={props.setIsSortByOpen}
            visibility={props.visibility}
          >
            {props.icon}
          </SortIconButton>
          <SortbyDialog
            open={props.isSortByOpen}
            options={sortByOptions}
            selectedOptionValue={props.sort}
            onOptionClick={props.changeSortBy}
            setWrapperRef={props.setWrapperRef}
            closeDialog={props.setIsSortByOpen}
          />
        </React.Fragment>
      );
    default:
      if (props.label)
        return (
          <Link to={props.targetUrl} visibility={props.visibility}>
            <IconButton>
              {props.icon}
              <IconLabel>{props.label}</IconLabel>
            </IconButton>
          </Link>
        );
      return null;
  }
};

GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
