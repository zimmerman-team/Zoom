/**
 * @flow
 * @relayHash e6f368fabe3b5da483a1263ef7f21e71
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HomeModuleMediator_indicatorAggregations$ref = any;
type IndicatorDropMediator_allIndicatorNames$ref = any;
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +$fragmentRefs: HomeModuleMediator_indicatorAggregations$ref & IndicatorDropMediator_allIndicatorNames$ref
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
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = ['undefined'],
    v1 = [
      {
        kind: 'Literal',
        name: 'aggregation',
        value: ['Sum(value)'],
        type: '[String]',
      },
      {
        kind: 'Literal',
        name: 'date_In',
        value: v0,
        type: '[String]',
      },
      {
        kind: 'Literal',
        name: 'groupBy',
        value: ['indicatorName', 'geolocationTag', 'date', 'geolocationIso2'],
        type: '[String]',
      },
      {
        kind: 'Literal',
        name: 'indicatorName_In',
        value: v0,
        type: '[String]',
      },
      {
        kind: 'Literal',
        name: 'orderBy',
        value: ['indicatorName'],
        type: '[String]',
      },
    ],
    v2 = [
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
    name: 'AppQuery',
    id: null,
    text:
      'query AppQuery {\n  ...HomeModuleMediator_indicatorAggregations\n  ...IndicatorDropMediator_allIndicatorNames\n}\n\nfragment HomeModuleMediator_indicatorAggregations on Query {\n  indicators1: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n  indicators2: datapointsAggregation(groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"], orderBy: ["indicatorName"], aggregation: ["Sum(value)"], date_In: ["undefined"], indicatorName_In: ["undefined"]) {\n    indicatorName\n    geolocationIso2\n    geolocationTag\n    date\n    value\n  }\n}\n\nfragment IndicatorDropMediator_allIndicatorNames on Query {\n  allIndicators {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n',
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
          args: v1,
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v2,
        },
        {
          kind: 'LinkedField',
          alias: 'indicators2',
          name: 'datapointsAggregation',
          storageKey:
            'datapointsAggregation(aggregation:["Sum(value)"],date_In:["undefined"],groupBy:["indicatorName","geolocationTag","date","geolocationIso2"],indicatorName_In:["undefined"],orderBy:["indicatorName"])',
          args: v1,
          concreteType: 'DatapointsAggregationNode',
          plural: true,
          selections: v2,
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
      ],
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'b46b681615d289d7960fa50a2a55d307';
module.exports = node;
