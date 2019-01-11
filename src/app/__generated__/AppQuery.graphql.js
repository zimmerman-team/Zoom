/**
 * @flow
 * @relayHash 4da21f708a8a060aa62e1581269535ae
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CountryDetailMediator_indicatorAggregations$ref = any;
type HomeModuleMediator_indicatorAggregations$ref = any;
type IndicatorDropMediator_allIndicatorNames$ref = any;
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +$fragmentRefs: HomeModuleMediator_indicatorAggregations$ref & IndicatorDropMediator_allIndicatorNames$ref & CountryDetailMediator_indicatorAggregations$ref
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/

/*
query AppQuery {
  ...HomeModuleMediator_indicatorAggregations
  ...IndicatorDropMediator_allIndicatorNames
  ...CountryDetailMediator_indicatorAggregations
}

fragment HomeModuleMediator_indicatorAggregations on Query {
  indicators1: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {
    indicatorName
    geolocationIso2
    geolocationTag
    date
    value
  }
  indicators2: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {
    indicatorName
    geolocationIso2
    geolocationTag
    date
    value
  }
}

fragment IndicatorDropMediator_allIndicatorNames on Query {
  allIndicators {
    edges {
      node {
        name
        id
      }
    }
  }
}

fragment CountryDetailMediator_indicatorAggregations on Query {
  country: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], geolocationIso2_In: ["undefined"], indicatorName_In: ["undefined"]) {
    indicatorName
    geolocationTag
    value
  }
  global: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], indicatorName_In: ["undefined"]) {
    indicatorName
    value
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = {
      kind: 'Literal',
      name: 'aggregation',
      value: ['Sum(value)'],
      type: '[String]',
    },
    v1 = ['undefined'],
    v2 = {
      kind: 'Literal',
      name: 'groupBy',
      value: ['indicatorName', 'geolocationTag', 'date', 'geolocationIso2'],
      type: '[String]',
    },
    v3 = {
      kind: 'Literal',
      name: 'indicatorName_In',
      value: v1,
      type: '[String]',
    },
    v4 = {
      kind: 'Literal',
      name: 'orderBy',
      value: ['indicatorName'],
      type: '[String]',
    },
    v5 = [
      v0,
      {
        kind: 'Literal',
        name: 'date_In',
        value: v1,
        type: '[String]',
      },
      v2,
      v3,
      v4,
    ],
    v6 = {
      kind: 'ScalarField',
      alias: null,
      name: 'indicatorName',
      args: null,
      storageKey: null,
    },
    v7 = {
      kind: 'ScalarField',
      alias: null,
      name: 'geolocationTag',
      args: null,
      storageKey: null,
    },
    v8 = {
      kind: 'ScalarField',
      alias: null,
      name: 'value',
      args: null,
      storageKey: null,
    },
    v9 = [
      v6,
      {
        kind: 'ScalarField',
        alias: null,
        name: 'geolocationIso2',
        args: null,
        storageKey: null,
      },
      v7,
      {
        kind: 'ScalarField',
        alias: null,
        name: 'date',
        args: null,
        storageKey: null,
      },
      v8,
    ];
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'AppQuery',
    id: null,
    text:
      'query AppQuery {\n  ...HomeModuleMediator_indicatorAggregations\n  ...IndicatorDropMediator_allIndicatorNames\n  ...CountryDetailMediator_indicatorAggregations\n}\n\nfragment HomeModuleMediator_indicatorAggregations on Query {\n  indicators1: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n  indicators2: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n}\n\nfragment IndicatorDropMediator_allIndicatorNames on Query {\n  allIndicators {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment CountryDetailMediator_indicatorAggregations on Query {\n  country: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], geolocationIso2_In: ["undefined"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    geolocationTag\n    value\n  }\n  global: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    value\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'AppQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: [],
      selections: [
        {
          kind: 'FragmentSpread',
          name: 'HomeModuleMediator_indicatorAggregations',
          args: null,
        },
        {
          kind: 'FragmentSpread',
          name: 'IndicatorDropMediator_allIndicatorNames',
          args: null,
        },
        {
          kind: 'FragmentSpread',
          name: 'CountryDetailMediator_indicatorAggregations',
          args: null,
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'AppQuery',
      argumentDefinitions: [],
      selections: [
        {
          kind: 'LinkedField',
          alias: 'indicators1',
          name: 'datapointsAggregation',
          storageKey:
            'datapointsAggregation(aggregation:["Sum(value)"],date_In:["undefined"],groupBy:["indicatorName","geolocationTag","date","geolocationIso2"],indicatorName_In:["undefined"],orderBy:["indicatorName"])',
          args: v5,
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v9,
        },
        {
          kind: 'LinkedField',
          alias: 'indicators2',
          name: 'datapointsAggregation',
          storageKey:
            'datapointsAggregation(aggregation:["Sum(value)"],date_In:["undefined"],groupBy:["indicatorName","geolocationTag","date","geolocationIso2"],indicatorName_In:["undefined"],orderBy:["indicatorName"])',
          args: v5,
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v9,
        },
        {
          kind: 'LinkedField',
          alias: null,
          name: 'allIndicators',
          storageKey: null,
          args: null,
          concreteType: 'IndicatorNodeConnection',
          plural: false,
          selections: [
            {
              kind: 'LinkedField',
              alias: null,
              name: 'edges',
              storageKey: null,
              args: null,
              concreteType: 'IndicatorNodeEdge',
              plural: true,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'node',
                  storageKey: null,
                  args: null,
                  concreteType: 'IndicatorNode',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'name',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'id',
                      args: null,
                      storageKey: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'LinkedField',
          alias: 'country',
          name: 'datapointsAggregation',
          storageKey:
            'datapointsAggregation(aggregation:["Sum(value)"],geolocationIso2_In:["undefined"],groupBy:["indicatorName","geolocationTag","date","geolocationIso2"],indicatorName_In:["undefined"],orderBy:["indicatorName"])',
          args: [
            v0,
            {
              kind: 'Literal',
              name: 'geolocationIso2_In',
              value: v1,
              type: '[String]',
            },
            v2,
            v3,
            v4,
          ],
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: [v6, v7, v8],
        },
        {
          kind: 'LinkedField',
          alias: 'global',
          name: 'datapointsAggregation',
          storageKey:
            'datapointsAggregation(aggregation:["Sum(value)"],groupBy:["indicatorName","geolocationTag","date","geolocationIso2"],indicatorName_In:["undefined"],orderBy:["indicatorName"])',
          args: [v0, v2, v3, v4],
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: [v6, v8],
        },
      ],
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '20e24ae6be824b3463afed191662f84a';
module.exports = node;
