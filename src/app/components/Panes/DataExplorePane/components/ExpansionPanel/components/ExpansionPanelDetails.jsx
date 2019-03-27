/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import shortID from 'shortid';

/*Components*/
import _ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import { DropDownCont } from '../../../DataExplorerPane.style';
import YearSelector from '../../../../../YearSelector/YearSelector';
import _ZoomSelect from '../../../../../Select/ZoomSelect';

const ExpansionPanelDetailsContainer = styled(_ExpansionPanelDetails)`
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
  selectYear: PropTypes.func,
  selectedYears: PropTypes.arrayOf(PropTypes.string),

  isDropdownSelect: PropTypes.bool,
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      categorise: PropTypes.bool,
      locationSelected: PropTypes.bool,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.array,
      selectDataSource: PropTypes.func,
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.array,
      placeHolderNumber: PropTypes.number,
      reset: PropTypes.func
    })
  )
};

const defaultProps = {
  isYearSelect: false,
  selectYear: undefined,
  selectedYears: [],

  isDropdownSelect: false,
  panelDetails: [
    {
      locationSelected: false,
      categorise: false,
      allFileSources: [],
      selectedSources: [],
      selectDataSource: undefined,
      multiple: false,
      selectAll: false,
      defaultAll: [],
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
              defaultAll={detail.locationSelected}
              reset={detail.reset}
              placeHolderText={detail.placeHolderText}
              placeHolderNumber={detail.placeHolderNumber}
              data={detail.allFileSources}
              arraySelected={detail.selectedSources}
              selectVal={detail.selectDataSource}
            />
          </DropDownCont>
        ))}

      {props.isYearSelect && (
        <YearSelector
          selectYear={props.selectYear}
          selectedYears={props.selectedYears}
        />
      )}
    </ExpansionPanelDetailsContainer>
  );
};
ExpansionPanelDetails.propTypes = propTypes;
ExpansionPanelDetails.defaultProps = defaultProps;
export default ExpansionPanelDetails;
