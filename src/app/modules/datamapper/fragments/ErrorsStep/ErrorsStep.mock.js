import React from 'react';
import {
  HeaderCheckBox,
  CheckBox,
  ErrorCell,
  ErrorColHeader,
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';
/*TODO: replace CustomCheckBox component with Checkbox component*/
import CustomCheckBox from 'components/CustomCheckBox/CustomCheckBox';

export const columns = [
  {
    property: 'id',
    header: (
      <HeaderCheckBox>
        <CustomCheckBox key={0} onChange={() => console.log('all checked')} />
      </HeaderCheckBox>
    ),
    render: val => (
      <CheckBox>
        <CustomCheckBox
          key={val.id}
          onChange={() => console.log(`item ${val.id} checked`)}
        />
      </CheckBox>
    ),
  },
  {
    property: 'index',
    header: <ErrorColHeader>Index</ErrorColHeader>,
    render: val => <ErrorCell>{val.index}</ErrorCell>,
  },
  {
    property: 'indicator',
    header: <ErrorColHeader>Indicator</ErrorColHeader>,
    render: val => <ErrorCell>{val.indicator}</ErrorCell>,
  },
  {
    property: 'unit',
    header: <ErrorColHeader>Unit</ErrorColHeader>,
    render: val => <ErrorCell>{val.unit}</ErrorCell>,
  },
  {
    property: 'subgroup',
    header: <ErrorColHeader>Subgroup</ErrorColHeader>,
    render: val => <ErrorCell>{val.subgroup}</ErrorCell>,
  },
  {
    property: 'area',
    header: <ErrorColHeader>Area</ErrorColHeader>,
    render: val => <ErrorCell>{val.area}</ErrorCell>,
  },
  {
    property: 'areaID',
    header: <ErrorColHeader>Area ID</ErrorColHeader>,
    render: val => <ErrorCell>{val.areaID}</ErrorCell>,
  },
  {
    property: 'timePeriod',
    header: <ErrorColHeader>Time period</ErrorColHeader>,
    render: val => <ErrorCell>{val.timePeriod}</ErrorCell>,
  },
  {
    property: 'source',
    header: <ErrorColHeader>Source</ErrorColHeader>,
    render: val => <ErrorCell>{val.source}</ErrorCell>,
  },
  {
    property: 'dateValue',
    header: <ErrorColHeader>Date value</ErrorColHeader>,
    render: val => <ErrorCell>{val.dateValue}</ErrorCell>,
  },
  {
    property: 'footnotes',
    header: <ErrorColHeader>Footnotes</ErrorColHeader>,
    render: val => <ErrorCell>{val.footnotes}</ErrorCell>,
  },
];

export const data = [
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
  {
    id: 2375,
    index: 2375,
    indicator: 'People living with HIV',
    unit: 'number',
    subgroup: '10-19',
    area: 'Uruguay',
    areaID: 'URY',
    timePeriod: 2016,
    source: 'UNAIDS',
    dateValue: 370,
    footnotes: 'none',
  },
];

export const errorCells = [
  {
    row: 1,
    col: 6,
  },
  {
    row: 2,
    col: 6,
  },
  {
    row: 3,
    col: 6,
  },
  {
    row: 4,
    col: 6,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row: 6,
    col: 6,
  },
  {
    row: 7,
    col: 6,
  },
  {
    row: 8,
    col: 6,
  },
  {
    row: 9,
    col: 6,
  },
  {
    row: 10,
    col: 6,
  },
  {
    row: 11,
    col: 6,
  },
  {
    row: 12,
    col: 6,
  },
  {
    row: 13,
    col: 6,
  },
  {
    row: 14,
    col: 6,
  },
];
