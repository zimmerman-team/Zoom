import React from 'react';
/* styles */
import {
  CheckBox,
  ErrorCell,
  ErrorColHeader,
  HeaderCheckBox,
  HeaderName,
  IgnoreHeaderCheckBox,
  IgnorHeaderLabel
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';
/* components */
import Checkbox from 'components/Checkbox/CheckBox';

function genKey() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

// so yeah here the columns will need to be formatted according to the data
export function formatColumns(
  tableData,
  checkRows,
  handleCellClick,
  ignoreErrors,
  ignoredErrors,
  checkedRows
) {
  const columns = [];

  if (tableData.length > 0) {
    // so initially we have the checkboxes
    // for pushed in the columns
    columns.push({
      property: 'id',
      header: (
        <HeaderCheckBox key={genKey()}>
          <Checkbox
            key={genKey()}
            checked={checkedRows}
            onChange={(event, checked) => checkRows('all', checked)}
          />
        </HeaderCheckBox>
      ),
      render: val => (
        <CheckBox>
          <Checkbox
            key={genKey()}
            checked={val.checked}
            onChange={() => checkRows(val.index)}
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
      if (key !== 'line no.' && key !== 'checked') {
        columns.push({
          property: key,
          header:
            key === 'index' ? (
              <ErrorColHeader key={genKey()}>{key}</ErrorColHeader>
            ) : (
              <ErrorColHeader key={genKey()}>
                <HeaderName key={genKey()}>{key}</HeaderName>
                <IgnoreHeaderCheckBox key={genKey()}>
                  <Checkbox
                    key={genKey()}
                    checked={ignoredErrors.indexOf(key) !== -1}
                    onChange={() => ignoreErrors(key)}
                  />
                  <IgnorHeaderLabel key={genKey()}>
                    Ignore errors
                  </IgnorHeaderLabel>
                </IgnoreHeaderCheckBox>
              </ErrorColHeader>
            ),
          render: val => (
            <ErrorCell
              key={genKey()}
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
