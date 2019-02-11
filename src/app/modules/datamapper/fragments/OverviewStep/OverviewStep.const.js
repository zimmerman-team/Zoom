import React from 'react';
import CellValue from 'components/ZoomTable/CellValue';
import {
  CellLine,
  CellText,
  ColHeader,
  Cell,
} from 'modules/datamapper/fragments/OverviewStep/OverviewStep.styles';

export const columns = [
  {
    property: 'fileColumn',
    header: <ColHeader>File column</ColHeader>,
    render: val => (
      <Cell>
        <CellValue>{val.fileColumn}</CellValue>
      </Cell>
    ),
  },
  {
    property: 'summary',
    header: <ColHeader>Summary</ColHeader>,
    render: val => (
      <Cell>
        {val.summary.map((item, index) => {
          return (
            <CellLine key={`column-item-${index}`}>
              <CellValue>{item.label}:</CellValue>
              <CellText>{item.value}</CellText>
            </CellLine>
          );
        })}
      </Cell>
    ),
  },
  {
    property: 'dataTypes',
    header: <ColHeader>Data types</ColHeader>,
    render: val => (
      <Cell>
        {val.dataTypes.map((type, index) => {
          return <CellValue key={`data-type-item-${index}`}>{type}</CellValue>;
        })}
      </Cell>
    ),
  },
  {
    property: 'blankCells',
    header: <ColHeader>Number of blank cells</ColHeader>,
    render: val => (
      <Cell>
        <CellValue>{val.blankCells}</CellValue>
      </Cell>
    ),
  },
];
