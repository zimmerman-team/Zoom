/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* utils */
import findIndex from 'lodash/findIndex';
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
  subIndAggrToggle: PropTypes.func,
  aggrToggle: PropTypes.bool,
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      disabledValues: PropTypes.arrayOf(PropTypes.string),
      isIndicator: PropTypes.bool,
      addIndicator: PropTypes.func,
      sectionAdd: PropTypes.bool,
      aggrCheck: PropTypes.bool,
      addIndLabel: PropTypes.string,
      indicatorLabel: PropTypes.string,
      subIndicator: PropTypes.bool,
      categorise: PropTypes.bool,
      indIndex: PropTypes.number,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      selectDataSource: PropTypes.func,
      selectedRegionCodes: PropTypes.arrayOf(PropTypes.string),
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.bool,
      openSubInd: PropTypes.bool,
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
  subIndAggrToggle: null,
  aggrToggle: false,
  panelDetails: [
    {
      disabledValues: [],
      isIndicator: false,
      addIndicator: null,
      subIndicator: false,
      sectionAdd: false,
      addIndLabel: 'Add Indicator',
      aggrCheck: false,
      indIndex: -1,
      indicatorLabel: 'Indicator',
      categorise: false,
      allFileSources: [],
      selectedSources: [],
      selectDataSource: undefined,
      selectedRegionCodes: null,
      multiple: false,
      selectAll: false,
      openSubInd: false,
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
        let axisChecked = false;

        if (
          detail.subIndicator &&
          props.handleAxisSwitch &&
          detail.indIndex !== -1
        ) {
          const chartKeyInd = findIndex(props.chartKeys, [
            'indIndex',
            detail.indIndex
          ]);

          // so right is true, left is false
          axisChecked =
            chartKeyInd !== -1 &&
            props.chartKeys[chartKeyInd].orientation === 'right';
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
                {props.panelDetails.length > 2 && (
                  <IndicatorRemove onClick={detail.removeIndicator}>
                    Remove
                  </IndicatorRemove>
                )}
              </IndLabelContainer>
            )}
            <ZoomSelect
              data-cy={`datapane-select-${index}`}
              disabledValues={detail.disabledValues}
              categorise={detail.categorise}
              multiple={detail.multiple}
              selectAll={detail.selectAll}
              defaultAll={detail.defaultAll}
              openDropDown={detail.subIndicator && detail.openSubInd}
              selectedRegionCodes={detail.selectedRegionCodes}
              reset={detail.reset}
              placeHolderText={detail.placeHolderText}
              placeHolderNumber={detail.placeHolderNumber}
              data={detail.allFileSources}
              arraySelected={detail.selectedSources}
              selectVal={detail.selectDataSource}
              valueSelected={detail.valueSelected}
              capitalize={detail.capitalize}
            />

            {detail.subIndicator && (
              <SwitchContainer>
                {/* Axis options specifically made for linechart dual Y-axis functionality */}
                {props.handleAxisSwitch && (
                  <SimpleSwitch
                    defaultCheck={axisChecked}
                    label="Switch Axis"
                    onSwitch={checked =>
                      props.handleAxisSwitch(checked, detail.indIndex)
                    }
                  />
                )}
                {props.aggrToggle && (
                  <SimpleSwitch
                    defaultCheck={detail.aggrCheck}
                    label="(Dis)aggregate"
                    onSwitch={checked =>
                      props.subIndAggrToggle(checked, detail.indIndex)
                    }
                  />
                )}
              </SwitchContainer>
            )}

            {detail.sectionAdd && (
              <AddSection onClick={() => detail.addIndicator()}>
                <AddContainer>
                  <SvgIconAdd />
                  <AddLabel>{detail.addIndLabel}</AddLabel>
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
