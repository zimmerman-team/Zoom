/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type IndicatorDropMediator_allIndicatorNames$ref: FragmentReference;
export type IndicatorDropMediator_allIndicatorNames = {|
  +allIndicators: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +name: string
      |}
    |}>
  |},
  +$refType: IndicatorDropMediator_allIndicatorNames$ref,
|};
*/

const node /*: ConcreteFragment*/ = {
  kind: 'Fragment',
  name: 'IndicatorDropMediator_allIndicatorNames',
  type: 'Query',
  metadata: null,
  argumentDefinitions: [],
  selections: [
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
              ],
            },
          ],
        },
      ],
    },
  ],
};
// prettier-ignore
(node/*: any*/).hash = 'ffc8b3ca352cc8ccd0b6ef4d5d318864';
module.exports = node;
