/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type HomeModuleMediator_indicatorAggregations$ref: FragmentReference;
export type HomeModuleMediator_indicatorAggregations = {|
  +indicators1: ?$ReadOnlyArray<?{|
    +indicatorName: ?string,
    +geolocationIso2: ?string,
    +geolocationTag: ?string,
    +date: ?string,
    +value: ?number,
  |}>,
  +indicators2: ?$ReadOnlyArray<?{|
    +indicatorName: ?string,
    +geolocationIso2: ?string,
    +geolocationTag: ?string,
    +date: ?string,
    +value: ?number,
  |}>,
  +$refType: HomeModuleMediator_indicatorAggregations$ref,
|};
*/

const node /*: ConcreteFragment*/ = (function() {
  var v0 = ['undefined'],
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
    kind: 'Fragment',
    name: 'HomeModuleMediator_indicatorAggregations',
    type: 'Query',
    metadata: null,
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'date1',
        type: '[String]',
        defaultValue: v0,
      },
      {
        kind: 'LocalArgument',
        name: 'date2',
        type: '[String]',
        defaultValue: v0,
      },
      {
        kind: 'LocalArgument',
        name: 'indicator1',
        type: '[String]',
        defaultValue: v0,
      },
      {
        kind: 'LocalArgument',
        name: 'indicator2',
        type: '[String]',
        defaultValue: v0,
      },
    ],
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
  };
})();
// prettier-ignore
(node/*: any*/).hash = '9788276542375d72823ecc1c8ed6d237';
module.exports = node;
