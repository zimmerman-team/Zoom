/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* components */
import BaseComponent from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import { DropDownCont } from '../../../DataExplorerPane.style';
import YearSelector from '../../../../../YearSelector/YearSelector';
import _ZoomSelect from '../../../../../Select/ZoomSelect';

const ExpansionPanelDetailsContainer = styled(BaseComponent)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.zoomGreyZero};
  && {
    padding: 8px 0;
  }
`;

const ZoomSelect = styled(_ZoomSelect)`
  width: 100%;
`;

const propTypes = {
  isYearSelect: PropTypes.bool,
  selectYearRange: PropTypes.func,
  yearRange: PropTypes.array,

  isDropdownSelect: PropTypes.bool,
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
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
  isYearSelect: false,
  selectYearRange: undefined,
  yearRange: [],

  isDropdownSelect: false,
  panelDetails: [
    {
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

const ExpansionPanelDetails = props => {
  return (
    <ExpansionPanelDetailsContainer>
      {props.isDropdownSelect &&
        props.panelDetails.map((detail, index) => (
          // FIXME: creating a key for this listItem messes up the indicator results.
          <DropDownCont key={index}>
            <ZoomSelect
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
          </DropDownCont>
        ))}

      {props.isYearSelect && (
        <YearSelector
          selectYearRange={props.selectYearRange}
          yearRange={props.yearRange}
        />
      )}
    </ExpansionPanelDetailsContainer>
  );
};
ExpansionPanelDetails.propTypes = propTypes;
ExpansionPanelDetails.defaultProps = defaultProps;
export default ExpansionPanelDetails;
