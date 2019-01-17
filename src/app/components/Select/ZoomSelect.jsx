/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select, CheckBox } from 'grommet';
import {
  DialogHeading,
  ZoomButton,
  SimpleText,
  aidsFondsWhite,
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsRed,
  aidsFondsBlue,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';

const ComponentBase = styled(Select)`
  border-radius: 0;
  font-family: ${zoomFontFamOne};
  font-weight: normal;
  font-size: 14px;
  //background-color: ${zoomGreyZero};
  color: ${aidsFondsRed};
  ::-webkit-input-placeholder {
    color: ${aidsFondsRed};
  }
`;

const DropDownItem = styled.div`
  padding: 5px;
`;

const propTypes = {
  data: PropTypes.array,
  placeHolder: PropTypes.string,
};
const defaultProps = {
  placeHolder: 'Has no indicators',
};

const ZoomSelect = props => {

  const dropDownItem = item => {
    if(props.multiple)
    {
      return <CheckBox
        key={item}
        checked={props.arraySelected.indexOf(item.value) !== -1}
        label={item.label}
        onChange={() => props.selectVal(item)}
      />;

    }else
    {
      return <DropDownItem>{item.label}</DropDownItem>
    }
  };

  return (
    <ComponentBase
      closeOnChange={!props.multiple}
      multiple={props.multiple}
      placeholder={props.placeHolder}
      children={dropDownItem}
      options={props.data} plain
      value={props.valueSelected}
      onChange={!props.multiple && props.selectVal}
    />
  );
};

ZoomSelect.propTypes = propTypes;
ZoomSelect.defaultProps = defaultProps;

export default ZoomSelect;
