/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type TopBarQuery$ref: FragmentReference;
export type TopBarQuery = {|
  +loginURL: string,
  +me: ?{|
    +googleID: ?string,
    +email: ?string,
  |},
  +$refType: TopBarQuery$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "TopBarQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "access_token",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "loginURL",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "me",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "access_token",
          "variableName": "access_token",
          "type": "String!"
        }
      ],
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "googleID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node/*: any*/).hash = 'fdabd14c4c12a57604d1dc7681ccbd1f';
module.exports = node;
