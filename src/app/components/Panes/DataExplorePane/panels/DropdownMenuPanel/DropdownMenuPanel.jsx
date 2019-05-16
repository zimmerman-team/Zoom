/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* utils */
/* components */
import { DropDownCont } from 'components/Panes/DataExplorePane/DataExplorerPane.style';
import SimpleSwitch from 'components/SimpleSwitch/SimpleSwitch';
/* icons */
import SvgIconAdd from 'assets/icons/IconAdd';
/* styles */
import {
  AddContainer,
  AddLabel,
  AddSection,
  IndicatorLabel,
  IndicatorRemove,
  IndLabelContainer,
  SwitchContainer,
  ZoomSelect
} from './DropdownMenuPanel.style';

const propTypes = {
  handleAxisSwitch: PropTypes.func,
  chartKeys: PropTypes.arrayOf(PropTypes.shape({})),
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      isIndicator: PropTypes.bool,
      addIndicator: PropTypes.func,
      sectionRemove: PropTypes.bool,
      sectionAdd: PropTypes.bool,
      indicatorLabel: PropTypes.string,
      subIndicator: PropTypes.bool,
      categorise: PropTypes.bool,
      indIndex: PropTypes.number,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      selectDataSource: PropTypes.func,
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.bool,
      removeIndicator: PropTypes.func,
      placeHolderNumber: PropTypes.number,
      capitalize: PropTypes.bool,
      reset: PropTypes.func
    })
  )
};

const defaultProps = {
  handleAxisSwitch: null,
  chartKeys: [],
  panelDetails: [
    {
      isIndicator: false,
      addIndicator: null,
      subIndicator: false,
      sectionAdd: false,
      sectionRemove: false,
      indIndex: -1,
      indicatorLabel: 'Indicator',
      categorise: false,
      allFileSources: [],
      selectedSources: [],
      selectDataSource: undefined,
      multiple: false,
      selectAll: false,
      defaultAll: false,
      removeIndicator: null,
      placeHolderNumber: undefined,
      capitalize: false,
      reset: undefined
    }
  ]
};

const DropdownMenuPanel = props => {
  return (
    <React.Fragment>
      {props.panelDetails.map((detail, index) => {
        let defChecked = false;

        if (
          detail.subIndicator &&
          props.handleAxisSwitch &&
          detail.indIndex !== -1
        ) {
          defChecked = props.chartKeys[detail.indIndex];

          // so right is true, left is false
          defChecked = defChecked && defChecked.orientation === 'right';
        }

        return (
          // FIXME: creating a key for this listItem messes up the indicator results.
          <DropDownCont
            key={index}
            style={{
              marginTop: detail.isIndicator && index !== 0 ? '30px' : ''
            }}
          >
            {detail.indicatorLabel && (
              <IndLabelContainer>
                <IndicatorLabel>{detail.indicatorLabel}</IndicatorLabel>
                {detail.sectionRemove && (
                  <IndicatorRemove onClick={detail.removeIndicator}>
                    Remove
                  </IndicatorRemove>
                )}
              </IndLabelContainer>
            )}
            <ZoomSelect
              data-cy={`datapane-select-${index}`}
              categorise={detail.categorise}
              multiple={detail.multiple}
              selectAll={detail.selectAll}
              defaultAll={detail.defaultAll}
              reset={detail.reset}
              placeHolderText={detail.placeHolderText}
              placeHolderNumber={detail.placeHolderNumber}
              data={detail.allFileSources}
              arraySelected={detail.selectedSources}
              selectVal={detail.selectDataSource}
              valueSelected={detail.valueSelected}
              capitalize={detail.capitalize}
            />
            {detail.subIndicator && props.handleAxisSwitch && (
              <SwitchContainer>
                {/* Axis options specifically made for linechart dual Y-axis functionality */}
                <SimpleSwitch
                  defaultCheck={defChecked}
                  option1="Left Y-axis"
                  option2="Right Y-axis"
                  onSwitch={checked =>
                    props.handleAxisSwitch(checked, detail.indIndex)
                  }
                />
              </SwitchContainer>
            )}
            {detail.sectionAdd && (
              <AddSection onClick={() => detail.addIndicator()}>
                <AddContainer>
                  <SvgIconAdd />
                  <AddLabel> Add Indicator</AddLabel>
                </AddContainer>
              </AddSection>
            )}
          </DropDownCont>
        );
      })}
    </React.Fragment>
  );
};
DropdownMenuPanel.propTypes = propTypes;
DropdownMenuPanel.defaultProps = defaultProps;
export default DropdownMenuPanel;
