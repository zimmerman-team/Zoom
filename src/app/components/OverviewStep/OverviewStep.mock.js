import React from 'react';
import { CellValue, ColumnHeader } from 'components/theme/ThemeSheet';
import {
  CellLine,
  CellText,
} from 'components/OverviewStep/OverviewStep.styles';

export const columns = [
  {
    property: 'fileColumn',
    header: <ColumnHeader>File column</ColumnHeader>,
    render: val => <CellValue>{val.fileColumn}</CellValue>,
  },
  {
    property: 'summary',
    header: <ColumnHeader>Summary</ColumnHeader>,
    render: val => (
      <div style={{ color: 'blue' }}>
        {val.summary.map((item, index) => {
          return (
            <CellLine key={`column-item-${index}`}>
              <CellValue>{item.label}:</CellValue>
              <CellText>{item.value}</CellText>
            </CellLine>
          );
        })}
      </div>
    ),
  },
  {
    property: 'dataTypes',
    header: <ColumnHeader>Data types</ColumnHeader>,
    render: val => (
      <div style={{ color: 'blue' }}>
        {val.dataTypes.map((type, index) => {
          return <CellValue key={`data-type-item-${index}`}>{type}</CellValue>;
        })}
      </div>
    ),
  },
  {
    property: 'blankCells',
    header: <ColumnHeader>Number of blank cells</ColumnHeader>,
    render: val => <CellValue>{val.blankCells}</CellValue>,
  },
];

export const data = [
  {
    fileColumn: 'Area',
    summary: [
      {
        label: 'Number of values',
        value: 80907,
      },
      {
        label: 'Number of unique values',
        value: 'Central',
      },
      {
        label: 'Most frequent value',
        value: 'Central',
      },
      {
        label: 'Central count',
        value: 931,
      },
    ],
    dataTypes: ['58% of country value', '42% of the text value'],
    blankCells: 0,
  },
  {
    fileColumn: 'Area ID',
    summary: [
      {
        label: 'Count of values',
        value: 80907,
      },
      {
        label: 'Number of unique values',
        value: 323,
      },
      {
        label: 'Most frequent value',
        value: 'UNAESA',
      },
      {
        label: 'Central count',
        value: 528,
      },
    ],
    dataTypes: ['58% of country value', '42% of the text value'],
    blankCells: 3,
  },
  {
    fileColumn: 'Data value',
    summary: [
      {
        label: 'Count of values',
        value: 80907,
      },
      {
        label: 'Average',
        value: 36007,
      },
      {
        label: 'Std',
        value: 4495,
      },
      {
        label: 'Min value',
        value: -2,
      },
      {
        label: '25%',
        value: 11.95,
      },
      {
        label: '50%',
        value: 76,
      },
      {
        label: '75%',
        value: 1290,
      },
      {
        label: 'Max value',
        value: 17434500,
      },
    ],
    dataTypes: ['100% of numeric value'],
    blankCells: 0,
  },
];
