/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropDownCont } from 'components/Panes/DataExplorePane/DataExplorerPane.style';
import _ZoomSelect from 'components/Select/ZoomSelect';

const ZoomSelect = styled(_ZoomSelect)`
  width: 100%;
`;

const propTypes = {
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

const DropdownMenuPanel = props => {
  return (
    <React.Fragment>
      {props.panelDetails.map((detail, index) => (
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
    </React.Fragment>
  );
};
DropdownMenuPanel.propTypes = propTypes;
DropdownMenuPanel.defaultProps = defaultProps;
export default DropdownMenuPanel;
