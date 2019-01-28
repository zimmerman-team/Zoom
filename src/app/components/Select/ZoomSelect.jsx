/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, CheckBox } from 'grommet';
import { Tooltip } from 'react-tippy';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import SelectHeader from 'components/Select/components/SelectHeader/SelectHeader';
import ResetIcon from 'assets/icons/icon_reset.svg';
import {
  ComponentBase,
  DropDownItem,
  ResetContainer,
  ToolTipInsider,
} from 'components/Select/ZoomSelect.styles';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';

const propTypes = {
  data: PropTypes.array,
  placeHolder: PropTypes.string,
  reset: PropTypes.func,
};
const defaultProps = {
  placeHolder: 'Has no indicators',
  reset: undefined,
};

// basically a theme to remove the arrow and add custom arrows to this
const removeArrowTheme = deepMerge(grommet, {
  select: {
    icons: {
      down: 'div',
    },
  },
});

const ZoomSelect = props => {
  const dropDownItem = item => {
    if (props.multiple)
      return (
        <DropDownItem>
          <CheckBox
            key={item}
            checked={props.arraySelected.indexOf(item.value) !== -1}
            label={item.label}
            onChange={() => props.selectVal(item)}
          />
        </DropDownItem>
      );
    return <DropDownItem>{item.label}</DropDownItem>;
  };

  return (
    <ComponentBase>
      <Select
        plain
        theme={removeArrowTheme}
        closeOnChange={!props.multiple}
        multiple={props.multiple}
        placeholder={props.placeHolder}
        children={dropDownItem}
        options={props.data}
        valueLabel={
          <SelectHeader
            headerStyle={props.headerStyle}
            arrowMargins={props.arrowMargins}
            label={
              props.valueSelected ? props.valueSelected : props.placeHolder
            }
          />
        }
        onChange={props.multiple ? null : props.selectVal}
      />
      {props.reset && (
        <ResetContainer onClick={props.reset}>
          <Tooltip
            html={<SimpleToolTip title="Reset" />}
            position="top-start"
            trigger="mouseenter"
          >
            <ResetIcon />
          </Tooltip>
        </ResetContainer>
      )}
    </ComponentBase>
  );
};

ZoomSelect.propTypes = propTypes;
ZoomSelect.defaultProps = defaultProps;

export default ZoomSelect;
