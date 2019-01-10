/**
 * @flow
 * @relayHash f23cfdaddfbd0a13034549e6b7887922
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HomeModuleMediator_indicatorAggregations$ref = any;
export type HomeModuleMediatorRefetchQueryVariables = {|
  date1: $ReadOnlyArray<?string>,
  date2: $ReadOnlyArray<?string>,
  indicator1: $ReadOnlyArray<?string>,
  indicator2: $ReadOnlyArray<?string>,
|};
export type HomeModuleMediatorRefetchQueryResponse = {|
  +$fragmentRefs: HomeModuleMediator_indicatorAggregations$ref
|};
export type HomeModuleMediatorRefetchQuery = {|
  variables: HomeModuleMediatorRefetchQueryVariables,
  response: HomeModuleMediatorRefetchQueryResponse,
|};
*/

/*
query HomeModuleMediatorRefetchQuery(
  $date1: [String]!
  $date2: [String]!
  $indicator1: [String]!
  $indicator2: [String]!
) {
  ...HomeModuleMediator_indicatorAggregations_1kzpZD
}

fragment HomeModuleMediator_indicatorAggregations_1kzpZD on Query {
  indicators1: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: $date1, indicatorName_In: $indicator1) {
    indicatorName
    geolocationIso2
    geolocationTag
    date
    value
  }
  indicators2: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: $date2, indicatorName_In: $indicator2) {
    indicatorName
    geolocationIso2
    geolocationTag
    date
    value
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'date1',
        type: '[String]!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'date2',
        type: '[String]!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'indicator1',
        type: '[String]!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'indicator2',
        type: '[String]!',
        defaultValue: null,
      },
    ],
    v1 = {
      kind: 'Literal',
      name: 'aggregation',
      value: ['Sum(value)'],
      type: '[String]',
    },
    v2 = {
      kind: 'Literal',
      name: 'groupBy',
      value: ['indicatorName', 'geolocationTag', 'date', 'geolocationIso2'],
      type: '[String]',
    },
    v3 = {
      kind: 'Literal',
      name: 'orderBy',
      value: ['indicatorName'],
      type: '[String]',
    },
    v4 = [
      {
        kind: 'ScalarField',
        alias: null,
        name: 'indicatorName',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'geolocationIso2',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'geolocationTag',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'date',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'value',
        args: null,
        storageKey: null,
      },
    ];
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'HomeModuleMediatorRefetchQuery',
    id: null,
    text:
      'query HomeModuleMediatorRefetchQuery(\n  $date1: [String]!\n  $date2: [String]!\n  $indicator1: [String]!\n  $indicator2: [String]!\n) {\n  ...HomeModuleMediator_indicatorAggregations_1kzpZD\n}\n\nfragment HomeModuleMediator_indicatorAggregations_1kzpZD on Query {\n  indicators1: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: $date1, indicatorName_In: $indicator1) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n  indicators2: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: $date2, indicatorName_In: $indicator2) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'HomeModuleMediatorRefetchQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'FragmentSpread',
          name: 'HomeModuleMediator_indicatorAggregations',
          args: [
            {
              kind: 'Variable',
              name: 'date1',
              variableName: 'date1',
              type: null,
            },
            {
              kind: 'Variable',
              name: 'date2',
              variableName: 'date2',
              type: null,
            },
            {
              kind: 'Variable',
              name: 'indicator1',
              variableName: 'indicator1',
              type: null,
            },
            {
              kind: 'Variable',
              name: 'indicator2',
              variableName: 'indicator2',
              type: null,
            },
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'HomeModuleMediatorRefetchQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: 'indicators1',
          name: 'datapointsAggregation',
          storageKey: null,
          args: [
            v1,
            {
              kind: 'Variable',
              name: 'date_In',
              variableName: 'date1',
              type: '[String]',
            },
            v2,
            {
              kind: 'Variable',
              name: 'indicatorName_In',
              variableName: 'indicator1',
              type: '[String]',
            },
            v3,
          ],
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v4,
        },
        {
          kind: 'LinkedField',
          alias: 'indicators2',
          name: 'datapointsAggregation',
          storageKey: null,
          args: [
            v1,
            {
              kind: 'Variable',
              name: 'date_In',
              variableName: 'date2',
              type: '[String]',
            },
            v2,
            {
              kind: 'Variable',
              name: 'indicatorName_In',
              variableName: 'indicator2',
              type: '[String]',
            },
            v3,
          ],
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v4,
        },
      ],
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '17168b9d635a14ea6fd8644b0dc8b738';
module.exports = node;
