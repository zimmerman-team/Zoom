/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import SelectHeader from 'components/Select/components/SelectHeader/SelectHeader';
import { Tooltip } from 'react-tippy';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import DropDownCheckbox from 'components/DropDownCheckBox/DropDownCheckbox';
import SearchField from 'components/Select/components/SearchField/SearchField';
/* icons */
import ResetIconSmall from 'assets/icons/ResetIconSmall';
/* utils */
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';
/* styles */
import {
  CategoryItem,
  ComponentBase,
  DropDownContainer,
  DropDownItem,
  DropDownLabel,
  EmptyOptions,
  InfoLabel,
  ItemContainer,
  OptionsContainer,
  ResetContainer,
  SelectAll
} from 'components/Select/ZoomSelect.styles';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  border: PropTypes.bool,
  placeHolderText: PropTypes.string,
  placeHolderNumber: PropTypes.number,
  reset: PropTypes.func,
  categorise: PropTypes.bool,
  search: PropTypes.bool,
  selectAll: PropTypes.bool,
  defaultAll: PropTypes.bool,
  openDropDown: PropTypes.bool,
  selectedRegionCodes: PropTypes.arrayOf(PropTypes.string),
  disabledValues: PropTypes.arrayOf(PropTypes.string),
  dropDownWidth: PropTypes.number,
  capitalize: PropTypes.bool
};

const defaultProps = {
  border: false,
  categorise: false,
  defaultAll: true,
  placeHolder: 'Has no indicators',
  placeHolderText: 'Has no indicators',
  placeHolderNumber: undefined,
  selectedRegionCodes: null,
  reset: undefined,
  openDropDown: false,
  search: true,
  selectAll: false,
  disabledValues: [],
  dropDownWidth: undefined,
  capitalize: false
};

class ZoomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: false,
      open: false,
      options: props.data,
      // so we'll basically use this variable
      // to select all choices by default when data with
      // select all functionality comes in
      initialSelect: true,
      searchWord: ''
    };

    this.renderDropDownItem = this.renderDropDownItem.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.allCheck = this.allCheck.bind(this);
    this.categorise = this.categorise.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    // so we need the checkbox to be by default selected if the component mounts
    // with stuff already selected
    if (this.props.arraySelected) {
      this.allCheck();
    }

    if (
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.categorise
    ) {
      this.categorise();
    }
  }

  componentDidUpdate(prevProps) {
    // so here we set up the logic for all checkbox to be updated
    // depending on the select option array
    if (!isEqual(this.props.arraySelected, prevProps.arraySelected)) {
      this.allCheck();
    }

    if (!isEqual(this.props.data, prevProps.data) && this.props.data) {
      if (this.props.data.length > 0) {
        // this is where we'll add extra 'categorization' items
        // if the dropdown needs to be categorized,
        // basically now will be categorized alphabetically
        // this should happen only once
        // IMPORTANT: the data needs to come already sorted
        // and ofcourse it also needs to come in as array of {label: '', value: ''}
        if (this.props.categorise) {
          this.categorise();
        } else {
          this.setState({ options: this.props.data });
        }
      } else {
        this.setState({ options: [], initialSelect: true });
      }

      if (
        this.props.selectAll &&
        this.state.initialSelect &&
        this.props.defaultAll
      ) {
        this.props.selectVal(this.props.data, true);
        this.setState({ initialSelect: false });
      }
    }

    if (
      this.props.openDropDown !== prevProps.openDropDown &&
      this.props.openDropDown
    ) {
      this.setState({ open: true });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onSearchChange(e) {
    this.setState({ searchWord: e.target.value }, () => {
      const data = filter(this.props.data, item =>
        item.label.toLowerCase().includes(this.state.searchWord.toLowerCase())
      );
      if (this.props.categorise) {
        this.categorise(data);
      } else {
        this.setState({ options: data });
      }
    });
  }

  /**
   * Set the wrapper ref for dropdown container
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * close the dropdown container if clicked outside
   * ignoring if the header is clicked
   */
  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  }

  selectAllClick() {
    if (this.state.allSelected) {
      // so if selected all was checked and now it is to be unchecked
      // we reset the selected array like this
      this.props.selectVal('reset');
    }
    // and if vice versa we pass in all the options as the value
    // and also pass in the array variable as true
    else this.props.selectVal(this.props.data, true);
  }

  handleItemClick(item) {
    if (!this.props.multiple) this.setState({ open: false });
    this.props.selectVal(item, false);
  }

  allCheck() {
    if (this.props.arraySelected) {
      // so if an option is selected and 'selected all' is not checked
      // we check it, as it is the functionality shown in the VD
      if (this.props.arraySelected.length > 0) {
        this.setState({ allSelected: true });
      } else if (this.props.arraySelected.length === 0) {
        //  and if the selected array becomes 0 and the all selected was checked
        //  we uncheck it
        this.setState({ allSelected: false });
      }
    }
  }

  categorise(data = this.props.data) {
    const regexLetter = /^[a-zA-Z]+$/;
    const options = [];
    // so here we define the first character of the category, depending on the first items
    // first character, we also check if it is a letter, then we put it in letter category
    // otherwise we put it under '#' category
    if (data.length > 0) {
      let prevCat = regexLetter.test(data[0].label[0])
        ? data[0].label[0].toUpperCase()
        : '#';

      options.push({ label: prevCat, value: 'category' });

      // and now we loop and add all other categories along with the actual values
      data.forEach(item => {
        const category = regexLetter.test(item.label[0])
          ? item.label[0].toUpperCase()
          : '#';
        // so if the previous category is not equals to the new category
        // we push it in and set it to be the prevCategory
        if (prevCat !== category) {
          prevCat = category;
          options.push({ label: prevCat, value: 'category' });
        }

        options.push(item);
      });
    }

    this.setState({ options });
  }

  // trims a string starting at the, character
  // pushes it to a new array and returns
  // europe, regional -> europe
  trimSelectedValues(selectedValues) {
    const newSelectedValues = selectedValues;
    if (selectedValues.length > 1) {
      selectedValues.forEach((val, index) => {
        if (val.includes(',')) {
          newSelectedValues[index] = val.substring(0, val.indexOf(','));
        }
      });
    }

    return newSelectedValues;
  }

  // europe, regional -> europe, regional
  // ["europe, regional", "africa, regional" ] -> europe, africa
  // ["europe, regional", "africa, regional", "far east asia, regional " ] -> europe, africa...
  createLabel(selectedValues) {
    const trimmedValues = this.trimSelectedValues(selectedValues);
    if (trimmedValues.length === 1) {
      return trimmedValues[0];
    }
    if (trimmedValues.length === 2) {
      return `${trimmedValues[0]}, ${trimmedValues[1]}`;
    }
    return `${trimmedValues[0]}, ${trimmedValues[1]}...`;
  }

  placeHolderNumber(valueSelected, placeHolderNumber, categorise) {
    if (
      valueSelected === undefined ||
      valueSelected.length === 0 ||
      typeof valueSelected === 'string'
    ) {
      if (categorise && valueSelected) return undefined;
      return placeHolderNumber;
    }
    return valueSelected.length;
  }

  renderDropDownItem(item, index) {
    if (item.value === 'category') {
      return (
        <CategoryItem key={`dropDownItem-${index}`}>
          <DropDownLabel capitalize={this.props.capitalize}>
            {item.label}
          </DropDownLabel>
        </CategoryItem>
      );
    }
    const itemDisabled = this.props.disabledValues.indexOf(item.value) !== -1;

    let checked = false;

    // so for regions because some regions in our system
    // have 0 country values associated with them,
    // and because generally we should be checking things by codes or ids
    // we need to redo the checked part for the regions, cause the selected
    // values currently are associated country values
    // so we'll do the checked checking for regions by their codes,
    // and not their values
    if (this.props.selectedRegionCodes) {
      checked =
        findIndex(this.props.selectedRegionCodes, arrItemn => {
          return item.codeVal === arrItemn;
        }) !== -1;
    } else {
      // and this is the normal checking
      checked =
        findIndex(this.props.arraySelected, arrItemn => {
          if (item.value instanceof Array) {
            return isEqual(item.value, arrItemn);
          }
          return item.value === arrItemn;
        }) !== -1;
    }

    return (
      <DropDownItem
        style={{
          width: this.props.dropDownWidth ? this.props.dropDownWidth : '',
          pointerEvents: itemDisabled ? 'none' : '',
          opacity: itemDisabled ? '0.5' : ''
        }}
        key={`dropDownItem-${index}`}
        onClick={() => this.handleItemClick(item)}
      >
        {this.props.multiple && <DropDownCheckbox checked={checked} />}
        <DropDownLabel capitalize={this.props.capitalize}>
          {item.label}
        </DropDownLabel>
      </DropDownItem>
    );
  }

  render() {
    return (
      <ComponentBase
        style={this.props.disabled ? { pointerEvents: 'none' } : {}}
        ref={this.setWrapperRef}
        compBorder={this.props.border}
        data-cy="zoom-select"
      >
        <SelectHeader
          capitalize={this.props.capitalize}
          headerStyle={this.props.headerStyle}
          arrowMargins={this.props.arrowMargins}
          placeHolderNumber={this.placeHolderNumber(
            this.props.valueSelected,
            this.props.placeHolderNumber,
            this.props.categorise
          )}
          label={
            this.props.valueSelected === undefined ||
            this.props.valueSelected.length === 0
              ? this.props.placeHolderText
              : Array.isArray(this.props.valueSelected) &&
                this.props.valueSelected.length > 1
              ? this.createLabel(this.props.valueSelected)
              : this.props.valueSelected
          }
          onClick={() =>
            this.setState(prevState => {
              return { open: !prevState.open };
            })
          }
        />
        {this.state.open && (
          <DropDownContainer>
            {this.props.data.length > 0 && this.props.multiple && (
              <ItemContainer>
                <InfoLabel>
                  {this.props.arraySelected.length} of {this.props.data.length}{' '}
                  selected
                </InfoLabel>
              </ItemContainer>
            )}
            {this.props.search && (
              <ItemContainer>
                <SearchField
                  data-cy="geo-map-search"
                  value={this.state.searchWord}
                  onChange={this.onSearchChange}
                />
              </ItemContainer>
            )}
            {this.props.data.length > 0 &&
              this.props.selectAll &&
              this.props.multiple && (
                <SelectAll onClick={() => this.selectAllClick()}>
                  <DropDownCheckbox
                    checked={
                      this.state.allSelected ||
                      this.props.arraySelected.length > 0
                    }
                  />
                  <DropDownLabel>Select / Deselect all</DropDownLabel>
                </SelectAll>
              )}
            {this.state.options.length > 0 && (
              <OptionsContainer>
                {this.state.options.map((option, index) => {
                  return this.renderDropDownItem(option, index);
                })}
              </OptionsContainer>
            )}
            {this.state.options.length === 0 && (
              <EmptyOptions> No options </EmptyOptions>
            )}
          </DropDownContainer>
        )}
        {this.props.reset && (
          <ResetContainer onClick={this.props.reset}>
            <Tooltip
              html={<SimpleToolTip title="Reset" />}
              position="top-start"
              trigger="mouseenter"
            >
              <ResetIconSmall />
            </Tooltip>
          </ResetContainer>
        )}
      </ComponentBase>
    );
  }
}

ZoomSelect.propTypes = propTypes;
ZoomSelect.defaultProps = defaultProps;

export default ZoomSelect;
