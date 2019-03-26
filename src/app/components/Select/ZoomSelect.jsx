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
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';

/* styles */
import {
  ComponentBase,
  DropDownItem,
  ResetContainer,
  DropDownLabel,
  DropDownContainer,
  SelectAll,
  OptionsContainer,
  CategoryItem,
  ItemContainer,
  InfoLabel,
  EmptyOptions
} from 'components/Select/ZoomSelect.styles';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  placeHolderText: PropTypes.string,
  placeHolderNumber: PropTypes.number,
  reset: PropTypes.func,
  categorise: PropTypes.bool,
  search: PropTypes.bool,
  selectAll: PropTypes.bool,
  defaultAll: PropTypes.bool,
  disabledValues: PropTypes.arrayOf(PropTypes.string),
  dropDownWidth: PropTypes.number
};

const defaultProps = {
  categorise: false,
  defaultAll: true,
  placeHolder: 'Has no indicators',
  placeHolderText: 'Has no indicators',
  placeHolderNumber: '',
  reset: undefined,
  search: true,
  selectAll: false,
  disabledValues: [],
  dropDownWidth: undefined
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
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    // so we need the checkbox to be by default selected if the component mounts
    // with stuff already selected
    if (this.props.arraySelected) {
      this.allCheck();
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
          const regexLetter = /^[a-zA-Z]+$/;
          const options = [];
          // so here we define the first character of the category, depending on the first items
          // first character, we also check if it is a letter, then we put it in letter category
          // otherwise we put it under '#' category
          let prevCat = regexLetter.test(this.props.data[0].label[0])
            ? this.props.data[0].label[0].toUpperCase()
            : '#';

          options.push({ label: prevCat, value: 'category' });

          // and now we loop and add all other categories along with the actual values
          this.props.data.forEach(item => {
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

          this.setState({ options });
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
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
    if (this.state.allSelected)
      // so if selected all was checked and now it is to be unchecked
      // we reset the selected array like this
      this.props.selectVal('reset');
    // and if vice versa we pass in all the options as the value
    // and also pass in the array variable as true
    else this.props.selectVal(this.props.data, true);
  }

  handleItemClick(item) {
    if (!this.props.multiple) this.setState({ open: false });
    this.props.selectVal(item, false);
  }

  allCheck() {
    // so if an option is selected and 'selected all' is not checked
    // we check it, as it is the functionality shown in the VD
    if (this.props.arraySelected.length > 0)
      this.setState({ allSelected: true });
    else if (this.props.arraySelected.length === 0)
      //  and if the selected array becomes 0 and the all selected was checked
      //  we uncheck it
      this.setState({ allSelected: false });
  }

  renderDropDownItem(item, index) {
    if (item.value === 'category')
      return (
        <CategoryItem key={`dropDownItem-${index}`}>
          <DropDownLabel>{item.label}</DropDownLabel>
        </CategoryItem>
      );
    const itemDisabled = this.props.disabledValues.indexOf(item.value) !== -1;
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
        {this.props.multiple && (
          <DropDownCheckbox
            checked={
              findIndex(this.props.arraySelected, arrItemn => {
                if (item.value instanceof Array) {
                  return isEqual(item.value, arrItemn);
                }

                return item.value === arrItemn;
              }) !== -1
            }
          />
        )}
        <DropDownLabel>{item.label}</DropDownLabel>
      </DropDownItem>
    );
  }

  render() {
    return (
      <ComponentBase
        style={this.props.disabled ? { pointerEvents: 'none' } : {}}
        ref={this.setWrapperRef}
      >
        <SelectHeader
          headerStyle={this.props.headerStyle}
          arrowMargins={this.props.arrowMargins}
          label={
            this.props.valueSelected
              ? this.props.valueSelected
              : this.props.placeHolderText
          }
          placeHolderNumber={this.props.placeHolderNumber}
          onClick={() =>
            this.setState(prevState => {
              return { open: !prevState.open };
            })
          }
        />
        {this.state.open && (
          <DropDownContainer>
            {this.state.options.length > 0 ? (
              <div>
                {this.props.multiple && (
                  <ItemContainer>
                    <InfoLabel>
                      {this.props.arraySelected.length} of{' '}
                      {this.props.data.length} selected
                    </InfoLabel>
                  </ItemContainer>
                )}
                {this.props.search && (
                  <ItemContainer>
                    <SearchField
                      data-cy="geo-map-search"
                      value={this.state.searchWord}
                      onChange={e =>
                        this.setState({ searchWord: e.target.value })
                      }
                    />
                  </ItemContainer>
                )}
                {this.props.selectAll && this.props.multiple && (
                  <SelectAll onClick={() => this.selectAllClick()}>
                    <DropDownCheckbox checked={this.state.allSelected} />
                    <DropDownLabel>Select / Deselect all</DropDownLabel>
                  </SelectAll>
                )}
                <OptionsContainer>
                  {this.state.options.map((option, index) => {
                    if (
                      this.state.searchWord.length > 0 &&
                      (option.value === 'category' ||
                        option.label
                          .toLowerCase()
                          .includes(this.state.searchWord.toLowerCase()))
                    )
                      return this.renderDropDownItem(option, index);
                    else if (this.state.searchWord.length === 0)
                      return this.renderDropDownItem(option, index);
                  })}
                </OptionsContainer>
              </div>
            ) : (
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
