/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import { Select, CheckBox, Box } from 'grommet';
import { zoomFontFamOne, aidsFondsRed } from 'components/theme/ThemeSheet';

const CustomSelect = styled(Select)`
  font-family: ${zoomFontFamOne};
  font-weight: normal;
  font-size: 14px;
  color: ${aidsFondsRed};
  ::-webkit-input-placeholder {
    color: ${aidsFondsRed};
  }
`;

const DropDownItem = styled.div`
  padding: 5px;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  placeHolder: PropTypes.string,
  selectVal: PropTypes.func,
  valueSelected: PropTypes.string,
};

const defaultProps = {
  data: [{ label: '', value: '' }],
  placeHolder: '',
  selectVal: null,
  valueSelected: '',
};

const FormSelect = props => {
  const dropDownItem = item => {
    if (props.multiple)
      return (
        <CheckBox
          key={item}
          checked={props.arraySelected.indexOf(item.value) !== -1}
          label={item.label}
          onChange={() => props.selectVal(item)}
        />
      );
    return <DropDownItem>{item.label}</DropDownItem>;
  };

  return (
    <Box>
      <CustomSelect
        closeOnChange={!props.multiple}
        multiple={props.multiple}
        placeholder={props.placeHolder}
        children={dropDownItem}
        options={props.data}
        plain
        value={props.valueSelected}
        onChange={props.multiple ? null : props.selectVal}
      />
    </Box>
  );
};

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

export default FormSelect;
