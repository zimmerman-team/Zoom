/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* utils */
import find from 'lodash/find';

/* components */
import { DropDownCont } from 'components/Panes/DataExplorePane/DataExplorerPane.style';
import SimpleSwitch from 'components/SimpleSwitch/SimpleSwitch';

/* styles */
import { ZoomSelect, SwitchContainer } from './DropdownMenuPanel.style';

const propTypes = {
  handleAxisSwitch: PropTypes.func,
  chartKeys: PropTypes.arrayOf(PropTypes.shape({})),
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      indicator: PropTypes.string,
      subIndicator: PropTypes.bool,
      categorise: PropTypes.bool,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      selectDataSource: PropTypes.func,
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.bool,
      placeHolderNumber: PropTypes.number,
      reset: PropTypes.func
    })
  )
};

const defaultProps = {
  handleAxisSwitch: null,
  chartKeys: [],
  panelDetails: [
    {
      indicator: '',
      subIndicator: false,
      categorise: false,
      allFileSources: [],
      selectedSources: [],
      selectDataSource: undefined,
      multiple: false,
      selectAll: false,
      defaultAll: false,
      placeHolderNumber: undefined,
      reset: undefined
    }
  ]
};

const DropdownMenuPanel = props => {
  return (
    <React.Fragment>
      {props.panelDetails.map((detail, index) => {
        let defChecked = false;

        if (detail.subIndicator && props.handleAxisSwitch) {
          defChecked = find(props.chartKeys, ['name', detail.indicator]);

          // so right is true, left is false
          defChecked = defChecked && defChecked.orientation === 'right';
        }

        return (
          // FIXME: creating a key for this listItem messes up the indicator results.
          <DropDownCont key={index}>
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
            />
            {detail.subIndicator && props.handleAxisSwitch && (
              <SwitchContainer>
                {/* Axis options specifically made for linechart dual Y-axis functionality */}
                <SimpleSwitch
                  defaultCheck={defChecked}
                  option1="Left Y-axis"
                  option2="Right Y-axis"
                  onSwitch={checked =>
                    props.handleAxisSwitch(checked, detail.indicator)
                  }
                />
              </SwitchContainer>
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
