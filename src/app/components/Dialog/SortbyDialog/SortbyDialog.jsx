/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import { aidsFondsWhite, zoomGreyZero } from 'components/theme/ThemeSheet';
import { ComponentBase, OptionRow } from './SortbyDialog.styles';

const propTypes = {
  open: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  closeDialog: PropTypes.func,
  setWrapperRef: PropTypes.func,
  onOptionClick: PropTypes.func,
  selectedOptionValue: PropTypes.string,
};
const defaultProps = {
  open: false,
  options: [
    { label: 'Option a', value: 'a' },
    { label: 'Option b', value: 'b' },
    { label: 'Option c', value: 'c' },
  ],
  closeDialog: null,
  setWrapperRef: null,
  onOptionClick: null,
  selectedOptionValue: '',
};

const SortbyDialog = ({
  open,
  options,
  closeDialog,
  setWrapperRef,
  onOptionClick,
  selectedOptionValue,
}) => {
  return (
    <React.Fragment>
      {open && (
        <ComponentBase onClickOutside={closeDialog} ref={setWrapperRef}>
          {options.map(o => {
            const selected = selectedOptionValue === o.value;
            return (
              <OptionRow
                key={o.value}
                id={o.value}
                onClick={onOptionClick}
                theme={{ background: selected ? zoomGreyZero : aidsFondsWhite }}
              >
                {o.label}
              </OptionRow>
            );
          })}
        </ComponentBase>
      )}
    </React.Fragment>
  );
};

SortbyDialog.propTypes = propTypes;
SortbyDialog.defaultProps = defaultProps;

export default SortbyDialog;
