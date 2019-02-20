import React from 'react';

/* styles */
import {
  CheckBox,
  ErrorCell,
  ErrorColHeader,
  HeaderCheckBox
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';

/* components */
import CustomCheckBox from 'components/CustomCheckBox/CustomCheckBox';

// so yeah here the columns will need to be formatted according to the data
export function formatColumns(tableData, handleCellClick) {
  const columns = [];

  if (tableData.length > 0) {
    // so initially we have the checkboxes
    // for pushed in the columns
    columns.push({
      property: 'id',
      header: (
        <HeaderCheckBox key={0}>
          <CustomCheckBox onChange={() => console.log('all checked')} />
        </HeaderCheckBox>
      ),
      render: val => (
        <CheckBox>
          <CustomCheckBox
            key={val.id}
            onChange={() => console.log(`item ${val.id} checked`)}
          />
        </CheckBox>
      )
    });

    const row = tableData[0];

    // and here we'll push the actual columns from the data
    // and we will only loop through the first table datas
    // value, cause the first value indicates the first row
    // and each of its columns, similarly to how the table
    // takes in the data
    Object.keys(row).forEach((key, index) => {
      // because it seems to be the same as the index
      // and i think its just extra generated stuff from graphql
      if (key !== 'line no.') {
        columns.push({
          property: key,
          header: (
            <ErrorColHeader key={`header-${index}`}>{key}</ErrorColHeader>
          ),
          render: val => (
            <ErrorCell
              onClick={
                key !== 'index'
                  ? () => handleCellClick(val[key], key, val.index)
                  : undefined
              }
            >
              {val[key]}
            </ErrorCell>
          )
        });
      }
    });
  }

  return columns;
}
